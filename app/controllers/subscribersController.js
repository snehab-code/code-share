const Subscriber = require('../models/subscriber')
const webpush = require('web-push')

module.exports.create = (req,res) => {
    const subscriber= new Subscriber(req.body);
    subscriber.save((err, subscription) => {
        if (err) {
            console.error(`Error occurred while saving subscription. Err: ${err}`);
            res.status(500).json({
                error: 'Technical error occurred'
            });
        } else {
            const payload = JSON.stringify({
                title: 'Hello!',
                body: 'It works.',
              })
            console.log('ELSE',subscription)
            webpush.sendNotification(subscription, payload)
            .then(result => console.log('RESULT',result))
            .catch(e => console.log(e.stack))
            res.json({
                data: 'Subscription saved.'
            });
        }
    })
   
}
