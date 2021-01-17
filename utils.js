export const createEmptyGeometry = () => {
  return { type: "Point", coordinates: [] };
};

const inProgressRequests = new Map();
export const fetchGET = async (url, opts = {}) => {
  // no SSR - this code is not suitable for server environments
  if (typeof window === "undefined") {
    throw new Error("fetchGET does not support SSR");
  }

  // GET only - this code is not suitable for updates/deletes
  const { method, force } = opts;
  if (!force && method && method.toUpperCase() !== "GET") {
    throw new Error(`fetchGET does not support method: ${method}`);
  }

  // abort in-progress requests with the same url
  if (inProgressRequests.has(url)) {
    const abortCtrl = inProgressRequests.get(url);
    abortCtrl.abort();
  }

  const abortCtrl = new AbortController();
  inProgressRequests.set(url, abortCtrl);
  const res = await fetch(url, {
    ...opts,
    signal: abortCtrl.signal,
  });

  // clean up completed requests
  inProgressRequests.delete(url);

  return res;
};
