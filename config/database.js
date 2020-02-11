const mongoose = require('mongoose')

const CONNECTION_URI = process.env.MONGO_CONNECTION || 'mongodb://localhost:27017/codes-database'

const setupDB = () => {
    mongoose.connect(CONNECTION_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            // returns a mongoose instance
            console.log('connected to db')
        })
        .catch(err => {
            console.log('db connection error', err)
        })
}

module.exports = setupDB