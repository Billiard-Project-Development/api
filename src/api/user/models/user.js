const joi = require("joi");

const UserModel = joi.object({
  user_id: joi.string(),
  name: joi.string().required(),
  email: joi.string().email(),
  noHp: joi.string(),
  passowrd: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

function validateUser(user) {
  return UserModel.validate(user);
}
module.exports = {
  UserModel,
  validateUser,
};
