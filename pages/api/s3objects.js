import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export default async function handler(req, res) {
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'your-bucket-name' // replace with your bucket name
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    res.status(200).json(data.Contents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

