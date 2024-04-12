import React, { useEffect, useState } from 'react';

const S3ObjectList = () => {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/s3objects')
      .then(res => res.json())
      .then(data => {
        setObjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching S3 objects:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  if (loading) return <p>Loading...</p>;
  if (!objects || objects.length === 0) return <p>No objects found.</p>;

  return (
    <div>
        <ul>
            {Array.isArray(objects) ? objects.map((object, index) => (
                <li key={index}>{object.Key}</li>
            )) : <p>No objects or invalid data format.</p>}
        </ul>
    </div>
);


};

export default S3ObjectList;

