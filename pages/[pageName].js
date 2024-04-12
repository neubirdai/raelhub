import dynamic from 'next/dynamic';

const AceEditor = dynamic(
  async () => {
    const ace = await import('react-ace');
    require('ace-builds/src-noconflict/mode-yaml');
    require('ace-builds/src-noconflict/theme-monokai');
    return ace;
  },
  { ssr: false }
);

const DynamicPage = () => {
  return (
    <AceEditor
      mode="yaml"
      theme="monokai"
      name="yaml_editor"
      // other props as needed, e.g., value, onChange for controlled component
    />
  );
};

export default DynamicPage;

