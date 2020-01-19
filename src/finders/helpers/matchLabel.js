export default function (match, label) {
  if (match instanceof RegExp) {
    return match.test(label);
  }
  return match.toLowerCase() === label.toLowerCase();
}
