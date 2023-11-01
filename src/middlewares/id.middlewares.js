const { request, response } = require('express');
const isPositiveInteger = require('./../helpers/validate.helpers');

const isValidID = (req = request, res = response, next) => {
  const { pid } = req.params;
  if (isPositiveInteger(pid)) return next();
  return res.json({
    error: 'Id value must be a positive integer number to be valid',
  });
};

module.exports = isValidID;
