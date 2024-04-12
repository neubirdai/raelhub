import React, { useEffect, useState } from 'react';
import ReadOnlyEditor from '../components/ReadOnlyEditor';  // Ensure this is the correct import path
import Modal from './Modal'; // Adjust the path as necessary

const S3ObjectList = () => {
  const [objects, setObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/s3objects')
      .then(res => res.json())
      .then(data => {
        const enhancedData = data.map(obj => ({
          ...obj,
          templateType: obj.Metadata['templatetype'] || '-',
          comment: obj.Metadata['comment'] || '-'
        }));
        setObjects(enhancedData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching S3 objects:', error);
        setLoading(false);
      });
  }, []);

  const handleRowClick = (object) => {
    setSelectedObject(object);
  };

  const handleClose = () => {
    setSelectedObject(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ overflowY: 'auto', maxHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Comment</th>
            <th>Last Modified</th>
          </tr>
        </thead>
        <tbody>
          {objects.map((object, index) => (
            <tr key={index} onClick={() => handleRowClick(object)}>
              <td>{object.Key || '-'}</td>
              <td>{object.templateType}</td>
              <td>{object.comment}</td>
              <td>{object.LastModified || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={!!selectedObject} onClose={handleClose}>
        <ReadOnlyEditor initialContent={`Key: ${selectedObject?.Key}\nType: ${selectedObject?.templateType}\nComment: ${selectedObject?.comment}\nLast Modified: ${selectedObject?.LastModified}\nData:\n${selectedObject?.Data}`} />
      </Modal>
    </div>
  );
};

export default S3ObjectList;
