// DEBUG=app:* node scripts/mongo/seedBadges.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:badges');
const MongoLib = require('../../lib/mongo');
const { badgesMock } = require('../../utils/mocks/badges');

async function seedBadges() {
  try {
    const mongoDB = new MongoLib();

    const promises = badgesMock.map(async (badge) => {
      delete badge.id;
      await mongoDB.create('badges', badge);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} badges have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedBadges();
