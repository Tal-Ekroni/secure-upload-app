import aws from 'aws-sdk'

const region="us-east-1"

const s3= new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion:'v4'
})

export async function generateUploadURL(fileName,fileType){
    const params=({
        Bucket:bucketName,
        Key:fileName,
        Expires:120,
        ContentType: fileType, 
        
    })

const uploadURL= await s3.getSignedUrlPromise('putObject',params)

return uploadURL
}
