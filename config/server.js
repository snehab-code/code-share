const app = require('./app')
const port = process.env.PORT || 3010; 
const server = app.listen(port, () => {
    console.log('listening on ' + port)
    const router = require('./routes')
    app.use('/', router)
    const path = require('path') 
    const dirPath = __dirname.replace('\config', '')
    app.get("*",(req,res) => { 
    res.sendFile(path.join(dirPath + "/client/build/index.html")) 
    }) 
}) 

module.exports = server