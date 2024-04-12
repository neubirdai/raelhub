import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

const PythonEditor = ({ initialContent }) => {
  const [content, setContent] = useState(initialContent);
  const [keyName, setKeyName] = useState('');
  const [comment, setComment] = useState('');

  const handleChange = (newValue) => {
    setContent(newValue);
  };

  const handleSave = () => {
      // Check if keyName is empty
      if (!keyName) {
          alert('Please enter a key name.');
          return;
      }

      const metadata = {
          templateType: "PROMPT"
      };

      fetch('/api/saveToS3', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: content, keyName, metadata, comment }), // Send content, key name, and metadata
      })
          .then(response => response.json())
          .then(data => alert('File saved successfully as ' + keyName + ' with metadata.'))
          .catch(error => console.error('Error saving file:', error));
  };

  return (
    <div>
      <AceEditor
        mode="python"
        theme="monokai"
        onChange={handleChange}
        name="python_editor"
        value={content}
        fontSize={14}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 4,
        }}
        style={{ width: '100%', height: '500px' }}
      />
      <input
          type="text"
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          placeholder="Enter key name"
          style={{ marginTop: '10px', marginRight: '10px' }}
      />
      <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter comment"
          style={{ marginTop: '10px', marginRight: '10px' }}
      />
      <button onClick={handleSave} style={{ marginTop: '10px' }}>Save to S3</button>
    </div>
  );
};

export default PythonEditor;

