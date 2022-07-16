import express from 'express'
import cors from 'cors'
import { generateUploadURL } from './s3.js'


var app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
const port = 3030

app.get('/api/s3url', async (req, res) => {
    try {
        const { fileName, fileType } = req.query
        const url = await generateUploadURL(fileName, fileType)
        res.send({ url })
    } catch (err) {
        console.log('while generating url', err)
        throw err
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})