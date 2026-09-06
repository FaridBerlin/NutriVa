import mongoose from 'mongoose'
import config from './config.js'

mongoose.connection.on('error', (error) => {
  console.log('DB after initial connection:', error)
})

const connectDB = async () => {
  if (!config.MONGO_URL) {
    console.error(
      '\n MONGO_URL is not set. Copy .env.sample to .env and fill it in.\n',
    )
    process.exit(1)
  }

  try {
    await mongoose.connect(config.MONGO_URL, {
      dbName: config.DATABASE,
      // Fail in a few seconds rather than sitting silently for the 30s default,
      // so a missing database is obvious straight away.
      serverSelectionTimeoutMS: 5000,
    })
    console.log('Connected to MongoDB!')
  } catch (error) {
    // Starting without a database only produces a server that 500s on every
    // request, so fail loudly instead.
    console.error(`\n Cannot reach MongoDB at ${config.MONGO_URL}`)
    console.error(`   ${error.message}\n`)
    console.error('   Is MongoDB running? Try one of:')
    console.error('     sudo systemctl start mongod')
    console.error('     mongod --dbpath ~/nutriva-mongodb --port 27017\n')
    process.exit(1)
  }
}

export default connectDB
