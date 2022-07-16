import aws from 'aws-sdk'

import dotenv from 'dotenv';
dotenv.config();

const region = "us-east-1"
const bucketName = "upload-direct-s3-cmp"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY


const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export async function generateUploadURL(fileName, fileType) {
    try {
        const params = ({
            Bucket: bucketName,
            Key: fileName,
            Expires: 120,
            ContentType: fileType,

        })
        const uploadURL = await s3.getSignedUrlPromise('putObject', params)
        return uploadURL
    } catch (err) {
        console.log('while generating url', err)
        throw err
    }
}
