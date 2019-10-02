const downloadFile = (content, fileName, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

const createFileInput = () => {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');

  return fileSelector;
}
export { downloadFile, createFileInput };
