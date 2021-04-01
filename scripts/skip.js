console.log('\n\n\n\n\n\n\n\n' + process.env.BUILD_SKIP + '\n\n\n\n\n\n\n')
if (process.env.BUILD_SKIP) {
  process.exit(1)
} else {
  process.exit(0)
}
