// https://www.npmjs.com/package/winston
// https://youtu.be/axOHMgZznpo // SPANISH
const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
  transports: [
    new transports.Console({
      level: 'debug',
			format: format.combine(format.simple())
    })
  ],
});
