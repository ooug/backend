import { $ } from './dist';

// get config for local and development env
if (process.env.NODE_ENV !== 'production') {
  const conf = config();
  if (conf.error) throw new Error(conf.error.message);
  else log(conf.parsed);
}

const PORT = process.env.PORT || 8080;

$.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
