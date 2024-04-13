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
      if (!keyName) {
          alert('Please enter a template name.');
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
      <div style={{ marginTop: '20px' }}>
        <input
          type="text"
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          placeholder="Prompt name"
          style={{
              marginRight: '10px',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#f0f0f0', // Light gray for input background to differentiate from button
              color: 'black',
              width: 'auto', // Adjust width as needed
              flexGrow: 1  // Allows input to fill available space
          }}
        />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment"
          style={{
              marginRight: '10px',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: '#f0f0f0', // Light gray for input background to differentiate from button
              color: 'black',
              width: 'auto', // Adjust width as needed
              flexGrow: 1  // Allows input to fill available space
          }}
        />
        <button
            onClick={handleSave}
            style={{
                marginTop: '10px',
                backgroundColor: '#008080', // Teal color
                color: 'white', // White text color
                border: 'none', // Remove default border
                borderRadius: '5px', // Soft edges with a slight roundness
                padding: '10px 15px', // Comfortable padding
                cursor: 'pointer' // Pointer cursor on hover
            }}
        >
            Save
        </button>
      </div>
    </div>
  );
};

export default PythonEditor;

