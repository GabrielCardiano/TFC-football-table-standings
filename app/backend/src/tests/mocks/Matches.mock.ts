const allMatches = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
  },
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 9,
    "awayTeamGoals": 0,
    "inProgress": true,
  }
]

const bodyRequest = {
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
}

const bodyRequestSameIds = {
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 16,
  "awayTeamGoals": 2,
  "inProgress": true
}

const bodyRequestIdNUll = {
  "homeTeamId": 999,
  "homeTeamGoals": 2,
  "awayTeamId": 666,
  "awayTeamGoals": 2,
  "inProgress": true
}

const createMatch = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true
}



export {
  allMatches,
  createMatch,
  bodyRequest,
  bodyRequestSameIds,
  bodyRequestIdNUll,
}