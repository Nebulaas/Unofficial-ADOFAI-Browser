/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const DifficultyContext = createContext()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const DifficultyContextProvider = (props) => {

  interface systems {
    ADOFAIB: ADOFAIB
    INDEX: INDEX
    TUF: TUF
    T21C: T21C
    GG: GG
    TUFBE: TUFBE
  }

  // type diffTypeEasy           = 0  | 1  | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9  | 10
  // type diffTypeMed            = 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
  // type diffTypeHard           = 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30
  // type diffTypeDifficult      = 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40
  // type diffTypeChallenging    = 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50
  // type diffTypeInhuman        = 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60

  type diffTypeEasy        = "L0"  | "L1"  | "L2"  | "L3"  | "L4"  | "L5"  | "L6"  | "L7"  | "L8"  | "L9"  | "L10"
  type diffTypeMed         = "L11" | "L12" | "L13" | "L14" | "L15" | "L16" | "L17" | "L18" | "L19" | "L20"
  type diffTypeHard        = "L21" | "L22" | "L23" | "L24" | "L25" | "L26" | "L27" | "L28" | "L29" | "L30"
  type diffTypeDifficult   = "L31" | "L32" | "L33" | "L34" | "L35" | "L36" | "L37" | "L38" | "L39" | "L40"
  type diffTypeChallenging = "L41" | "L42" | "L43" | "L44" | "L45" | "L46" | "L47" | "L48" | "L49" | "L50"
  type diffTypeInhuman     = "L51" | "L52" | "L53" | "L54" | "L55" | "L56" | "L57" | "L58" | "L59" | "L60"
  type diffMisc            = "unranked" | "censored" | "impossible"

  type ADOFAIB =
    diffTypeEasy | diffTypeMed |
    diffTypeHard | diffTypeDifficult |
    diffTypeChallenging | diffTypeInhuman |
    diffMisc

  // type ADOFAIB =
  //   "L0"  | "L1"  | "L2"  | "L3"  | "L4"  | "L5"  | "L6"  | "L7"  | "L8"  | "L9"  | "L10" |
  //   "L11" | "L12" | "L13" | "L14" | "L15" | "L16" | "L17" | "L18" | "L19" | "L20" |
  //   "L21" | "L22" | "L23" | "L24" | "L25" | "L26" | "L27" | "L28" | "L29" | "L30" |
  //   "L31" | "L32" | "L33" | "L34" | "L35" | "L36" | "L37" | "L38" | "L39" | "L40" |
  //   "L41" | "L42" | "L43" | "L44" | "L45" | "L46" | "L47" | "L48" | "L49" | "L50" |
  //   "L51" | "L52" | "L53" | "L54" | "L55" | "L56" | "L57" | "L58" | "L59" | "L60" |
  //   "unranked" | "censored" | "impossible" |
  //   ''


  type INDEX =
    0  | 1  | 2  | 3  | 4  | 5  | 6  | 7  | 8  | 9  | 10 |
    11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
    21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 |
    31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 |
    41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 |
    51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 |
    'unranked' | 'censored' | 'impossible' |
    ''

  type T21C =
    '1' | '2' | '3' | '4' | '5' |
    '6' | '7' | '8' | '9' | '10' |
    '11' | '12' | '13' | '14' | '15' |
    '16' | '17' | '18' | '18+' | '19' | '19+' | '20.0' | '20.0+' |
    '20.1' | '20.1+' | '20.2' | '20.2+' | '20.3' | '20.3+' |
    '20.4' | '20.4+' | '20.5' | '20.5+' | '20.6' | '20.6+' |
    '20.7' | '20.7+' | '20.8' | '20.8+' | '20.9' | '20.9+' |
    '21.0' | '21.0+' | '21.1' | '21.1+' | '21.2' | '21.2+' | '21.3' | '21.3+' |
    // '?' | '-1' | '-2'
    '0' | '-2' | '-21' |
    ''


  type TUF =
    'P1'  | 'P2'  | 'P3'  | 'P4'  | 'P5'  | 'P6'  | 'P7'  | 'P8'  | 'P9'  | 'P10' |
    'P11' | 'P12' | 'P13' | 'P14' | 'P15' | 'P16' | 'P17' | 'P18' | 'P19' | 'P20' |
    'G1'  | 'G2'  | 'G3'  | 'G4'  | 'G5'  | 'G6'  | 'G7'  | 'G8'  | 'G9'  | 'G10' |
    'G11' | 'G12' | 'G13' | 'G14' | 'G15' | 'G16' | 'G17' | 'G18' | 'G19' | 'G20' |
    'U1'  | 'U2'  | 'U3'  | 'U4'  | 'U5'  | 'U6'  | 'U7'  | 'U8'  | 'U9'  | 'U10' |
    'U11' | 'U12' | 'U13' | 'U14' | 'U15' | 'U16' | 'U17' | 'U18' | 'U19' | 'U20' |
    // 'X1'  | 'X2'  | 'X3' |
    '0'  | '-2'  | '-21' |
    ''


  type TUFBE =
    '1' | '2' | '3' | '4' | '5' |
    '6' | '7' | '8' | '9' | '10' |
    '11' | '12' | '13' | '14' | '15' |
    '16' | '17' | '18' | '18.5' | '19' | '19.5' | '20.0' | '20.05' |

    '20.1' | '20.15' | '20.2' | '20.25' | '20.3' | '20.35' |
    '20.4' | '20.45' | '20.5' | '20.55' | '20.6' | '20.65' |
    '20.7' | '20.75' | '20.8' | '20.85' | '20.9' | '20.95' |

    '21.0' | '21.04' | '21.05' | '21.09' |
    '21.1' | '21.14' | '21.15' | '21.19' |
    '21.2' | '21.24' | '21.25' | '21.29' |
    '21.3' | '21.34' | '21.35' | '21.39' |

    '0'    | '-2'   | '-21' |
    ''


  type GG =
    // '1'  | '2'  | '3'  | '4'  | '5'  | '6'  | '7'  | '8'  | '9'  | '10' |
    // '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' |
    // '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' |
    // '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' |
    // '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '50' |
    // '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59' | '60' |
    // ''
    '1'  | '2'  | '3'  | '4'  | '5'  | '6'  | '7'  | '8'  | '9'  | '10' |
    '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '18+' | '19' | '19+' | '20.0' |
    '20.1' | '20.2' | '20.3' | '20.4' | '20.5' | '20.6' | '20.7' | '20.8' | '20.9' |
    '21' | '22' |
    '' | '-1'


  const difficulties: Record<ADOFAIB, systems> = {
    L0:  { ADOFAIB: 'L0',  INDEX: 0,   TUF: 'P1',  T21C: '1',     GG: '1',    TUFBE: '1' },
    L1:  { ADOFAIB: 'L1',  INDEX: 1,   TUF: 'P1',  T21C: '2',     GG: '2',    TUFBE: '2' },
    L2:  { ADOFAIB: 'L2',  INDEX: 2,   TUF: 'P2',  T21C: '3',     GG: '3',    TUFBE: '3' },
    L3:  { ADOFAIB: 'L3',  INDEX: 3,   TUF: 'P3',  T21C: '4',     GG: '4',    TUFBE: '4' },
    L4:  { ADOFAIB: 'L4',  INDEX: 4,   TUF: 'P4',  T21C: '5',     GG: '5',    TUFBE: '5' },
    L5:  { ADOFAIB: 'L5',  INDEX: 5,   TUF: 'P5',  T21C: '6',     GG: '6',    TUFBE: '6' },
    L6:  { ADOFAIB: 'L6',  INDEX: 6,   TUF: 'P6',  T21C: '7',     GG: '7',    TUFBE: '7' },
    L7:  { ADOFAIB: 'L7',  INDEX: 7,   TUF: 'P7',  T21C: '8',     GG: '8',    TUFBE: '8' },
    L8:  { ADOFAIB: 'L8',  INDEX: 8,   TUF: 'P8',  T21C: '9',     GG: '9',    TUFBE: '9' },
    L9:  { ADOFAIB: 'L9',  INDEX: 9,   TUF: 'P9',  T21C: '10',    GG: '10',   TUFBE: '10' },
    L10: { ADOFAIB: 'L10', INDEX: 10,  TUF: 'P10', T21C: '11',    GG: '11',   TUFBE: '11' },
    L11: { ADOFAIB: 'L11', INDEX: 11,  TUF: 'P11', T21C: '12',    GG: '12',   TUFBE: '12' },
    L12: { ADOFAIB: 'L12', INDEX: 12,  TUF: 'P12', T21C: '13',    GG: '13',   TUFBE: '13' },
    L13: { ADOFAIB: 'L13', INDEX: 13,  TUF: 'P13', T21C: '14',    GG: '14',   TUFBE: '14' },
    L14: { ADOFAIB: 'L14', INDEX: 14,  TUF: 'P14', T21C: '15',    GG: '15',   TUFBE: '15' },
    L15: { ADOFAIB: 'L15', INDEX: 15,  TUF: 'P15', T21C: '16',    GG: '16',   TUFBE: '16' },
    L16: { ADOFAIB: 'L16', INDEX: 16,  TUF: 'P16', T21C: '17',    GG: '17',   TUFBE: '17' },
    L17: { ADOFAIB: 'L17', INDEX: 17,  TUF: 'P17', T21C: '18',    GG: '18',   TUFBE: '18' },
    L18: { ADOFAIB: 'L18', INDEX: 18,  TUF: 'P18', T21C: '18+',   GG: '18+',  TUFBE: '18.5' },
    L19: { ADOFAIB: 'L19', INDEX: 19,  TUF: 'P19', T21C: '19',    GG: '19',   TUFBE: '19' },
    L20: { ADOFAIB: 'L20', INDEX: 20,  TUF: 'P20', T21C: '19+',   GG: '19+',  TUFBE: '19.5' },
    L21: { ADOFAIB: 'L21', INDEX: 21,  TUF: 'G1',  T21C: '20.0',  GG: '20.0', TUFBE: '20.0' },
    L22: { ADOFAIB: 'L22', INDEX: 22,  TUF: 'G2',  T21C: '20.0+', GG: '20.0', TUFBE: '20.5' },
    L23: { ADOFAIB: 'L23', INDEX: 23,  TUF: 'G3',  T21C: '20.1',  GG: '20.1', TUFBE: '20.1' },
    L24: { ADOFAIB: 'L24', INDEX: 24,  TUF: 'G4',  T21C: '20.1+', GG: '20.1', TUFBE: '20.15' },
    L25: { ADOFAIB: 'L25', INDEX: 25,  TUF: 'G5',  T21C: '20.2',  GG: '20.2', TUFBE: '20.2' },
    L26: { ADOFAIB: 'L26', INDEX: 26,  TUF: 'G6',  T21C: '20.2+', GG: '20.2', TUFBE: '20.25' },
    L27: { ADOFAIB: 'L27', INDEX: 27,  TUF: 'G7',  T21C: '20.3',  GG: '20.3', TUFBE: '20.3' },
    L28: { ADOFAIB: 'L28', INDEX: 28,  TUF: 'G8',  T21C: '20.3+', GG: '20.3', TUFBE: '20.35' },
    L29: { ADOFAIB: 'L29', INDEX: 29,  TUF: 'G9',  T21C: '20.4',  GG: '20.4', TUFBE: '20.4' },
    L30: { ADOFAIB: 'L30', INDEX: 30,  TUF: 'G10', T21C: '20.4+', GG: '20.4', TUFBE: '20.45' },
    L31: { ADOFAIB: 'L31', INDEX: 31,  TUF: 'G11', T21C: '20.5',  GG: '20.5', TUFBE: '20.5' },
    L32: { ADOFAIB: 'L32', INDEX: 32,  TUF: 'G12', T21C: '20.5+', GG: '20.5', TUFBE: '20.55' },
    L33: { ADOFAIB: 'L33', INDEX: 33,  TUF: 'G13', T21C: '20.6',  GG: '20.6', TUFBE: '20.6' },
    L34: { ADOFAIB: 'L34', INDEX: 34,  TUF: 'G14', T21C: '20.6+', GG: '20.6', TUFBE: '20.65' },
    L35: { ADOFAIB: 'L35', INDEX: 35,  TUF: 'G15', T21C: '20.7',  GG: '20.7', TUFBE: '20.7' },
    L36: { ADOFAIB: 'L36', INDEX: 36,  TUF: 'G16', T21C: '20.7+', GG: '20.7', TUFBE: '20.75' },
    L37: { ADOFAIB: 'L37', INDEX: 37,  TUF: 'G17', T21C: '20.8',  GG: '20.8', TUFBE: '20.8' },
    L38: { ADOFAIB: 'L38', INDEX: 38,  TUF: 'G18', T21C: '20.8+', GG: '20.8', TUFBE: '20.85' },
    L39: { ADOFAIB: 'L39', INDEX: 39,  TUF: 'G19', T21C: '20.9',  GG: '20.9', TUFBE: '20.9' },
    L40: { ADOFAIB: 'L40', INDEX: 40,  TUF: 'G20', T21C: '20.9+', GG: '20.9', TUFBE: '20.95' },
    L41: { ADOFAIB: 'L41', INDEX: 41,  TUF: 'U1',  T21C: '21.0',  GG: '21',   TUFBE: '21.0' },
    L42: { ADOFAIB: 'L42', INDEX: 42,  TUF: 'U2',  T21C: '21.0',  GG: '21',   TUFBE: '21.04' },
    L43: { ADOFAIB: 'L43', INDEX: 43,  TUF: 'U3',  T21C: '21.0+', GG: '21',   TUFBE: '21.05' },
    L44: { ADOFAIB: 'L44', INDEX: 44,  TUF: 'U4',  T21C: '21.0+', GG: '21',   TUFBE: '21.09' },
    L45: { ADOFAIB: 'L45', INDEX: 45,  TUF: 'U5',  T21C: '21.1',  GG: '22',   TUFBE: '21.1' },
    L46: { ADOFAIB: 'L46', INDEX: 46,  TUF: 'U6',  T21C: '21.1',  GG: '22',   TUFBE: '21.14' },
    L47: { ADOFAIB: 'L47', INDEX: 47,  TUF: 'U7',  T21C: '21.1+', GG: '22',   TUFBE: '21.15' },
    L48: { ADOFAIB: 'L48', INDEX: 48,  TUF: 'U8',  T21C: '21.1+', GG: '22',   TUFBE: '21.19' },
    L49: { ADOFAIB: 'L49', INDEX: 49,  TUF: 'U9',  T21C: '21.2',  GG: '',     TUFBE: '21.2' },
    L50: { ADOFAIB: 'L50', INDEX: 50,  TUF: 'U10', T21C: '21.2',  GG: '',     TUFBE: '21.24' },
    L51: { ADOFAIB: 'L51', INDEX: 51,  TUF: 'U11', T21C: '21.2+', GG: '',     TUFBE: '21.25' },
    L52: { ADOFAIB: 'L52', INDEX: 52,  TUF: 'U12', T21C: '21.2+', GG: '',     TUFBE: '21.29' },
    L53: { ADOFAIB: 'L53', INDEX: 53,  TUF: 'U13', T21C: '21.3',  GG: '',     TUFBE: '21.3' },
    L54: { ADOFAIB: 'L54', INDEX: 54,  TUF: 'U14', T21C: '21.3+', GG: '',     TUFBE: '21.34' },
    L55: { ADOFAIB: 'L55', INDEX: 55,  TUF: 'U15', T21C: '',      GG: '',     TUFBE: '' },
    L56: { ADOFAIB: 'L56', INDEX: 56,  TUF: 'U16', T21C: '',      GG: '',     TUFBE: '' },
    L57: { ADOFAIB: 'L57', INDEX: 57,  TUF: 'U17', T21C: '',      GG: '',     TUFBE: '' },
    L58: { ADOFAIB: 'L58', INDEX: 58,  TUF: 'U18', T21C: '',      GG: '',     TUFBE: '' },
    L59: { ADOFAIB: 'L59', INDEX: 59,  TUF: 'U19', T21C: '',      GG: '',     TUFBE: '' },
    L60: { ADOFAIB: 'L60', INDEX: 60,  TUF: 'U20', T21C: '',      GG: '',     TUFBE: '' },

    // non-standard difficulties for additional filtering purposes
    unranked:   { ADOFAIB: 'unranked',   INDEX: '',  TUF: '0',    T21C: '0',    GG: '',   TUFBE: '0' },
    censored:   { ADOFAIB: 'censored',   INDEX: '',  TUF: '-2',   T21C: '-2',   GG: '',   TUFBE: '-2' },
    impossible: { ADOFAIB: 'impossible', INDEX: '',  TUF: '-21',  T21C: '-21',  GG: '-1', TUFBE: '-21' },
  }


  type Difficulty = ADOFAIB | INDEX | TUF | T21C | GG | TUFBE

  type SystemKey = keyof systems


  function filterDifficulty(system: SystemKey, difficulty: Difficulty): ADOFAIB[] {
    // return an array of difficulties matching the string for the selected system.
    // takes a ADOFAIB, TUF, T21C or GG system difficulty and returns an array of
    // > relevant ADOFAIB difficulties.
    // maybe ensure unranked, censored, impossible are at the bottom of the list...
    return (
      Object.keys(difficulties) as Array<ADOFAIB>).filter(
        (key) => difficulties[key][system] === difficulty
    )
  }

  function fromDifficulty(system: SystemKey, difficulty: ADOFAIB): Difficulty {
    // takes an ADOFAIB difficulty and converts it into the matching ADOFAIB, TUF, T21C or GG difficulty.
    return difficulties[difficulty][system]
  }

  function fromDifficultyOrUndefined(system: SystemKey, difficulty: ADOFAIB): Difficulty | undefined {
    // takes an ADOFAIB difficulty and converts it into the matching ADOFAIB, TUF, T21C or GG difficulty.
    // if the converted value is an empty string or 'xxx' then return undefined
    // where 'xxx' would be an empty string (as I have done) or any value you want.
    // one approach would be to replace the empty string with something like 'unsupported'
    // or to map unranked, censored and impossible directly through to TUF and GG
    let value = difficulties[difficulty][system]
    return value.length == 0 ? undefined : value
  }

  function difficultiesFor(system: SystemKey): Difficulty[] {
    // return all the supported difficulties for a given system
    // by returning all valid values from the record for the system
    //
    // 1. get a list of all of the keys in the record
    // 2. remove any keys that with empty values for the selected system
    // 3. now get the system's values for all those keys
    // 4. finally remove any duplicates values
    return (Object.keys(difficulties) as Array<ADOFAIB>)
      .filter(key => difficulties[key][system].length > 0)
      .map(key => difficulties[key][system])
      .filter((value, index, values) => index === values.indexOf(value))
  }


  // ---------------------------------------------------------------------------
  // Testing Examples:
  let selected_system = '' as SystemKey
  let selected_difficulty = '' as Difficulty
  let difficulty = '' as ADOFAIB
  let converted = '' as Difficulty | undefined

  /*console.log('---------------------------------------------------------------')
  console.log('Get all ADOFAIB difficulties for the selected system difficulty')*/

  // Return ADOFAIB values for TUF.U19
  // Output: L59
  /*selected_system = 'TUF'
  selected_difficulty = 'U19'
  for (difficulty of filterDifficulty(selected_system, selected_difficulty)) {
    console.log(`${selected_system}.${selected_difficulty} => ${difficulty}`)
  }*/

  // Return ADOFAIB difficulties for T21C.21.1+
  // Output: L47 L48
  /*selected_system = 'T21C'
  selected_difficulty = '21.1+'
  for (difficulty of filterDifficulty(selected_system, selected_difficulty)) {
    console.log(`${selected_system}.${selected_difficulty} => ${difficulty}`)
  }

  console.log('---------------------------------------------------------------')
  console.log('Convert the selected system difficulty into the ADOFAIB difficulty')*/

  // Convert L13 difficulty into TUF
  // Output: TUF.P13
  /*selected_system = 'T21C'
  difficulty = 'L13'
  converted = fromDifficulty(selected_system, difficulty)
  console.log(`${difficulty} => ${selected_system}.${converted}`)*/

  // Convert L59 difficulty to GG
  // Output: GG.59
  /*selected_system = 'GG'
  difficulty = 'L59'
  converted = fromDifficulty(selected_system, difficulty)
  console.log(`${difficulty} => ${selected_system}.${converted}`)*/

  // Convert impossible difficulty to TUF
  // Output: T21C.-21
  /*selected_system = 'TUF'
  difficulty = 'impossible'
  converted = fromDifficulty(selected_system, difficulty)
  console.log(`${difficulty} => ${selected_system}.${converted}`)*/

  // Convert impossible difficulty to T21C
  // Output: T21C.-21
  /*selected_system = 'T21C'
  difficulty = 'impossible'
  converted = fromDifficulty(selected_system, difficulty)
  console.log(`${difficulty} => ${selected_system}.${converted}`)*/

  // Display all difficulties for
  /*console.log('---------------------------------------------------------------')
  console.log('Get all difficulties available for the selected system')

  selected_system = 'GG'
  for (converted of difficultiesFor(selected_system)) {
    console.log(`${selected_system} => ${converted}`)
  }
  console.log('^ notice that the empty strings have been filtered out')

  console.log('---------------------------------------------------------------')
  console.log('handling unsupported levels')*/

  // Convert unranked difficulty to GG
  // Output: ''
  /*selected_system = 'GG'
  difficulty = 'unranked'
  converted = fromDifficulty(selected_system, difficulty)
  console.log(`${difficulty} => ${selected_system}.${converted} <-- this will be missing`)*/

  // the conversion above will output an empty string
  // handle it by checking the converted value directly
  // or by using the ...OrUndefined version of the function
  /*if (converted.length === 0) {
    console.log(`${difficulty} => ${selected_system}.<unsupported>`)
  } else {
    // if you did match then you would display va
    console.log(`${difficulty} => ${selected_system}.${converted} <-- this line should not be executed`);
  }*/

  // alternatively this version of the function replaces empty strings with undefined
  /*selected_system = 'GG'
  difficulty = 'unranked'
  converted = fromDifficultyOrUndefined(selected_system, difficulty)
  let convertedValue = converted ? converted : '<unsupported>'
  // let convertedValue = converted === undefined ? '<unsupported>' : converted
  console.log(`${difficulty} => ${selected_system}.${convertedValue}`)*/


  // return the context provider
  return (
    <DifficultyContext.Provider
      value={{
        difficulties,

        selected_system,
        selected_difficulty,
        difficulty,
        converted,

        filterDifficulty,
        fromDifficulty,
        fromDifficultyOrUndefined,
        difficultiesFor
      }}
    >
      {props.children}
    </DifficultyContext.Provider>
  )
}

export { DifficultyContext, DifficultyContextProvider }
