import {mergeIntoExistingPackageJson} from '@form8ion/javascript-core';

import {Given, Then} from '@cucumber/cucumber';
import assert from 'node:assert';

Given('the package access level is {string}', async function (accessLevel) {
  await mergeIntoExistingPackageJson({projectRoot: this.projectRoot, config: {publishConfig: {access: accessLevel}}});
});

Then('the npm badge is defined for the registry', async function () {
  const {badges} = this.results;
  const {consumer: {npm: npmBadge}} = badges;
  const {searchParams, host: badgeHost, pathname, protocol: badgeProtocol} = new URL(npmBadge.img);

  assert.deepEqual(npmBadge.link, `https://www.npmjs.com/package/${this.packageName}`);
  assert.deepEqual(npmBadge.text, 'npm');
  assert.equal(pathname, `/npm/v/${this.packageName}`);
  assert.equal(badgeHost, 'img.shields.io');
  assert.equal(badgeProtocol, 'https:');
  assert.equal(searchParams.get('logo'), 'npm');
});

Then('the npm badge is not defined', async function () {
  assert.strictEqual(this.results.badges.consumer.npm, undefined);
});
