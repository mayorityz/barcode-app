exports.remover = (reference) => {
  const length = reference.length;
  try {
    return reference.slice(0, length - 1);
  } catch (error) {
    return "";
  }
};
