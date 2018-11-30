exports.getRandomItemFromArr = (list) => {
  return list[Math.floor((Math.random() * list.length) + 0)];
}
