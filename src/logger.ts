import { AsyncLocalStorage } from "node:async_hooks";
import { pino } from "pino";

export const logStorage = new AsyncLocalStorage<Map<string, string>>();

export const logger = pino({
  mixin() {
    const store = logStorage.getStore();
    const request = store?.get("request") || undefined;

    return {
      request,
    };
  },
});
