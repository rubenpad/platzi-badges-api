const MongoLib = require('../lib/mongo');

class BadgesService {
  constructor() {
    this.collection = 'badges';
    this.mongoDB = new MongoLib();
  }

  async getBadges() {
    const badges = await this.mongoDB.getAll(this.collection);
    return badges || [];
  }

  async getBadge({ badgeId }) {
    const badge = await this.mongoDB.get(this.collection, badgeId);
    return badge || {};
  }

  async createBadge({ badge }) {
    const createdBadgeId = await this.mongoDB.create(this.collection, badge);
    return createdBadgeId;
  }

  async updateBadge({ badgeId, badge } = {}) {
    const updatedBadgeId = await this.mongoDB.update(
      this.collection,
      badgeId,
      badge
    );
    return updatedBadgeId;
  }

  async deleteBadge({ badgeId }) {
    const deletedBadgeId = await this.mongoDB.delete(this.collection, badgeId);
    return deletedBadgeId;
  }
}

module.exports = BadgesService;
