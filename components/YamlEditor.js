// components/YamlEditor.js
import React, { useState } from 'react';
import AceEditor from 'react-ace';

// Import the mode for YAML and themes from ace-builds
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/theme-monokai'; // or any other theme you prefer

const YamlEditor = ({ initialContent }) => {
  const [content, setContent] = useState(initialContent);

  const handleChange = (newValue) => {
    setContent(newValue);
  };

  return (
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
  );
};

export default YamlEditor;

