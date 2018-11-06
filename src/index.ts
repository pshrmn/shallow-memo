export default function shallowMemo<T>(prevProps: T, nextProps: T): boolean {
  const prevKeys = Object.keys(prevProps);
  const nextKeys = Object.keys(nextProps);
  if (prevKeys.length !== nextKeys.length) {
    return false;
  }
  for (let i=0; i<prevKeys.length; i++) {
    const key = prevKeys[i];
    if (!shallowCompare(prevProps[key],nextProps[key])) {
      return false;
    }
  }
  return true;
}

function shallowCompare(prev: any, next: any): boolean {
  // primitives/reference check
  if (prev === next) {
    return true;
  }

  // bail if prev or next aren't objects or are null
  if (typeof prev !== "object" || typeof next !== "object" || prev === null || next === null) {
    return false;
  }

  // arrays
  const prevIs = Array.isArray(prev);
  const nextIs = Array.isArray(next);
  if (prevIs && nextIs) {
    if (prev.length !== next.length) {
      return false;
    }
    for (let i = 0; i<prev.length; i++) {
      if (prev[i] !== next[i]) {
        return false;
      }
    }
    return true;
  } else if ((prevIs && !nextIs) || (!prevIs && nextIs)) {
    return false;
  }

  // objects
  const prevKeys = Object.keys(prev);
  const bKeys = Object.keys(next);
  if (prevKeys.length !== bKeys.length) {
    return false;
  }
  for (let i=0; i<prevKeys.length; i++) {
    const key = prevKeys[i];
    if (!next.hasOwnProperty(key) || prev[key] !== next[key]) {
      return false;
    }
  }
  return true;
}
