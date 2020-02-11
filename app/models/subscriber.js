const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubscriberSchema = new Schema({
   endpoint: {type: String, unique: true},
   keys: Schema.Types.Mixed,
   createDate: {
       type: Date,
       default: Date.now
   }
});

const Subscriber = mongoose.model('subscriber', SubscriberSchema, 'subscribers');
module.exports = Subscriber
