import aria from 'aria-api';
import config from '../../config';

export default function (element) {
  let label = aria.getName(element);

  // this used to be here to support buttons, but it didn't if it supported name from content
  // https://w3c.github.io/aria/#namefromcontent
  if (!label && element.innerText) {
    label = element.innerText;
  }

  // another way of getting the label that did not check if it was able to be used.
  if (!label && element.textContent) {
    label = element.textContent;
  }

  // Keeping this around incase it is required
  if (!label && element.labels && element.labels.length) {
    label = Array.prototype.slice.call(element.labels).map(label => label.innerText).join('');
  }

  if (label) {
    label = config.trim(label);
  }

  return label.toLowerCase();
}
