define({ "api": [
  {
    "type": "get",
    "url": "/api/events",
    "title": "Get all events.",
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
            "description": "<p>unique string for event</p> "
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
          "title": "Success-Response",
          "content": "[\n{\n \"_id\": \"55bd34d9b70a934b24e952e6\",\n \"title\": \"first event\",\n \"location\": \"Reedemer West Side\",\n \"date\": \"2015-09-14T04:00:00.000Z\",\n \"description\": \"This is the first event\",\n \"lat\": 40.786122,\n \"lng\": -73.975738,\n \"__v\": 0,\n \"version\": 0\n}]",
          "type": "json"
        }
      ]
    },
    "permission": [
      {
        "name": "authenticated"
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
    "title": "Create new event.",
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
        ],
        "System Set": [
          {
            "group": "System Set",
            "type": "<p>Number</p> ",
            "optional": true,
            "field": "version",
            "description": "<p>=0 Default value.</p> "
          },
          {
            "group": "System Set",
            "type": "<p>Number</p> ",
            "optional": true,
            "field": "lat",
            "description": "<p>Set by exisiting location value or by geocoding address</p> "
          },
          {
            "group": "System Set",
            "type": "<p>Number</p> ",
            "optional": true,
            "field": "lng",
            "description": "<p>Set by exisiting location value or by geocoding address</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Sample-Request",
          "content": "{\n\"title\": \"newevent\"\n\"location\": \"New\"\n\"date\": \"6/14/2015\"\n\"description\": \"First Event\"\n\"address\": \"1003 New Street, New York, New York, 30902\"\n}",
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
          "content": "{\n\"Error\" \"No location found and no address given\"\n}",
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
        "name": "group can write events"
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
  }
] });