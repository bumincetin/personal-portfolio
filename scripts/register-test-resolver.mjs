/** Registers the resolver hook. Used via `node --import` from the test script. */
import { register } from 'node:module';
register('./test-resolver.mjs', import.meta.url);
