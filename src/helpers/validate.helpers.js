const isPositiveInteger = (value) => {
  const condition01 = !Number.isNaN(parseInt(value), 10);
  const condition02 = parseInt(value, 10) >= 0;
  if (condition01 && condition02) return true;
  return false;
};

module.exports = isPositiveInteger;
