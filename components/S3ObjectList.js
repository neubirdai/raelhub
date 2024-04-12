import React, { useEffect, useState } from 'react';

const S3ObjectList = () => {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/s3objects')
      .then(res => res.json())
      .then(data => {
        // Extend the array to include 30 empty entries
        setObjects([...data, ...Array(30).fill({})]); // Filling with empty objects
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching S3 objects:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ overflowY: 'auto', maxHeight: '400px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>RAEL</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Type</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Comment</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          {objects.map((object, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{object.Key || '-'}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{object.Size ? `${object.Size} bytes` : '-'}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{'Comment'}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{object.LastModified || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default S3ObjectList;
