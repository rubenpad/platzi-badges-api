const assert = require('assert');
const proxyquire = require('proxyquire');

const { badgesMock } = require('../utils/mocks/badges');
const {
  getAllStub,
  createStub,
  updateStub,
  deleteStub,
  MongoLibMock
} = require('../utils/mocks/mongoLib');

describe('services - badges', () => {
  const BadgesServices = proxyquire('../services/badges', {
    '../lib/mongo': MongoLibMock
  });

  const badgesService = new BadgesServices();

  describe('when getBadges method is called', async () => {
    it('should call the getAll MongoLib method', async () => {
      await badgesService.getBadges({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of badges', async () => {
      const result = await badgesService.getBadges({});
      const expected = badgesMock;
      assert.deepEqual(result, expected);
    });
  });

  describe('when createBadge method is called', async () => {
    it('should call the create MongoLib method', async () => {
      await badgesService.createBadge({});
      assert.strictEqual(createStub.called, true);
    });

    it('should return the id of created badge', async () => {
      const result = await badgesService.createBadge({});
      const expected = badgesMock[0].id;
      assert.deepEqual(result, expected);
    });
  });

  describe('when updateBadge method is called', async () => {
    it('should call the update MongoLib method', async () => {
      await badgesService.updateBadge({});
      assert.strictEqual(updateStub.called, true);
    });

    it('should return the id of updated badge', async () => {
      const result = await badgesService.updateBadge({});
      const expected = badgesMock[0].id;
      assert.deepEqual(result, expected);
    });
  });

  describe('when deleteBadge method is called', async () => {
    it('should call the delete MongoLib method', async () => {
      await badgesService.deleteBadge({});
      assert.strictEqual(deleteStub.called, true);
    });

    it('should return the id of deleted badge', async () => {
      const result = await badgesService.deleteBadge({});
      const expected = badgesMock[0].id;
      assert.deepEqual(result, expected);
    });
  });
});
