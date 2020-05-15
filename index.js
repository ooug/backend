const { $ } = require('./dist');
const { config } = require('dotenv');

// get config for local
if (process.env.NODE_ENV !== 'local') {
  const conf = config();
  if (conf.error) throw new Error(conf.error.message);
  else console.log(conf.parsed);
}

const PORT = process.env.PORT || 8080;

$.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

module.exports = $;