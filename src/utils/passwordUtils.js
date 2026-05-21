// src/utils/passwordUtils.js
// Generación de contraseñas temporales seguras.
const crypto = require('crypto');

const generateTemporaryPassword = (length = 14) => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()-_=+[]{};:,.<>?';
  const allChars = `${upper}${lower}${numbers}${symbols}`;

  const pickChar = (chars) => chars[crypto.randomInt(0, chars.length)];
  const password = [
    pickChar(upper),
    pickChar(lower),
    pickChar(numbers),
    pickChar(symbols),
  ];

  while (password.length < length) {
    password.push(pickChar(allChars));
  }

  for (let i = password.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(0, i + 1);
    [password[i], password[j]] = [password[j], password[i]];
  }

  return password.join('');
};

module.exports = {
  generateTemporaryPassword,
};
