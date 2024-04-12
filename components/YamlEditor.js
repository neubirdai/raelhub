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

export default YamlEditor;
