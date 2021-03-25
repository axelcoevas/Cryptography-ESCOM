let vigenereText;
let affineText;

function vigenere() {
  let text = vigenereText;
  let key = getVigenereKey();
  let filename = getVigenereFileName();
  let cipher = getVigCipher();

  let m = vigenereCipher(text, key, cipher);

  download(filename, m);
}

function affine() {
  let n = document.getElementById('affN').value;
  let alpha = document.getElementById('affA').value;
  let beta = document.getElementById('affB').value % n;
  let cipher = getAffCipher();
  let filename = getAffineFileName();
  let text = affineText;

  if (!validAffineKey(n, alpha)) {
    alert('Por favor elije un valor valido para Alpha');
    return;
  }

  let m = affineCipher(text, alpha, beta, n, cipher);

  download(filename, m);
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

function readFile(e, callback) {
  let reader = new FileReader();
  let file = e.files[0];

  reader.onload = function () {
    callback(reader.result);
  };

  reader.readAsText(file);
}

function getVigenereText(file) {
  vigenereText = file;
}

function getAffineText(file) {
  affineText = file;
}

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

function getVigenereKey() {
  let key = document.getElementById('vigKey').value;
  return key;
}

function getVigCipher() {
  let radio = document.getElementsByName('vigRadio');
  let value;
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked)
      value = radio[i].value === 'true';
  }

  return value;
}

function getAffCipher() {
  let radio = document.getElementsByName('affRadio');
  let value;
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked)
      value = radio[i].value === 'true';
  }

  return value;
}

//Vigenere functions

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

//Affine functions

function validAffineKey(a, b) { //  Euclides's algorithm
  let x = a;
  let y = b;

  while (y > 0) {
    let r = x % y;
    x = y;
    y = r;
  }

  return x === 1;
}

function multiplicativeInverse(a, n) {  // Euclides's extended Algorithm
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

function affineCipher(text, key, b, n, cipher) {
  let m = '';

  if (!cipher) {
    key = multiplicativeInverse(key, n);
    b = n - b;
    for (let i = 0; i < text.length; i++) {
      let p = text.charCodeAt(i) - 33;
      let c = String.fromCharCode((key * (p + b)) % n);
      m += c;
    }
  } else {
    for (let i = 0; i < text.length; i++) {
      let p = text.charCodeAt(i);
      let c = String.fromCharCode((key * p + b) % n + 33);
      m += c;
    }
  }

  return m;
}
//  Validations for inputs