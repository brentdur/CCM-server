define({ "api": [
  {
    "type": "get",
    "url": "/api/broadcasts",
    "title": "Get all broadcasts",
    "group": "Broadcasts",
    "version": "1.2.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique string for event</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Group[]</p> ",
            "optional": false,
            "field": "recepients",
            "description": "<p>An array of groups that should receive the broadcast</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the broadcast</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>The text of the message to send</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "isNotification",
            "description": "<p>Whether the broadcast should notify</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String[]</p> ",
            "optional": false,
            "field": "syncs",
            "description": "<p>Enumerated of: &quot;all&quot;, &quot;events&quot;, &quot;convos&quot;, &quot;signups&quot;, &quot;messages&quot;, &quot;talks&quot;. What the gcm message syncs</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "createdAt",
            "description": "<p>When the broadcast was sent</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>User</p> ",
            "optional": false,
            "field": "createdBy",
            "description": "<p>The user that sent the broadcast</p> "
          }
        ]
      }
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/broadcasts.js",
    "groupTitle": "Broadcasts",
    "name": "GetApiBroadcasts",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/broadcasts"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/broadcasts/mine",
    "title": "Get my broadcasts",
    "group": "Broadcasts",
    "version": "1.2.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique string for event</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the broadcast</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>The text of the message to send</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "isNotification",
            "description": "<p>Whether the broadcast should notify</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String[]</p> ",
            "optional": false,
            "field": "syncs",
            "description": "<p>Enumerated of: &quot;all&quot;, &quot;events&quot;, &quot;convos&quot;, &quot;signups&quot;, &quot;messages&quot;, &quot;talks&quot;. What the gcm message syncs</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "createdAt",
            "description": "<p>When the broadcast was sent</p> "
          }
        ]
      }
    },
    "permission": [
      {
        "name": "isAuthenticated"
      }
    ],
    "filename": "app/controllers/broadcasts.js",
    "groupTitle": "Broadcasts",
    "name": "GetApiBroadcastsMine",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/broadcasts/mine"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/api/broadcasts/send",
    "title": "Create new broadcast",
    "description": "<p>Creates a new broadcast, which begins to spawn notifications for every user</p> ",
    "group": "Broadcasts",
    "version": "1.2.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "title",
            "description": "<p>The title of the broadcast</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>The message text to send</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Group[]</p> ",
            "optional": true,
            "field": "recepients",
            "description": "<p>An array of groups to send the broadcast to, or null if all groups should receive it</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": true,
            "field": "isNotification",
            "description": "<p>=false Whether the broadcast is silent or not</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String[]</p> ",
            "optional": true,
            "field": "syncs",
            "description": "<p>What the broadcast syncs, if anything. One of: 'all', 'events', 'conversations', 'signups', 'messages', or 'talks'</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n\"title\": \"new\",\n\"message\": \"newnew\",\n\"syncs\": \"all\",\n\"syncs\": \"messages\",\n\"recepients\": \"admin\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "Required",
            "description": "<p>field missing Title and Message are required fields</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Required field missing",
          "content": "{\n  \"Error\" \"Title and Message must be set\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "group canWrite(Broadcasts)"
      }
    ],
    "filename": "app/controllers/broadcasts.js",
    "groupTitle": "Broadcasts",
    "name": "PostApiBroadcastsSend",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/broadcasts/send"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/api/broadcasts/sync",
    "title": "Create new broadcast that only syncs",
    "group": "Broadcasts",
    "version": "1.2.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String[]</p> ",
            "optional": false,
            "field": "syncs",
            "description": "<p>What the broadcast syncs, if anything. One of: 'all', 'events', 'convos', 'signups', 'messages', or 'talks'</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Group[]</p> ",
            "optional": true,
            "field": "recepients",
            "description": "<p>An array of groups to send the broadcast to, or null if all groups should receive it</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n\"syncs\": \"all\",\n\"recepients\": \"admin\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "RequiredFieldError",
            "description": "<p>Syncs must be set</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Required Field Missing",
          "content": "{\n  \"Error\" \"Syncs must be set\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "group canWrite(Broadcasts)"
      }
    ],
    "filename": "app/controllers/broadcasts.js",
    "groupTitle": "Broadcasts",
    "name": "PostApiBroadcastsSync",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/broadcasts/sync"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/broadcasts/kill",
    "title": "Deactivates a broadcast for a user",
    "group": "Broadcasts",
    "version": "1.2.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Broadcast</p> ",
            "optional": false,
            "field": "cast",
            "description": "<p>The broadcast to deactivate</p> "
          }
        ]
      }
    },
    "permission": [
      {
        "name": "isAuthenticated()"
      }
    ],
    "filename": "app/controllers/broadcasts.js",
    "groupTitle": "Broadcasts",
    "name": "PutApiBroadcastsKill",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/broadcasts/kill"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/conversations",
    "title": "Get all conversations",
    "group": "Conversations",
    "version": "1.2.0",
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/conversations.js",
    "groupTitle": "Conversations",
    "name": "GetApiConversations",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/conversations"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "alive",
            "description": "<p>Whether the conversation is still happening or has been deleted</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "minister",
            "description": "<p>The minister group participating in the conversation</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "minister.alive",
            "description": "<p>Whether the minister still considers the conversation to be alive</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "minister.responded",
            "description": "<p>Whether the minister has read the last message sent by another party</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "minister.isAnon",
            "description": "<p>Whether the minister is anonymous in this conversation (will be false for the most part)</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "minister.senderId",
            "description": "<p>The string identifier of the sender</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object[]</p> ",
            "optional": false,
            "field": "participant",
            "description": "<p>The participating (initiating) user of this conversation, or users involved in a broadcast</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "participant.alive",
            "description": "<p>Whether the user still considers the conversation to be alive</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "participant.responded",
            "description": "<p>Whether the user has read the last message sent by another party</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "participant.isAnon",
            "description": "<p>Whether the user is anonymous in this conversation</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "participant.senderId",
            "description": "<p>The string identifier of the sender</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>User</p> ",
            "optional": false,
            "field": "participant.user",
            "description": "<p>The user id associated with this participant</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "broadcast",
            "description": "<p>Whether this conversation is a broadcast to all users, sets seem default things differently</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Topic</p> ",
            "optional": false,
            "field": "topic",
            "description": "<p>The topic associated with this conversation</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "singleton",
            "description": "<p>Whether this conversation is a single message or a whole conversation (one way vs two way, designed to enable older -&gt; newer communication)</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Message[]</p> ",
            "optional": false,
            "field": "messages",
            "description": "<p>The messages connected with this conversation</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[{\n\t\"_id\": \"55c5527f8efd394f3634c762\",\n\t\"alive\": true,\n\t\"minister\": {\n\t\t\"alive\": true,\n\t\t\"responded\": false,\n\t\t\"isAnon\": false,\n\t\t\"senderId\": \"92920192\"\n\t \t},\n\t\"participant\": {\n\t\t\"alive\": false,\n\t\t\"responded\": true,\n\t\t\"isAnon\": true,\n\t\t\"senderId\": \"adfa313g32g231\"\n\t\t\"user\":\"55c5527f8efd394f3634c762\"\n\t\t},\n\t\"topic\":\"55c5527f8efd394f3634c762\",\n\tsingleton: false,\n\tmessages:[...]\n},\n{...}.\n]",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/conversations/android",
    "title": "Get all conversations for a user that are still alive and returns them in an android format",
    "group": "Conversations",
    "version": "1.2.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the conversation</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subject",
            "description": "<p>The subject of the conversation</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Topic</p> ",
            "optional": false,
            "field": "topic",
            "description": "<p>The id of the topic of the conversation</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>User</p> ",
            "optional": false,
            "field": "user",
            "description": "<p>The participant user of the conversation, hidden if the topic isAnon</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "singleton",
            "description": "<p>Whether the conversation is a single, one way, message or not</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String[]</p> ",
            "optional": false,
            "field": "minMessage",
            "description": "<p>An array of strings representing the minsters messages</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String[]</p> ",
            "optional": false,
            "field": "messages",
            "description": "<p>An array of strings for the participant messages, blank strings represent where a minster's message goes</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n{\n  \"_id\": \"561c54ad17c852f777fe0663\",\n  \"subject\": \"anon convo\",\n  \"topic\": \"561c549917c852f777fe0656\",\n  \"user\": \"\",\n  \"singleton\": false,\n  \"minMessage\": [\n  \t\"yo!\"\n  ],\n  \"messages\": [\n    \"Testing the new convo!\",\n    \"\"\n  ]\n}\n]",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "isAuthenticated()"
      }
    ],
    "filename": "app/controllers/conversations.js",
    "groupTitle": "Conversations",
    "name": "GetApiConversationsAndroid",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/conversations/android"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/conversations/mine",
    "title": "Get all conversations for a user that are still alive",
    "group": "Conversations",
    "version": "1.2.0",
    "permission": [
      {
        "name": "isAuthenticated()"
      }
    ],
    "filename": "app/controllers/conversations.js",
    "groupTitle": "Conversations",
    "name": "GetApiConversationsMine",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/conversations/mine"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "alive",
            "description": "<p>Whether the conversation is still happening or has been deleted</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "minister",
            "description": "<p>The minister group participating in the conversation</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "minister.alive",
            "description": "<p>Whether the minister still considers the conversation to be alive</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "minister.responded",
            "description": "<p>Whether the minister has read the last message sent by another party</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "minister.isAnon",
            "description": "<p>Whether the minister is anonymous in this conversation (will be false for the most part)</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "minister.senderId",
            "description": "<p>The string identifier of the sender</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object[]</p> ",
            "optional": false,
            "field": "participant",
            "description": "<p>The participating (initiating) user of this conversation, or users involved in a broadcast</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "participant.alive",
            "description": "<p>Whether the user still considers the conversation to be alive</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "participant.responded",
            "description": "<p>Whether the user has read the last message sent by another party</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "participant.isAnon",
            "description": "<p>Whether the user is anonymous in this conversation</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "participant.senderId",
            "description": "<p>The string identifier of the sender</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>User</p> ",
            "optional": false,
            "field": "participant.user",
            "description": "<p>The user id associated with this participant</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "broadcast",
            "description": "<p>Whether this conversation is a broadcast to all users, sets seem default things differently</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Topic</p> ",
            "optional": false,
            "field": "topic",
            "description": "<p>The topic associated with this conversation</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "singleton",
            "description": "<p>Whether this conversation is a single message or a whole conversation (one way vs two way, designed to enable older -&gt; newer communication)</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Message[]</p> ",
            "optional": false,
            "field": "messages",
            "description": "<p>The messages connected with this conversation</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[{\n\t\"_id\": \"55c5527f8efd394f3634c762\",\n\t\"alive\": true,\n\t\"minister\": {\n\t\t\"alive\": true,\n\t\t\"responded\": false,\n\t\t\"isAnon\": false,\n\t\t\"senderId\": \"92920192\"\n\t \t},\n\t\"participant\": {\n\t\t\"alive\": false,\n\t\t\"responded\": true,\n\t\t\"isAnon\": true,\n\t\t\"senderId\": \"adfa313g32g231\"\n\t\t\"user\":\"55c5527f8efd394f3634c762\"\n\t\t},\n\t\"topic\":\"55c5527f8efd394f3634c762\",\n\tsingleton: false,\n\tmessages:[...]\n},\n{...}.\n]",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/conversations/minister",
    "title": "Get all conversations that are still alive",
    "group": "Conversations",
    "version": "1.2.0",
    "permission": [
      {
        "name": "inGroup(ministers)"
      }
    ],
    "filename": "app/controllers/conversations.js",
    "groupTitle": "Conversations",
    "name": "GetApiConversationsMinister",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/conversations/minister"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "alive",
            "description": "<p>Whether the conversation is still happening or has been deleted</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "minister",
            "description": "<p>The minister group participating in the conversation</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "minister.alive",
            "description": "<p>Whether the minister still considers the conversation to be alive</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "minister.responded",
            "description": "<p>Whether the minister has read the last message sent by another party</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "minister.isAnon",
            "description": "<p>Whether the minister is anonymous in this conversation (will be false for the most part)</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "minister.senderId",
            "description": "<p>The string identifier of the sender</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object[]</p> ",
            "optional": false,
            "field": "participant",
            "description": "<p>The participating (initiating) user of this conversation, or users involved in a broadcast</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "participant.alive",
            "description": "<p>Whether the user still considers the conversation to be alive</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "participant.responded",
            "description": "<p>Whether the user has read the last message sent by another party</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "participant.isAnon",
            "description": "<p>Whether the user is anonymous in this conversation</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "participant.senderId",
            "description": "<p>The string identifier of the sender</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>User</p> ",
            "optional": false,
            "field": "participant.user",
            "description": "<p>The user id associated with this participant</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "broadcast",
            "description": "<p>Whether this conversation is a broadcast to all users, sets seem default things differently</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Topic</p> ",
            "optional": false,
            "field": "topic",
            "description": "<p>The topic associated with this conversation</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "singleton",
            "description": "<p>Whether this conversation is a single message or a whole conversation (one way vs two way, designed to enable older -&gt; newer communication)</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Message[]</p> ",
            "optional": false,
            "field": "messages",
            "description": "<p>The messages connected with this conversation</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[{\n\t\"_id\": \"55c5527f8efd394f3634c762\",\n\t\"alive\": true,\n\t\"minister\": {\n\t\t\"alive\": true,\n\t\t\"responded\": false,\n\t\t\"isAnon\": false,\n\t\t\"senderId\": \"92920192\"\n\t \t},\n\t\"participant\": {\n\t\t\"alive\": false,\n\t\t\"responded\": true,\n\t\t\"isAnon\": true,\n\t\t\"senderId\": \"adfa313g32g231\"\n\t\t\"user\":\"55c5527f8efd394f3634c762\"\n\t\t},\n\t\"topic\":\"55c5527f8efd394f3634c762\",\n\tsingleton: false,\n\tmessages:[...]\n},\n{...}.\n]",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/api/conversations",
    "title": "Creates a new conversation",
    "group": "Conversations",
    "version": "1.2.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Topic</p> ",
            "optional": false,
            "field": "topic",
            "description": "<p>The id of the topic for the conversation</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subject",
            "description": "<p>The subject of the conversation</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>The original message text of the conversation</p> "
          }
        ]
      }
    },
    "permission": [
      {
        "name": "group canWrite(Conversations)"
      }
    ],
    "filename": "app/controllers/conversations.js",
    "groupTitle": "Conversations",
    "name": "PostApiConversations",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/conversations"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/conversations/kill",
    "title": "Marks a conversation as dead for a person and determines its state",
    "group": "Conversations",
    "version": "1.2.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Conversation</p> ",
            "optional": false,
            "field": "conversation",
            "description": "<p>The conversation id that the user is killing</p> "
          }
        ]
      }
    },
    "permission": [
      {
        "name": "isAuthenticated()"
      }
    ],
    "filename": "app/controllers/conversations.js",
    "groupTitle": "Conversations",
    "name": "PutApiConversationsKill",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/conversations/kill"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/api/conversations/send",
    "title": "Adds a new message to an existing conversation",
    "group": "Conversations",
    "version": "1.2.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>The message to add</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Conversation</p> ",
            "optional": false,
            "field": "conversation",
            "description": "<p>The conversation id to add the message to</p> "
          }
        ]
      }
    },
    "permission": [
      {
        "name": "isAuthenticated()"
      }
    ],
    "filename": "app/controllers/conversations.js",
    "groupTitle": "Conversations",
    "name": "PutApiConversationsSend",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/conversations/send"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "DELETE",
    "url": "/api/events/delete",
    "title": "Delete event",
    "group": "Events",
    "version": "1.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "item",
            "description": "<p>id of the event item to be deleted</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n  \"item\":\"555kljdfkk4l2eer\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/events.js",
    "groupTitle": "Events",
    "name": "DeleteApiEventsDelete",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/events/delete"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/events",
    "title": "Get all events",
    "group": "Events",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique string for event</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "title",
            "description": "<p>The simple name for this event.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location",
            "description": "<p>The simple name of the venue.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "date",
            "description": "<p>Date of this event in standard format.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "description",
            "description": "<p>Full description of this event.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of venue.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of venue.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Signup</p> ",
            "optional": true,
            "field": "relatedSignup",
            "description": "<p>Signup related to this event</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "version",
            "description": "<p>Version of event, starting at 0.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n{\n \"_id\": \"55bd34d9b70a934b24e952e6\",\n \"title\": \"first event\",\n \"location\": \"Reedemer West Side\",\n \"date\": \"2015-09-14T04:00:00.000Z\",\n \"description\": \"This is the first event\",\n \"lat\": 40.786122,\n \"lng\": -73.975738,\n \"__v\": 0,\n \"version\": 0\n},\n{...}\n]",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "isAuthenticated()"
      }
    ],
    "filename": "app/controllers/events.js",
    "groupTitle": "Events",
    "name": "GetApiEvents",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/events"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/api/events",
    "title": "Create new event",
    "group": "Events",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "title",
            "description": "<p>The title for the event</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location",
            "description": "<p>The name of the existing location or the simple name for a new location</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "address",
            "description": "<p>If the location name is not an existing one, this field is required. Full address for geocoding</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "date",
            "description": "<p>In valid format.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "description",
            "description": "<p>Full event description.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n\"title\": \"newevent\",\n\"location\": \"New\",\n\"date\": \"6/14/2015\",\n\"description\": \"First Event\",\n\"address\": \"1003 New Street, New York, New York, 30902\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "LocationError",
            "description": "<p>Location field was not an existing event and address field was not set</p> "
          },
          {
            "group": "Error 403",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Required fields were not set or cast to date failed</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "No Location Found",
          "content": "{\n  \"Error\" \"No location found and no address given\"\n}",
          "type": "json"
        },
        {
          "title": "Validation Error",
          "content": "{\n  \"Error\": {\n    \"message\": \"Event validation failed\",\n    \"name\": \"ValidationError\",\n    \"errors\": {\n      \"title\": {\n        \"properties\": {\n          \"type\": \"required\",\n          \"message\": \"Path `{PATH}` is required.\",\n          \"path\": \"title\"\n        },\n        \"message\": \"Path `title` is required.\",\n        \"name\": \"ValidatorError\",\n        \"kind\": \"required\",\n        \"path\": \"title\"\n      }\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "group canWrite(Events)"
      }
    ],
    "filename": "app/controllers/events.js",
    "groupTitle": "Events",
    "name": "PostApiEvents",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/events"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/api/groups",
    "title": "Get all groups",
    "group": "Groups",
    "version": "1.2.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique string for group</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the event</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "version",
            "description": "<p>Version number for group</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "writeEvents",
            "description": "<p>Specifies whether this group has write permission for events</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "writeMsgs",
            "description": "<p>Specifies whether this group has write permission for messages</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "writeTalks",
            "description": "<p>Specifies whether this group has write permission for talks</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "writeSignups",
            "description": "<p>Specifies whether this group has write permission for signups</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "writeConversations",
            "description": "<p>Specifies whether this group has write permission for conversations</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Users[]</p> ",
            "optional": false,
            "field": "members",
            "description": "<p>Populated list of all members</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n{\n  \"_id\": \"55aaad047b521bba68335407\",\n  \"name\": \"admin\",\n  \"__v\": 2,\n  \"version\": 0,\n  \"writeEvents\": true,\n  \"writeMsgs\": true,\n  \"writeTalks\": true,\n  \"writeSignups\": true,\n  \"writeConversations\": true,\n  \"members\": [\n    {\n      \"_id\": \"55aaad047b521bba68335409\",\n      \"name\": \"admin\",\n      \"email\": \"admin@brentondurkee.com\",\n      \"__v\": 2,\n      \"gcm\": \"e2nP4VMFNQw:APA91bG73-p2xQkYLZSJx29eYlgFP2GQ2eclj6Z9vKIWreerpa3xoyYDmGiJ8x7yUIRu1q2Z-t-2FSsY_rMFQKo-jnP099R4hOqxUlfVGKIJa-kb90kFppL3kbAnJ1VfpvMKacpXEqpT\",\n      \"groups\": [\n        \"55aaad047b521bba68335407\"\n      ],\n      \"opt\": true,\n      \"confirmed\": false,\n      \"role\": \"user\"\n    },\n    {\n      ...\n    }\n  ]\n},\n{...}\n]",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/groups.js",
    "groupTitle": "Groups",
    "name": "GetApiGroups",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/groups"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/api/groups",
    "title": "Get all groups",
    "group": "Groups",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique string for group</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the event</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "version",
            "description": "<p>Version number for group</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "writeEvents",
            "description": "<p>Specifies whether this group has write permission for events</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "writeMsgs",
            "description": "<p>Specifies whether this group has write permission for messages</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "writeTalks",
            "description": "<p>Specifies whether this group has write permission for talks</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "writeSignups",
            "description": "<p>Specifies whether this group has write permission for signups</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Users[]</p> ",
            "optional": false,
            "field": "members",
            "description": "<p>Populated list of all members</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n{\n  \"_id\": \"55aaad047b521bba68335407\",\n  \"name\": \"admin\",\n  \"__v\": 2,\n  \"version\": 0,\n  \"writeEvents\": true,\n  \"writeMsgs\": true,\n  \"writeTalks\": true,\n  \"writeSignups\": true,\n  \"members\": [\n    {\n      \"_id\": \"55aaad047b521bba68335409\",\n      \"name\": \"admin\",\n      \"email\": \"admin@brentondurkee.com\",\n      \"__v\": 2,\n      \"gcm\": \"e2nP4VMFNQw:APA91bG73-p2xQkYLZSJx29eYlgFP2GQ2eclj6Z9vKIWreerpa3xoyYDmGiJ8x7yUIRu1q2Z-t-2FSsY_rMFQKo-jnP099R4hOqxUlfVGKIJa-kb90kFppL3kbAnJ1VfpvMKacpXEqpT\",\n      \"groups\": [\n        \"55aaad047b521bba68335407\"\n      ],\n      \"opt\": true,\n      \"confirmed\": false,\n      \"role\": \"user\"\n    },\n    {\n      ...\n    }\n  ]\n},\n{...}\n]",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/_apidoc.js",
    "groupTitle": "Groups",
    "name": "GetApiGroups",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/groups"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/api/groups",
    "title": "Create new group",
    "group": "Groups",
    "version": "1.2.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the new group</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": true,
            "field": "writeTalks",
            "defaultValue": "false",
            "description": "<p>whether this group can make new talks</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": true,
            "field": "writeEvents",
            "defaultValue": "false",
            "description": "<p>whether this group can make new events</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": true,
            "field": "writeMsgs",
            "defaultValue": "false",
            "description": "<p>whether this group can make new messages</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": true,
            "field": "writeSignups",
            "defaultValue": "false",
            "description": "<p>whether this group can make new signups</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": true,
            "field": "writeConversations",
            "defaultValue": "false",
            "description": "<p>whether this group can make new conversations</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n  \"name\": \"admins\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/groups.js",
    "groupTitle": "Groups",
    "name": "PostApiGroups",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/groups"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Required fields were not set</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "ValidationError ",
          "content": "{\n  \"message\": \"Event validation failed\",\n  \"name\": \"ValidationError\",\n  \"errors\": {...}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/api/groups",
    "title": "Create new group",
    "group": "Groups",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the new group</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": true,
            "field": "writeTalks",
            "defaultValue": "false",
            "description": "<p>whether this group can make new talks</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": true,
            "field": "writeEvents",
            "defaultValue": "false",
            "description": "<p>whether this group can make new events</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": true,
            "field": "writeMsgs",
            "defaultValue": "false",
            "description": "<p>whether this group can make new messages</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": true,
            "field": "writeSignups",
            "defaultValue": "false",
            "description": "<p>whether this group can make new signups</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n  \"name\": \"admins\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/_apidoc.js",
    "groupTitle": "Groups",
    "name": "PostApiGroups",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/groups"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Required fields were not set</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "ValidationError ",
          "content": "{\n  \"message\": \"Event validation failed\",\n  \"name\": \"ValidationError\",\n  \"errors\": {...}\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/api/locations",
    "title": "Get all locations",
    "group": "Locations",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique string for location</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Simple name of location</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "address",
            "description": "<p>Full address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of location</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of location</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "version",
            "description": "<p>Version identifier of location, updates if location is changed.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n   {\n    \"_id\": \"55be42eda4cdbe7912fadc42\",\n    \"name\": \"Redeemer UWS\",\n    \"address\": \"W83 Ministry Center, 150 W. 83rd St., New York, New York\",\n    \"lat\": 40.786122,\n    \"lng\": -73.975738,\n    \"__v\": 0,\n    \"version\": 0\n  },\n  {...}\n]",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "isAuthenticated()"
      }
    ],
    "filename": "app/controllers/locations.js",
    "groupTitle": "Locations",
    "name": "GetApiLocations",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/locations"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/api/locations",
    "title": "Create a new location",
    "group": "Locations",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Name of location</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude of location. Required as location doesn't current support geocoding</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "lng",
            "description": "<p>Longitude of location. Required as location doesn't current support geocoding</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "address",
            "description": "<p>Currently just used as an identifier, may be used for geocoding later</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n  \"name\": \"Redeemer\",\n  \"lat\": \"72.5456456\",\n  \"lng\": \"71.564456\",\n  \"address\": \"West 83rd St, NY, NY, 10003\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/locations.js",
    "groupTitle": "Locations",
    "name": "PostApiLocations",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/locations"
      }
    ],
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Required fields were not set</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "ValidationError ",
          "content": "{\n  \"message\": \"Event validation failed\",\n  \"name\": \"ValidationError\",\n  \"errors\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "DELETE",
    "url": "/api/messages",
    "title": "Delete message",
    "group": "Messages",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>id of the message to be deleted</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "http://ccm.brentondurkee.com/api/messages?message=\"h5kjjf9jkjfklqj3j;qkljfklfnkla\"",
          "type": "query"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(ministers)"
      }
    ],
    "filename": "app/controllers/messages.js",
    "groupTitle": "Messages",
    "name": "DeleteApiMessages",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/messages"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "DELETE",
    "url": "/api/messages/delete",
    "title": "Delete message for admin",
    "group": "Messages",
    "version": "1.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "item",
            "description": "<p>id of the message item to be deleted</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n  \"item\":\"555kljdfkk4l2eer\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/messages.js",
    "groupTitle": "Messages",
    "name": "DeleteApiMessagesDelete",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/messages/delete"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/api/messages",
    "title": "Get all messages",
    "group": "Messages",
    "version": "1.2.0",
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/messages.js",
    "groupTitle": "Messages",
    "name": "GetApiMessages",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/messages"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique string for message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>User</p> ",
            "optional": false,
            "field": "from",
            "description": "<p>User that sent the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Group</p> ",
            "optional": false,
            "field": "to",
            "description": "<p>Recipient group of the message, will always be ministers</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "simpleTo",
            "description": "<p>Text name of the group for display purposes, will always be ministers</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "simpleFrom",
            "description": "<p>Text name of the sender of the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subject",
            "description": "<p>Subject of the message, used like a title</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Topic</p> ",
            "optional": false,
            "field": "topic",
            "description": "<p>topic of the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "date",
            "description": "<p>Formated date that the message was sent</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>Actualy message text</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "version",
            "description": "<p>Version identifier of the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Conversation</p> ",
            "optional": false,
            "field": "conversation",
            "description": "<p>Conversation that this message is connected to</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "senderId",
            "description": "<p>The sender of this message, identified by unique id</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n{\n    \"_id\": \"55c5527f8efd394f3634c762\",\n    \"to\": \"55c54d8c374fcd3b332085d6\",\n    \"simpleTo\": \"minister\",\n    \"simpleFrom\": \"theuser\",\n    \"subject\": \"Hello\",\n    \"topic\": \"55c5527f8efd394f3634c76a\",\n    \"from\": \"55c54d8c374fcd3b332085d1\",\n    \"date\": \"2015-09-09T04:00:00.000Z\",\n    \"message\": \"Hey guys, welcome to RUF\",\n    \"version\": 0\n  },\n  {...},\n]",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/api/messages",
    "title": "Get all messages",
    "group": "Messages",
    "version": "1.0.0",
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/_apidoc.js",
    "groupTitle": "Messages",
    "name": "GetApiMessages",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/messages"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique string for message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>User</p> ",
            "optional": false,
            "field": "from",
            "description": "<p>User that sent the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Group</p> ",
            "optional": false,
            "field": "to",
            "description": "<p>Recipient group of the message, will always be ministers</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "simpleTo",
            "description": "<p>Text name of the group for display purposes, will always be ministers</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "simpleFrom",
            "description": "<p>Text name of the sender of the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subject",
            "description": "<p>Subject of the message, used like a title</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Topic</p> ",
            "optional": false,
            "field": "topic",
            "description": "<p>topic of the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "date",
            "description": "<p>Formated date that the message was sent</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>Actualy message text</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "version",
            "description": "<p>Version identifier of the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Conversation</p> ",
            "optional": false,
            "field": "conversation",
            "description": "<p>Conversation that this message is connected to</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "senderId",
            "description": "<p>The sender of this message, identified by unique id</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n{\n    \"_id\": \"55c5527f8efd394f3634c762\",\n    \"to\": \"55c54d8c374fcd3b332085d6\",\n    \"simpleTo\": \"minister\",\n    \"simpleFrom\": \"theuser\",\n    \"subject\": \"Hello\",\n    \"topic\": \"55c5527f8efd394f3634c76a\",\n    \"from\": \"55c54d8c374fcd3b332085d1\",\n    \"date\": \"2015-09-09T04:00:00.000Z\",\n    \"message\": \"Hey guys, welcome to RUF\",\n    \"version\": 0\n  },\n  {...},\n]",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/api/messages/mine",
    "title": "Get my messages",
    "group": "Messages",
    "description": "<p>Gets messages addressed to the groups of the current user, will hide the from field if topic is anonymous</p> ",
    "version": "1.2.0",
    "permission": [
      {
        "name": "isAuthenticated()"
      }
    ],
    "filename": "app/controllers/messages.js",
    "groupTitle": "Messages",
    "name": "GetApiMessagesMine",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/messages/mine"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique string for message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>User</p> ",
            "optional": false,
            "field": "from",
            "description": "<p>User that sent the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Group</p> ",
            "optional": false,
            "field": "to",
            "description": "<p>Recipient group of the message, will always be ministers</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "simpleTo",
            "description": "<p>Text name of the group for display purposes, will always be ministers</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "simpleFrom",
            "description": "<p>Text name of the sender of the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subject",
            "description": "<p>Subject of the message, used like a title</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Topic</p> ",
            "optional": false,
            "field": "topic",
            "description": "<p>topic of the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "date",
            "description": "<p>Formated date that the message was sent</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>Actualy message text</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "version",
            "description": "<p>Version identifier of the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Conversation</p> ",
            "optional": false,
            "field": "conversation",
            "description": "<p>Conversation that this message is connected to</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "senderId",
            "description": "<p>The sender of this message, identified by unique id</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n{\n    \"_id\": \"55c5527f8efd394f3634c762\",\n    \"to\": \"55c54d8c374fcd3b332085d6\",\n    \"simpleTo\": \"minister\",\n    \"simpleFrom\": \"theuser\",\n    \"subject\": \"Hello\",\n    \"topic\": \"55c5527f8efd394f3634c76a\",\n    \"from\": \"55c54d8c374fcd3b332085d1\",\n    \"date\": \"2015-09-09T04:00:00.000Z\",\n    \"message\": \"Hey guys, welcome to RUF\",\n    \"version\": 0\n  },\n  {...},\n]",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/api/messages/mine",
    "title": "Get my messages",
    "group": "Messages",
    "description": "<p>Gets messages addressed to the groups of the current user, will hide the from field if topic is anonymous</p> ",
    "version": "1.0.0",
    "permission": [
      {
        "name": "isAuthenticated()"
      }
    ],
    "filename": "app/controllers/_apidoc.js",
    "groupTitle": "Messages",
    "name": "GetApiMessagesMine",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/messages/mine"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique string for message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>User</p> ",
            "optional": false,
            "field": "from",
            "description": "<p>User that sent the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Group</p> ",
            "optional": false,
            "field": "to",
            "description": "<p>Recipient group of the message, will always be ministers</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "simpleTo",
            "description": "<p>Text name of the group for display purposes, will always be ministers</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "simpleFrom",
            "description": "<p>Text name of the sender of the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subject",
            "description": "<p>Subject of the message, used like a title</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Topic</p> ",
            "optional": false,
            "field": "topic",
            "description": "<p>topic of the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "date",
            "description": "<p>Formated date that the message was sent</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>Actualy message text</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "version",
            "description": "<p>Version identifier of the message</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Conversation</p> ",
            "optional": false,
            "field": "conversation",
            "description": "<p>Conversation that this message is connected to</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "senderId",
            "description": "<p>The sender of this message, identified by unique id</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n{\n    \"_id\": \"55c5527f8efd394f3634c762\",\n    \"to\": \"55c54d8c374fcd3b332085d6\",\n    \"simpleTo\": \"minister\",\n    \"simpleFrom\": \"theuser\",\n    \"subject\": \"Hello\",\n    \"topic\": \"55c5527f8efd394f3634c76a\",\n    \"from\": \"55c54d8c374fcd3b332085d1\",\n    \"date\": \"2015-09-09T04:00:00.000Z\",\n    \"message\": \"Hey guys, welcome to RUF\",\n    \"version\": 0\n  },\n  {...},\n]",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/api/messages",
    "title": "Creates a new singleton-convo, deprecated",
    "group": "Messages",
    "version": "1.2.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subject",
            "description": "<p>Subject/Title of the convo</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>Text of the convo</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Topic</p> ",
            "optional": false,
            "field": "topic",
            "description": "<p>id of the topic</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n \"subject\": \"Question!!!\",\n \"message\": \"Me have question\",\n \"topic\": \"55c55101cc899eb235a309fd\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "group canWrite(Msgs)"
      }
    ],
    "filename": "app/controllers/messages.js",
    "groupTitle": "Messages",
    "name": "PostApiMessages",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/messages"
      }
    ],
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Required fields were not set</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "ValidationError ",
          "content": "{\n  \"message\": \"Event validation failed\",\n  \"name\": \"ValidationError\",\n  \"errors\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/api/messages",
    "title": "Creates a new message for the 'ministers' group",
    "group": "Messages",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subject",
            "description": "<p>Subject/Title of the message</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "message",
            "description": "<p>Text of the message</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Topic</p> ",
            "optional": false,
            "field": "topic",
            "description": "<p>id of the topic</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n \"subject\": \"Question!!!\",\n \"message\": \"Me have question\",\n \"topic\": \"55c55101cc899eb235a309fd\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "GroupNotFoundError",
            "description": "<p>The specified group was not found.</p> "
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Required fields were not set</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "No Group Found",
          "content": "{\n  \"message\": \"No group found\",\n  \"status\": 404,\n  \"title\": \"Group not found\"\n}",
          "type": "json"
        },
        {
          "title": "ValidationError ",
          "content": "{\n  \"message\": \"Event validation failed\",\n  \"name\": \"ValidationError\",\n  \"errors\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "group canWrite(Msgs)"
      }
    ],
    "filename": "app/controllers/_apidoc.js",
    "groupTitle": "Messages",
    "name": "PostApiMessages",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/messages"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "DELETE",
    "url": "/api/signups/delete",
    "title": "Delete signup",
    "group": "Signups",
    "version": "1.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "item",
            "description": "<p>id of the event item to be deleted</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n  \"item\":\"555kljdfkk4l2eer\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/signups.js",
    "groupTitle": "Signups",
    "name": "DeleteApiSignupsDelete",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/signups/delete"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/api/signups",
    "title": "Get all signups",
    "group": "Signups",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique string for signup</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>The simple name for this signup .</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "dateInfo",
            "description": "<p>Recurring date of the event that the signup is for, information about timing</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location",
            "description": "<p>The simple name of the venue.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "address",
            "description": "<p>The full address for the venue the signup is for</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "description",
            "description": "<p>Full description of this event.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "worksheetLink",
            "description": "<p>The link for the worksheet list</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "version",
            "description": "<p>Version of event, starting at 0.</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "memberCount",
            "description": "<p>number of total members</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "isMemberOf",
            "description": "<p>whether the user is a member of this event</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>[User]</p> ",
            "optional": false,
            "field": "members",
            "description": "<p>Array of all people signuped for this</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Event</p> ",
            "optional": true,
            "field": "relatedEvent",
            "description": "<p>currently not in use</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>User</p> ",
            "optional": false,
            "field": "creator",
            "description": "<p>the user id of the user that created the signup</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n  {\n    \"_id\": \"55c554107d7078ab36912c7d\",\n    \"name\": \"Small Group\",\n    \"dateInfo\": \"Every Wednesday at 7:00pm\",\n    \"location\": \"The house\",\n    \"address\": \"75 Third Avenue, 10003\",\n    \"description\": \"Our weekly small group event!\",\n    \"__v\": 0,\n    \"version\": 0,\n    \"memberCount\": 0,\n    \"members\": [],\n    \"isMemberOf\": false\n  },\n  {...}\n]",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "isAuthenticated()"
      }
    ],
    "filename": "app/controllers/signups.js",
    "groupTitle": "Signups",
    "name": "GetApiSignups",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/signups"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/api/signups",
    "title": "Create new signup",
    "group": "Signups",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>The title for the event</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "dateInfo",
            "description": "<p>String explanation of date/times</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location",
            "description": "<p>The name of the existing location or the simple name for a new location</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "address",
            "description": "<p>If the location name is not an existing one, this field is required. Full address for map finding</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "description",
            "description": "<p>Full event description.</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": true,
            "field": "eventid",
            "description": "<p>id of connected event, not currently used</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n   \"name\":\" new signup\",\n   \"dateInfo\": \"This occurs often\",\n   \"location\": \"NEW!\",\n   \"address\": \"75 Third Avenue, 10003\",\n   \"description\": \"new stuff!!!\"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "LocationError",
            "description": "<p>Location field was not an existing location and address field was not set</p> "
          },
          {
            "group": "Error 403",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Required fields were not set or cast to date failed</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "No Location Found",
          "content": "{\n  \"Error\" \"No location found and no address given\"\n}",
          "type": "json"
        },
        {
          "title": "Validation Error",
          "content": "{\n  \"Error\": {\n    \"message\": \"Signup validation failed\",\n    \"name\": \"ValidationError\",\n    \"errors\": {\n      \"name\": {\n        \"properties\": {\n          \"type\": \"required\",\n          \"message\": \"Path `{PATH}` is required.\",\n          \"path\": \"name\"\n        },\n        \"message\": \"Path `name` is required.\",\n        \"name\": \"ValidatorError\",\n        \"kind\": \"required\",\n        \"path\": \"name\"\n      }\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "group canWrite(Signups)"
      }
    ],
    "filename": "app/controllers/signups.js",
    "groupTitle": "Signups",
    "name": "PostApiSignups",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/signups"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "PUT",
    "url": "/api/signups/addme",
    "title": "Add user to signup",
    "group": "Signups",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>Signup</p> ",
            "optional": false,
            "field": "signup",
            "description": "<p>The signup to register the authorized user to</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n  \"signup\": \"55c55ca49c34de703b01a770\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "SignupError",
            "description": "<p>No signup matching the provided id was fonud</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "No Signup Found",
          "content": "{\n  \"Error\" \"No location found and no address given\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "isAuthenticated()"
      }
    ],
    "filename": "app/controllers/signups.js",
    "groupTitle": "Signups",
    "name": "PutApiSignupsAddme",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/signups/addme"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "DELETE",
    "url": "/api/talks/delete",
    "title": "Delete talk",
    "group": "Talks",
    "version": "1.1.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "item",
            "description": "<p>id of the talk item to be deleted</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n  \"item\":\"555kljdfkk4l2eer\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/talks.js",
    "groupTitle": "Talks",
    "name": "DeleteApiTalksDelete",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/talks/delete"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/api/talks",
    "title": "Get all talks",
    "group": "Talks",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>The unique id of the talk object</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "author",
            "description": "<p>The name of the talk author</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subject",
            "description": "<p>The subject of the talk</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Date</p> ",
            "optional": false,
            "field": "date",
            "description": "<p>The date the talk was given</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "reference",
            "description": "<p>The specific reference of the passage used</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "creator",
            "description": "<p>The id of the user who created the talk</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "fullVerse",
            "description": "<p>The verse in its entirety, pulled from esvapi.org</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Integer</p> ",
            "optional": false,
            "field": "version",
            "description": "<p>The version number of the specific talk</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String[]</p> ",
            "optional": false,
            "field": "outline",
            "description": "<p>The outline points</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": " [\n  {\n    \"_id\": \"55e5c6c0e3eb4ba034d19e57\",\n    \"author\": \"eric\",\n    \"subject\": \"example\",\n    \"date\": \"2015-06-14T00:00:00.000Z\",\n    \"reference\": \"john 3:16\",\n    \"creator\": \"55de4c4d53d79af8061d5e61\",\n    \"fullVerse\": \"[16]\\\"For God so loved the world, that he gave his only Son, that \\nwhoever believes in him should not perish but have eternal life.\",\n    \"__v\": 0,\n    \"version\": 0,\n    \"outline\": [\n      \"point a\",\n      \"pointb\"\n    ]\n  }\n]",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "isAuthenticated"
      }
    ],
    "filename": "app/controllers/talks.js",
    "groupTitle": "Talks",
    "name": "GetApiTalks",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/talks"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/api/talks",
    "title": "Create new talk",
    "group": "Talks",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "author",
            "description": "<p>The author of the talk</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subject",
            "description": "<p>The subject of the talk</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "date",
            "description": "<p>The date/time that the talk was given in standard format</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "reference",
            "description": "<p>The reference for the talk context. Will be used to load the full verse</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String[]</p> ",
            "optional": true,
            "field": "outline",
            "description": "<p>The outline points</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n\"author\": \"Eric\"\n\"subject\": \"sorrow\"\n\"date\": \"6/14/2015\"\n\"reference\": \"John 1: 1-16\"\n\"outline\": \"note a\"\n\"outline\": \"note b\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Required fields were not set or cast to date failed</p> "
          }
        ]
      }
    },
    "permission": [
      {
        "name": "group canWrite(Talks)"
      }
    ],
    "filename": "app/controllers/talks.js",
    "groupTitle": "Talks",
    "name": "PostApiTalks",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/talks"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "PUT",
    "url": "/api/talks/note",
    "title": "Adds a new outline point to the specified talk",
    "group": "Talks",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "talk",
            "description": "<p>The id of the talk that is being modified</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "note",
            "description": "<p>The text of the outline point being added</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n\"talk\": \"55a471d03b3ab5ea1294c3ed\"\n\"note\": \"new note\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/talks.js",
    "groupTitle": "Talks",
    "name": "PutApiTalksNote",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/talks/note"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/api/topics",
    "title": "Get all Topics",
    "group": "Topics",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique string for topic</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Simple name of topic</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "isAnon",
            "description": "<p>Whether the sender of a message of this topic type is anonoymous or not</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "version",
            "description": "<p>Version identifier of topic, updates if topic is changed.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n  {\n    \"_id\": \"55c5527f8efd394f3634c76a\",\n    \"name\": \"Question\",\n    \"__v\": 0,\n    \"version\": 0,\n    \"isAnon\": true\n  },\n  {...}\n]",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "isAuthenticated()"
      }
    ],
    "filename": "app/controllers/topics.js",
    "groupTitle": "Topics",
    "name": "GetApiTopics",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/topics"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/api/topics",
    "title": "Create a new topic",
    "group": "Topics",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>Name of topic</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Boolean</p> ",
            "optional": true,
            "field": "isAnon",
            "defaultValue": "false",
            "description": "<p>Whether the sender of a message of this topic type is anonoymous or not</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n  \"name\": \"Question\",\n  \"isAnon\": \"true\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/topics.js",
    "groupTitle": "Topics",
    "name": "PostApiTopics",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/topics"
      }
    ],
    "error": {
      "fields": {
        "Error 500": [
          {
            "group": "Error 500",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Required fields were not set</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "ValidationError ",
          "content": "{\n  \"message\": \"Event validation failed\",\n  \"name\": \"ValidationError\",\n  \"errors\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/api/users",
    "title": "Get all users",
    "group": "Users",
    "version": "1.2.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier for the object</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "provider",
            "description": "<p>The authentication provider, usually local</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the user</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "hashedPassword",
            "description": "<p>The encrypted version of the user's password</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "gcm",
            "description": "<p>The gcm token for notification access</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "salt",
            "description": "<p>The encryption salt for the user</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String[]</p> ",
            "optional": false,
            "field": "groups",
            "description": "<p>An array of group ids that the user is a member of</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Conversation[]</p> ",
            "optional": false,
            "field": "convos",
            "description": "<p>An array of conversations that the user has participated in</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "clientType",
            "description": "<p>The client that the user is using</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "clientVersion",
            "description": "<p>The version identifier of the client</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "opt",
            "description": "<p>[Unused] Whether the user has opted in for email delivery or not</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "confirmed",
            "description": "<p>[Unused] Whether the user has confirmed their email address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "role",
            "description": "<p>[Unusued] The user's specified role. Was deprecated in favor of a group-based system.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n  {\n    \"_id\": \"55e4b8ae1959b17a0777a816\",\n    \"provider\": \"local\",\n    \"name\": \"test\",\n    \"email\": \"test@brentondurkee.com\",\n    \"hashedPassword\": \"7/YjGYRO8BZAqmztaLmjww==\",\n    \"gcm\": \"lkdjafkljdf\",\n    \"salt\": \"s/u\",\n    \"__v\": 4,\n    \"groups\": [\n      \"55de4d373596ddbf6c25e932\"\n    ],\n    \"opt\": true,\n    \"confirmed\": false,\n    \"role\": \"user\"\n  },\n  {...} \n  ]",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/users.js",
    "groupTitle": "Users",
    "name": "GetApiUsers",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/users"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/api/users",
    "title": "Get all users",
    "group": "Users",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier for the object</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "provider",
            "description": "<p>The authentication provider, usually local</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the user</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "hashedPassword",
            "description": "<p>The encrypted version of the user's password</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "gcm",
            "description": "<p>The gcm token for notification access</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "salt",
            "description": "<p>The encryption salt for the user</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String[]</p> ",
            "optional": false,
            "field": "groups",
            "description": "<p>An array of group ids that the user is a member of</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "opt",
            "description": "<p>[Unused] Whether the user has opted in for email delivery or not</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "confirmed",
            "description": "<p>[Unused] Whether the user has confirmed their email address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "role",
            "description": "<p>[Unusued] The user's specified role. Was deprecated in favor of a group-based system.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n  {\n    \"_id\": \"55e4b8ae1959b17a0777a816\",\n    \"provider\": \"local\",\n    \"name\": \"test\",\n    \"email\": \"test@brentondurkee.com\",\n    \"hashedPassword\": \"7/YjGYRO8BZAqmztaLmjww==\",\n    \"gcm\": \"lkdjafkljdf\",\n    \"salt\": \"s/u\",\n    \"__v\": 4,\n    \"groups\": [\n      \"55de4d373596ddbf6c25e932\"\n    ],\n    \"opt\": true,\n    \"confirmed\": false,\n    \"role\": \"user\"\n  },\n  {...} \n  ]",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/_apidoc.js",
    "groupTitle": "Users",
    "name": "GetApiUsers",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/users"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/api/users/me",
    "title": "Get information about the current user",
    "group": "Users",
    "version": "1.2.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier for the object</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "provider",
            "description": "<p>The authentication provider, usually local</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the user</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "gcm",
            "description": "<p>The gcm token for notification access</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Group[]</p> ",
            "optional": false,
            "field": "groups",
            "description": "<p>An array of populated groups that the user is a member of</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Conversation[]</p> ",
            "optional": false,
            "field": "convos",
            "description": "<p>An array of conversations that the user has participated in</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "clientType",
            "description": "<p>The client that the user is using</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "clientVersion",
            "description": "<p>The version identifier of the client</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "opt",
            "description": "<p>[Unused] Whether the user has opted in for email delivery or not</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "confirmed",
            "description": "<p>[Unused] Whether the user has confirmed their email address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "role",
            "description": "<p>[Unusued] The user's specified role. Was deprecated in favor of a group-based system.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n  {\n    \"_id\": \"55e4b8ae1959b17a0777a816\",\n    \"provider\": \"local\",\n    \"name\": \"test\",\n    \"email\": \"test@brentondurkee.com\",\n    \"gcm\": \"lkdjafkljdf\",\n    \"__v\": 4,\n    \"groups\": [\n      {...}\n    ],\n    \"opt\": true,\n    \"confirmed\": false,\n    \"role\": \"user\"\n  },\n  {...} \n  ]",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "isAuthenticated"
      }
    ],
    "filename": "app/controllers/users.js",
    "groupTitle": "Users",
    "name": "GetApiUsersMe",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/users/me"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "GET",
    "url": "/api/users/me",
    "title": "Get information about the current user",
    "group": "Users",
    "version": "1.0.0",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>Unique identifier for the object</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "provider",
            "description": "<p>The authentication provider, usually local</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>The name of the user</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>The user's email</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "gcm",
            "description": "<p>The gcm token for notification access</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Group[]</p> ",
            "optional": false,
            "field": "groups",
            "description": "<p>An array of populated groups that the user is a member of</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "opt",
            "description": "<p>[Unused] Whether the user has opted in for email delivery or not</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "confirmed",
            "description": "<p>[Unused] Whether the user has confirmed their email address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "role",
            "description": "<p>[Unusued] The user's specified role. Was deprecated in favor of a group-based system.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n  {\n    \"_id\": \"55e4b8ae1959b17a0777a816\",\n    \"provider\": \"local\",\n    \"name\": \"test\",\n    \"email\": \"test@brentondurkee.com\",\n    \"gcm\": \"lkdjafkljdf\",\n    \"__v\": 4,\n    \"groups\": [\n      {...}\n    ],\n    \"opt\": true,\n    \"confirmed\": false,\n    \"role\": \"user\"\n  },\n  {...} \n  ]",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "isAuthenticated"
      }
    ],
    "filename": "app/controllers/_apidoc.js",
    "groupTitle": "Users",
    "name": "GetApiUsersMe",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/users/me"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "POST",
    "url": "/api/users",
    "title": "Create a new user",
    "group": "Users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>The new users full name</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>The new user's email</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>The new user's login password</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n\"name\": \"brenton\",\n\"email\": \"brentdur@gmail.com\",\n\"password\": \"123\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 403": [
          {
            "group": "Error 403",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "ValidationError",
            "description": "<p>Required fields were not set or cast to date failed</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Validation Error",
          "content": "{\n  \"Error\": {\n    \"message\": \"Event validation failed\",\n    \"name\": \"ValidationError\",\n    \"errors\": {\n      \"name\": {\n        \"properties\": {\n          \"type\": \"required\",\n          \"message\": \"Path `{PATH}` is required.\",\n          \"path\": \"name\"\n        },\n        \"message\": \"Path `name` is required.\",\n        \"name\": \"ValidatorError\",\n        \"kind\": \"required\",\n        \"path\": \"name\"\n      }\n    }\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/controllers/users.js",
    "groupTitle": "Users",
    "name": "PostApiUsers",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/users"
      }
    ]
  },
  {
    "type": "POST",
    "url": "/api/users/gcm",
    "title": "Adds a gcm token to the user",
    "group": "Users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "gcm",
            "description": "<p>The gcm token to add</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n\t\"gcm\": \"d39wkskf93fkdkjf9e\"\n}",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "isAuthenticated"
      }
    ],
    "filename": "app/controllers/users.js",
    "groupTitle": "Users",
    "name": "PostApiUsersGcm",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/users/gcm"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "PUT",
    "url": "/api/users/group",
    "title": "Adds a user to a group",
    "group": "Users",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "group",
            "description": "<p>The name of the group to add the user to</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user",
            "description": "<p>The id of the user to add to the group</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n\t\"group\":\"admin\",\n\t\"user\":\"55e4b8ae1959b17a0777a816\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 404": [
          {
            "group": "Error 404",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "GroupNotFoundError",
            "description": "<p>The specified group was not found.</p> "
          },
          {
            "group": "Error 404",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "UserNotFoundError",
            "description": "<p>The specified user was not found.</p> "
          }
        ]
      }
    },
    "permission": [
      {
        "name": "inGroup(admin)"
      }
    ],
    "filename": "app/controllers/users.js",
    "groupTitle": "Users",
    "name": "PutApiUsersGroup",
    "sampleRequest": [
      {
        "url": "http://ccm.brentondurkee.com/api/users/group"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Authorization Key Header needed for almost all calls.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Authorization Example",
          "content": "{\n  \"Authorization\": \"Bearer {your key goes here}\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });