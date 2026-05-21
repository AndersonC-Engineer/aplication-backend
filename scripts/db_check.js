const pool = require('../src/config/database');

(async () => {
  try {
    const res = await pool.query('SELECT id, username, email, reset_password_at FROM users WHERE email = $1', ['larteas0@gmail.com']);
    console.log('RESULT:', JSON.stringify(res.rows, null, 2));
  } catch (e) {
    console.error('ERR', e.message);
  } finally {
    await pool.end();
  }
})();
