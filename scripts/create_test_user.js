const UsersModel = require('../src/models/users');
const authService = require('../src/services/authService');

(async () => {
  try {
    const email = 'larteas0@gmail.com';
    const existing = await UsersModel.findByEmail(email);
    if (existing) return console.log('User already exists:', existing.username, existing.email);

    const password = 'InitialPass123!';
    const password_hash = await authService.hashPassword(password);
    const user = await UsersModel.create({
      username: 'larteas0',
      password_hash,
      full_name: 'Usuario Prueba',
      email,
      role_id: 2,
      status: 'Activated',
    });
    console.log('Created user:', user.id, user.username, user.email);
  } catch (e) {
    console.error('ERR', e.message);
  } finally {
    process.exit(0);
  }
})();
