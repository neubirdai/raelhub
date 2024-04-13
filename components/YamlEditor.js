import React, { useState } from 'react';
import AceEditor from 'react-ace';

// Import the mode for YAML and themes from ace-builds
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai'; // or any other theme you prefer

const YamlEditor = ({ initialContent }) => {
  const [content, setContent] = useState(initialContent);
  const [keyName, setKeyName] = useState('');  // State to hold the key name
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
      templateType: "CHAIN"
    };

    fetch('/api/saveToS3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: content, keyName, metadata, comment }),
    })
    .then(response => response.json())
    .then(data => alert('File saved successfully as ' + keyName + ' with metadata.'))
    .catch(error => console.error('Error saving file:', error));
  };


  return (

    <div>
      <AceEditor
        mode="yaml"                    // Set the mode to YAML for syntax highlighting
        theme="monokai"                // Set the theme to monokai for a dark theme syntax highlighting
        onChange={handleChange}
        name="yaml_editor"             // Unique name for the editor instance
        value={content}
        fontSize={14}
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{ width: '100%', height: '500px' }}  // Set the dimensions as required
      />
      <div style={{ marginTop: '20px' }}>
          <input
              type="text"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              placeholder="Chain name"
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

export default YamlEditor;
