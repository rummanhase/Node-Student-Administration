const mongoose = require('./libExport').mongoose

const url = 'mongodb://localhost:27017/School'

module.exports = mongoose.connect(url , { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log('dbConnected');
    })
    .catch(err=> console.log(err))

