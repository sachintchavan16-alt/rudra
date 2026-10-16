/** Simple, dependency free logger with levels and a coloured prefix. */
const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };

class Logger {
  constructor(prefix = 'RUDRA', level = process.env.LOG_LEVEL || 'info') {
    this.prefix = prefix;
    this.level = LEVELS[level] ?? LEVELS.info;
  }

  #stamp() {
    return new Date().toISOString();
  }

  #write(method, level, message, args) {
    if (LEVELS[level] > this.level) return;
    console[method](`[${this.#stamp()}] [${level.toUpperCase()}] [${this.prefix}] ${message}`, ...args);
  }

  error(message, ...args) {
    this.#write('error', 'error', message, args);
  }

  warn(message, ...args) {
    this.#write('warn', 'warn', message, args);
  }

  info(message, ...args) {
    this.#write('log', 'info', message, args);
  }

  debug(message, ...args) {
    this.#write('debug', 'debug', message, args);
  }
}

export const logger = new Logger();
export { Logger };
