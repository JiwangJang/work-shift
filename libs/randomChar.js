const randomCharGenerator = () => {
  const Charactor =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  const result = [];

  for (let i = 0; i < 25; i++) {
    const index = Math.floor(Math.random() * Charactor.length - 1);
    result.push(Charactor[index]);
  }

  return result.join("");
};

export default randomCharGenerator;
