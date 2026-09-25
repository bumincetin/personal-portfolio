import test from 'node:test';
import assert from 'node:assert/strict';
import { composeInquiry, outlookHref } from './draft';
import { CONTACT, mailtoHref, whatsappHref } from '../profile';

test('all message destinations preserve Unicode, newlines and URL punctuation', () => {
  const answers = { name: 'Çağla & Co', company: 'A+B / Milano', topic: 0, idea: 'A forecast with 5% error? Let’s discuss #next steps & scope.', timing: 1 };
  for (const locale of ['en', 'tr', 'it'] as const) {
    const body = composeInquiry(locale, answers);
    assert.ok(body.includes(answers.name)); assert.ok(body.includes(answers.company)); assert.ok(body.includes(answers.idea));
    const wa = new URL(whatsappHref(body));
    assert.equal(wa.pathname, `/${CONTACT.whatsapp.number}`); assert.equal(wa.searchParams.get('text'), body);
    for (const link of [mailtoHref('Project & scope', body), outlookHref('Project & scope', body), outlookHref('Project & scope', body, true)]) {
      const url = new URL(link);
      assert.equal(url.searchParams.get('body'), body); assert.equal(url.searchParams.get('subject'), 'Project & scope');
      assert.ok(!link.includes(' ')); assert.ok(!link.includes('\n'));
    }
  }
});
test('optional company and unknown selections still produce a complete draft', () => {
  const body = composeInquiry('en', {name:'  Alex  ',company:' ',topic:99,idea:'  A useful project description.  ',timing:99});
  assert.ok(body.includes('My name is Alex.'));
  assert.ok(body.includes('Something else'));
  assert.ok(body.includes('Just exploring'));
  assert.ok(!body.includes('undefined'));
});
