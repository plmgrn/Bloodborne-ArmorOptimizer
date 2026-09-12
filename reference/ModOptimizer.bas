' filepath: ModOptimizer.bas

Option Explicit

' Configuration structure
Private Type Config
    PrimaryStatCol As Integer
    TiebreakerCol As Integer
    TolerancePct As Double
    SheetNames(1 To 4) As String
End Type

' Item structure
Private Type Item
    RowNum As Long
    ItemName As String
    PrimaryStat As Double
    TiebreakerStat As Double
    RawSum As Double
    WeightedTotal As Double
End Type

' Combination result
Private Type Combo
    Items(1 To 4) As Item
    TotalPrimary As Double
    TotalTiebreaker As Double
    TotalRawSum As Double
    TotalWeighted As Double
End Type

Public Sub RunOptimization()
    Dim cfg As Config
    Dim items1() As Item, items2() As Item, items3() As Item, items4() As Item
    Dim scenarioA As Combo, scenarioB As Combo
    Dim threshold As Double
    
    ' Load configuration
    cfg = LoadConfig()
    
    ' Load items from each sheet
    items1 = LoadItems(cfg.SheetNames(1), cfg.PrimaryStatCol, cfg.TiebreakerCol)
    items2 = LoadItems(cfg.SheetNames(2), cfg.PrimaryStatCol, cfg.TiebreakerCol)
    items3 = LoadItems(cfg.SheetNames(3), cfg.PrimaryStatCol, cfg.TiebreakerCol)
    items4 = LoadItems(cfg.SheetNames(4), cfg.PrimaryStatCol, cfg.TiebreakerCol)
    
    ' Find Scenario A: Maximum Primary Stat
    scenarioA = FindMaxPrimary(items1, items2, items3, items4)
    
    ' Calculate threshold for Scenario B
    threshold = scenarioA.TotalPrimary * (1 - cfg.TolerancePct / 100)
    
    ' Find Scenario B: Maximum TOTAL (weighted) where Primary >= threshold
    scenarioB = FindMaxTotalConstrained(items1, items2, items3, items4, threshold)
    
    ' Output results
    OutputResults scenarioA, scenarioB, cfg, threshold
    
    MsgBox "Optimization complete!", vbInformation
End Sub

Private Function LoadConfig() As Config
    Dim cfg As Config
    Dim ws As Worksheet
    
    Set ws = ThisWorkbook.Sheets("Config")
    
    ' Map stat name to column index
    cfg.PrimaryStatCol = StatNameToCol(ws.Range("B2").Value)
    cfg.TiebreakerCol = StatNameToCol(ws.Range("B3").Value)
    cfg.TolerancePct = ws.Range("B4").Value
    
    cfg.SheetNames(1) = ws.Range("B5").Value
    cfg.SheetNames(2) = ws.Range("B6").Value
    cfg.SheetNames(3) = ws.Range("B7").Value
    cfg.SheetNames(4) = ws.Range("B8").Value
    
    LoadConfig = cfg
End Function

Private Function StatNameToCol(statName As String) As Integer
    Select Case LCase(Trim(statName))
        Case "physical": StatNameToCol = 2
        Case "blunt": StatNameToCol = 3
        Case "thrust": StatNameToCol = 4
        Case "blood": StatNameToCol = 5
        Case "arcane": StatNameToCol = 6
        Case "fire": StatNameToCol = 7
        Case "bolt": StatNameToCol = 8
        Case "slow poison": StatNameToCol = 9
        Case "rapid poison": StatNameToCol = 10
        Case "frenzy": StatNameToCol = 11
        Case "beasthood": StatNameToCol = 12
        Case Else: StatNameToCol = 2 ' Default to Physical
    End Select
End Function

Private Function LoadItems(sheetName As String, priCol As Integer, tieCol As Integer) As Item()
    Dim ws As Worksheet
    Dim lastRow As Long, i As Long
    Dim items() As Item
    
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets(sheetName)
    If ws Is Nothing Then
        MsgBox "Sheet '" & sheetName & "' not found!", vbCritical
        Exit Function
    End If
    On Error GoTo 0
    
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    If lastRow < 2 Then lastRow = 2
    
    ReDim items(1 To lastRow - 1)
    
    For i = 2 To lastRow
        items(i - 1).RowNum = i
        items(i - 1).ItemName = ws.Cells(i, 1).Value
        items(i - 1).PrimaryStat = ws.Cells(i, priCol).Value
        items(i - 1).TiebreakerStat = ws.Cells(i, tieCol).Value
        items(i - 1).RawSum = ws.Cells(i, 14).Value      ' Column N
        items(i - 1).WeightedTotal = ws.Cells(i, 13).Value ' Column M
    Next i
    
    LoadItems = items
End Function

Private Function FindMaxPrimary(items1() As Item, items2() As Item, items3() As Item, items4() As Item) As Combo
    Dim best As Combo
    Dim current As Combo
    Dim i1 As Long, i2 As Long, i3 As Long, i4 As Long
    Dim bestScore As Double, currentScore As Double
    
    bestScore = -1
    
    For i1 = LBound(items1) To UBound(items1)
        For i2 = LBound(items2) To UBound(items2)
            For i3 = LBound(items3) To UBound(items3)
                For i4 = LBound(items4) To UBound(items4)
                    current = BuildCombo(items1(i1), items2(i2), items3(i3), items4(i4))
                    
                    ' Composite score: Primary * large + Tiebreaker * medium + WeightedTotal
                    currentScore = current.TotalPrimary * 1000000000# + _
                                   current.TotalTiebreaker * 1000000# + _
                                   current.TotalWeighted
                    
                    If currentScore > bestScore Then
                        bestScore = currentScore
                        best = current
                    End If
                Next i4
            Next i3
        Next i2
    Next i1
    
    FindMaxPrimary = best
End Function

Private Function FindMaxTotalConstrained(items1() As Item, items2() As Item, items3() As Item, items4() As Item, threshold As Double) As Combo
    Dim best As Combo
    Dim current As Combo
    Dim i1 As Long, i2 As Long, i3 As Long, i4 As Long
    Dim bestScore As Double, currentScore As Double
    Dim foundAny As Boolean
    
    bestScore = -1
    foundAny = False
    
    For i1 = LBound(items1) To UBound(items1)
        For i2 = LBound(items2) To UBound(items2)
            For i3 = LBound(items3) To UBound(items3)
                For i4 = LBound(items4) To UBound(items4)
                    current = BuildCombo(items1(i1), items2(i2), items3(i3), items4(i4))
                    
                    ' Only consider if meets primary stat threshold
                    If current.TotalPrimary >= threshold Then
                        ' Score: WeightedTotal * large + Tiebreaker (for ties)
                        currentScore = current.TotalWeighted * 1000000# + _
                                       current.TotalTiebreaker
                        
                        If currentScore > bestScore Then
                            bestScore = currentScore
                            best = current
                            foundAny = True
                        End If
                    End If
                Next i4
            Next i3
        Next i2
    Next i1
    
    If Not foundAny Then
        ' No combination meets threshold - return best primary as fallback
        best = FindMaxPrimary(items1, items2, items3, items4)
    End If
    
    FindMaxTotalConstrained = best
End Function

Private Function BuildCombo(i1 As Item, i2 As Item, i3 As Item, i4 As Item) As Combo
    Dim c As Combo
    
    c.Items(1) = i1
    c.Items(2) = i2
    c.Items(3) = i3
    c.Items(4) = i4
    
    c.TotalPrimary = i1.PrimaryStat + i2.PrimaryStat + i3.PrimaryStat + i4.PrimaryStat
    c.TotalTiebreaker = i1.TiebreakerStat + i2.TiebreakerStat + i3.TiebreakerStat + i4.TiebreakerStat
    c.TotalRawSum = i1.RawSum + i2.RawSum + i3.RawSum + i4.RawSum
    c.TotalWeighted = i1.WeightedTotal + i2.WeightedTotal + i3.WeightedTotal + i4.WeightedTotal
    
    BuildCombo = c
End Function

Private Sub OutputResults(scenA As Combo, scenB As Combo, cfg As Config, threshold As Double)
    Dim ws As Worksheet
    Dim statName As String
    Dim tieName As String
    
    ' Get stat names for display
    statName = ThisWorkbook.Sheets("Config").Range("B2").Value
    tieName = ThisWorkbook.Sheets("Config").Range("B3").Value
    
    ' Create or clear Results sheet
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets("Results")
    If ws Is Nothing Then
        Set ws = ThisWorkbook.Sheets.Add(After:=ThisWorkbook.Sheets(ThisWorkbook.Sheets.Count))
        ws.Name = "Results"
    Else
        ws.Cells.Clear
    End If
    On Error GoTo 0
    
    ' === HEADER ===
    ws.Range("A1").Value = "OPTIMIZATION RESULTS"
    ws.Range("A1").Font.Bold = True
    ws.Range("A1").Font.Size = 14
    
    ' === CONFIG DISPLAY ===
    ws.Range("A3").Value = "Primary Stat:"
    ws.Range("B3").Value = statName
    ws.Range("A4").Value = "Tiebreaker:"
    ws.Range("B4").Value = tieName
    ws.Range("A5").Value = "Tolerance:"
    ws.Range("B5").Value = cfg.TolerancePct & "%"
    
    ' === SCENARIO A ===
    ws.Range("A7").Value = "SCENARIO A: MAXIMUM " & UCase(statName)
    ws.Range("A7").Font.Bold = True
    ws.Range("A7:F7").Interior.Color = RGB(200, 230, 200)
    
    ' Headers
    ws.Range("A8").Value = "Source"
    ws.Range("B8").Value = "Item Name"
    ws.Range("C8").Value = statName
    ws.Range("D8").Value = tieName
    ws.Range("E8").Value = "RAW SUM"
    ws.Range("F8").Value = "TOTAL"
    ws.Range("A8:F8").Font.Bold = True
    
    ' Data rows
    Dim i As Integer
    For i = 1 To 4
        ws.Cells(8 + i, 1).Value = cfg.SheetNames(i)
        ws.Cells(8 + i, 2).Value = scenA.Items(i).ItemName
        ws.Cells(8 + i, 3).Value = scenA.Items(i).PrimaryStat
        ws.Cells(8 + i, 4).Value = scenA.Items(i).TiebreakerStat
        ws.Cells(8 + i, 5).Value = scenA.Items(i).RawSum
        ws.Cells(8 + i, 6).Value = scenA.Items(i).WeightedTotal
    Next i
    
    ' Totals
    ws.Range("A13").Value = "TOTAL"
    ws.Range("A13").Font.Bold = True
    ws.Range("C13").Value = scenA.TotalPrimary
    ws.Range("D13").Value = scenA.TotalTiebreaker
    ws.Range("E13").Value = scenA.TotalRawSum
    ws.Range("F13").Value = scenA.TotalWeighted
    ws.Range("C13:F13").Font.Bold = True
    
    ' === SCENARIO B ===
    ws.Range("A15").Value = "SCENARIO B: MAXIMUM TOTAL (where " & statName & " >= " & Format(threshold, "0.0") & ")"
    ws.Range("A15").Font.Bold = True
    ws.Range("A15:F15").Interior.Color = RGB(200, 200, 230)
    
    ' Headers
    ws.Range("A16").Value = "Source"
    ws.Range("B16").Value = "Item Name"
    ws.Range("C16").Value = statName
    ws.Range("D16").Value = tieName
    ws.Range("E16").Value = "RAW SUM"
    ws.Range("F16").Value = "TOTAL"
    ws.Range("A16:F16").Font.Bold = True
    
    ' Data rows
    For i = 1 To 4
        ws.Cells(16 + i, 1).Value = cfg.SheetNames(i)
        ws.Cells(16 + i, 2).Value = scenB.Items(i).ItemName
        ws.Cells(16 + i, 3).Value = scenB.Items(i).PrimaryStat
        ws.Cells(16 + i, 4).Value = scenB.Items(i).TiebreakerStat
        ws.Cells(16 + i, 5).Value = scenB.Items(i).RawSum
        ws.Cells(16 + i, 6).Value = scenB.Items(i).WeightedTotal
    Next i
    
    ' Totals
    ws.Range("A21").Value = "TOTAL"
    ws.Range("A21").Font.Bold = True
    ws.Range("C21").Value = scenB.TotalPrimary
    ws.Range("D21").Value = scenB.TotalTiebreaker
    ws.Range("E21").Value = scenB.TotalRawSum
    ws.Range("F21").Value = scenB.TotalWeighted
    ws.Range("C21:F21").Font.Bold = True
    
    ' === COMPARISON ===
    ws.Range("A23").Value = "COMPARISON"
    ws.Range("A23").Font.Bold = True
    ws.Range("A23:F23").Interior.Color = RGB(230, 230, 200)
    
    Dim priDiff As Double, totalDiff As Double
    priDiff = scenB.TotalPrimary - scenA.TotalPrimary
    totalDiff = scenB.TotalWeighted - scenA.TotalWeighted
    
    ws.Range("A24").Value = statName & " Difference:"
    ws.Range("B24").Value = priDiff
    ws.Range("C24").Value = "(" & Format(priDiff / scenA.TotalPrimary, "0.0%") & ")"
    
    ws.Range("A25").Value = "TOTAL Difference:"
    ws.Range("B25").Value = totalDiff
    ws.Range("C25").Value = "(" & Format(totalDiff / scenA.TotalWeighted, "0.0%") & ")"
    
    If priDiff <> 0 Then
        ws.Range("A26").Value = "Trade Ratio:"
        ws.Range("B26").Value = Format(Abs(totalDiff / priDiff), "0.0") & " TOTAL per 1 " & statName
    End If
    
    ' Autofit columns
    ws.Columns("A:F").AutoFit
End Sub