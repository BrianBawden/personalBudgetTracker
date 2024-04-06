// https://www.npmjs.com/package/winston
// https://youtu.be/axOHMgZznpo // SPANISH
const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
  transports: [
    new transports.File({
      maxFiles: 5,
      maxsize: 5120000, // ~5MB
      filename: `${__dirname}/../logs/log-app.log`
    }),
    new transports.Console({
      level: 'debug'
    })
  ],
  // Share configuration for both transports
  format: format.combine(
    format.simple(),
    format.timestamp(),
    format.printf((info) => `[${info.timestamp}] ${info.level} - ${info.message}`)
  )
});
