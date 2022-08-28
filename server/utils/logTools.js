import winston from 'winston';

const {
  createLogger,
  format,
  addColors,
  transports,
} = winston;
const {
  combine,
  timestamp,
  colorize,
  prettyPrint,
  json,
  printf,
} = format;

// Console Log Colors
const logTextColorCyan = '\x1b[1m\x1b[36m%s\x1b[0m';
const logTextColorGreen = '\x1b[1m\x1b[32m%s\x1b[0m';

// Customized Logger
const loggerFormat = combine(
  colorize({ all: true }),
  prettyPrint(),
  timestamp(),
  json(),
  printf((info) => `${info.level} : ${info.message}`),
);

addColors({
  info: 'bold blue',
  warn: 'bold yellow',
  error: 'bold red',
});

const logger = createLogger({
  level: 'info',
  transports: [new transports.Console({format: combine(loggerFormat) })],
});

export default { logTextColorCyan, logTextColorGreen, logger };
