export enum Letter {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",
  H = "H",
  I = "I",
  K = "K",
  L = "L",
  M = "M",
  N = "N",
  O = "O",
  P = "P",
  R = "R",
  S = "S",
  T = "T",
  U = "U",
  W = "W",
  Y = "Y",
  WILD = "*",
}

export interface PlayerState {
  playerID: string;
  playerName: string;
  letters: Letter[];
  activeLetterIndex: number;
  hintsUsed: number;
}

export interface TeamHints {
  available: number;
  locked: number;
}

export interface G {
  players: Record<number, PlayerState>;
  teamHints: TeamHints;
}
