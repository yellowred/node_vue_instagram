"use strict";
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const morgan = require('morgan')
const bluebird = require('bluebird')

const redis = require("redis")
bluebird.promisifyAll(redis);
const RedisClient = redis.createClient(6379, '192.168.10.100')
RedisClient.expireat('featured', parseInt((+new Date)/1000) + 60);
const REDIS_CACHE_TTL = 60 * 1000
const REDIS_MAX_RANGE = 60 * 1000

let dbConn = null
app.use(morgan('combined'))

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/', function (req, res) {
  res.send('OK')
})

app.get('/fresh', function (req, res) {
  
  dbConn.collection('fresh').find().sort({ created_time: -1 }).toArray(function (err, result) {
    if (err) {
      console.log(err)
      res.status(500);
      res.send(err.message);
    } else {
      res.send(result)
    }
  })
  
})

app.get('/featured', function (req, res) {
  
  RedisClient.zrevrangeAsync('featured', 0, REDIS_MAX_RANGE)
    .then((result) => {
      if (result && Array.isArray(result) && result.length > 0) {
        console.log('Got from cache')
        res.send(result.map(item => JSON.parse(item)))
      } else {
        dbConn.collection('featured').find().sort({ featured_time: -1 }).toArray(function (err, result) {
          if (err) {
            console.log(err)
            res.status(500);
            res.send(err.message);
          } else {
      
            result.forEach(item => {
              let date = new Date(item.featured_time)
              RedisClient.zadd("featured", date.getTime(), JSON.stringify(item));
            })
            setInterval(()=>{
              RedisClient.zremrangebyrank('featured', 0, result.length - 1)
            }, REDIS_CACHE_TTL)
            
            console.log('Got from db')
            res.send(result)
          }
        })
      }
    })
  

})

app.patch('/fresh/:id/featured', function (req, res) {

  let id = req.params.id
  dbConn.collection('featured_queue').findAndModify(
    { id },
    [],
    {$setOnInsert: { id, featured_time: new Date() }},
    {new: true, upsert: true},
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )

})

MongoClient.connect('mongodb://192.168.10.100:27017/9gag', function (err, db) {
  if (err) throw err

  dbConn = db
  app.listen(3000, function () {
    console.log('9GAG api is listening on port 3000!')
  })
})

process.on('uncaughtException', function (err) {
  console.log('uncaughtException', err, err.stack)

  dbConn.close()
  
  process.exit(1)
})

