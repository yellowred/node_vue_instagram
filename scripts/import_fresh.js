"use strict"

const Promise = require('bluebird');
const MongoClient = Promise.promisifyAll(require('mongodb'));
const fetch = require('node-fetch');

const I_FRESH_SIZE = 200


const connect = () => {
  return MongoClient.connectAsync('mongodb://192.168.10.100:27017/9gag')
  // let db = await MongoClient.connect('mongodb://127.0.0.1:27017/notificator');
}

const importFresh = async () => {
  let db = await connect()

  let importedNumber = 0
  let minId = 0
  let arrayOfPosts = []
  
  const loadMore = async (maxId) => {
    console.log('Import with maxId =', maxId, '. Array len =', arrayOfPosts.length);
        
    if (!maxId || !/[0-9]+/.test(maxId)) {
      maxId = ''
    }
    let buf = await fetch('https://www.instagram.com/9gag/media/?max_id=' + maxId)
    let batch = await buf.json()
    arrayOfPosts = arrayOfPosts.concat(batch.items)
    console.log('Batch len =', arrayOfPosts.length);
    console.log('Array len =', arrayOfPosts.length);
    if (arrayOfPosts.length < I_FRESH_SIZE && batch.more_available) {
      await loadMore(batch.items.reduce((min, item) => {
        let currentId = item.id.split('_')[0]
        return min > currentId ? currentId : min
      }))
    }
  
  }
  
  await loadMore()

  arrayOfPosts.forEach(async item => {
    await db.collection('fresh').update({ id: item.id }, item, { upsert: true })
  })
  db.close()
}


  

importFresh()
.then(()=>{
  console.log('Done!')
})