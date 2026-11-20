// Concise introductions authored from each target's existing nine biology topics.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert/strict');
const root = path.resolve(__dirname, '..');
const file = path.join(root, 'assets/data.js');
const drafts = JSON.parse(fs.readFileSync(path.join(__dirname, 'biology-intros-20261118.json'), 'utf8'));
const c = {};
vm.createContext(c);
vm.runInContext(fs.readFileSync(file, 'utf8'), c);
const db = c.TARGET_ATLAS_DATA;
const before = JSON.stringify(db);
const previous = new Map(db.targets.map(t => [t.id, t.biologyIntro]));
assert.equal(Object.keys(drafts).length, db.targets.length - 1);
assert(!Object.hasOwn(drafts, 'il13'), 'Keep the approved IL-13 text.');
for (const t of db.targets) {
  if (t.id === 'il13') continue;
  const text = drafts[t.id];
  assert(text && text.length >= 180 && text.length <= 240, `${t.id}: introduction length ${text?.length}`);
  t.biologyIntro = text;
}
const result = 'globalThis.TARGET_ATLAS_DATA=' + JSON.stringify(db) + ';\n';
// Confirm that no detailed biology, references, dates, products or metadata changed.
for (const t of db.targets) t.biologyIntro = previous.get(t.id);
assert.equal(JSON.stringify(db), before);
fs.writeFileSync(file, result);
console.log(`Updated ${Object.keys(drafts).length} biology introductions; retained IL-13 and all detailed content.`);
