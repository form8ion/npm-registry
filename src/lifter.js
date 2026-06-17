// eslint-disable-next-line no-empty-pattern
import {loadPackageJson} from '@form8ion/javascript-core';

export default async function lift({projectRoot}) {
  const {name: packageName, publishConfig} = await loadPackageJson({projectRoot});

  return {
    badges: {
      consumer: {
        ...'public' === publishConfig?.access && {
          npm: {
            img: `https://img.shields.io/npm/v/${packageName}?logo=npm`,
            link: `https://www.npmjs.com/package/${packageName}`,
            text: 'npm'
          }
        }
      }
    }
  };
}
