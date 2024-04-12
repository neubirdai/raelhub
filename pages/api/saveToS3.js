import AWS from 'aws-sdk';

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { data, keyName, metadata, comment } = req.body;

    // Validate keyName
    if (!keyName) {
      return res.status(400).json({ error: 'Key name is required' });
    }

    const fullMetadata = {
      ...metadata, // Spread existing metadata
      comment: comment // Add comment
    };

    // Prepare the S3 upload parameters
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME, // Use a fixed bucket name from environment variables
      Key: keyName, // Use the dynamic key name from the request
      Body: data,
      ContentType: 'text/plain',
      Metadata: fullMetadata
    };

    try {
      // Attempt to upload the file to the specified bucket with the dynamic key name and metadata
      await s3.upload(params).promise();
      console.log(`Uploaded document to ${params.Bucket}/${keyName} with metadata: ${JSON.stringify(fullMetadata)}.`);
      res.status(200).json({ message: 'File uploaded successfully', metadata });
    } catch (uploadError) {
      console.error('S3 upload error:', uploadError);
      res.status(500).json({ error: 'Failed to upload file', details: uploadError });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
