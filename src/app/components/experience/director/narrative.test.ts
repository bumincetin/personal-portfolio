import assert from 'node:assert/strict';
import test from 'node:test';
import { archiveNarrative, normalizedVelocity, volumeStop } from './narrative';
test('all seven explicit destinations resolve to their matching narrative volume', () => {
  for (let index = 0; index < 7; index++) assert.equal(archiveNarrative(volumeStop(index)).volume, index);
});
test('home and editorial exit have no automatic inspection and exit is bounded', () => {
  assert.equal(archiveNarrative(0).volume, null);
  assert.equal(archiveNarrative(.8).volume, null);
  assert.equal(archiveNarrative(2).exit, 1);
  assert.equal(archiveNarrative(-1).exit, 0);
});
test('scroll impulses are symmetric, finite and bounded', () => {
  for (const speed of [-10000, -70, -10, 0, 10, 70, 10000]) {
    assert.equal(normalizedVelocity(speed), normalizedVelocity(-speed));
    assert.ok(normalizedVelocity(speed) >= 0 && normalizedVelocity(speed) <= 1);
  }
});
