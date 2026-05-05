const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  if (typeof password !== "string" || password.length === 0) {
    const err = new Error("hashPassword: password must be a non-empty string");
    console.error(err.message);
    throw err;
  }

  return await bcrypt.hash(password, 10);
};