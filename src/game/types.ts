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

export enum OwnerType {
  TEAM,
  NONPLAYER,
  PLAYER,
}
export enum CardStack {
  SINGLE,
  ARRAY,
}
export type OwnerCardLocation =
  | { stack: CardStack.SINGLE }
  | { stack: CardStack.ARRAY; letterIndex: number };

export interface PlayerOutcome {
  spelledWord: string;
  expectedWord: string;
  teamLettersUsed: OwnerCardLocation[];
  isWord?: boolean;
}

export interface PlayerState {
  playerID: string;
  wordConstructionLetters: Record<Letter, number>;
  letters: Letter[];
  activeLetterIndex: number;
  nextLetterIndex: number;
  letterNotes: Record<Letter, boolean>[];
  hintsUsed: number;
  playerOutcome?: PlayerOutcome;
}

export interface PlayerViewPlayerState
  extends Omit<
    PlayerState,
    "wordConstructionLetters" | "letters" | "letterNotes"
  > {
  letters: (Letter | null)[];
}

export interface TeamHints {
  available: number;
  locked: number;
}

export type CardOwner =
  | { ownerType: OwnerType.TEAM }
  | { ownerType: OwnerType.NONPLAYER; nonPlayerIndex: number }
  | { ownerType: OwnerType.PLAYER; playerID: string };
export type CardLocation = { owner: CardOwner } & OwnerCardLocation;
export type Spelling = CardLocation[];

export interface Clue {
  authorID: string;
  spelling: Spelling;
}

interface ClueSummary {
  numLetters: number;
  usesWild: boolean;
  numNonPlayers: number;
  numPlayers: number;
}

interface ProposedClue extends Clue {
  summary: ClueSummary;
  active: boolean;
  votes: string[];
}

export interface PlayerViewProposedClue extends Omit<ProposedClue, "spelling"> {
  spelling?: Spelling;
}

interface PreviousClue extends Omit<Clue, "spelling"> {
  spelling: (CardLocation | Letter)[];
}

export interface Team {
  wild: Letter.WILD | null;
  bonus: Letter[];
  hints: TeamHints;
}

export interface G {
  // TODO: Perhaps keys in players should be strings
  // so that we don't have to cast in all of the places that have playerIDs as strings
  players: Record<number, PlayerState>;
  nonPlayers: Letter[][];
  team: Team;
  drawPile: Letter[];
  discardPile: Letter[];
  activeClue: Clue | null;
  previousClues: PreviousClue[];
  proposedClues: ProposedClue[];
  endGameVotes: string[];
}

export interface PlayerViewG
  extends Omit<G, "players" | "nonPlayers" | "drawPile" | "proposedClues"> {
  wordConstructionLetters: Record<Letter, number>;
  players: Record<number, PlayerViewPlayerState>;
  nonPlayers: (Letter | null)[][];
  letterNotes: Record<Letter, boolean>[];
  proposedClues: PlayerViewProposedClue[];
}
