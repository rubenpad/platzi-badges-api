const Joi = require('@hapi/joi');

const badgeIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const badgeFirstNameSchema = Joi.string().max(100);
const badgeLastNameSchema = Joi.string().max(100);
const badgeEmailSchema = Joi.string().email();
const badgeJobTitleSchema = Joi.string().max(100);
const badgeTwitterSchema = Joi.string().min(4);

const createBadgeSchema = {
  firstName: badgeFirstNameSchema.required(),
  lastName: badgeLastNameSchema.required(),
  email: badgeEmailSchema.required(),
  jobTitle: badgeJobTitleSchema.required(),
  twitter: badgeTwitterSchema.required()
};

const updateBadgeSchema = {
  firstName: badgeFirstNameSchema,
  lastName: badgeLastNameSchema,
  email: badgeEmailSchema,
  jobTitle: badgeJobTitleSchema,
  twitter: badgeTwitterSchema
};
module.exports = {
  badgeIdSchema,
  createBadgeSchema,
  updateBadgeSchema
};
