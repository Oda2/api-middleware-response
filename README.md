# API Middleware Response
Middleware for API HTTP Response

[![Build Status](https://circleci.com/gh/Oda2/api-middleware-response.svg?style=svg)](https://circleci.com/gh/Oda2/api-middleware-response)
[![npm](https://img.shields.io/npm/dm/api-middleware-response.svg?)](https://www.npmjs.com/package/api-middleware-response)
[![License](https://img.shields.io/npm/l/api-middleware-response.svg?maxAge=2592000?style=plastic)](https://github.com/oda2/api-middleware-response/blob/master/LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/Oda2/api-middleware-response/badge.svg?branch=master)](https://coveralls.io/github/Oda2/api-middleware-response?branch=master)

## Install

```sh
$ npm install api-middleware-response --save
```
## Setup

```js
var express = require('express')
var apiresponse = require('api-middleware-response');
var app = express();

app.use(apiresponse());
app.listen(3000);
```


## How to use
Example with object
```js
app.get('/', function(req, res) {
  var data = { 
    id: 10,
    name: "Renato"
  };
  
  res.data.setObject(data);
}
```

Output
```js
{
    "id": "10",
    "name": "Renato"
}
```

Example with array object
```js
app.get('/', function(req, res) {
  var data = [
  { 
    "id": "10",
    "name": "Renato"
  },
  { 
    "id": "20",
    "name": "André"
  }
  ];
  
  res.data.setArrayObject(data);
}
```

Output
```js
{
  "success": "true",
  "paging": {
    "total": "2",
    "pages": "1",
    "currentPage": "1",
    "perPage": "15"
  },
  "data": [
  { 
    "id": "10",
    "name": "Renato"
  },
  { 
    "id": 20,
    "name": "André"
  }
  ]
}
```

### Roadmap

## License
Licensed under the [MIT](https://github.com/Oda2/api-middleware-response/blob/master/LICENSE) License.