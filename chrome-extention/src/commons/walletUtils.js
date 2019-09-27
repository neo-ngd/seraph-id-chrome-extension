const downloadFile = (content, fileName, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

const readFile = (path) => {
  const reader = new FileReader();

  reader.onload = function(e) {
    const text = reader.result;
    console.log(text);
  };

  reader.readAsText(MissingFileHandle);
};

const readFileFromDisk = () => {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector = buildFileSelector();
  fileSelector.click();
}

export { downloadFile, readFileFromDisk };
