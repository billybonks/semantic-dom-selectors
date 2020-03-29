import config from '../config';

export default async function within(root, func) {
  const oldRoot = config.rootElement;
  config.rootElement = root;
  await func();
  config.rootElement = oldRoot;
}
