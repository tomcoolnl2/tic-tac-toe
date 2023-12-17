export const schema = {
    "models": {},
    "enums": {
        "PlayerSymbol": {
            "name": "PlayerSymbol",
            "values": [
                "X",
                "O"
            ]
        },
        "IntelligenceLevel": {
            "name": "IntelligenceLevel",
            "values": [
                "EASY",
                "MEDIUM",
                "HARD"
            ]
        }
    },
    "nonModels": {
        "SaveGame": {
            "name": "SaveGame",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "intelligenceLevel": {
                    "name": "intelligenceLevel",
                    "isArray": false,
                    "type": {
                        "enum": "IntelligenceLevel"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "bitBoards": {
                    "name": "bitBoards",
                    "isArray": true,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "boardState": {
                    "name": "boardState",
                    "isArray": true,
                    "type": {
                        "enum": "PlayerSymbol"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "playerSymbol": {
                    "name": "playerSymbol",
                    "isArray": false,
                    "type": {
                        "enum": "PlayerSymbol"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "cpuSymbol": {
                    "name": "cpuSymbol",
                    "isArray": false,
                    "type": {
                        "enum": "PlayerSymbol"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "scores": {
                    "name": "scores",
                    "isArray": true,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "muted": {
                    "name": "muted",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "codegenVersion": "3.4.4",
    "version": "aa89b5b164365eabcc0877f838c57009"
};