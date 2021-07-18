Copy the .sample.env file to .env and change the variables

**Include the below npm modules for generating signature**
```
const crypto = require('crypto');
const qs = require('qs');
```

**POST Login CURL **
```
    curl --location --request POST 'http://localhost:4000/api/v1/player/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "apiKey":"eXgNZpNIXr12VyQMBIW0t2J8OsbWXvTp",
        "oldId":"d58252e0-7266-11ea-89b2-0242ac110008"
    }'
```

**Note: We need to save Response header (Authorization) value from the api.**


Code to create Hmac for all APIs
```
for POST REQUEST

crypto.createHmac('sha256', SIGNING KEY)
                .update(JSON.stringify(body),'utf8')
                .digest('hex');

FOR GET REQUEST
crypto.createHmac('sha256', SIGNING KEY)
                .update(qs.stringify(queryParams),'utf8')
                .digest('hex');                
             
```

**Pass the value from above code to the headers of eveyr API (except login) as X-Hash-Signature keyname**


**POST Score CURL**
```
    curl --location --request POST 'http://localhost:4000/api/v1/player/postscore' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwib2xkSWQiOiJhYjU4MGEwMC02NTBlLTExZTYtYTRkMS0wMjQyYWMxMTAwMDUiLCJpYXQiOjE2MjQ5NjQxMzgsImV4cCI6MTYyNTgyODEzOCwiaXNzIjoiaHR0cHM6Ly93d3cuYmVuZ2dhLmNvbSJ9.hvGO0ikWNCxKCWR179Vfnkoc4dgog3Jakn49wVkul_A' \
    --header 'x-hash-signature: 80f89968854b60e37ffe8d5d2696ecc9d6c7ec19704ac486ae5f7599848525e0' \
    --header 'Content-Type: application/json' \
    --data-raw '[
        {
            "engagementId": 1, 
            "score": 100, 
            "recordTime": "2021-06-28 02:41:32"
        }, {..},{..}...
    ]'
```

**GET Leaderboard CURL**
```
    curl --location --request GET 'http://localhost:4000/api/v1/player/leaderboard?numItems=10&engagementId=1' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywib2xkSWQiOiJkNTgyNTJlMC03MjY2LTExZWEtODliMi0wMjQyYWMxMTAwMDgiLCJpYXQiOjE2MjUwMzIxMzQsImV4cCI6MTYyNTg5NjEzNCwiaXNzIjoiaHR0cHM6Ly93d3cuYmVuZ2dhLmNvbSJ9.tuPHdHIZIXv_0371HlPblbWhKXO36CIUFqFcgJqE7h4' \
    --header 'x-hash-signature: 0404534ca869dde9a90248f39bdf88a9a3b532b2f868bd460cd4ec9cf20e8cda'
```

**GET User Data CURL**
```
    curl --location --request GET 'http://localhost:4000/api/v1/player/leaderboard/userData?engagementId=1' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywib2xkSWQiOiJkNTgyNTJlMC03MjY2LTExZWEtODliMi0wMjQyYWMxMTAwMDgiLCJpYXQiOjE2MjUwMzIxMzQsImV4cCI6MTYyNTg5NjEzNCwiaXNzIjoiaHR0cHM6Ly93d3cuYmVuZ2dhLmNvbSJ9.tuPHdHIZIXv_0371HlPblbWhKXO36CIUFqFcgJqE7h4' \
    --header 'x-hash-signature: 0404534ca869dde9a90248f39bdf88a9a3b532b2f868bd460cd4ec9cf20e8cda'
```
