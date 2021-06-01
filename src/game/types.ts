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
  WILD = "＊", // full-width asterisk (U+FF0A)
}

export interface PlayerState {
  playerID: string;
  playerName: string;
  wordConstructionLetters: Letter[];
  letters: Letter[];
  activeLetterIndex: number;
  nextLetterIndex: number;
  hintsUsed: number;
}

export interface PlayerViewPlayerState
  extends Omit<PlayerState, "wordConstructionLetters" | "letters"> {
  letters: (Letter | null)[];
}

export interface TeamHints {
  available: number;
  locked: number;
}

export type CardLocation = { ownerID: string; letterIndex: number };
export type Spelling = CardLocation[];

export interface Clue {
  authorID: string;
  spelling: Spelling;
}

interface ClueSummary {
  numLetters: number;
  usesWild: boolean;
  numPlayers: number;
}

interface ProposedClue extends Clue {
  summary: ClueSummary;
  votes: string[];
}

export interface PlayerViewProposedClue extends Omit<ProposedClue, "spelling"> {
  spelling?: Spelling;
}

export interface G {
  // TODO: Perhaps keys in players should be strings
  // so that we don't have to cast in all of the places that have playerIDs as strings
  players: Record<number, PlayerState>;
  teamLetters: Letter[];
  teamHints: TeamHints;
  activeClue: Clue | null;
  previousClues: Clue[];
  proposedClues: ProposedClue[];
}

export interface PlayerViewG extends Omit<G, "players" | "proposedClues"> {
  wordConstructionLetters: Letter[];
  players: Record<number, PlayerViewPlayerState>;
  proposedClues: PlayerViewProposedClue[];
}
