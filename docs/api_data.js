define({ "api": [
  {
    "type": "get",
    "url": "/api/events",
    "title": "Get all events",
    "group": "Events",
    "version": "0.2.0",
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
    "type": "get",
    "url": "/api/events",
    "title": "Get all events",
    "group": "Events",
    "version": "0.1.0",
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
    "filename": "app/controllers/_apidoc.js",
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
    "version": "0.1.0",
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
    "version": "0.1.0",
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
    "type": "POST",
    "url": "/api/groups",
    "title": "Create new group",
    "group": "Groups",
    "version": "0.1.0",
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
    "type": "GET",
    "url": "/api/locations",
    "title": "Get all locations",
    "group": "Locations",
    "version": "0.1.0",
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
    "version": "0.1.0",
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
    "type": "GET",
    "url": "/api/messages",
    "title": "Get all messages",
    "group": "Messages",
    "version": "0.2.0",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n{\n    \"_id\": \"55c5527f8efd394f3634c762\",\n    \"to\": \"55c54d8c374fcd3b332085d6\",\n    \"simpleTo\": \"minister\",\n    \"subject\": \"Hello\",\n    \"topic\": \"55c5527f8efd394f3634c76a\",\n    \"from\": \"55c54d8c374fcd3b332085d1\",\n    \"date\": \"2015-09-09T04:00:00.000Z\",\n    \"message\": \"Hey guys, welcome to RUF\",\n    \"version\": 0\n  },\n  {...},\n]",
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
    "description": "<p>Gets messages addressed to the groups of the current user</p> ",
    "version": "0.2.0",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example",
          "content": "[\n{\n    \"_id\": \"55c5527f8efd394f3634c762\",\n    \"to\": \"55c54d8c374fcd3b332085d6\",\n    \"simpleTo\": \"minister\",\n    \"subject\": \"Hello\",\n    \"topic\": \"55c5527f8efd394f3634c76a\",\n    \"from\": \"55c54d8c374fcd3b332085d1\",\n    \"date\": \"2015-09-09T04:00:00.000Z\",\n    \"message\": \"Hey guys, welcome to RUF\",\n    \"version\": 0\n  },\n  {...},\n]",
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
    "version": "0.2.0",
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
    "filename": "app/controllers/messages.js",
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
    "type": "get",
    "url": "/api/signups",
    "title": "Get all signups",
    "group": "Signups",
    "version": "0.1.0",
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
          "content": "[\n  {\n    \"_id\": \"55c554107d7078ab36912c7d\",\n    \"name\": \"Small Group\",\n    \"dateInfo\": \"Every Wednesday at 7:00pm\",\n    \"location\": \"The house\",\n    \"address\": \"75 Third Avenue, 10003\",\n    \"description\": \"Our weekly small group event!\",\n    \"__v\": 0,\n    \"version\": 0,\n    \"memberCount\": 0,\n    \"members\": []\n  },\n  {...}\n]",
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
    "version": "0.1.0",
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
    "version": "0.1.0",
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
    "type": "GET",
    "url": "/api/topics",
    "title": "Get all Topics",
    "group": "Topics",
    "version": "0.1.0",
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
    "version": "0.1.0",
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
  }
] });