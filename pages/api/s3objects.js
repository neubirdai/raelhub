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
    Bucket: process.env.AWS_S3_BUCKET_NAME
  };

  try {
    // List all objects in the bucket
    const listData = await s3.listObjectsV2(params).promise();

    // Fetch metadata for each object
    const objectsWithMetadata = await Promise.all(
      listData.Contents.map(async (object) => {
        const metaParams = {
          Bucket: params.Bucket,
          Key: object.Key
        };

        try {
          // Get object metadata
          const metadata = await s3.headObject(metaParams).promise();
          const detailedObject = {
            Key: object.Key,
            LastModified: object.LastModified,
            Size: object.Size,
            Metadata: metadata.Metadata // This contains the metadata
          };

          // Log each object's details to the console
          console.log(`Object Details: Key=${object.Key}, Size=${object.Size}, LastModified=${object.LastModified}`);
          console.log(`Metadata: ${JSON.stringify(metadata.Metadata, null, 2)}`); // Pretty print metadata

          return detailedObject;
        } catch (metaError) {
          console.error("Error fetching metadata for object:", object.Key, metaError);
          return object; // Return the basic info if metadata fetch fails
        }
      })
    );

    console.log("Completed fetching details for all objects in the bucket:", params.Bucket);
    res.status(200).json(objectsWithMetadata);
  } catch (err) {
    console.error("Error fetching bucket contents:", err);
    res.status(500).json({ error: err.message });
  }
}
