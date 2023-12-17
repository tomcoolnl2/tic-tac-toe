import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum PlayerSymbol {
  X = "X",
  O = "O"
}

export enum IntelligenceLevel {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD"
}

type EagerSaveGame = {
  readonly id: string;
  readonly intelligenceLevel: IntelligenceLevel | keyof typeof IntelligenceLevel;
  readonly bitBoards: number[];
  readonly boardState: (PlayerSymbol | null)[] | Array<keyof typeof PlayerSymbol>;
  readonly playerSymbol: PlayerSymbol | keyof typeof PlayerSymbol;
  readonly cpuSymbol: PlayerSymbol | keyof typeof PlayerSymbol;
  readonly scores: number[];
  readonly muted: boolean;
}

type LazySaveGame = {
  readonly id: string;
  readonly intelligenceLevel: IntelligenceLevel | keyof typeof IntelligenceLevel;
  readonly bitBoards: number[];
  readonly boardState: (PlayerSymbol | null)[] | Array<keyof typeof PlayerSymbol>;
  readonly playerSymbol: PlayerSymbol | keyof typeof PlayerSymbol;
  readonly cpuSymbol: PlayerSymbol | keyof typeof PlayerSymbol;
  readonly scores: number[];
  readonly muted: boolean;
}

export declare type SaveGame = LazyLoading extends LazyLoadingDisabled ? EagerSaveGame : LazySaveGame

export declare const SaveGame: (new (init: ModelInit<SaveGame>) => SaveGame)

