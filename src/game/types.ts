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
  letters: Letter[];
  activeLetterIndex: number;
  hintsUsed: number;
}

export interface PlayerViewPlayerState extends Omit<PlayerState, "letters"> {
  letters: (Letter | null)[];
}

export interface TeamHints {
  available: number;
  locked: number;
}

export type ClueTokenPlayerLocation = { ownerID: string; letterIndex: number };

export type ClueTokenLocation = ClueTokenPlayerLocation | { ownerID: "TEAM" };

export type ClueTokenPlacement = ClueTokenLocation[];

interface ProposedClue {
  authorID: string;
  placement: ClueTokenPlacement;
  votes: string[];
}

interface ProposedClueSummary {
  numLetters: number;
  usesWild: boolean;
  numPlayers: number;
}

interface PlayerViewProposedClue extends Omit<ProposedClue, "placement"> {
  placement?: ClueTokenPlacement;
  summary: ProposedClueSummary;
}

export interface G {
  players: Record<number, PlayerState>;
  teamHints: TeamHints;
  proposedClues: ProposedClue[];
}

export interface PlayerViewG extends Omit<G, "players" | "proposedClues"> {
  players: Record<number, PlayerViewPlayerState>;
  proposedClues: PlayerViewProposedClue[];
}
