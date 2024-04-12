// components/PythonEditor.js
import React, { useState } from 'react';
import AceEditor from 'react-ace';

// Import the mode for Python and a theme from ace-builds
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';  // You can choose other themes as needed

const PythonEditor = ({ initialContent }) => {
  const [content, setContent] = useState(initialContent);

  const handleChange = (newValue) => {
    setContent(newValue);
  };

  return (
    <AceEditor
      mode="python"                     // Set the mode to Python for syntax highlighting
      theme="monokai"                   // Set the theme to monokai for a dark theme syntax highlighting
      onChange={handleChange}
      name="python_editor"              // Unique name for the editor instance
      value={content}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}        // Highlights the line the cursor is on
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 4,
      }}
      style={{ width: '100%', height: '500px' }}  // Set the dimensions as required
    />
  );
};

export default PythonEditor;

