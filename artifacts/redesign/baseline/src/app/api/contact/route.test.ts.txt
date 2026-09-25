import test from 'node:test';
import assert from 'node:assert/strict';
import { validateInquiry, hasErrors, normaliseTopic, LIMITS } from '@/lib/contact/validate.ts';

/**
 * Validation is exercised directly rather than through the route handler.
 *
 * The handler needs `next/server`'s request plumbing, which is awkward to stand
 * up outside a Next runtime; the behaviour worth pinning is the rule set, and
 * the handler runs exactly this function on the parsed body. What the route
 * adds on top — the honeypot, the rate limiter, the provider call — is verified
 * against the running server in docs/implementation-summary.md rather than
 * asserted here against a mock of my own making.
 *
 * No test in this file sends a real message anywhere.
 */

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  company: 'Analytical Engines',
  topic: 'forecasting',
  message: 'Our monthly close takes a week and nobody trusts the numbers by the time it lands.',
};

test('a complete inquiry passes', () => {
  assert.equal(hasErrors(validateInquiry(valid)), false);
});

test('name is required', () => {
  assert.equal(validateInquiry({ ...valid, name: '   ' }).name, 'required');
});

test('email is required and must look deliverable', () => {
  assert.equal(validateInquiry({ ...valid, email: '' }).email, 'required');
  assert.equal(validateInquiry({ ...valid, email: 'not-an-address' }).email, 'invalid-email');
  assert.equal(validateInquiry({ ...valid, email: 'missing@domain' }).email, 'invalid-email');
  assert.equal(validateInquiry({ ...valid, email: 'a@b.co' }).email, undefined);
});

test('email validation stays permissive about real-world addresses', () => {
  // Over-strict patterns reject valid addresses; these must all pass.
  for (const address of [
    'first.last@example.co.uk',
    'user+tag@example.com',
    'user_name@sub.domain.example',
    "o'brien@example.ie",
  ]) {
    assert.equal(validateInquiry({ ...valid, email: address }).email, undefined, `rejected ${address}`);
  }
});

test('company is optional but bounded', () => {
  assert.equal(validateInquiry({ ...valid, company: '' }).company, undefined);
  assert.equal(validateInquiry({ ...valid, company: 'x'.repeat(LIMITS.company.max + 1) }).company, 'too-long');
});

test('message must say something and must not be unbounded', () => {
  assert.equal(validateInquiry({ ...valid, message: '' }).message, 'required');
  assert.equal(validateInquiry({ ...valid, message: 'too short' }).message, 'too-short');
  assert.equal(validateInquiry({ ...valid, message: 'x'.repeat(LIMITS.message.max + 1) }).message, 'too-long');
});

test('an unknown topic is normalised rather than rejected', () => {
  // A bad topic is a malformed request, not a mistake a person can correct.
  assert.equal(normaliseTopic('forecasting'), 'forecasting');
  assert.equal(normaliseTopic('<script>'), 'other');
  assert.equal(normaliseTopic(''), 'other');
});

test('validation reports every problem at once, not just the first', () => {
  const errors = validateInquiry({ name: '', email: 'bad', company: '', topic: 'other', message: '' });
  assert.equal(errors.name, 'required');
  assert.equal(errors.email, 'invalid-email');
  assert.equal(errors.message, 'required');
});
