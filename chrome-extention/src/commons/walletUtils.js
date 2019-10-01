import bcrypt from 'bcryptjs';

const downloadFile = (content, fileName, contentType) => {
  const a = document.createElement('a');
  const file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

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
};

/**
 * Encrypt password with use of bcrypt.
 * @param plainPassword
 * @return {Promise<string>}
 */
const encryptPassword = plainPassword => {
  const saltRound = 10;

  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, saltRound, (err, hash) => {
      if (!!err) {
        reject(err);
      }
      resolve(hash);
    })
  });
};

/**
 * Check password encrypted with bcrypt;
 * @param plainPassword
 * @param hash
 * @return {Promise<boolean>}
 */
const validPassword = (plainPassword, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPassword, hash, (err, res) => {
      if (!!err) {
        reject(err);
      }
      resolve(res);
    })
  })
};

export { downloadFile, readFileFromDisk, encryptPassword, validPassword };
