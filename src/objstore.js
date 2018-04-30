const aws = require('aws-sdk');

module.exports.initObjectStore = credentials => {
    const bucket = new aws.S3({
        accessKeyId: credentials.IAM_USER_KEY,
        secretAccessKey: credentials.IAM_USER_SECRET,
        Bucket: credentials.BUCKET_NAME
    });

    return (key, data, callback) => {
        bucket.upload({
            Bucket: credentials.BUCKET_NAME,
            Key: key,
            Body: data
        }, callback);
    }
};