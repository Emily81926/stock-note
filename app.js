const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('this is a backend side project')
})

app.listen(port, () => {
  console.log(`App is running on localhost:${port}`)
})