import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data } = req.body;
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const params = {
      Bucket: bucketName,
      Key: `filename.py`,
      Body: data,
      ContentType: 'text/plain'
    };

    try {
      await s3.headBucket({ Bucket: bucketName }).promise();
    } catch (error) {
      if (error.statusCode === 404) {
        await s3.createBucket({ Bucket: bucketName }).promise();
        console.log(`Bucket ${bucketName} created successfully`);
      } else {
        console.error('Error accessing bucket:', error);
        return res.status(500).json({ error: 'Error accessing bucket', details: error });
      }
    }

    try {
      await s3.upload(params).promise();
      console.log("uploaded doc to " + params)
      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('S3 upload error:', error);
      res.status(500).json({ error: 'Failed to upload file', details: error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
