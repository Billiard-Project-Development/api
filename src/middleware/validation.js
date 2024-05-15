const utils = require("../utils");

const validate = async (schema, req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (e) {
    
    utils.Utils.responseForValidation(res, e);
  }
};
module.exports = {
  validate,
};
