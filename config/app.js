const express = require('express');
const app = express();
const cors = require('cors')
// const webpush = require('web-push')

// webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY)

app.use(express.json())
app.use(cors())
// const path = require('path') 
// const dirPath = __dirname.replace('\config', '')
// app.use(express.static(path.join(dirPath,"client/build"))) 

// app.set('hey', 'hello')

module.exports = app 