// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PlayerSymbol = {
  "X": "X",
  "O": "O"
};

const IntelligenceLevel = {
  "EASY": "EASY",
  "MEDIUM": "MEDIUM",
  "HARD": "HARD"
};

const { SaveGame } = initSchema(schema);

export {
  PlayerSymbol,
  IntelligenceLevel,
  SaveGame
};