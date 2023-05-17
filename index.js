import express from 'express'
import { getData } from './controllers/dataController.js'
const app = express()
const port = 3000

app.get('/', async (req, res) => {
  let url = 'https://developer.chrome.com/'
  let response = await getData(url)
  res.status(200).json({res: response})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})