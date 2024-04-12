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
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Key</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Last Modified</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Size</th>
          </tr>
        </thead>
        <tbody>
          {objects.map((object, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{object.Key || '-'}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{object.LastModified || '-'}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{object.Size ? `${object.Size} bytes` : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default S3ObjectList;
