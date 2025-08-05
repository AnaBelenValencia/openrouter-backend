# OpenRouter Backend

This is a Node.js REST API that receives a paragraph-style incident description and returns a structured JSON object. It uses [OpenRouter](https://openrouter.ai/) as a proxy to the `mistralai/mistral-7b-instruct` model to extract and organize the information.

## Features

- Accepts natural language prompts (e.g. "My house caught fire while I was away")
- Returns structured JSON with the following fields:
  - `date`: date of the incident
  - `location`: location where the incident occurred
  - `description`: short summary
  - `injuries`: whether there were injuries (boolean)
  - `owner`: whether the user is the owner (boolean)
  - `complete`: whether all data is present (boolean)
  - `question`: follow-up question if information is missing
- Automatically detects and handles missing information
- API built with Express
- Connected to OpenRouter with full support for `.env` configuration
- Includes automated tests using Node.js built-in test runner (`node:test`) and `supertest`

---

## Requirements

- Node.js v18 or higher
- An [OpenRouter API key](https://openrouter.ai/keys)

---

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Configuration 
Create an .env file by .env.example

PORT=3000
OPENROUTER_API_KEY=your_openrouter_api_key

You can find your API key at: https://openrouter.ai/keys

## Running the server
```bash
npm run dev
```

By default, the server will run on: http://localhost:3000

## Api reference
POST /api/ia

## Successfull Response
```json
{
  "date": "2025-08-05",
  "location": "domicilio titular",
  "description": "Incendio en la cocina",
  "injuries": false,
  "owner": true,
  "complete": true,
  "question": ""
}
```

## Folder structure
```bash
.
├── src/
│   ├── app.js                  # Express app config
│   ├── index.js                # Entry point
│   ├── routes/
│   │   └── ia.routes.js        # POST /api/ia endpoint
│   ├── services/
│   │   └── openrouter.service.js  # OpenRouter logic
│   └── config/
│       └── prompts.config.js   # AI prompt definition
├── tests/
│   └── ia.routes.test.js       # End-to-end route tests
├── .env                        # Environment variables (not committed)
├── .gitignore                  # Ignored files
├── README.md                   # Project documentation
```

## Testing
```bash
npm test
```