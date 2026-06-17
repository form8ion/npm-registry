import {mergeIntoExistingPackageJson} from '@form8ion/javascript-core';

import {Given} from '@cucumber/cucumber';
import any from '@travi/any';

Given('the package exists', async function () {
  const scope = `@${any.word()}`;
  const projectName = any.word();
  this.packageName = `${scope}/${projectName}`;

  await mergeIntoExistingPackageJson({projectRoot: this.projectRoot, config: {name: this.packageName}});
});
