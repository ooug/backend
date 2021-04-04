import { config } from 'dotenv'
const conf = config()
if (conf.error) throw new Error(conf.error.message)
