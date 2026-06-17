import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

import {After, Before, When} from '@cucumber/cucumber';
import stubbedFs from 'mock-fs';
import any from '@travi/any';

const __dirname = dirname(fileURLToPath(import.meta.url));          // eslint-disable-line no-underscore-dangle
const stubbedNodeModules = stubbedFs.load(resolve(__dirname, '..', '..', '..', '..', 'node_modules'));

let scaffold, lift;

Before(async function () {
  this.projectRoot = process.cwd();

  // eslint-disable-next-line import/no-extraneous-dependencies,import/no-unresolved
  ({scaffold, lift} = await import('@form8ion/npm-registry'));

  stubbedFs({
    node_modules: stubbedNodeModules,
    'package.json': JSON.stringify(any.simpleObject())
  });
});

After(function () {
  stubbedFs.restore();
});

When('the project is scaffolded', async function () {
  await scaffold({projectRoot: this.projectRoot});
});

When('the project is lifted', async function () {
  this.results = await lift({projectRoot: this.projectRoot});
});
