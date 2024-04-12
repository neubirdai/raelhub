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

    // Fetch metadata and data for each object
    const objectsWithMetadataAndData = await Promise.all(
      listData.Contents.map(async (object) => {
        const metaParams = {
          Bucket: params.Bucket,
          Key: object.Key
        };

        try {
          // Get object metadata
          const metadata = await s3.headObject(metaParams).promise();
          // Get object data
          const data = await s3.getObject(metaParams).promise();
          const detailedObject = {
            Key: object.Key,
            LastModified: object.LastModified,
            Size: object.Size,
            Metadata: metadata.Metadata, // This contains the metadata
            Data: data.Body.toString('utf-8') // Assuming the object's data is text
          };

          // Log each object's details to the console
          console.log(`Object Details: Key=${object.Key}, Size=${object.Size}, LastModified=${object.LastModified}`);
          console.log(`Metadata: ${JSON.stringify(metadata.Metadata, null, 2)}`);
          console.log(`Data: ${detailedObject.Data.slice(0, 100)}...`); // Log first 100 characters

          return detailedObject;
        } catch (metaError) {
          console.error("Error fetching metadata or data for object:", object.Key, metaError);
          return object; // Return basic info if fetch fails
        }
      })
    );

    console.log("Completed fetching details for all objects in the bucket:", params.Bucket);
    res.status(200).json(objectsWithMetadataAndData);
  } catch (err) {
    console.error("Error fetching bucket contents:", err);
    res.status(500).json({ error: err.message });
  }
}
