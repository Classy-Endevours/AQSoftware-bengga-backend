const request  = require('request');
const crypto = require('crypto');
const qs = require('qs');


/* POST Login CURL 
    curl --location --request POST 'http://localhost:4000/api/v1/player/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "apiKey":"eXgNZpNIXr12VyQMBIW0t2J8OsbWXvTp",
        "oldId":"d58252e0-7266-11ea-89b2-0242ac110008"
    }'
*/

/* POST Score CURL
    curl --location --request POST 'http://localhost:4000/api/v1/player/postscore' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwib2xkSWQiOiJhYjU4MGEwMC02NTBlLTExZTYtYTRkMS0wMjQyYWMxMTAwMDUiLCJpYXQiOjE2MjQ5NjQxMzgsImV4cCI6MTYyNTgyODEzOCwiaXNzIjoiaHR0cHM6Ly93d3cuYmVuZ2dhLmNvbSJ9.hvGO0ikWNCxKCWR179Vfnkoc4dgog3Jakn49wVkul_A' \
    --header 'x-hash-signature: 80f89968854b60e37ffe8d5d2696ecc9d6c7ec19704ac486ae5f7599848525e0' \
    --header 'Content-Type: application/json' \
    --data-raw '[
        {
            "engagementId": 1, 
            "score": 100, 
            "recordTime": "2021-06-28 02:41:32"
        }, {
            "engagementId": 1, 
            "score": 12, 
            "recordTime": "2021-06-28 02:28:32"
        }, {
            "engagementId": 1, 
            "score": 10, 
            "recordTime": "2021-06-28 02:38:32"
        }, {
            "engagementId": 2, 
            "score": 1, 
            "recordTime": "2021-06-28 02:42:32"
        }
    ]' 
*/

/* GET Leaderboard CURL
    curl --location --request GET 'http://localhost:4000/api/v1/player/leaderboard?engagementId=1' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywib2xkSWQiOiJkNTgyNTJlMC03MjY2LTExZWEtODliMi0wMjQyYWMxMTAwMDgiLCJpYXQiOjE2MjUwMzIxMzQsImV4cCI6MTYyNTg5NjEzNCwiaXNzIjoiaHR0cHM6Ly93d3cuYmVuZ2dhLmNvbSJ9.tuPHdHIZIXv_0371HlPblbWhKXO36CIUFqFcgJqE7h4' \
    --header 'x-hash-signature: 0404534ca869dde9a90248f39bdf88a9a3b532b2f868bd460cd4ec9cf20e8cda' 
*/


/* GET User Data CURL
    curl --location --request GET 'http://localhost:4000/api/v1/player/userData?engagementId=1' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywib2xkSWQiOiJkNTgyNTJlMC03MjY2LTExZWEtODliMi0wMjQyYWMxMTAwMDgiLCJpYXQiOjE2MjUwMzIxMzQsImV4cCI6MTYyNTg5NjEzNCwiaXNzIjoiaHR0cHM6Ly93d3cuYmVuZ2dhLmNvbSJ9.tuPHdHIZIXv_0371HlPblbWhKXO36CIUFqFcgJqE7h4' \
    --header 'x-hash-signature: 0404534ca869dde9a90248f39bdf88a9a3b532b2f868bd460cd4ec9cf20e8cda'
 */


// const body = [
//     {
//         "engagementId":1,
//         "score":100,
//         "recordTime":"2021-06-28 02:41:32"
//     },{
//         "engagementId":2,
//         "score":12,
//         "recordTime":"2021-06-28 02:28:32"
//     },{
//         "engagementId":3,
//         "score":10,
//         "recordTime":"2021-06-28 02:38:32"
//     },{
//         "engagementId":1,
//         "score":1,
//         "recordTime":"2021-06-28 02:42:32"
//     }
// ]
// console.log(process.env.jwt_token_signing_key)

const body = {
	"publishDate": "2021-06-23 20:00:00",
	"channel": [{
			"funTypeFamilyId": "1",
			"engagementId": "1",
			"sortOrder": 1,
			"isSpecial": false,
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F373360622480KFO2SS.png",
			"topPlayers": 20,
			"tourneyWinnersUrl": "https://s3.amazonaws.com/famers/720/F1527703446214444ONL.jpg",
			"prizes": [{
					"fromRank": 1,
					"bmAmount": 10000,
					"name": "Rank 1"
				},
				{
					"fromRank": 2,
					"bmAmount": 5000,
					"name": "Rank 2"
				},
				{
					"fromRank": 3,
					"bmAmount": 5000,
					"name": "Rank 3"
				},
				{
					"fromRank": 4,
					"bmAmount": 5000,
					"name": "Rank 4"
				},
				{
					"fromRank": 5,
					"bmAmount": 5000,
					"name": "Rank 5"
				},
				{
					"fromRank": 6,
					"bmAmount": 5000,
					"name": "Rank 6"
				},
				{
					"fromRank": 7,
					"bmAmount": 5000,
					"name": "Rank 7"
				},
				{
					"fromRank": 8,
					"bmAmount": 5000,
					"name": "Rank 8"
				},
				{
					"fromRank": 9,
					"bmAmount": 5000,
					"name": "Rank 9"
				},
				{
					"fromRank": 10,
					"bmAmount": 5000,
					"name": "Rank 10"
				},
				{
					"fromRank": 11,
					"bmAmount": 5000,
					"name": "Rank 11"
				},
				{
					"fromRank": 12,
					"bmAmount": 5000,
					"name": "Rank 12"
				},
				{
					"fromRank": 13,
					"bmAmount": 5000,
					"name": "Rank 13"
				},
				{
					"fromRank": 14,
					"bmAmount": 5000,
					"name": "Rank 14"
				},
				{
					"fromRank": 15,
					"bmAmount": 5000,
					"name": "Rank 15"
				},
				{
					"fromRank": 16,
					"bmAmount": 5000,
					"name": "Rank 16"
				},
				{
					"fromRank": 17,
					"bmAmount": 5000,
					"name": "Rank 17"
				},
				{
					"fromRank": 18,
					"bmAmount": 5000,
					"name": "Rank 18"
				},
				{
					"fromRank": 19,
					"bmAmount": 5000,
					"name": "Rank 19"
				},
				{
					"fromRank": 20,
					"bmAmount": 5000,
					"name": "Rank 20"
				}
			]
		}, {
			"funTypeFamilyId": "1",
			"engagementId": "2",
			"sortOrder": 2,
			"isSpecial": true,
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F975957460773VBYSRH.png",
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F975957460733QQ4AI5.png",
			"joinType": 1,
			"topPlayers": 50,
			"joinFee": 200,
			"joinTicket": 1,
			"joinFeeType": 2,
			"potMoney": 0,
			"tourneyWinnersUrl": "https://s3.amazonaws.com/famers/720/F1527703446215LSCD0Z.jpg",
			"prizes": [{
					"fromRank": 1,
					"bmAmount": 30000,
					"name": "Rank 1"
				},
				{
					"fromRank": 2,
					"bmAmount": 10000,
					"name": "Rank 2"
				},
				{
					"fromRank": 3,
					"bmAmount": 10000,
					"name": "Rank 3"
				},
				{
					"fromRank": 4,
					"bmAmount": 5000,
					"name": "Rank 4"
				},
				{
					"fromRank": 5,
					"bmAmount": 5000,
					"name": "Rank 5"
				},
				{
					"fromRank": 6,
					"bmAmount": 5000,
					"name": "Rank 6"
				},
				{
					"fromRank": 7,
					"bmAmount": 5000,
					"name": "Rank 7"
				},
				{
					"fromRank": 8,
					"bmAmount": 5000,
					"name": "Rank 8"
				},
				{
					"fromRank": 9,
					"bmAmount": 5000,
					"name": "Rank 9"
				},
				{
					"fromRank": 10,
					"bmAmount": 5000,
					"name": "Rank 10"
				},
				{
					"fromRank": 11,
					"bmAmount": 1000,
					"name": "Rank 11"
				},
				{
					"fromRank": 12,
					"bmAmount": 1000,
					"name": "Rank 12"
				},
				{
					"fromRank": 13,
					"bmAmount": 1000,
					"name": "Rank 13"
				},
				{
					"fromRank": 14,
					"bmAmount": 1000,
					"name": "Rank 14"
				},
				{
					"fromRank": 15,
					"bmAmount": 1000,
					"name": "Rank 15"
				},
				{
					"fromRank": 16,
					"bmAmount": 1000,
					"name": "Rank 16"
				},
				{
					"fromRank": 17,
					"bmAmount": 1000,
					"name": "Rank 17"
				},
				{
					"fromRank": 18,
					"bmAmount": 1000,
					"name": "Rank 18"
				},
				{
					"fromRank": 19,
					"bmAmount": 1000,
					"name": "Rank 19"
				},
				{
					"fromRank": 20,
					"bmAmount": 1000,
					"name": "Rank 20"
				},
				{
					"fromRank": 21,
					"bmAmount": 500,
					"name": "Rank 21"
				},
				{
					"fromRank": 22,
					"bmAmount": 500,
					"name": "Rank 22"
				},
				{
					"fromRank": 23,
					"bmAmount": 500,
					"name": "Rank 23"
				},
				{
					"fromRank": 24,
					"bmAmount": 500,
					"name": "Rank 24"
				},
				{
					"fromRank": 25,
					"bmAmount": 500,
					"name": "Rank 25"
				},
				{
					"fromRank": 26,
					"bmAmount": 500,
					"name": "Rank 26"
				},
				{
					"fromRank": 27,
					"bmAmount": 500,
					"name": "Rank 27"
				},
				{
					"fromRank": 28,
					"bmAmount": 500,
					"name": "Rank 28"
				},
				{
					"fromRank": 29,
					"bmAmount": 500,
					"name": "Rank 29"
				},
				{
					"fromRank": 30,
					"bmAmount": 500,
					"name": "Rank 30"
				},
				{
					"fromRank": 31,
					"bmAmount": 500,
					"name": "Rank 31"
				},
				{
					"fromRank": 32,
					"bmAmount": 500,
					"name": "Rank 32"
				},
				{
					"fromRank": 33,
					"bmAmount": 500,
					"name": "Rank 33"
				},
				{
					"fromRank": 34,
					"bmAmount": 500,
					"name": "Rank 34"
				},
				{
					"fromRank": 35,
					"bmAmount": 500,
					"name": "Rank 35"
				},
				{
					"fromRank": 36,
					"bmAmount": 500,
					"name": "Rank 36"
				},
				{
					"fromRank": 37,
					"bmAmount": 500,
					"name": "Rank 37"
				},
				{
					"fromRank": 38,
					"bmAmount": 500,
					"name": "Rank 38"
				},
				{
					"fromRank": 39,
					"bmAmount": 500,
					"name": "Rank 39"
				},
				{
					"fromRank": 40,
					"bmAmount": 500,
					"name": "Rank 40"
				},
				{
					"fromRank": 41,
					"bmAmount": 500,
					"name": "Rank 41"
				},
				{
					"fromRank": 42,
					"bmAmount": 500,
					"name": "Rank 42"
				},
				{
					"fromRank": 43,
					"bmAmount": 500,
					"name": "Rank 43"
				},
				{
					"fromRank": 44,
					"bmAmount": 500,
					"name": "Rank 44"
				},
				{
					"fromRank": 45,
					"bmAmount": 500,
					"name": "Rank 45"
				},
				{
					"fromRank": 46,
					"bmAmount": 500,
					"name": "Rank 46"
				},
				{
					"fromRank": 47,
					"bmAmount": 500,
					"name": "Rank 47"
				},
				{
					"fromRank": 48,
					"bmAmount": 500,
					"name": "Rank 48"
				},
				{
					"fromRank": 49,
					"bmAmount": 500,
					"name": "Rank 49"
				},
				{
					"fromRank": 50,
					"bmAmount": 500,
					"name": "Rank 50"
				}
			]

		}, {
			"funTypeFamilyId": "1",
			"engagementId": "3",
			"sortOrder": 3,
			"isSpecial": true,
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F975957460774N4CEKW.png",
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F975957460733QQ4AI5.png",
			"joinType": 2,
			"topPlayers": 20,
			"joinFee": 100,
			"joinTicket": 1,
			"joinFeeType": 2,
			"potMoney": 0,
			"userCap": 50,
			"tourneyWinnersUrl": "https://s3.amazonaws.com/famers/720/F1527703446216OWM4ZQ.jpg",
			"prizes": [{
					"fromRank": 1,
					"bmAmount": 30000,
					"name": "Rank 1"
				},
				{
					"fromRank": 2,
					"bmAmount": 10000,
					"name": "Rank 2"
				},
				{
					"fromRank": 3,
					"bmAmount": 10000,
					"name": "Rank 3"
				},
				{
					"fromRank": 4,
					"bmAmount": 5000,
					"name": "Rank 4"
				},
				{
					"fromRank": 5,
					"bmAmount": 5000,
					"name": "Rank 5"
				},
				{
					"fromRank": 6,
					"bmAmount": 5000,
					"name": "Rank 6"
				},
				{
					"fromRank": 7,
					"bmAmount": 5000,
					"name": "Rank 7"
				},
				{
					"fromRank": 8,
					"bmAmount": 5000,
					"name": "Rank 8"
				},
				{
					"fromRank": 9,
					"bmAmount": 5000,
					"name": "Rank 9"
				},
				{
					"fromRank": 10,
					"bmAmount": 5000,
					"name": "Rank 10"
				},
				{
					"fromRank": 11,
					"bmAmount": 1000,
					"name": "Rank 11"
				},
				{
					"fromRank": 12,
					"bmAmount": 1000,
					"name": "Rank 12"
				},
				{
					"fromRank": 13,
					"bmAmount": 1000,
					"name": "Rank 13"
				},
				{
					"fromRank": 14,
					"bmAmount": 1000,
					"name": "Rank 14"
				},
				{
					"fromRank": 15,
					"bmAmount": 1000,
					"name": "Rank 15"
				},
				{
					"fromRank": 16,
					"bmAmount": 1000,
					"name": "Rank 16"
				},
				{
					"fromRank": 17,
					"bmAmount": 1000,
					"name": "Rank 17"
				},
				{
					"fromRank": 18,
					"bmAmount": 1000,
					"name": "Rank 18"
				},
				{
					"fromRank": 19,
					"bmAmount": 1000,
					"name": "Rank 19"
				},
				{
					"fromRank": 20,
					"bmAmount": 1000,
					"name": "Rank 20"
				}
			]

		}, {
			"funTypeFamilyId": "2",
			"engagementId": "1",
			"sortOrder": 4,
			"isSpecial": true,
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F9759574607080LGMQI.png",
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F9759574607080LGMQI.png",
			"joinType": 3,
			"targetScore": 100,
			"joinFee": 20,
			"joinTicket": 1,
			"joinFeeType": 1,
			"potMoney": 100000,
			"tourneyWinnersUrl": "https://s3.amazonaws.com/famers/720/F152770344621720WXET.jpg",
			"prizes": [{
				"fromRank": 1,
				"bmAmount": 100000,
				"name": "Pot Money"
			}]
		}, {
			"funTypeFamilyId": "2",
			"engagementId": "2",
			"sortOrder": 5,
			"isSpecial": true,
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F9759574607080LGMQI.png",
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F9759574607080LGMQI.png",
			"joinType": 4,
			"topPlayers": 50,
			"joinFee": 10,
			"joinTicket": 1,
			"joinFeeType": 1,
			"potMoney": 100000,
			"tourneyWinnersUrl": "https://s3.amazonaws.com/famers/720/F1527703446218NGUVZS.jpg",
			"prizes": [{
				"fromRank": 1,
				"bmAmount": 100000,
				"name": "Pot Money"
			}]
		}, {
			"funTypeFamilyId": "2",
			"engagementId": "3",
			"sortOrder": 1,
			"isSpecial": false,
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206681TZ1MGQ.png",
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F865150741378W1SAGB.jpg"
		}, {
			"funTypeFamilyId": "3",
			"engagementId": "1",
			"sortOrder": 2,
			"isSpecial": false,
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206681TZ1MGQ.png",
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F865150741378W1SAGB.jpg"
		}, {
			"funTypeFamilyId": "3",
			"engagementId": "2",
			"sortOrder": 3,
			"isSpecial": false,
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206681TZ1MGQ.png",
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F865150741378W1SAGB.jpg"
		}, {
			"funTypeFamilyId": "3",
			"engagementId": "3",
			"sortOrder": 4,
			"isSpecial": false,
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206681TZ1MGQ.png",
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F865150741378W1SAGB.jpg"
		}, {
			"funTypeFamilyId": "3",
			"engagementId": "2",
			"sortOrder": 5,
			"isSpecial": false,
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206681TZ1MGQ.png",
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F865150741378W1SAGB.jpg"
		}, {
			"funTypeFamilyId": "3",
			"engagementId": "1",
			"sortOrder": 1,
			"isSpecial": false,
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206682QANIWZ.png",
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206659XXBXUP.jpg"
		}, {
			"funTypeFamilyId": "2",
			"engagementId": "3",
			"sortOrder": 2,
			"isSpecial": false,
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206682QANIWZ.png",
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206659XXBXUP.jpg"
		}, {
			"funTypeFamilyId": "2",
			"engagementId": "2",
			"sortOrder": 3,
			"isSpecial": false,
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206682QANIWZ.png",
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206659XXBXUP.jpg"
		}, {
			"funTypeFamilyId": "2",
			"engagementId": "1",
			"sortOrder": 4,
			"isSpecial": false,
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206682QANIWZ.png",
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206659XXBXUP.jpg"
		}, {
			"funTypeFamilyId": "1",
			"engagementId": "3",
			"sortOrder": 5,
			"isSpecial": false,
			"postloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206682QANIWZ.png",
			"preloaderImageBig": "https://s3.amazonaws.com/famers/720/F884117206659XXBXUP.jpg"

		}, {
			"funTypeFamilyId": "1",
			"engagementId": "2",
			"sortOrder": 1,
			"isSpecial": false
		}, {
			"funTypeFamilyId": "1",
			"engagementId": "1",
			"sortOrder": 2,
			"isSpecial": false
		}, {
			"funTypeFamilyId": "1",
			"engagementId": "1",
			"sortOrder": 3,
			"isSpecial": false
		}
	]
}
const hash = crypto.createHmac('sha256', 'wgdAdaLAYbDkYge9xjgurlV53wWgmFSZG29RT0jcWFZLyD5QAfp7Ng5wpWtVVkg')// signing key to be replace with this
                .update(JSON.stringify(body),'utf8')
                .digest('hex');
console.log(hash)
// const options = {
//     'method': 'POST',
//     'url': 'http://localhost:4000/api/v1/player/scheduler',
//     'headers': {
//         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwib2xkSWQiOiJhYjU4MGEwMC02NTBlLTExZTYtYTRkMS0wMjQyYWMxMTAwMDUiLCJpYXQiOjE2MjQ5NjQxMzgsImV4cCI6MTYyNTgyODEzOCwiaXNzIjoiaHR0cHM6Ly93d3cuYmVuZ2dhLmNvbSJ9.hvGO0ikWNCxKCWR179Vfnkoc4dgog3Jakn49wVkul_A',
//         'Content-Type': 'application/json',
//         'x-hash-signature': hash
//     },
//     body: body,
//     json: true
// };
// console.log(options)
// request(options, function (error, response, body) {
//     if (error) {
//         console.log(error)
//         // throw new Error(error);
//     } else {
//         // console.log(response)
//         console.log(body);
//     }
// });



// const params = qs.stringify({
//     // numItems: 10,
//     engagementId: 1
// })
// // console.log(process.env.jwt_token_signing_key)
// const hashs = crypto.createHmac('sha256', process.env.jwt_token_signing_key)
//                 .update(params,'utf8')
//                 .digest('hex');
const option = {
  'method': 'GET',
  'url': `http://localhost:4000/api/v1/player/schedules`,//?${params}`,
  'headers': {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywib2xkSWQiOiJkNTgyNTJlMC03MjY2LTExZWEtODliMi0wMjQyYWMxMTAwMDgiLCJpYXQiOjE2MjUwMzIxMzQsImV4cCI6MTYyNTg5NjEzNCwiaXNzIjoiaHR0cHM6Ly93d3cuYmVuZ2dhLmNvbSJ9.tuPHdHIZIXv_0371HlPblbWhKXO36CIUFqFcgJqE7h4',
        // 'x-hash-signature': hashs
    },
  json: true
};
console.log(option)
request(option, function (error, response, body) {
    if (error) {
        console.log(error)
        // throw new Error(error);
    } else {
        // console.log(response)
        console.log(body);
    }
});