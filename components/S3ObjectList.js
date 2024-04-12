import React, { useEffect, useState } from 'react';
import styles from './S3ObjectList.module.css';

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

  return (
    <div className="s3-object-list">
      <ul>
        {objects.map((object, index) => (
          <li key={index}>{object.Key}</li>
        ))}
      </ul>
    </div>
  );
};

export default S3ObjectList;
