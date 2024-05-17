const joi = require("joi");

class UserQueryModel {
  constructor() {}
  validateParamFindByEmalOrName(user) {
    const userSchema = joi.object({
      nama: joi.string().allow(null),
      email: joi.string().email().allow(null),
    });
    return userSchema.validate(user);
  }
  validateParamFindByEmail(user) {
    const userSchema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().optional(),
    });
    return userSchema.validate(user);
  }
}

module.exports = UserQueryModel;
