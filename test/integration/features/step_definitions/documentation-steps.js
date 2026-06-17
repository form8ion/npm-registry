import {Then} from '@cucumber/cucumber';
import assert from 'node:assert';

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
