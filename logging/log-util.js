import pino from "pino";

const LogLevelData = {
  "*": "silent",
  save: "info",
  home: "info",
};

const logLevels = new Map(Object.entries(LogLevelData));

export function getLogLevel(logger) {
  return logLevels.get(logger) || "info";
}

export function getLogger(name) {
  return pino({ name, level: getLogLevel(name) });
}
