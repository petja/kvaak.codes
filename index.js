const express = require('express')
const app = express()

const {PORT} = require('./config')

app.use(express.static('public'))

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(PORT, () => console.log(`Duck app listening on port ${PORT}!`))
