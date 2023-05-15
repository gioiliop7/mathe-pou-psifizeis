export function isBase64String(str) {
  const base64Regex = /^[A-Za-z0-9+/=]+$/;
  return base64Regex.test(str);
}

export function isValidJwt(token) {
  const jwtPattern = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
  return jwtPattern.test(token);
}

export function validateGreekText(text) {
  const greekLetters = /^[\u0370-\u03FF\s]+$/;
  return greekLetters.test(text);
}
