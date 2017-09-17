"use strict"

const Promise = require('bluebird');
const MongoClient = Promise.promisifyAll(require('mongodb'));
const fetch = require('node-fetch');

const I_FRESH_SIZE = 200


const connect = () => {
  return MongoClient.connectAsync('mongodb://192.168.10.100:27017/9gag')
}

const publishToFeatured = async () => {
  const db = await connect()
  let publishedNumber = 0

  const queue = await db.collection('featured_queue').find().toArray()
  for (let item of queue) {
    const post = await db.collection('fresh').findOne({id: item.id})
    if (post) {
      post.featured_time = item.featured_time
      await db.collection('featured').findAndModify(
        { id: post.id },
        [],
        {$setOnInsert: post},
        {new: true, upsert: true}
      )
      await db.collection('featured_queue').deleteOne({id: item.id})
      publishedNumber++
    }
  }
  db.close()
  console.log('Published', publishedNumber)
}

publishToFeatured()
.then(()=>{
  console.log('Done!')
})
.catch(err => {
  console.log(err)
  process.exit(1)
})