
const compareObject = function (a, b) {
  const keya = Object.keys(a);
  const keyb = Object.keys(b);

  if (keya.length !== keyb.length) {
    return false;
  }

  return keya.every(key => {
    if (!compare(a[key], b[key])) {
      return false;
    }
    return true;
  });
}
const compareArray = function (a, b) {
  if (a.length !== b.length) {
    return false;
  }
  const length = a.length;
  for (let i = 0; i < length; i++) {
    if (!compare(a[i], b[i])) {
      return false;
    }
  }

  return true;
}
export const compare = (a, b) => {
  if (a === b) {
    return true;
  }

  if (typeof a !== typeof b || a === null || b === null) {
    return false;
  }

  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }
    return compareArray(a, b);
  }

  if (typeof a === "object") {
    return compareObject(a, b);
  }

  return false;
}