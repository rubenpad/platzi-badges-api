const assert = require('assert');
const buildMessage = require('../utils/buildMessage');

describe('utils - buildMessage', () => {
  describe('when receives an entity and an action', () => {
    it('should return the respective message', () => {
      const result = buildMessage('badge', 'create');
      const expected = 'badge created';
      assert.strictEqual(result, expected);
    });
  });

  describe('when recieves an entity an action and a list', () => {
    it('should return the respective messsage', () => {
      const result = buildMessage('badge', 'list');
      const expected = 'badges listed';
      assert.strictEqual(result, expected);
    });
  });
});
