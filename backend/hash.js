const bcrypt = require('bcrypt');

async function generateHash() {
  const password = '123456';
  const hash = await bcrypt.hash(password, 10);
  console.log('Hash para 123456:');
  console.log(hash);
  process.exit(0);
}

generateHash();
