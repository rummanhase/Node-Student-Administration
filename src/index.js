const express = require('./libExport').express
const app = express()
const bodyParser = require("body-parser");
require('./db')




const myRoute = require('./route')

const port = 8080


// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here



app.use('/' , myRoute)

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   