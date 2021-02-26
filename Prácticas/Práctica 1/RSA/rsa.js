var privateKey, publicKey, decryptedFile, decryptedFileName, encryptedFile, encryptedFileName;

function encrypt() {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  let encrypted = encrypt.encrypt(decryptedFile);
  download(decryptedFileName, encrypted);
}

function decrypt() {
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey(privateKey);
  var uncrypted = decrypt.decrypt(encryptedFile);
  download(encryptedFileName, uncrypted);
}

function readFile(e, callback){
  let reader = new FileReader();
  let file = e.files[0];

  reader.onload = function() {
    callback(reader.result);
  };

  reader.readAsText(file);
}

function download(filename, content) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function getPrivateKey(key) {
  privateKey = key;
}

function getPublicKey(key) {
  publicKey = key;
}

function getDecryptedFile(file){
  decryptedFileName = document.getElementById('decryptedFile').files[0].name;
  let result = decryptedFileName.split(".");
  result[0] += "_C";
  decryptedFileName = result[0] + "." + result[1];

  decryptedFile = file;
}

function getEncryptedFile(file){
  encryptedFileName = document.getElementById('encryptedFile').files[0].name;
  let result = encryptedFileName.split(".");
  result[0] += "_D";
  encryptedFileName = result[0] + "." + result[1];

  encryptedFile = file;
}