const formatURL = str => {
  if (!str) throw new Error('A URL is required...');
  if (!hasHTTP(str)) str = `http://${str}`;
  if (!hasDot(str)) throw new Error('Invalid URL...');
  if (!isURL(str)) throw new Error('String is not a URL...');
  return str;
};

const hasHTTP = str => {
  if (!str) return false;
  return str.includes('http://') || str.includes('https://');
};

const hasDot = str => {
  if (!str) return false;
  return str.includes('.');
};

const isURL = str => {
  try {
    new URL(str);
    return true;
  } catch (_) {
    return false;
  }
};

module.exports = { formatURL, hasHTTP };
