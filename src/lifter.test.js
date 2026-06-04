import {describe, it, expect} from 'vitest';

import liftNpmRegistry from './lifter.js';

describe('npm registry lifter', () => {
  it('should return the results', async () => {
    expect(await liftNpmRegistry({})).toEqual({});
  });
});
