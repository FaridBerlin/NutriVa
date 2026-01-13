import mongoose from 'mongoose'
import config from './config.js'

mongoose.connection.on('error', (error) => {
  console.log('DB after initial connection:', error)
})

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URL, {
      dbName: config.DATABASE,
    })
    console.log('Connected to MongoDB!')
  } catch (error) {
    console.error('Connection error:', error)
  }
}

export default connectDB
