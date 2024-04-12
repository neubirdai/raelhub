import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

const PythonEditor = ({ initialContent }) => {
  const [content, setContent] = useState(initialContent);

  const handleChange = (newValue) => {
    setContent(newValue);
  };

  const handleSave = () => {
    fetch('/api/saveToS3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: content }),
    })
    .then(response => response.json())
    .then(data => alert('File saved successfully'))
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
      <button onClick={handleSave} style={{ marginTop: '10px' }}>Save to S3</button>
    </div>
  );
};

const handleSave = () => {
    fetch('/api/saveToS3', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: content }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(`Failed to upload: ${data.error}`);
        } else {
            alert(`File uploaded successfully to bucket: ${process.env.AWS_S3_BUCKET_NAME}`);
        }
    })
    .catch(error => {
        console.error('Error saving file:', error);
        alert('Failed to upload file. Check the console for more information.');
    });
};


export default PythonEditor;

