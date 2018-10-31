export const button = [
  'button',
  'a',
  '[role="button"]',
  'input[type="reset"]',
  'input[type="button"]',
  'input[type="submit"]',
  '[role="link"]',
  '[role="menuitem"]',
  'input[alt][type="image"]',
];


export const text = [
  'input:not([type="reset"]):not([type="button"]):not([type="submit"])',
  'textarea',
  '[role="slider"]',
  '[role="spinbutton"]',
  '[role="textbox"]',
  '[contenteditable="true"]',
];

export const toggle = [
  '[role="menuitemcheckbox"]',
  '[role="checkbox"]',
  '[type="checkbox"]',
];

export const select = [
  '[role="menuitemradio"]',
  'select',
  '[role="listbox"]',
  '[role="radiogroup"]',
];
