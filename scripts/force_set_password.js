const UsersModel = require('../src/models/users');
const authService = require('../src/services/authService');
const { generateTemporaryPassword } = require('../src/utils/passwordUtils');

(async () => {
  try {
    const email = 'larteas0@gmail.com';
    const user = await UsersModel.findByEmail(email);
    if (!user) return console.error('User not found');

    const temp = generateTemporaryPassword();
    const hash = await authService.hashPassword(temp);
    await UsersModel.update(user.id, { password_hash: hash, reset_password_at: new Date() });
    console.log('TEMP_PASSWORD:', temp, 'USERNAME:', user.username);
  } catch (e) {
    console.error('ERR', e.message);
  } finally {
    process.exit(0);
  }
})();
