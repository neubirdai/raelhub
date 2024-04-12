import React, { useEffect, useState } from 'react';
import ReadOnlyEditor from '../components/ReadOnlyEditor';  // Adjust the path as necessary
import Modal from './Modal';  // Adjust the path as necessary
import styles from './S3ObjectList.module.css'; // Adjust path as necessary



const S3ObjectList = () => {
  const [objects, setObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
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

  const handleRowClick = (object) => {
    setSelectedObject(object);
  };

  const handleClose = () => {
    setSelectedObject(null);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ overflowY: 'auto', maxHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <table className={styles.styledTable}>
        <thead className={styles.thead}>
          <tr className={styles.tbodyTr}>
            <th className={styles.thTd}>Name</th>
            <th className={styles.thTd}>Type</th>
            <th className={styles.thTd}>Comment</th>
          </tr>
        </thead>
        <tbody>
          {objects.map((object, index) => (
            <tr key={index} onClick={() => handleRowClick(object)} className={styles.tbodyTr}>
              <td className={styles.thTd}>{object.Key || '-'}</td>
              <td className={styles.thTd}>{object.Metadata['templatetype']}</td>
              <td className={styles.thTd}>{object.Metadata['comment']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedObject && (
        <Modal isOpen={!!selectedObject} onClose={handleClose}>
          <ReadOnlyEditor initialContent={`Key: ${selectedObject?.Key}\nURI: ${selectedObject?.URL}\nType: ${selectedObject?.Metadata['templatetype']}\nComment: ${selectedObject?.Metadata['comment']}\nModified: ${selectedObject?.LastModified}\n\n${selectedObject?.Data}`} />
        </Modal>
      )}
    </div>
  );
};

export default S3ObjectList;
