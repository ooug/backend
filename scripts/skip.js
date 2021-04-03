console.info('--> Works --->>>>>>', process.env.INIT_CWD)
if (process.env.INIT_CWD === '/workspace') {
  process.exit(0)
} else {
  process.exit(1)
}
