import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

export default async function handler(req, res) {
  const s3 = new AWS.S3();
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  const region = process.env.AWS_REGION;
  const params = {
    Bucket: bucketName
  };

  try {
    const listData = await s3.listObjectsV2(params).promise();

    const objectsWithMetadataAndData = await Promise.all(
      listData.Contents.map(async (object) => {
        const metaParams = {
          Bucket: bucketName,
          Key: object.Key
        };

        try {
          const metadata = await s3.headObject(metaParams).promise();
          const data = await s3.getObject(metaParams).promise();
          const detailedObject = {
            Key: object.Key,
            LastModified: object.LastModified,
            Size: object.Size,
            Metadata: metadata.Metadata,
            Data: data.Body.toString('utf-8'), // Assuming the object's data is text
            URL: `https://${bucketName}.s3.${region}.amazonaws.com/${encodeURIComponent(object.Key)}`
          };

          console.log(`Object Details: Key=${object.Key}, Size=${object.Size}, LastModified=${object.LastModified}`);
          console.log(`Metadata: ${JSON.stringify(metadata.Metadata, null, 2)}`);
          console.log(`Data: ${detailedObject.Data.slice(0, 100)}...`);
          console.log(`URL: ${detailedObject.URL}`);

          return detailedObject;
        } catch (metaError) {
          console.error("Error fetching metadata or data for object:", object.Key, metaError);
          return { ...object, Error: 'Failed to fetch metadata or data' }; // Include error info
        }
      })
    );

    console.log("Completed fetching details for all objects in the bucket:", bucketName);
    res.status(200).json(objectsWithMetadataAndData);
  } catch (err) {
    console.error("Error fetching bucket contents:", err);
    res.status(500).json({ error: err.message });
  }
}
