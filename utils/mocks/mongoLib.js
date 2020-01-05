const sinon = require('sinon');
const { badgesMock } = require('./badges');

// For test purpose only
const ID = '5de31d41a86e04593563129b';

const getAllStub = sinon.stub();
// Without filter
getAllStub.withArgs('badges').resolves(badgesMock);

const createStub = sinon.stub().resolves(badgesMock[0].id);

const updateStub = sinon
  .stub()
  .withArgs('badges', ID)
  .resolves(badgesMock[0].id);

const deleteStub = sinon
  .stub()
  .withArgs('badges', ID)
  .resolves(badgesMock[0].id);

class MongoLibMock {
  getAll(collection) {
    return getAllStub(collection);
  }

  create(collection, data) {
    return createStub(collection, data);
  }

  update(collection, id, data) {
    return updateStub(collection, id, data);
  }

  delete(collection, id) {
    return deleteStub(collection, id);
  }
}

module.exports = {
  getAllStub,
  createStub,
  updateStub,
  deleteStub,
  MongoLibMock
};
