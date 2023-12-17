/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from './api';
type GeneratedQuery<InputType, OutputType> = string & {
	__generatedQueryInput: InputType;
	__generatedQueryOutput: OutputType;
};

export const getSaveGame = /* GraphQL */ `query GetSaveGame($id: ID!) {
  getSaveGame(id: $id) {
    id
    intelligenceLevel
    bitBoards
    boardState
    currentPlayer
    playerSymbol
    cpuSymbol
    scores
    muted
    __typename
  }
}
` as GeneratedQuery<APITypes.GetSaveGameQueryVariables, APITypes.GetSaveGameQuery>;
export const listSaveGames = /* GraphQL */ `query ListSaveGames {
  listSaveGames {
    id
    intelligenceLevel
    bitBoards
    boardState
    currentPlayer
    playerSymbol
    cpuSymbol
    scores
    muted
    __typename
  }
}
` as GeneratedQuery<APITypes.ListSaveGamesQueryVariables, APITypes.ListSaveGamesQuery>;
