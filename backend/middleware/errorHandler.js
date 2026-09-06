import config from '../config/config.js'

export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
}

// Controllers signal intent either with `err.statusCode` or by calling
// `res.status(...)` before throwing, so honour both instead of forcing 500.
export const errorHandler = (err, req, res, next) => {
  let statusCode =
    err.statusCode ||
    (res.statusCode && res.statusCode >= 400 ? res.statusCode : 500)

  let message = err.message || 'Server Error'

  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values(err.errors || {})
      .map((e) => e.message)
      .join(', ')
  } else if (err.name === 'CastError') {
    statusCode = 400
    message = `Invalid ${err.path}`
  } else if (err.code === 11000) {
    statusCode = 409
    message = `Duplicate value for ${Object.keys(err.keyValue || {}).join(', ')}`
  }

  // Never leak internal failure details to the client.
  if (statusCode >= 500) {
    console.error('Unhandled error:', err)
    message = 'Server Error'
  }

  const body = { success: false, message }
  if (config.NODE_ENV !== 'production' && statusCode >= 500) {
    body.error = { details: err.message, stack: err.stack }
  }

  // If a response is already streaming (e.g. SSE) we cannot send JSON.
  if (res.headersSent) {
    return res.end()
  }

  res.status(statusCode).json(body)
}
