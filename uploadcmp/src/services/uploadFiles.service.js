import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api/'

var axios = Axios.create({
    withCredentials: false
})

async function getS3URL(fileName, fileType) {
    const { data } = await axios.get(BASE_URL + 's3url', { params: { fileName, fileType } })
    return data.url
}
async function uploadFile(s3url, fileToUpload) {
    const headers = {
        "Content-Type": fileToUpload.type
    }

    const data = await axios.put(s3url, fileToUpload, {
        headers
    })

    if (data.status === 200) {
        return "Succsess"
    }
}
export const filesService = {
    getS3URL,
    uploadFile
}