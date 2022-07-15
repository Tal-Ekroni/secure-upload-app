import express from 'express'
import cors from 'cors'
import { generateUploadURL } from './s3.js'

var app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
const port = 3030

app.get('/api/s3url', async (req, res) => {
    const {fileName,fileType}=req.query
    const url = await generateUploadURL(fileName,fileType)
    res.send({ url })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})