import NodeCache from "node-cache";

export const passwordResetCache = new NodeCache({
  stdTTL: 300,
  checkperiod: 60,
  useClones: false,
});
