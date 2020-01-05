const express = require('express');

const BadgesService = require('../services/badges');
const validationHandler = require('../utils/middleware/validationHandler.js');
const cacheResponse = require('../utils/cacheResponse');

const { FIVE_MIN_TO_SEC, SIXTY_MIN_TO_SEC } = require('../utils/time');
const {
  badgeIdSchema,
  createBadgeSchema,
  updateBadgeSchema
} = require('../utils/schemas/badges');

function badgesApi(app) {
  const router = express.Router();
  app.use('/badges', router);

  const badgesService = new BadgesService();

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MIN_TO_SEC);

    try {
      const badges = await badgesService.getBadges();
      res.status(200).json({
        headers: { 'Access-Control-Allow-Origin': '*' },
        data: badges,
        message: 'badges listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:badgeId',
    validationHandler({ badgeId: badgeIdSchema }, 'params'),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MIN_TO_SEC);
      const { badgeId } = req.params;

      try {
        const badge = await badgesService.getBadge({ badgeId });
        res.status(200).json({
          data: badge,
          message: 'badge retrieved'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.post(
    '/',
    validationHandler(createBadgeSchema),
    async (req, res, next) => {
      const { body: badge } = req;

      try {
        const createdBadgeId = await badgesService.createBadge({ badge });
        res.status(201).json({
          data: createdBadgeId,
          message: 'badge created'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:badgeId',
    validationHandler({ badgeId: badgeIdSchema }, 'params'),
    validationHandler(updateBadgeSchema),
    async (req, res, next) => {
      const { badgeId } = req.params;
      const { body: badge } = req;

      try {
        const updatedBadgeId = await badgesService.updateBadge({
          badgeId,
          badge
        });
        res.status(200).json({
          data: updatedBadgeId,
          message: 'badge updated'
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:badgeId',
    validationHandler({ badgeId: badgeIdSchema }, 'params'),
    async (req, res, next) => {
      const { badgeId } = req.params;
      try {
        const deleteBadgeId = await badgesService.deleteBadge({ badgeId });
        res.status(200).json({
          data: deleteBadgeId,
          message: 'badge deleted'
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = badgesApi;
