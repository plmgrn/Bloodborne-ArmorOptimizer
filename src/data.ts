// Auto-extracted from bb_armor.xlsm (Hats/Shirts/Gloves/Pants sheets).
// Regenerate this file if the source workbook changes — do not hand-edit stat values.

export const STAT_ORDER = ["physical", "blunt", "thrust", "blood", "arcane", "fire", "bolt", "slowPoison", "rapidPoison", "frenzy", "beasthood"] as const;
export type StatName = (typeof STAT_ORDER)[number];

export const STAT_LABELS: Record<StatName, string> = {
  "physical": "Physical",
  "blunt": "Blunt",
  "thrust": "Thrust",
  "blood": "Blood",
  "arcane": "Arcane",
  "fire": "Fire",
  "bolt": "Bolt",
  "slowPoison": "Slow Poison",
  "rapidPoison": "Rapid Poison",
  "frenzy": "Frenzy",
  "beasthood": "Beasthood"
};

export interface ArmorItem {
  name: string;
  stats: Record<StatName, number>;
}

export type ArmorSlot = 'hats' | 'shirts' | 'gloves' | 'pants';

export const SLOT_LABELS: Record<ArmorSlot, string> = {
  hats: 'Hats',
  shirts: 'Shirts',
  gloves: 'Gloves',
  pants: 'Pants',
};

// Default weighting — mirrors the example weights on the workbook's Utility sheet.
// Physical resistance is common to nearly every enemy, so it carries roughly 2x the
// weight of most secondary stats; Slow/Rapid Poison, Frenzy and Beasthood default to 0
// (situational/PvP-leaning stats) but remain adjustable.
export const DEFAULT_WEIGHTS: Record<StatName, number> = {
  "physical": 1,
  "blunt": 0.8,
  "thrust": 0.71,
  "blood": 0.4,
  "arcane": 0.6,
  "fire": 0.6,
  "bolt": 0.3,
  "slowPoison": 0,
  "rapidPoison": 0,
  "frenzy": 0,
  "beasthood": 0
};

export const DEFAULT_PRIMARY_STAT: StatName = 'fire';
export const DEFAULT_TIEBREAKER_STAT: StatName = 'physical';
export const DEFAULT_TOLERANCE_PCT = 15;

export const armorData: Record<ArmorSlot, ArmorItem[]> = {
  "hats": [
    {
      "name": "Beak Mask",
      "stats": {
        "physical": 50,
        "blunt": 40,
        "thrust": 40,
        "blood": 60,
        "arcane": 30,
        "fire": 40,
        "bolt": 30,
        "slowPoison": 8,
        "rapidPoison": 10,
        "frenzy": 40,
        "beasthood": 2
      }
    },
    {
      "name": "Black Church Hat",
      "stats": {
        "physical": 40,
        "blunt": 40,
        "thrust": 40,
        "blood": 50,
        "arcane": 60,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 20,
        "rapidPoison": 19,
        "frenzy": 2,
        "beasthood": 13
      }
    },
    {
      "name": "Black Hood",
      "stats": {
        "physical": 20,
        "blunt": 30,
        "thrust": 20,
        "blood": 30,
        "arcane": 20,
        "fire": 30,
        "bolt": 30,
        "slowPoison": 8,
        "rapidPoison": 6,
        "frenzy": 8,
        "beasthood": 4
      }
    },
    {
      "name": "Black Hooded Iron Helm",
      "stats": {
        "physical": 60,
        "blunt": 40,
        "thrust": 10,
        "blood": 20,
        "arcane": 20,
        "fire": 30,
        "bolt": 20,
        "slowPoison": 13,
        "rapidPoison": 12,
        "frenzy": 12,
        "beasthood": 8
      }
    },
    {
      "name": "Blindfold Cap",
      "stats": {
        "physical": 30,
        "blunt": 40,
        "thrust": 40,
        "blood": 40,
        "arcane": 70,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 15,
        "rapidPoison": 13,
        "frenzy": 4,
        "beasthood": 13
      }
    },
    {
      "name": "Bone Ash Mask",
      "stats": {
        "physical": 60,
        "blunt": 30,
        "thrust": 40,
        "blood": 20,
        "arcane": 20,
        "fire": 60,
        "bolt": 60,
        "slowPoison": 11,
        "rapidPoison": 9,
        "frenzy": 14,
        "beasthood": 8
      }
    },
    {
      "name": "Brador's Testimony",
      "stats": {
        "physical": 50,
        "blunt": 60,
        "thrust": 50,
        "blood": 50,
        "arcane": 20,
        "fire": 20,
        "bolt": 30,
        "slowPoison": 18,
        "rapidPoison": 10,
        "frenzy": 6,
        "beasthood": 56
      }
    },
    {
      "name": "Butcher Mask",
      "stats": {
        "physical": 50,
        "blunt": 30,
        "thrust": 50,
        "blood": 30,
        "arcane": 40,
        "fire": 30,
        "bolt": 50,
        "slowPoison": 20,
        "rapidPoison": 19,
        "frenzy": 11,
        "beasthood": 9
      }
    },
    {
      "name": "Cainhurst Helmet",
      "stats": {
        "physical": 60,
        "blunt": 40,
        "thrust": 40,
        "blood": 60,
        "arcane": 20,
        "fire": 40,
        "bolt": 10,
        "slowPoison": 12,
        "rapidPoison": 13,
        "frenzy": 8,
        "beasthood": 7
      }
    },
    {
      "name": "Crown of Illusions",
      "stats": {
        "physical": 40,
        "blunt": 30,
        "thrust": 20,
        "blood": 70,
        "arcane": 50,
        "fire": 30,
        "bolt": 20,
        "slowPoison": 7,
        "rapidPoison": 7,
        "frenzy": 4,
        "beasthood": 4
      }
    },
    {
      "name": "Doll Hat",
      "stats": {
        "physical": 10,
        "blunt": 10,
        "thrust": 10,
        "blood": 20,
        "arcane": 20,
        "fire": 30,
        "bolt": 20,
        "slowPoison": 14,
        "rapidPoison": 10,
        "frenzy": 13,
        "beasthood": 10
      }
    },
    {
      "name": "Enlarged Head",
      "stats": {
        "physical": 20,
        "blunt": 60,
        "thrust": 0,
        "blood": 20,
        "arcane": 50,
        "fire": 20,
        "bolt": 20,
        "slowPoison": 6,
        "rapidPoison": 6,
        "frenzy": 1,
        "beasthood": 0
      }
    },
    {
      "name": "Gascoigne's Cap",
      "stats": {
        "physical": 40,
        "blunt": 40,
        "thrust": 30,
        "blood": 40,
        "arcane": 50,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 17,
        "rapidPoison": 13,
        "frenzy": 7,
        "beasthood": 15
      }
    },
    {
      "name": "Gehrman's Hunter Cap",
      "stats": {
        "physical": 40,
        "blunt": 40,
        "thrust": 40,
        "blood": 50,
        "arcane": 30,
        "fire": 40,
        "bolt": 30,
        "slowPoison": 11,
        "rapidPoison": 12,
        "frenzy": 17,
        "beasthood": 15
      }
    },
    {
      "name": "Gold Ardeo",
      "stats": {
        "physical": 50,
        "blunt": 40,
        "thrust": 60,
        "blood": 40,
        "arcane": 40,
        "fire": 40,
        "bolt": 70,
        "slowPoison": 12,
        "rapidPoison": 15,
        "frenzy": 13,
        "beasthood": 16
      }
    },
    {
      "name": "Graveguard Mask",
      "stats": {
        "physical": 40,
        "blunt": 40,
        "thrust": 50,
        "blood": 40,
        "arcane": 50,
        "fire": 40,
        "bolt": 50,
        "slowPoison": 16,
        "rapidPoison": 16,
        "frenzy": 32,
        "beasthood": 13
      }
    },
    {
      "name": "Grey Wolf Cap",
      "stats": {
        "physical": 50,
        "blunt": 40,
        "thrust": 40,
        "blood": 50,
        "arcane": 20,
        "fire": 50,
        "bolt": 30,
        "slowPoison": 9,
        "rapidPoison": 12,
        "frenzy": 19,
        "beasthood": 37
      }
    },
    {
      "name": "Harrowed Hood",
      "stats": {
        "physical": 60,
        "blunt": 40,
        "thrust": 50,
        "blood": 40,
        "arcane": 60,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 20,
        "rapidPoison": 19,
        "frenzy": 2,
        "beasthood": 18
      }
    },
    {
      "name": "Henryk's Hunter Cap",
      "stats": {
        "physical": 50,
        "blunt": 50,
        "thrust": 40,
        "blood": 40,
        "arcane": 20,
        "fire": 30,
        "bolt": 60,
        "slowPoison": 7,
        "rapidPoison": 14,
        "frenzy": 15,
        "beasthood": 20
      }
    },
    {
      "name": "Hunter Hat",
      "stats": {
        "physical": 50,
        "blunt": 50,
        "thrust": 40,
        "blood": 50,
        "arcane": 20,
        "fire": 50,
        "bolt": 30,
        "slowPoison": 5,
        "rapidPoison": 11,
        "frenzy": 14,
        "beasthood": 16
      }
    },
    {
      "name": "Iron Yahar'gul Helm",
      "stats": {
        "physical": 60,
        "blunt": 40,
        "thrust": 10,
        "blood": 20,
        "arcane": 20,
        "fire": 30,
        "bolt": 10,
        "slowPoison": 5,
        "rapidPoison": 7,
        "frenzy": 9,
        "beasthood": 12
      }
    },
    {
      "name": "Knight's Wig",
      "stats": {
        "physical": 30,
        "blunt": 40,
        "thrust": 40,
        "blood": 60,
        "arcane": 40,
        "fire": 30,
        "bolt": 50,
        "slowPoison": 8,
        "rapidPoison": 14,
        "frenzy": 13,
        "beasthood": 12
      }
    },
    {
      "name": "Madman Hood",
      "stats": {
        "physical": 40,
        "blunt": 30,
        "thrust": 40,
        "blood": 40,
        "arcane": 60,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 18,
        "rapidPoison": 17,
        "frenzy": 1,
        "beasthood": 9
      }
    },
    {
      "name": "Maria Hunter Cap",
      "stats": {
        "physical": 40,
        "blunt": 40,
        "thrust": 40,
        "blood": 70,
        "arcane": 30,
        "fire": 40,
        "bolt": 50,
        "slowPoison": 6,
        "rapidPoison": 17,
        "frenzy": 10,
        "beasthood": 4
      }
    },
    {
      "name": "Master's/One-Eyed Iron Helm",
      "stats": {
        "physical": 60,
        "blunt": 20,
        "thrust": 50,
        "blood": 50,
        "arcane": 20,
        "fire": 20,
        "bolt": 0,
        "slowPoison": 6,
        "rapidPoison": 10,
        "frenzy": 13,
        "beasthood": 23
      }
    },
    {
      "name": "Mensis' Cage",
      "stats": {
        "physical": 60,
        "blunt": 20,
        "thrust": 10,
        "blood": 30,
        "arcane": 40,
        "fire": 20,
        "bolt": 10,
        "slowPoison": 8,
        "rapidPoison": 13,
        "frenzy": 2,
        "beasthood": 5
      }
    },
    {
      "name": "Old Hunter Cap",
      "stats": {
        "physical": 50,
        "blunt": 30,
        "thrust": 40,
        "blood": 50,
        "arcane": 30,
        "fire": 60,
        "bolt": 20,
        "slowPoison": 11,
        "rapidPoison": 5,
        "frenzy": 13,
        "beasthood": 19
      }
    },
    {
      "name": "Old Hunter Top Hat",
      "stats": {
        "physical": 30,
        "blunt": 60,
        "thrust": 40,
        "blood": 30,
        "arcane": 30,
        "fire": 20,
        "bolt": 40,
        "slowPoison": 8,
        "rapidPoison": 5,
        "frenzy": 17,
        "beasthood": 13
      }
    },
    {
      "name": "Rumpled Yharnam Hat",
      "stats": {
        "physical": 20,
        "blunt": 20,
        "thrust": 20,
        "blood": 10,
        "arcane": 20,
        "fire": 60,
        "bolt": 30,
        "slowPoison": 8,
        "rapidPoison": 11,
        "frenzy": 13,
        "beasthood": 8
      }
    },
    {
      "name": "Tomb Prospector Hood",
      "stats": {
        "physical": 40,
        "blunt": 40,
        "thrust": 50,
        "blood": 50,
        "arcane": 60,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 18,
        "rapidPoison": 16,
        "frenzy": 4,
        "beasthood": 15
      }
    },
    {
      "name": "Top Hat",
      "stats": {
        "physical": 30,
        "blunt": 70,
        "thrust": 40,
        "blood": 20,
        "arcane": 20,
        "fire": 30,
        "bolt": 40,
        "slowPoison": 14,
        "rapidPoison": 13,
        "frenzy": 10,
        "beasthood": 8
      }
    },
    {
      "name": "White Church Hat",
      "stats": {
        "physical": 30,
        "blunt": 40,
        "thrust": 40,
        "blood": 60,
        "arcane": 60,
        "fire": 60,
        "bolt": 60,
        "slowPoison": 21,
        "rapidPoison": 18,
        "frenzy": 3,
        "beasthood": 12
      }
    },
    {
      "name": "Yamamura Hunter Hat",
      "stats": {
        "physical": 50,
        "blunt": 30,
        "thrust": 40,
        "blood": 50,
        "arcane": 30,
        "fire": 60,
        "bolt": 20,
        "slowPoison": 5,
        "rapidPoison": 11,
        "frenzy": 19,
        "beasthood": 13
      }
    },
    {
      "name": "Yharnam Hunter Cap",
      "stats": {
        "physical": 50,
        "blunt": 40,
        "thrust": 40,
        "blood": 40,
        "arcane": 50,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 16,
        "rapidPoison": 13,
        "frenzy": 14,
        "beasthood": 16
      }
    }
  ],
  "shirts": [
    {
      "name": "Ashen Hunter Garb",
      "stats": {
        "physical": 100,
        "blunt": 110,
        "thrust": 80,
        "blood": 110,
        "arcane": 70,
        "fire": 50,
        "bolt": 70,
        "slowPoison": 25,
        "rapidPoison": 45,
        "frenzy": 60,
        "beasthood": 70
      }
    },
    {
      "name": "Beast Hide Garb",
      "stats": {
        "physical": 120,
        "blunt": 120,
        "thrust": 70,
        "blood": 80,
        "arcane": 60,
        "fire": 40,
        "bolt": 50,
        "slowPoison": 38,
        "rapidPoison": 31,
        "frenzy": 20,
        "beasthood": 66
      }
    },
    {
      "name": "Black Church Garb",
      "stats": {
        "physical": 90,
        "blunt": 90,
        "thrust": 110,
        "blood": 110,
        "arcane": 110,
        "fire": 100,
        "bolt": 110,
        "slowPoison": 60,
        "rapidPoison": 58,
        "frenzy": 9,
        "beasthood": 40
      }
    },
    {
      "name": "Bone Ash Armor",
      "stats": {
        "physical": 110,
        "blunt": 80,
        "thrust": 100,
        "blood": 40,
        "arcane": 40,
        "fire": 140,
        "bolt": 140,
        "slowPoison": 33,
        "rapidPoison": 29,
        "frenzy": 41,
        "beasthood": 25
      }
    },
    {
      "name": "Butcher Garb",
      "stats": {
        "physical": 100,
        "blunt": 60,
        "thrust": 100,
        "blood": 60,
        "arcane": 90,
        "fire": 70,
        "bolt": 110,
        "slowPoison": 53,
        "rapidPoison": 59,
        "frenzy": 33,
        "beasthood": 29
      }
    },
    {
      "name": "Cainhurst Armor",
      "stats": {
        "physical": 120,
        "blunt": 70,
        "thrust": 110,
        "blood": 120,
        "arcane": 40,
        "fire": 80,
        "bolt": 30,
        "slowPoison": 36,
        "rapidPoison": 40,
        "frenzy": 26,
        "beasthood": 22
      }
    },
    {
      "name": "Charred Hunter Garb",
      "stats": {
        "physical": 110,
        "blunt": 100,
        "thrust": 70,
        "blood": 100,
        "arcane": 40,
        "fire": 140,
        "bolt": 60,
        "slowPoison": 29,
        "rapidPoison": 37,
        "frenzy": 45,
        "beasthood": 58
      }
    },
    {
      "name": "Choir Garb",
      "stats": {
        "physical": 80,
        "blunt": 80,
        "thrust": 80,
        "blood": 80,
        "arcane": 150,
        "fire": 110,
        "bolt": 110,
        "slowPoison": 46,
        "rapidPoison": 38,
        "frenzy": 16,
        "beasthood": 38
      }
    },
    {
      "name": "Constable's Garb",
      "stats": {
        "physical": 90,
        "blunt": 100,
        "thrust": 70,
        "blood": 80,
        "arcane": 100,
        "fire": 110,
        "bolt": 120,
        "slowPoison": 44,
        "rapidPoison": 35,
        "frenzy": 23,
        "beasthood": 52
      }
    },
    {
      "name": "Crowfeather Garb",
      "stats": {
        "physical": 100,
        "blunt": 110,
        "thrust": 80,
        "blood": 120,
        "arcane": 70,
        "fire": 80,
        "bolt": 70,
        "slowPoison": 29,
        "rapidPoison": 37,
        "frenzy": 46,
        "beasthood": 21
      }
    },
    {
      "name": "Decorative Old Hunter Garb",
      "stats": {
        "physical": 100,
        "blunt": 70,
        "thrust": 80,
        "blood": 110,
        "arcane": 60,
        "fire": 120,
        "bolt": 50,
        "slowPoison": 36,
        "rapidPoison": 23,
        "frenzy": 38,
        "beasthood": 48
      }
    },
    {
      "name": "Doll Clothes",
      "stats": {
        "physical": 30,
        "blunt": 30,
        "thrust": 30,
        "blood": 40,
        "arcane": 40,
        "fire": 50,
        "bolt": 40,
        "slowPoison": 42,
        "rapidPoison": 31,
        "frenzy": 38,
        "beasthood": 31
      }
    },
    {
      "name": "Executioner Garb",
      "stats": {
        "physical": 90,
        "blunt": 120,
        "thrust": 110,
        "blood": 100,
        "arcane": 110,
        "fire": 90,
        "bolt": 100,
        "slowPoison": 53,
        "rapidPoison": 45,
        "frenzy": 17,
        "beasthood": 45
      }
    },
    {
      "name": "Foreign Garb",
      "stats": {
        "physical": 60,
        "blunt": 60,
        "thrust": 40,
        "blood": 50,
        "arcane": 40,
        "fire": 60,
        "bolt": 60,
        "slowPoison": 27,
        "rapidPoison": 19,
        "frenzy": 27,
        "beasthood": 16
      }
    },
    {
      "name": "Gascoigne's Garb",
      "stats": {
        "physical": 90,
        "blunt": 110,
        "thrust": 100,
        "blood": 80,
        "arcane": 110,
        "fire": 110,
        "bolt": 100,
        "slowPoison": 52,
        "rapidPoison": 40,
        "frenzy": 23,
        "beasthood": 45
      }
    },
    {
      "name": "Gehrman's Hunter Garb",
      "stats": {
        "physical": 100,
        "blunt": 80,
        "thrust": 80,
        "blood": 100,
        "arcane": 50,
        "fire": 80,
        "bolt": 70,
        "slowPoison": 33,
        "rapidPoison": 37,
        "frenzy": 52,
        "beasthood": 46
      }
    },
    {
      "name": "Graveguard Robe",
      "stats": {
        "physical": 80,
        "blunt": 80,
        "thrust": 90,
        "blood": 80,
        "arcane": 100,
        "fire": 80,
        "bolt": 110,
        "slowPoison": 50,
        "rapidPoison": 49,
        "frenzy": 49,
        "beasthood": 50
      }
    },
    {
      "name": "Harrowed Garb",
      "stats": {
        "physical": 120,
        "blunt": 80,
        "thrust": 90,
        "blood": 90,
        "arcane": 110,
        "fire": 90,
        "bolt": 110,
        "slowPoison": 56,
        "rapidPoison": 58,
        "frenzy": 9,
        "beasthood": 44
      }
    },
    {
      "name": "Henryk's Hunter Garb",
      "stats": {
        "physical": 100,
        "blunt": 100,
        "thrust": 80,
        "blood": 80,
        "arcane": 70,
        "fire": 100,
        "bolt": 150,
        "slowPoison": 21,
        "rapidPoison": 41,
        "frenzy": 45,
        "beasthood": 60
      }
    },
    {
      "name": "Hunter Garb (With Cape)",
      "stats": {
        "physical": 110,
        "blunt": 110,
        "thrust": 80,
        "blood": 110,
        "arcane": 40,
        "fire": 110,
        "bolt": 70,
        "slowPoison": 17,
        "rapidPoison": 33,
        "frenzy": 48,
        "beasthood": 44
      }
    },
    {
      "name": "Hunter Garb (Without Cape)",
      "stats": {
        "physical": 110,
        "blunt": 100,
        "thrust": 80,
        "blood": 110,
        "arcane": 40,
        "fire": 110,
        "bolt": 70,
        "slowPoison": 17,
        "rapidPoison": 33,
        "frenzy": 56,
        "beasthood": 58
      }
    },
    {
      "name": "Khaki Haori",
      "stats": {
        "physical": 80,
        "blunt": 60,
        "thrust": 70,
        "blood": 90,
        "arcane": 80,
        "fire": 130,
        "bolt": 70,
        "slowPoison": 37,
        "rapidPoison": 34,
        "frenzy": 25,
        "beasthood": 18
      }
    },
    {
      "name": "Knight's Garb",
      "stats": {
        "physical": 90,
        "blunt": 70,
        "thrust": 80,
        "blood": 140,
        "arcane": 40,
        "fire": 50,
        "bolt": 80,
        "slowPoison": 26,
        "rapidPoison": 43,
        "frenzy": 40,
        "beasthood": 36
      }
    },
    {
      "name": "Madman Garb",
      "stats": {
        "physical": 80,
        "blunt": 70,
        "thrust": 80,
        "blood": 80,
        "arcane": 120,
        "fire": 110,
        "bolt": 110,
        "slowPoison": 59,
        "rapidPoison": 52,
        "frenzy": 4,
        "beasthood": 29
      }
    },
    {
      "name": "Maria Hunter Garb",
      "stats": {
        "physical": 80,
        "blunt": 70,
        "thrust": 80,
        "blood": 150,
        "arcane": 70,
        "fire": 60,
        "bolt": 80,
        "slowPoison": 20,
        "rapidPoison": 51,
        "frenzy": 30,
        "beasthood": 16
      }
    },
    {
      "name": "Noble Dress",
      "stats": {
        "physical": 50,
        "blunt": 60,
        "thrust": 40,
        "blood": 130,
        "arcane": 60,
        "fire": 40,
        "bolt": 70,
        "slowPoison": 23,
        "rapidPoison": 31,
        "frenzy": 27,
        "beasthood": 38
      }
    },
    {
      "name": "Old Hunter Garb",
      "stats": {
        "physical": 100,
        "blunt": 70,
        "thrust": 80,
        "blood": 100,
        "arcane": 70,
        "fire": 120,
        "bolt": 50,
        "slowPoison": 19,
        "rapidPoison": 19,
        "frenzy": 44,
        "beasthood": 48
      }
    },
    {
      "name": "Student Uniform",
      "stats": {
        "physical": 70,
        "blunt": 70,
        "thrust": 70,
        "blood": 100,
        "arcane": 140,
        "fire": 60,
        "bolt": 70,
        "slowPoison": 42,
        "rapidPoison": 31,
        "frenzy": 35,
        "beasthood": 35
      }
    },
    {
      "name": "Student Uniform Variant",
      "stats": {
        "physical": 70,
        "blunt": 60,
        "thrust": 60,
        "blood": 90,
        "arcane": 140,
        "fire": 60,
        "bolt": 70,
        "slowPoison": 42,
        "rapidPoison": 31,
        "frenzy": 35,
        "beasthood": 45
      }
    },
    {
      "name": "Sweaty Clothes",
      "stats": {
        "physical": 60,
        "blunt": 50,
        "thrust": 50,
        "blood": 40,
        "arcane": 40,
        "fire": 100,
        "bolt": 60,
        "slowPoison": 27,
        "rapidPoison": 35,
        "frenzy": 38,
        "beasthood": 27
      }
    },
    {
      "name": "Tomb Prospector Garb",
      "stats": {
        "physical": 90,
        "blunt": 90,
        "thrust": 100,
        "blood": 90,
        "arcane": 120,
        "fire": 100,
        "bolt": 110,
        "slowPoison": 55,
        "rapidPoison": 57,
        "frenzy": 13,
        "beasthood": 45
      }
    },
    {
      "name": "White Church Garb",
      "stats": {
        "physical": 80,
        "blunt": 80,
        "thrust": 110,
        "blood": 120,
        "arcane": 110,
        "fire": 100,
        "bolt": 110,
        "slowPoison": 63,
        "rapidPoison": 55,
        "frenzy": 11,
        "beasthood": 36
      }
    },
    {
      "name": "Yahar'gul Black Garb",
      "stats": {
        "physical": 110,
        "blunt": 90,
        "thrust": 90,
        "blood": 80,
        "arcane": 60,
        "fire": 40,
        "bolt": 60,
        "slowPoison": 45,
        "rapidPoison": 37,
        "frenzy": 41,
        "beasthood": 37
      }
    },
    {
      "name": "Yharnam Hunter Garb",
      "stats": {
        "physical": 110,
        "blunt": 80,
        "thrust": 90,
        "blood": 90,
        "arcane": 80,
        "fire": 100,
        "bolt": 90,
        "slowPoison": 48,
        "rapidPoison": 40,
        "frenzy": 41,
        "beasthood": 48
      }
    }
  ],
  "gloves": [
    {
      "name": "Ashen Hunter Gloves",
      "stats": {
        "physical": 40,
        "blunt": 60,
        "thrust": 50,
        "blood": 40,
        "arcane": 50,
        "fire": 40,
        "bolt": 50,
        "slowPoison": 13,
        "rapidPoison": 24,
        "frenzy": 28,
        "beasthood": 32
      }
    },
    {
      "name": "Bloodied Arm Bands",
      "stats": {
        "physical": 30,
        "blunt": 40,
        "thrust": 30,
        "blood": 40,
        "arcane": 40,
        "fire": 30,
        "bolt": 40,
        "slowPoison": 10,
        "rapidPoison": 13,
        "frenzy": 14,
        "beasthood": 36
      }
    },
    {
      "name": "Bone Ash Gauntlets",
      "stats": {
        "physical": 60,
        "blunt": 30,
        "thrust": 50,
        "blood": 30,
        "arcane": 40,
        "fire": 70,
        "bolt": 70,
        "slowPoison": 17,
        "rapidPoison": 15,
        "frenzy": 22,
        "beasthood": 13
      }
    },
    {
      "name": "Butcher Gloves",
      "stats": {
        "physical": 60,
        "blunt": 40,
        "thrust": 60,
        "blood": 40,
        "arcane": 50,
        "fire": 40,
        "bolt": 60,
        "slowPoison": 27,
        "rapidPoison": 31,
        "frenzy": 17,
        "beasthood": 15
      }
    },
    {
      "name": "Cainhurst Gauntlets",
      "stats": {
        "physical": 60,
        "blunt": 30,
        "thrust": 50,
        "blood": 70,
        "arcane": 40,
        "fire": 40,
        "bolt": 30,
        "slowPoison": 19,
        "rapidPoison": 21,
        "frenzy": 13,
        "beasthood": 11
      }
    },
    {
      "name": "Charred Hunter Gloves",
      "stats": {
        "physical": 60,
        "blunt": 40,
        "thrust": 40,
        "blood": 50,
        "arcane": 40,
        "fire": 70,
        "bolt": 40,
        "slowPoison": 15,
        "rapidPoison": 20,
        "frenzy": 24,
        "beasthood": 30
      }
    },
    {
      "name": "Choir Gloves",
      "stats": {
        "physical": 40,
        "blunt": 40,
        "thrust": 40,
        "blood": 40,
        "arcane": 70,
        "fire": 60,
        "bolt": 70,
        "slowPoison": 24,
        "rapidPoison": 20,
        "frenzy": 8,
        "beasthood": 20
      }
    },
    {
      "name": "Constable's Gloves",
      "stats": {
        "physical": 60,
        "blunt": 60,
        "thrust": 50,
        "blood": 50,
        "arcane": 50,
        "fire": 60,
        "bolt": 60,
        "slowPoison": 32,
        "rapidPoison": 17,
        "frenzy": 12,
        "beasthood": 31
      }
    },
    {
      "name": "Crowfeather Manchettes",
      "stats": {
        "physical": 40,
        "blunt": 60,
        "thrust": 50,
        "blood": 70,
        "arcane": 50,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 15,
        "rapidPoison": 20,
        "frenzy": 25,
        "beasthood": 11
      }
    },
    {
      "name": "Doll Gloves",
      "stats": {
        "physical": 30,
        "blunt": 30,
        "thrust": 30,
        "blood": 40,
        "arcane": 40,
        "fire": 50,
        "bolt": 40,
        "slowPoison": 22,
        "rapidPoison": 16,
        "frenzy": 20,
        "beasthood": 16
      }
    },
    {
      "name": "Executioner Gauntlets",
      "stats": {
        "physical": 40,
        "blunt": 60,
        "thrust": 40,
        "blood": 50,
        "arcane": 60,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 26,
        "rapidPoison": 24,
        "frenzy": 9,
        "beasthood": 24
      }
    },
    {
      "name": "Gascoigne's Gloves",
      "stats": {
        "physical": 40,
        "blunt": 60,
        "thrust": 60,
        "blood": 50,
        "arcane": 60,
        "fire": 60,
        "bolt": 40,
        "slowPoison": 28,
        "rapidPoison": 21,
        "frenzy": 12,
        "beasthood": 24
      }
    },
    {
      "name": "Graveguard Manchettes",
      "stats": {
        "physical": 40,
        "blunt": 50,
        "thrust": 50,
        "blood": 50,
        "arcane": 60,
        "fire": 50,
        "bolt": 60,
        "slowPoison": 27,
        "rapidPoison": 26,
        "frenzy": 26,
        "beasthood": 22
      }
    },
    {
      "name": "Harrowed Gloves",
      "stats": {
        "physical": 60,
        "blunt": 40,
        "thrust": 40,
        "blood": 60,
        "arcane": 50,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 35,
        "rapidPoison": 31,
        "frenzy": 4,
        "beasthood": 25
      }
    },
    {
      "name": "Henryk's Hunter Gloves",
      "stats": {
        "physical": 50,
        "blunt": 40,
        "thrust": 50,
        "blood": 40,
        "arcane": 50,
        "fire": 60,
        "bolt": 70,
        "slowPoison": 11,
        "rapidPoison": 22,
        "frenzy": 23,
        "beasthood": 32
      }
    },
    {
      "name": "Hunter Gloves",
      "stats": {
        "physical": 50,
        "blunt": 50,
        "thrust": 50,
        "blood": 50,
        "arcane": 40,
        "fire": 60,
        "bolt": 50,
        "slowPoison": 9,
        "rapidPoison": 17,
        "frenzy": 27,
        "beasthood": 25
      }
    },
    {
      "name": "Knight's Gloves",
      "stats": {
        "physical": 40,
        "blunt": 50,
        "thrust": 50,
        "blood": 70,
        "arcane": 40,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 13,
        "rapidPoison": 22,
        "frenzy": 21,
        "beasthood": 19
      }
    },
    {
      "name": "Madman Manchettes",
      "stats": {
        "physical": 40,
        "blunt": 40,
        "thrust": 50,
        "blood": 40,
        "arcane": 60,
        "fire": 60,
        "bolt": 60,
        "slowPoison": 29,
        "rapidPoison": 27,
        "frenzy": 1,
        "beasthood": 15
      }
    },
    {
      "name": "Maria Hunter Gloves",
      "stats": {
        "physical": 50,
        "blunt": 50,
        "thrust": 50,
        "blood": 70,
        "arcane": 50,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 10,
        "rapidPoison": 27,
        "frenzy": 15,
        "beasthood": 8
      }
    },
    {
      "name": "Old Hunter Arm Bands",
      "stats": {
        "physical": 40,
        "blunt": 40,
        "thrust": 40,
        "blood": 50,
        "arcane": 60,
        "fire": 90,
        "bolt": 50,
        "slowPoison": 19,
        "rapidPoison": 17,
        "frenzy": 12,
        "beasthood": 11
      }
    },
    {
      "name": "Old Hunter Gloves",
      "stats": {
        "physical": 60,
        "blunt": 50,
        "thrust": 50,
        "blood": 60,
        "arcane": 50,
        "fire": 70,
        "bolt": 40,
        "slowPoison": 10,
        "rapidPoison": 10,
        "frenzy": 23,
        "beasthood": 29
      }
    },
    {
      "name": "Sullied Bandage",
      "stats": {
        "physical": 30,
        "blunt": 40,
        "thrust": 30,
        "blood": 30,
        "arcane": 40,
        "fire": 40,
        "bolt": 40,
        "slowPoison": 14,
        "rapidPoison": 10,
        "frenzy": 14,
        "beasthood": 8
      }
    },
    {
      "name": "Surgical Long Gloves",
      "stats": {
        "physical": 40,
        "blunt": 40,
        "thrust": 50,
        "blood": 70,
        "arcane": 50,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 32,
        "rapidPoison": 31,
        "frenzy": 4,
        "beasthood": 22
      }
    },
    {
      "name": "Tomb Prospector Gloves",
      "stats": {
        "physical": 40,
        "blunt": 40,
        "thrust": 60,
        "blood": 50,
        "arcane": 60,
        "fire": 60,
        "bolt": 60,
        "slowPoison": 29,
        "rapidPoison": 27,
        "frenzy": 6,
        "beasthood": 24
      }
    },
    {
      "name": "Yahar'gul Black Gloves",
      "stats": {
        "physical": 50,
        "blunt": 60,
        "thrust": 60,
        "blood": 50,
        "arcane": 40,
        "fire": 40,
        "bolt": 40,
        "slowPoison": 24,
        "rapidPoison": 20,
        "frenzy": 22,
        "beasthood": 20
      }
    },
    {
      "name": "Yharnam Hunter Gloves",
      "stats": {
        "physical": 40,
        "blunt": 50,
        "thrust": 60,
        "blood": 40,
        "arcane": 50,
        "fire": 60,
        "bolt": 50,
        "slowPoison": 25,
        "rapidPoison": 22,
        "frenzy": 22,
        "beasthood": 25
      }
    }
  ],
  "pants": [
    {
      "name": "Arianna's Shoes",
      "stats": {
        "physical": 40,
        "blunt": 50,
        "thrust": 40,
        "blood": 50,
        "arcane": 40,
        "fire": 40,
        "bolt": 50,
        "slowPoison": 14,
        "rapidPoison": 18,
        "frenzy": 16,
        "beasthood": 2
      }
    },
    {
      "name": "Ashen Hunter Trousers",
      "stats": {
        "physical": 60,
        "blunt": 50,
        "thrust": 50,
        "blood": 60,
        "arcane": 50,
        "fire": 50,
        "bolt": 60,
        "slowPoison": 15,
        "rapidPoison": 26,
        "frenzy": 30,
        "beasthood": 37
      }
    },
    {
      "name": "Black Church Trousers/Dress",
      "stats": {
        "physical": 50,
        "blunt": 50,
        "thrust": 60,
        "blood": 70,
        "arcane": 60,
        "fire": 60,
        "bolt": 60,
        "slowPoison": 34,
        "rapidPoison": 33,
        "frenzy": 5,
        "beasthood": 23
      }
    },
    {
      "name": "Bloodied Trousers",
      "stats": {
        "physical": 40,
        "blunt": 50,
        "thrust": 40,
        "blood": 50,
        "arcane": 50,
        "fire": 40,
        "bolt": 50,
        "slowPoison": 11,
        "rapidPoison": 16,
        "frenzy": 16,
        "beasthood": 46
      }
    },
    {
      "name": "Bone Ash Leggings",
      "stats": {
        "physical": 60,
        "blunt": 40,
        "thrust": 50,
        "blood": 50,
        "arcane": 40,
        "fire": 80,
        "bolt": 70,
        "slowPoison": 19,
        "rapidPoison": 17,
        "frenzy": 24,
        "beasthood": 15
      }
    },
    {
      "name": "Butcher Trousers",
      "stats": {
        "physical": 60,
        "blunt": 40,
        "thrust": 60,
        "blood": 50,
        "arcane": 50,
        "fire": 50,
        "bolt": 60,
        "slowPoison": 32,
        "rapidPoison": 34,
        "frenzy": 19,
        "beasthood": 17
      }
    },
    {
      "name": "Cainhurst Leggings",
      "stats": {
        "physical": 60,
        "blunt": 40,
        "thrust": 60,
        "blood": 70,
        "arcane": 40,
        "fire": 40,
        "bolt": 40,
        "slowPoison": 21,
        "rapidPoison": 23,
        "frenzy": 15,
        "beasthood": 13
      }
    },
    {
      "name": "Charred Hunter Boots",
      "stats": {
        "physical": 60,
        "blunt": 60,
        "thrust": 50,
        "blood": 60,
        "arcane": 40,
        "fire": 80,
        "bolt": 40,
        "slowPoison": 17,
        "rapidPoison": 21,
        "frenzy": 27,
        "beasthood": 33
      }
    },
    {
      "name": "Choir Trousers",
      "stats": {
        "physical": 50,
        "blunt": 50,
        "thrust": 50,
        "blood": 60,
        "arcane": 80,
        "fire": 60,
        "bolt": 60,
        "slowPoison": 26,
        "rapidPoison": 22,
        "frenzy": 9,
        "beasthood": 22
      }
    },
    {
      "name": "Constable's Trousers",
      "stats": {
        "physical": 60,
        "blunt": 60,
        "thrust": 50,
        "blood": 50,
        "arcane": 50,
        "fire": 60,
        "bolt": 70,
        "slowPoison": 25,
        "rapidPoison": 18,
        "frenzy": 14,
        "beasthood": 35
      }
    },
    {
      "name": "Crowfeather Trousers",
      "stats": {
        "physical": 50,
        "blunt": 70,
        "thrust": 50,
        "blood": 70,
        "arcane": 40,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 17,
        "rapidPoison": 21,
        "frenzy": 27,
        "beasthood": 12
      }
    },
    {
      "name": "Decorative Old Hunter Trousers",
      "stats": {
        "physical": 70,
        "blunt": 50,
        "thrust": 50,
        "blood": 70,
        "arcane": 40,
        "fire": 70,
        "bolt": 40,
        "slowPoison": 19,
        "rapidPoison": 13,
        "frenzy": 20,
        "beasthood": 29
      }
    },
    {
      "name": "Doll Skirt",
      "stats": {
        "physical": 40,
        "blunt": 40,
        "thrust": 40,
        "blood": 50,
        "arcane": 50,
        "fire": 60,
        "bolt": 50,
        "slowPoison": 24,
        "rapidPoison": 18,
        "frenzy": 22,
        "beasthood": 18
      }
    },
    {
      "name": "Executioner Trousers",
      "stats": {
        "physical": 50,
        "blunt": 70,
        "thrust": 50,
        "blood": 60,
        "arcane": 60,
        "fire": 60,
        "bolt": 50,
        "slowPoison": 30,
        "rapidPoison": 26,
        "frenzy": 10,
        "beasthood": 26
      }
    },
    {
      "name": "Foreign Trousers",
      "stats": {
        "physical": 40,
        "blunt": 50,
        "thrust": 40,
        "blood": 40,
        "arcane": 50,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 16,
        "rapidPoison": 11,
        "frenzy": 16,
        "beasthood": 9
      }
    },
    {
      "name": "Gascoigne's Trousers",
      "stats": {
        "physical": 50,
        "blunt": 60,
        "thrust": 60,
        "blood": 50,
        "arcane": 60,
        "fire": 60,
        "bolt": 50,
        "slowPoison": 31,
        "rapidPoison": 23,
        "frenzy": 14,
        "beasthood": 26
      }
    },
    {
      "name": "Gehrman's Hunter Trousers",
      "stats": {
        "physical": 50,
        "blunt": 50,
        "thrust": 50,
        "blood": 60,
        "arcane": 50,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 19,
        "rapidPoison": 21,
        "frenzy": 29,
        "beasthood": 27
      }
    },
    {
      "name": "Graveguard Kilt",
      "stats": {
        "physical": 50,
        "blunt": 50,
        "thrust": 60,
        "blood": 50,
        "arcane": 60,
        "fire": 60,
        "bolt": 60,
        "slowPoison": 29,
        "rapidPoison": 28,
        "frenzy": 28,
        "beasthood": 23
      }
    },
    {
      "name": "Harrowed Trousers",
      "stats": {
        "physical": 70,
        "blunt": 50,
        "thrust": 50,
        "blood": 60,
        "arcane": 60,
        "fire": 60,
        "bolt": 60,
        "slowPoison": 38,
        "rapidPoison": 33,
        "frenzy": 5,
        "beasthood": 27
      }
    },
    {
      "name": "Henryk's Hunter Trousers",
      "stats": {
        "physical": 50,
        "blunt": 60,
        "thrust": 60,
        "blood": 50,
        "arcane": 50,
        "fire": 60,
        "bolt": 80,
        "slowPoison": 12,
        "rapidPoison": 24,
        "frenzy": 25,
        "beasthood": 34
      }
    },
    {
      "name": "Hunter Trousers",
      "stats": {
        "physical": 60,
        "blunt": 60,
        "thrust": 50,
        "blood": 60,
        "arcane": 50,
        "fire": 60,
        "bolt": 50,
        "slowPoison": 10,
        "rapidPoison": 19,
        "frenzy": 30,
        "beasthood": 27
      }
    },
    {
      "name": "Knight's Trousers-Dress",
      "stats": {
        "physical": 50,
        "blunt": 50,
        "thrust": 60,
        "blood": 70,
        "arcane": 50,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 15,
        "rapidPoison": 24,
        "frenzy": 23,
        "beasthood": 21
      }
    },
    {
      "name": "Madman Leggings",
      "stats": {
        "physical": 50,
        "blunt": 50,
        "thrust": 60,
        "blood": 50,
        "arcane": 70,
        "fire": 40,
        "bolt": 60,
        "slowPoison": 33,
        "rapidPoison": 29,
        "frenzy": 2,
        "beasthood": 17
      }
    },
    {
      "name": "Maria Hunter Trousers",
      "stats": {
        "physical": 50,
        "blunt": 50,
        "thrust": 60,
        "blood": 80,
        "arcane": 50,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 11,
        "rapidPoison": 30,
        "frenzy": 17,
        "beasthood": 9
      }
    },
    {
      "name": "Old Hunter Trousers",
      "stats": {
        "physical": 60,
        "blunt": 50,
        "thrust": 60,
        "blood": 60,
        "arcane": 50,
        "fire": 70,
        "bolt": 40,
        "slowPoison": 11,
        "rapidPoison": 11,
        "frenzy": 25,
        "beasthood": 33
      }
    },
    {
      "name": "Student Trousers",
      "stats": {
        "physical": 50,
        "blunt": 50,
        "thrust": 50,
        "blood": 60,
        "arcane": 70,
        "fire": 50,
        "bolt": 50,
        "slowPoison": 24,
        "rapidPoison": 18,
        "frenzy": 19,
        "beasthood": 19
      }
    },
    {
      "name": "Tomb Prospector Trousers",
      "stats": {
        "physical": 50,
        "blunt": 60,
        "thrust": 60,
        "blood": 60,
        "arcane": 70,
        "fire": 60,
        "bolt": 50,
        "slowPoison": 31,
        "rapidPoison": 29,
        "frenzy": 8,
        "beasthood": 26
      }
    },
    {
      "name": "White Church Trousers/Dress",
      "stats": {
        "physical": 50,
        "blunt": 40,
        "thrust": 50,
        "blood": 80,
        "arcane": 70,
        "fire": 60,
        "bolt": 60,
        "slowPoison": 36,
        "rapidPoison": 31,
        "frenzy": 7,
        "beasthood": 21
      }
    },
    {
      "name": "Wine Hakama",
      "stats": {
        "physical": 40,
        "blunt": 40,
        "thrust": 50,
        "blood": 50,
        "arcane": 60,
        "fire": 90,
        "bolt": 50,
        "slowPoison": 21,
        "rapidPoison": 19,
        "frenzy": 19,
        "beasthood": 15
      }
    },
    {
      "name": "Yahar'gul Black Trousers",
      "stats": {
        "physical": 60,
        "blunt": 60,
        "thrust": 60,
        "blood": 60,
        "arcane": 40,
        "fire": 40,
        "bolt": 40,
        "slowPoison": 26,
        "rapidPoison": 21,
        "frenzy": 24,
        "beasthood": 21
      }
    },
    {
      "name": "Yharnam Hunter Trousers",
      "stats": {
        "physical": 50,
        "blunt": 60,
        "thrust": 60,
        "blood": 50,
        "arcane": 50,
        "fire": 60,
        "bolt": 60,
        "slowPoison": 27,
        "rapidPoison": 23,
        "frenzy": 24,
        "beasthood": 27
      }
    }
  ]
};
