/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./api";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const saveNewGame = /* GraphQL */ `mutation SaveNewGame($input: SaveGameInput!) {
  saveNewGame(input: $input) {
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
` as GeneratedMutation<
  APITypes.SaveNewGameMutationVariables,
  APITypes.SaveNewGameMutation
>;
