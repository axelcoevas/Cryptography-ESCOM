let vigenereText;
let affineText;

//  Gets all values and invoques the cipher Vigenère
function vigenere() {
  let text = vigenereText;
  let key = getVigenereKey();
  let filename = getVigenereFileName();
  let cipher = getVigCipher();

  let m = vigenereCipher(text, key, cipher);

  download(filename, m);
}


//  Gets all values and invoques the cipher Affine
function affine() {
  let n = document.getElementById('affN').value;
  let alpha = document.getElementById('affA').value;
  let beta = document.getElementById('affB').value % n;
  let cipher = getAffCipher();
  let filename = getAffineFileName();
  let text = affineText;

  if (!euclidesAlgorithm(n, alpha)) {
    swal("Inválido", "Elige un valor válido de alpha", "error");
    return;
  } else {
    swal("Válido", "El inverso multiplicativo es: " + extendedEuclidesAlgorithm(alpha, n), "success");
  }

  let m = affineCipher(text, alpha, beta, n, cipher);

  download(filename, m);
}

//  Makes the file and download it
function download(filename, content) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

//  Reads a file
function readFile(e, callback) {
  let reader = new FileReader();
  let file = e.files[0];

  reader.onload = function () {
    callback(reader.result);
  };

  reader.readAsText(file);
}

//  Gets text from file in Vigenère
function getVigenereText(file) {
  vigenereText = file;
}

//  Gets text from file in Affine
function getAffineText(file) {
  affineText = file;
}

//  Gets Vigenère filename
function getVigenereFileName() {
  let vigenereFilename = document.getElementById('vigFile').files[0].name;

  let result = vigenereFilename.split(".");
  if (getVigCipher()) {
    vigenereFilename = result[0] + ".vig";
  } else {
    vigenereFilename = result[0] + ".txt";
  }

  return vigenereFilename;
}

//  Gets Affine filename 
function getAffineFileName() {
  let affineFilename = document.getElementById('affFile').files[0].name;

  let result = affineFilename.split(".");
  if (getAffCipher()) {
    affineFilename = result[0] + ".aff";
  } else {
    affineFilename = result[0] + ".txt";
  }

  return affineFilename;
}

//  Gets the key input in Vigenère
function getVigenereKey() {
  let key = document.getElementById('vigKey').value;
  return key;
}

//  Function that gets if it's encrypt or decrypt Vigenère
function getVigCipher() {
  let radio = document.getElementsByName('vigRadio');
  let value;
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked)
      value = radio[i].value === 'true';
  }

  return value;
}

//  Function that gets if it's encrypt or decrypt Affine
function getAffCipher() {
  let radio = document.getElementsByName('affRadio');
  let value;
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked)
      value = radio[i].value === 'true';
  }

  return value;
}

//  Vignere Cipher Algorithm
function vigenereCipher(text, key, cipher) {
  let m = '';
  text = text.toUpperCase();
  key = key.toUpperCase();

  if (!cipher) {
    key = getNeutroKey(key);
  }

  for (let i = 0; i < text.length; i++) {
    let c = text.charCodeAt(i) - 65;
    let k = key.charCodeAt(i % key.length) - 65;

    let p = (c + k) % 26;

    m += String.fromCharCode(p + 65);
  }

  return cipher ? m.toUpperCase() : m.toLowerCase();
}

function getNeutroKey(k) {
  let neutro = "";
  k = k.toUpperCase();
  for (let i = 0; i < k.length; i++) {
    let c = k.charCodeAt(i) - 65;
    for (let j = 0; j < 26; j++) {
      if ((c + j) % 26 == 0) {
        neutro += String.fromCharCode(j + 65);
      }
    }
  }
  return neutro;
}

//  Affine functions

//  Euclides's algorithm
function euclidesAlgorithm(a, b) {
  let x = a;
  let y = b;

  while (y > 0) {
    let r = x % y;
    x = y;
    y = r;
  }

  return x === 1;
}

//  Euclides's extended Algorithm
function extendedEuclidesAlgorithm(a, n) {
  let r = [a, n];
  let s = [1, 0];
  let t = [0, 1];
  let i = 1;
  let q = [];

  while (r[i] != 0) {
    q.push(Math.floor(r[i - 1] / r[i]));
    r.push(r[i - 1] % r[i]);
    s.push(s[i - 1] - q[i - 1] * s[i]);
    t.push(t[i - 1] - q[i - 1] * t[i]);
    i++;
  }

  return s[i - 1] < 0 ? n + s[i - 1] : s[i - 1];
}

console.log(extendedEuclidesAlgorithm(125, 256));

function helpme(a) {
  return a % 256;
}

console.log(helpme(213 * 237));

//  Affine Cipher Algorithm
function affineCipher(text, key, b, n, cipher) {
  let m = '';

  if (cipher) { //  Para cifrar
    for (let i = 0; i < text.length; i++) {
      let p = text.charCodeAt(i);
      let c = String.fromCharCode((key * p + b) % n + 33);
      m += c;
    }
  } else {  //  Para descifrar
    key = extendedEuclidesAlgorithm(key, n);
    b = n - b;
    for (let i = 0; i < text.length; i++) {
      let p = text.charCodeAt(i) - 33;
      let c = String.fromCharCode((key * (p + b)) % n);
      m += c;
    }
  }

  return m;
}