/**
 * In google cloud build we got INIT_CWD environment variable.
 * But in case of local machine we not get this.
 * Based on this key i will disable the husky installation on google cloud build
 */
if (process.env.INIT_CWD === '/workspace') {
  process.exit(0)
} else {
  process.exit(1)
}
