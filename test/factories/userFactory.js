const User = require('../../src/user/userModel');
const { faker } = require('@faker-js/faker');
const jwtHelper = require('../../utils/jwtHelper');
const bcrypt = require('bcrypt');

async function buildParams(input = {}) {
  return {
    ...input,
    name: input.name || 'test',
    email: input.email || faker.internet.email().toLowerCase(),
    password: await bcrypt.hash('Aa@123456', 12)
  };
}

module.exports.UserFactory = async (input = {}, returnInputOnly = false) => {
  const params = await buildParams(input);
  if (returnInputOnly) return params;
  const user = await new User(params).save();
  user.token = jwtHelper.sign({ id: user.id });
  return user;
};

module.exports.UsersFactory = async (count = 10, input = {}) => {
  const user = [];
  for (let i = 0; i < count; i++) user.push(await buildParams(input));
  return await User.create(user);
};
