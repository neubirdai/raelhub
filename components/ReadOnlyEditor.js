import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';

const ReadOnlyEditor = ({ initialContent }) => {
  const [content, setContent] = useState(initialContent);

  return (
    <div>
      <AceEditor
        mode="yaml"
        theme="monokai"
        name="readonly_editor"
        value={content}
        fontSize={14}
        readOnly={true}
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
    </div>
  );
};

export default ReadOnlyEditor;

