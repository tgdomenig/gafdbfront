export const schema = {
  "models": {
    "AppConfig": {
      "name": "AppConfig",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "displayId": {
          "name": "displayId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "CurrentConcoursShow": {
          "name": "CurrentConcoursShow",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "CurrentHomeScreen": {
          "name": "CurrentHomeScreen",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "ConcoursLiveStreamLink": {
          "name": "ConcoursLiveStreamLink",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "ConcoursCurrentRound": {
          "name": "ConcoursCurrentRound",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "ConcoursCurrentSession": {
          "name": "ConcoursCurrentSession",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "AppConfigs",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsUser": {
      "name": "DsUser",
      "fields": {
        "deviceId": {
          "name": "deviceId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "notificationPushToken": {
          "name": "notificationPushToken",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "favourites": {
          "name": "favourites",
          "isArray": true,
          "type": {
            "model": "DsUserFavourite"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "dsUserFavouritesDeviceId"
            ]
          }
        },
        "language": {
          "name": "language",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "votes": {
          "name": "votes",
          "isArray": true,
          "type": {
            "nonModel": "DsVote"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "DsUsers",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "key",
          "properties": {
            "fields": [
              "deviceId"
            ]
          }
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "create",
                  "read",
                  "update"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsUserFavourite": {
      "name": "DsUserFavourite",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "userId": {
          "name": "userId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        },
        "artistId": {
          "name": "artistId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        },
        "isActive": {
          "name": "isActive",
          "isArray": false,
          "type": "Boolean",
          "isRequired": false,
          "attributes": []
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "dsUserFavouritesDeviceId": {
          "name": "dsUserFavouritesDeviceId",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "dsPersonFansId": {
          "name": "dsPersonFansId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        }
      },
      "syncable": true,
      "pluralName": "DsUserFavourites",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "key",
          "properties": {
            "name": "byUser",
            "fields": [
              "userId"
            ]
          }
        },
        {
          "type": "key",
          "properties": {
            "name": "byArtist",
            "fields": [
              "artistId"
            ]
          }
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "create",
                  "read",
                  "update",
                  "delete"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsPost": {
      "name": "DsPost",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "postType": {
          "name": "postType",
          "isArray": false,
          "type": {
            "enum": "DsPostType"
          },
          "isRequired": false,
          "attributes": []
        },
        "publishDate": {
          "name": "publishDate",
          "isArray": false,
          "type": "AWSDate",
          "isRequired": false,
          "attributes": []
        },
        "displayId": {
          "name": "displayId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "title": {
          "name": "title",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": true,
          "attributes": []
        },
        "category": {
          "name": "category",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "subcategory": {
          "name": "subcategory",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "tags": {
          "name": "tags",
          "isArray": true,
          "type": "String",
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true
        },
        "featuredImage": {
          "name": "featuredImage",
          "isArray": false,
          "type": {
            "nonModel": "DsImage"
          },
          "isRequired": false,
          "attributes": []
        },
        "excerpt": {
          "name": "excerpt",
          "isArray": false,
          "type": {
            "nonModel": "LongTextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "content": {
          "name": "content",
          "isArray": true,
          "type": {
            "nonModel": "DsPostSection"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true
        },
        "sort": {
          "name": "sort",
          "isArray": false,
          "type": "Int",
          "isRequired": false,
          "attributes": []
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "DsPosts",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsPerson": {
      "name": "DsPerson",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "displayId": {
          "name": "displayId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "name": {
          "name": "name",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "origin": {
          "name": "origin",
          "isArray": false,
          "type": {
            "model": "DsGenericItem"
          },
          "isRequired": false,
          "attributes": [],
          "association": {
            "connectionType": "HAS_ONE",
            "associatedWith": [
              "id"
            ],
            "targetNames": [
              "dsPersonOriginId"
            ]
          }
        },
        "yearOfBirth": {
          "name": "yearOfBirth",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "profileImage": {
          "name": "profileImage",
          "isArray": false,
          "type": {
            "nonModel": "DsImage"
          },
          "isRequired": false,
          "attributes": []
        },
        "bio": {
          "name": "bio",
          "isArray": true,
          "type": {
            "nonModel": "DsPostSection"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true
        },
        "isUnderGafManagement": {
          "name": "isUnderGafManagement",
          "isArray": false,
          "type": "Boolean",
          "isRequired": false,
          "attributes": []
        },
        "concerts": {
          "name": "concerts",
          "isArray": true,
          "type": {
            "model": "PerformedConcert"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "dsPerson"
            ]
          }
        },
        "missions": {
          "name": "missions",
          "isArray": true,
          "type": {
            "model": "DsMission"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "personId"
            ]
          }
        },
        "fans": {
          "name": "fans",
          "isArray": true,
          "type": {
            "model": "DsUserFavourite"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "dsPersonFansId"
            ]
          }
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "dsPersonOriginId": {
          "name": "dsPersonOriginId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        }
      },
      "syncable": true,
      "pluralName": "DsPeople",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsMission": {
      "name": "DsMission",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "yearOfConcours": {
          "name": "yearOfConcours",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "personId": {
          "name": "personId",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "concoursId": {
          "name": "concoursId",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "role": {
          "name": "role",
          "isArray": false,
          "type": {
            "enum": "DsRole"
          },
          "isRequired": true,
          "attributes": []
        },
        "roleDisplayName": {
          "name": "roleDisplayName",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "participations": {
          "name": "participations",
          "isArray": true,
          "type": {
            "model": "DsParticipation"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "missionId"
            ]
          }
        },
        "prizes": {
          "name": "prizes",
          "isArray": true,
          "type": {
            "model": "DsConcoursPrize"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "missionId"
            ]
          }
        },
        "sort": {
          "name": "sort",
          "isArray": false,
          "type": "Int",
          "isRequired": false,
          "attributes": []
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "DsMissions",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "key",
          "properties": {
            "name": "byPerson",
            "fields": [
              "personId"
            ]
          }
        },
        {
          "type": "key",
          "properties": {
            "name": "byConcours",
            "fields": [
              "concoursId"
            ]
          }
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsParticipation": {
      "name": "DsParticipation",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "missionId": {
          "name": "missionId",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "concoursRoundId": {
          "name": "concoursRoundId",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "sessionId": {
          "name": "sessionId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        },
        "admittedToCompete": {
          "name": "admittedToCompete",
          "isArray": false,
          "type": "Boolean",
          "isRequired": false,
          "attributes": []
        },
        "chosenRepertoire": {
          "name": "chosenRepertoire",
          "isArray": true,
          "type": {
            "model": "ChosenPiece"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "dsParticipation"
            ]
          }
        },
        "performances": {
          "name": "performances",
          "isArray": true,
          "type": {
            "model": "DsPerformance"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "dsParticipationPerformancesId"
            ]
          }
        },
        "sort": {
          "name": "sort",
          "isArray": false,
          "type": "Int",
          "isRequired": false,
          "attributes": []
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "DsParticipations",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "key",
          "properties": {
            "name": "byCandidate",
            "fields": [
              "missionId"
            ]
          }
        },
        {
          "type": "key",
          "properties": {
            "name": "byConcoursRound",
            "fields": [
              "concoursRoundId"
            ]
          }
        },
        {
          "type": "key",
          "properties": {
            "name": "bySession",
            "fields": [
              "sessionId"
            ]
          }
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsGenericItem": {
      "name": "DsGenericItem",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "displayId": {
          "name": "displayId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "category": {
          "name": "category",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "textField": {
          "name": "textField",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "longTextField": {
          "name": "longTextField",
          "isArray": false,
          "type": {
            "nonModel": "LongTextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "isActive": {
          "name": "isActive",
          "isArray": false,
          "type": "Boolean",
          "isRequired": false,
          "attributes": []
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "DsGenericItems",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "update",
                  "delete",
                  "read"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsConcours": {
      "name": "DsConcours",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "displayId": {
          "name": "displayId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "yearOfConcours": {
          "name": "yearOfConcours",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "featuredImage": {
          "name": "featuredImage",
          "isArray": false,
          "type": {
            "nonModel": "DsImage"
          },
          "isRequired": false,
          "attributes": []
        },
        "text": {
          "name": "text",
          "isArray": false,
          "type": {
            "nonModel": "LongTextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "rounds": {
          "name": "rounds",
          "isArray": true,
          "type": {
            "model": "DsConcoursRound"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "concoursId"
            ]
          }
        },
        "missions": {
          "name": "missions",
          "isArray": true,
          "type": {
            "model": "DsMission"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "concoursId"
            ]
          }
        },
        "prizes": {
          "name": "prizes",
          "isArray": true,
          "type": {
            "model": "DsConcoursPrize"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "concoursId"
            ]
          }
        },
        "youtubeLink": {
          "name": "youtubeLink",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "DsConcours",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsConcoursPrize": {
      "name": "DsConcoursPrize",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "label": {
          "name": "label",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": true,
          "attributes": []
        },
        "missionId": {
          "name": "missionId",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "concoursId": {
          "name": "concoursId",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "sort": {
          "name": "sort",
          "isArray": false,
          "type": "Int",
          "isRequired": false,
          "attributes": []
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "DsConcoursPrizes",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "key",
          "properties": {
            "name": "byCandidate",
            "fields": [
              "missionId",
              "sort"
            ]
          }
        },
        {
          "type": "key",
          "properties": {
            "name": "byConcours",
            "fields": [
              "concoursId",
              "sort"
            ]
          }
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsConcoursRound": {
      "name": "DsConcoursRound",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "displayId": {
          "name": "displayId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "roundNb": {
          "name": "roundNb",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "displayName": {
          "name": "displayName",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": true,
          "attributes": []
        },
        "concoursId": {
          "name": "concoursId",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "sessions": {
          "name": "sessions",
          "isArray": true,
          "type": {
            "model": "DsSession"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "concoursRoundId"
            ]
          }
        },
        "competitors": {
          "name": "competitors",
          "isArray": true,
          "type": {
            "model": "DsParticipation"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "concoursRoundId"
            ]
          }
        },
        "repertoire": {
          "name": "repertoire",
          "isArray": true,
          "type": {
            "model": "RepertoirePiece"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "dsConcoursRound"
            ]
          }
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "DsConcoursRounds",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "key",
          "properties": {
            "name": "byConcours",
            "fields": [
              "concoursId"
            ]
          }
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsSession": {
      "name": "DsSession",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "sessionName": {
          "name": "sessionName",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "date": {
          "name": "date",
          "isArray": false,
          "type": "AWSDate",
          "isRequired": false,
          "attributes": []
        },
        "start": {
          "name": "start",
          "isArray": false,
          "type": "AWSTime",
          "isRequired": false,
          "attributes": []
        },
        "end": {
          "name": "end",
          "isArray": false,
          "type": "AWSTime",
          "isRequired": false,
          "attributes": []
        },
        "concoursRoundId": {
          "name": "concoursRoundId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        },
        "competitors": {
          "name": "competitors",
          "isArray": true,
          "type": {
            "model": "DsParticipation"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "sessionId"
            ]
          }
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "DsSessions",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "key",
          "properties": {
            "name": "byConcoursRound",
            "fields": [
              "concoursRoundId"
            ]
          }
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsMusicPiece": {
      "name": "DsMusicPiece",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "displayId": {
          "name": "displayId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "discographyId": {
          "name": "discographyId",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "composer": {
          "name": "composer",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "displayName": {
          "name": "displayName",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": true,
          "attributes": []
        },
        "opus": {
          "name": "opus",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "constituents": {
          "name": "constituents",
          "isArray": true,
          "type": {
            "nonModel": "DsMPConstituent"
          },
          "isRequired": false,
          "attributes": [],
          "isArrayNullable": true
        },
        "inRepertoires": {
          "name": "inRepertoires",
          "isArray": true,
          "type": {
            "model": "RepertoirePiece"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "dsMusicPiece"
            ]
          }
        },
        "chosenBy": {
          "name": "chosenBy",
          "isArray": true,
          "type": {
            "model": "ChosenPiece"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "dsMusicPiece"
            ]
          }
        },
        "performances": {
          "name": "performances",
          "isArray": true,
          "type": {
            "model": "DsPerformance"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "dsMusicPiecePerformancesId"
            ]
          }
        },
        "recordings": {
          "name": "recordings",
          "isArray": true,
          "type": {
            "model": "DsRecording"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "dsMusicPieceRecordingsId"
            ]
          }
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "DsMusicPieces",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsPerformance": {
      "name": "DsPerformance",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "musicPieceId": {
          "name": "musicPieceId",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "link": {
          "name": "link",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "constituents": {
          "name": "constituents",
          "isArray": true,
          "type": {
            "nonModel": "DsPerformedConstituent"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true
        },
        "playedBy": {
          "name": "playedBy",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "dsParticipationPerformancesId": {
          "name": "dsParticipationPerformancesId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        },
        "dsMusicPiecePerformancesId": {
          "name": "dsMusicPiecePerformancesId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        }
      },
      "syncable": true,
      "pluralName": "DsPerformances",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "key",
          "properties": {
            "name": "byMusicPiece",
            "fields": [
              "musicPieceId"
            ]
          }
        },
        {
          "type": "key",
          "properties": {
            "name": "byCompetitor",
            "fields": [
              "playedBy"
            ]
          }
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsConcert": {
      "name": "DsConcert",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "wpId": {
          "name": "wpId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "displayId": {
          "name": "displayId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "title": {
          "name": "title",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "titleFreetext": {
          "name": "titleFreetext",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "managedArtists": {
          "name": "managedArtists",
          "isArray": true,
          "type": {
            "model": "PerformedConcert"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "dsConcert"
            ]
          }
        },
        "date": {
          "name": "date",
          "isArray": false,
          "type": "AWSDate",
          "isRequired": true,
          "attributes": []
        },
        "times": {
          "name": "times",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "location": {
          "name": "location",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "locationLat": {
          "name": "locationLat",
          "isArray": false,
          "type": "Float",
          "isRequired": false,
          "attributes": []
        },
        "locationLng": {
          "name": "locationLng",
          "isArray": false,
          "type": "Float",
          "isRequired": false,
          "attributes": []
        },
        "orchestra": {
          "name": "orchestra",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "soloRecital": {
          "name": "soloRecital",
          "isArray": false,
          "type": "Boolean",
          "isRequired": false,
          "attributes": []
        },
        "conductor": {
          "name": "conductor",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "performersFreetext": {
          "name": "performersFreetext",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "performers": {
          "name": "performers",
          "isArray": true,
          "type": {
            "nonModel": "DsConcertPerformer"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true
        },
        "addPianist": {
          "name": "addPianist",
          "isArray": false,
          "type": "Boolean",
          "isRequired": false,
          "attributes": []
        },
        "sponsoredGAF": {
          "name": "sponsoredGAF",
          "isArray": false,
          "type": "Boolean",
          "isRequired": false,
          "attributes": []
        },
        "sponsoredSteinway": {
          "name": "sponsoredSteinway",
          "isArray": false,
          "type": "Boolean",
          "isRequired": false,
          "attributes": []
        },
        "otherSponsors": {
          "name": "otherSponsors",
          "isArray": true,
          "type": {
            "nonModel": "DsImage"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true
        },
        "program": {
          "name": "program",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "link": {
          "name": "link",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "DsConcerts",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsRecording": {
      "name": "DsRecording",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "musicPieceId": {
          "name": "musicPieceId",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "link": {
          "name": "link",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "constituents": {
          "name": "constituents",
          "isArray": true,
          "type": {
            "nonModel": "DsPerformedConstituent"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true
        },
        "recordingDate": {
          "name": "recordingDate",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "recordingLocation": {
          "name": "recordingLocation",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "onAlbums": {
          "name": "onAlbums",
          "isArray": true,
          "type": {
            "model": "RecordingOnAlbum"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "dsRecording"
            ]
          }
        },
        "mainPerformer": {
          "name": "mainPerformer",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "orchestra": {
          "name": "orchestra",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "conductor": {
          "name": "conductor",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "otherParticipants": {
          "name": "otherParticipants",
          "isArray": true,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true
        },
        "liveRecording": {
          "name": "liveRecording",
          "isArray": false,
          "type": "Boolean",
          "isRequired": false,
          "attributes": []
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "dsMusicPieceRecordingsId": {
          "name": "dsMusicPieceRecordingsId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        }
      },
      "syncable": true,
      "pluralName": "DsRecordings",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "key",
          "properties": {
            "name": "Recording",
            "fields": [
              "musicPieceId"
            ]
          }
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsMusicAlbum": {
      "name": "DsMusicAlbum",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "album": {
          "name": "album",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "release": {
          "name": "release",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "attributes": {
          "name": "attributes",
          "isArray": true,
          "type": {
            "nonModel": "DsAttribute"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true
        },
        "recordings": {
          "name": "recordings",
          "isArray": true,
          "type": {
            "model": "RecordingOnAlbum"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true,
          "association": {
            "connectionType": "HAS_MANY",
            "associatedWith": [
              "dsMusicAlbum"
            ]
          }
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "DsMusicAlbums",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "DsVoting": {
      "name": "DsVoting",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "displayId": {
          "name": "displayId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "title": {
          "name": "title",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": true,
          "attributes": []
        },
        "isActive": {
          "name": "isActive",
          "isArray": false,
          "type": "Boolean",
          "isRequired": false,
          "attributes": []
        },
        "description": {
          "name": "description",
          "isArray": false,
          "type": {
            "nonModel": "LongTextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "choices": {
          "name": "choices",
          "isArray": true,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true
        },
        "starts": {
          "name": "starts",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": []
        },
        "terminates": {
          "name": "terminates",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": []
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "DsVotings",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "aws_cognito_user_pools",
          "properties": {}
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "PerformedConcert": {
      "name": "PerformedConcert",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "dsPersonId": {
          "name": "dsPersonId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        },
        "dsConcertId": {
          "name": "dsConcertId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        },
        "dsPerson": {
          "name": "dsPerson",
          "isArray": false,
          "type": {
            "model": "DsPerson"
          },
          "isRequired": true,
          "attributes": [],
          "association": {
            "connectionType": "BELONGS_TO",
            "targetNames": [
              "dsPersonId"
            ]
          }
        },
        "dsConcert": {
          "name": "dsConcert",
          "isArray": false,
          "type": {
            "model": "DsConcert"
          },
          "isRequired": true,
          "attributes": [],
          "association": {
            "connectionType": "BELONGS_TO",
            "targetNames": [
              "dsConcertId"
            ]
          }
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "PerformedConcerts",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "key",
          "properties": {
            "name": "byDsPerson",
            "fields": [
              "dsPersonId"
            ]
          }
        },
        {
          "type": "key",
          "properties": {
            "name": "byDsConcert",
            "fields": [
              "dsConcertId"
            ]
          }
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "ChosenPiece": {
      "name": "ChosenPiece",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "dsParticipationId": {
          "name": "dsParticipationId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        },
        "dsMusicPieceId": {
          "name": "dsMusicPieceId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        },
        "dsParticipation": {
          "name": "dsParticipation",
          "isArray": false,
          "type": {
            "model": "DsParticipation"
          },
          "isRequired": true,
          "attributes": [],
          "association": {
            "connectionType": "BELONGS_TO",
            "targetNames": [
              "dsParticipationId"
            ]
          }
        },
        "dsMusicPiece": {
          "name": "dsMusicPiece",
          "isArray": false,
          "type": {
            "model": "DsMusicPiece"
          },
          "isRequired": true,
          "attributes": [],
          "association": {
            "connectionType": "BELONGS_TO",
            "targetNames": [
              "dsMusicPieceId"
            ]
          }
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "ChosenPieces",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "key",
          "properties": {
            "name": "byDsParticipation",
            "fields": [
              "dsParticipationId"
            ]
          }
        },
        {
          "type": "key",
          "properties": {
            "name": "byDsMusicPiece",
            "fields": [
              "dsMusicPieceId"
            ]
          }
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "RepertoirePiece": {
      "name": "RepertoirePiece",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "dsConcoursRoundId": {
          "name": "dsConcoursRoundId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        },
        "dsMusicPieceId": {
          "name": "dsMusicPieceId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        },
        "dsConcoursRound": {
          "name": "dsConcoursRound",
          "isArray": false,
          "type": {
            "model": "DsConcoursRound"
          },
          "isRequired": true,
          "attributes": [],
          "association": {
            "connectionType": "BELONGS_TO",
            "targetNames": [
              "dsConcoursRoundId"
            ]
          }
        },
        "dsMusicPiece": {
          "name": "dsMusicPiece",
          "isArray": false,
          "type": {
            "model": "DsMusicPiece"
          },
          "isRequired": true,
          "attributes": [],
          "association": {
            "connectionType": "BELONGS_TO",
            "targetNames": [
              "dsMusicPieceId"
            ]
          }
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "RepertoirePieces",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "key",
          "properties": {
            "name": "byDsConcoursRound",
            "fields": [
              "dsConcoursRoundId"
            ]
          }
        },
        {
          "type": "key",
          "properties": {
            "name": "byDsMusicPiece",
            "fields": [
              "dsMusicPieceId"
            ]
          }
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    },
    "RecordingOnAlbum": {
      "name": "RecordingOnAlbum",
      "fields": {
        "id": {
          "name": "id",
          "isArray": false,
          "type": "ID",
          "isRequired": true,
          "attributes": []
        },
        "dsRecordingId": {
          "name": "dsRecordingId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        },
        "dsMusicAlbumId": {
          "name": "dsMusicAlbumId",
          "isArray": false,
          "type": "ID",
          "isRequired": false,
          "attributes": []
        },
        "dsRecording": {
          "name": "dsRecording",
          "isArray": false,
          "type": {
            "model": "DsRecording"
          },
          "isRequired": true,
          "attributes": [],
          "association": {
            "connectionType": "BELONGS_TO",
            "targetNames": [
              "dsRecordingId"
            ]
          }
        },
        "dsMusicAlbum": {
          "name": "dsMusicAlbum",
          "isArray": false,
          "type": {
            "model": "DsMusicAlbum"
          },
          "isRequired": true,
          "attributes": [],
          "association": {
            "connectionType": "BELONGS_TO",
            "targetNames": [
              "dsMusicAlbumId"
            ]
          }
        },
        "createdAt": {
          "name": "createdAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        },
        "updatedAt": {
          "name": "updatedAt",
          "isArray": false,
          "type": "AWSDateTime",
          "isRequired": false,
          "attributes": [],
          "isReadOnly": true
        }
      },
      "syncable": true,
      "pluralName": "RecordingOnAlbums",
      "attributes": [
        {
          "type": "model",
          "properties": {}
        },
        {
          "type": "key",
          "properties": {
            "name": "byDsRecording",
            "fields": [
              "dsRecordingId"
            ]
          }
        },
        {
          "type": "key",
          "properties": {
            "name": "byDsMusicAlbum",
            "fields": [
              "dsMusicAlbumId"
            ]
          }
        },
        {
          "type": "auth",
          "properties": {
            "rules": [
              {
                "groupClaim": "cognito:groups",
                "provider": "userPools",
                "allow": "groups",
                "groups": [
                  "Admin"
                ],
                "operations": [
                  "create",
                  "delete",
                  "read",
                  "update"
                ]
              },
              {
                "allow": "public",
                "operations": [
                  "read"
                ]
              }
            ]
          }
        }
      ]
    }
  },
  "enums": {
    "DsPostType": {
      "name": "DsPostType",
      "values": [
        "GENERAL",
        "NEWS",
        "UPDATE",
        "INTERVIEW",
        "PERFORMANCE",
        "PHOTOS"
      ]
    },
    "DsLayoutVariant": {
      "name": "DsLayoutVariant",
      "values": [
        "MEDIA_TOP",
        "MEDIA_BELOW",
        "MEDIA_RIGHT",
        "MEDIA_LEFT"
      ]
    },
    "DsLinkVariant": {
      "name": "DsLinkVariant",
      "values": [
        "IMAGE",
        "VIDEO",
        "PDF",
        "EXTERNAL",
        "INTERNAL"
      ]
    },
    "DsRole": {
      "name": "DsRole",
      "values": [
        "CANDIDATE",
        "JURY_MEMBER",
        "JURY_PRESIDENT",
        "SCREENING_JURY",
        "CONDUCTOR",
        "OTHER"
      ]
    }
  },
  "nonModels": {
    "DsPostSection": {
      "name": "DsPostSection",
      "fields": {
        "headline": {
          "name": "headline",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "subtitle": {
          "name": "subtitle",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "text": {
          "name": "text",
          "isArray": false,
          "type": {
            "nonModel": "LongTextField"
          },
          "isRequired": false,
          "attributes": []
        },
        "media": {
          "name": "media",
          "isArray": true,
          "type": {
            "nonModel": "DsLink"
          },
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": true
        },
        "layout": {
          "name": "layout",
          "isArray": false,
          "type": {
            "enum": "DsLayoutVariant"
          },
          "isRequired": false,
          "attributes": []
        }
      }
    },
    "DsImage": {
      "name": "DsImage",
      "fields": {
        "sm": {
          "name": "sm",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "md": {
          "name": "md",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "alt": {
          "name": "alt",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        }
      }
    },
    "DsLink": {
      "name": "DsLink",
      "fields": {
        "label": {
          "name": "label",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": true,
          "attributes": []
        },
        "link": {
          "name": "link",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": true,
          "attributes": []
        },
        "variant": {
          "name": "variant",
          "isArray": false,
          "type": {
            "enum": "DsLinkVariant"
          },
          "isRequired": false,
          "attributes": []
        },
        "sort": {
          "name": "sort",
          "isArray": false,
          "type": "Int",
          "isRequired": false,
          "attributes": []
        }
      }
    },
    "DsAttribute": {
      "name": "DsAttribute",
      "fields": {
        "key": {
          "name": "key",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "value": {
          "name": "value",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        }
      }
    },
    "DsMPConstituent": {
      "name": "DsMPConstituent",
      "fields": {
        "displayId": {
          "name": "displayId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "displayName": {
          "name": "displayName",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": true,
          "attributes": []
        }
      }
    },
    "DsPerformedConstituent": {
      "name": "DsPerformedConstituent",
      "fields": {
        "displayId": {
          "name": "displayId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "link": {
          "name": "link",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        }
      }
    },
    "TextField": {
      "name": "TextField",
      "fields": {
        "en_US": {
          "name": "en_US",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "de_DE": {
          "name": "de_DE",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "fr_FR": {
          "name": "fr_FR",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        }
      }
    },
    "LongTextField": {
      "name": "LongTextField",
      "fields": {
        "en_US": {
          "name": "en_US",
          "isArray": true,
          "type": "String",
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": false
        },
        "de_DE": {
          "name": "de_DE",
          "isArray": true,
          "type": "String",
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": false
        },
        "fr_FR": {
          "name": "fr_FR",
          "isArray": true,
          "type": "String",
          "isRequired": true,
          "attributes": [],
          "isArrayNullable": false
        }
      }
    },
    "IntegerRange": {
      "name": "IntegerRange",
      "fields": {
        "start": {
          "name": "start",
          "isArray": false,
          "type": "Int",
          "isRequired": true,
          "attributes": []
        },
        "end": {
          "name": "end",
          "isArray": false,
          "type": "Int",
          "isRequired": true,
          "attributes": []
        }
      }
    },
    "DsConcertPerformer": {
      "name": "DsConcertPerformer",
      "fields": {
        "name": {
          "name": "name",
          "isArray": false,
          "type": "String",
          "isRequired": false,
          "attributes": []
        },
        "instrument": {
          "name": "instrument",
          "isArray": false,
          "type": {
            "nonModel": "TextField"
          },
          "isRequired": false,
          "attributes": []
        }
      }
    },
    "DsVote": {
      "name": "DsVote",
      "fields": {
        "votingId": {
          "name": "votingId",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        },
        "choice": {
          "name": "choice",
          "isArray": false,
          "type": "String",
          "isRequired": true,
          "attributes": []
        }
      }
    }
  },
  "codegenVersion": "3.4.4",
  "version": "76c9d5769107879fa599313fb9ab70eb"
};