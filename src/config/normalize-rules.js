const RULE_SEVERITY_STRINGS = ['error', 'warn', 'off'];
const RULE_SEVERITY = RULE_SEVERITY_STRINGS.reduce((map, value, index) => {
  map[value] = index;
  return map;
}, {});
const VALID_SEVERITIES = [0, 1, 2, 'off', 'warn', 'error'];

export default function normalizeRules(rules) {
  return Object.keys(rules).reduce((acc, ruleKey) => {
    let normalizedSeverity;
    const severity = rules[ruleKey];
    if (VALID_SEVERITIES.includes(severity)) {
      if (RULE_SEVERITY_STRINGS.includes(severity)) {
        normalizedSeverity = [RULE_SEVERITY[severity]];
      } else {
        normalizedSeverity = severity;
      }
    } else {
      throw new Error(`Invalid severity ${severity} set for ${ruleKey} please use ${VALID_SEVERITIES}`);
    }
    acc[ruleKey] = normalizedSeverity;
    return acc;
  }, {});
}
