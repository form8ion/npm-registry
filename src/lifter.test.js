import {loadPackageJson} from '@form8ion/javascript-core';

import {describe, it, expect, vi} from 'vitest';
import {when} from 'vitest-when';
import any from '@travi/any';

import liftNpmRegistry from './lifter.js';

vi.mock('@form8ion/javascript-core');

describe('npm registry lifter', () => {
  const projectRoot = any.simpleObject();

  it('should define the registry badge when the package has a `public` access level', async () => {
    const packageName = any.word();
    when(loadPackageJson).calledWith({projectRoot}).thenResolve({name: packageName, publishConfig: {access: 'public'}});

    expect(await liftNpmRegistry({projectRoot})).toEqual({
      badges: {
        consumer: {
          npm: {
            img: `https://img.shields.io/npm/v/${packageName}?logo=npm`,
            link: `https://www.npmjs.com/package/${packageName}`,
            text: 'npm'
          }
        }
      }
    });
  });

  it('should not define the registry badge when the package has a `restricted` access level', async () => {
    const packageName = any.word();
    when(loadPackageJson)
      .calledWith({projectRoot})
      .thenResolve({name: packageName, publishConfig: {access: 'restricted'}});

    expect(await liftNpmRegistry({projectRoot})).toEqual({badges: {consumer: {}}});
  });

  it('should not define the registry badge when the package does not define `publishConfig`', async () => {
    const packageName = any.word();
    when(loadPackageJson).calledWith({projectRoot}).thenResolve({name: packageName});

    expect(await liftNpmRegistry({projectRoot})).toEqual({badges: {consumer: {}}});
  });
});
