const uuid = () => {
  function random() {
    const int = Math.floor(Math.random() * 9);
    return int;
  }

  return `${random()}${random()}${random()}${random()}${random()}`;
};

export default uuid;
