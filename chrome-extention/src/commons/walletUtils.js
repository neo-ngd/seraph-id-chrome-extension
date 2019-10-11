// Copyright (c) 2019 Swisscom Blockchain AG
// Licensed under MIT License

/**
 * Wait helper
 * Return Promise which is resolving at a given time
 * @param timeout
 * @return {Promise<unknown>}
 */
export const wait = (timeout) =>
    new Promise(res => setTimeout(() => res('done'), timeout));

/**
 * Create the download link and programmatically start downloading.
 * @param content
 * @param fileName
 * @param contentType
 */
const downloadFile = (content, fileName, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

/**
 * Create the file input.
 * @return {HTMLInputElement}
 */
const createFileInput = () => {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');

  return fileSelector;
};
export { downloadFile, createFileInput };
