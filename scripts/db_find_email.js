const pool = require('../src/config/database');

(async () => {
  try {
    const res = await pool.query('SELECT id, username, email FROM users WHERE email = $1', ['larteas0@gmail.com']);
    console.log('FOUND:', JSON.stringify(res.rows, null, 2));
  } catch (e) {
    console.error('ERR', e.message);
  } finally {
    await pool.end();
  }
})();
