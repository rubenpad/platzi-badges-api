const assert = require('assert'); // Verifiy our tests.
const proxyquire = require('proxyquire');
const { badgesMock, BadgesServiceMock } = require('../utils/mocks/badges');
const testServer = require('../utils/testServer');

describe('routes - badges', () => {
  const route = proxyquire('../routes/badges', {
    '../services/badges': BadgesServiceMock
  });

  const request = testServer(route);

  describe('GET /badges', () => {
    it('should respond with a 200 status code', (done) => {
      request.get('/badges').expect(200, done);
    });

    it('should respond with a badges list', (done) => {
      request.get('/badges').end((err, res) => {
        assert.deepEqual(res.body, {
          data: badgesMock,
          message: 'badges listed'
        });
        done();
      });
    });
  });
});
