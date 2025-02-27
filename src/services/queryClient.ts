import { QueryClient } from "@tanstack/react-query";
import { experimental_createPersister } from "@tanstack/query-persist-client-core";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 30,
      networkMode: "offlineFirst",
      persister: experimental_createPersister({
        storage: {
          getItem: (key) => Promise.resolve(localStorage.getItem(key)),
          setItem: (key, value) =>
            Promise.resolve(localStorage.setItem(key, value)),
          removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
        },
        maxAge: 1000 * 60 * 60 * 12,
      }),
    },
  },
});
