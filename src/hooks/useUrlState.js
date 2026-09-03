import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export function useUrlState(schema) {
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo(() => {
    const result = {};
    for (const key of Object.keys(schema)) {
      const { default: fallback, parse } = schema[key];
      const raw = searchParams.get(key);
      if (raw === null || raw === "") {
        result[key] = fallback;
      } else {
        result[key] = parse ? parse(raw) : raw;
      }
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const setState = useCallback(
    (updates, options = {}) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          for (const key of Object.keys(updates)) {
            const value = updates[key];
            const config = schema[key] ?? {};
            const serialize = config.serialize ?? String;
            const isDefault =
              value === undefined ||
              value === null ||
              value === "" ||
              (config.default !== undefined &&
                serialize(value) === serialize(config.default));

            if (isDefault) {
              next.delete(key);
            } else {
              next.set(key, serialize(value));
            }
          }
          return next;
        },
        { replace: options.replace ?? true }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setSearchParams]
  );

  return [state, setState];
}