'use strict';
window.getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};
window.getRandomNumber = function (min, max) {
  var randomNumber = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  return randomNumber;
};
window.getRandomElement = function (arr) {
  var randomElement = arr[getRandomNumber (0, arr.length - 1)];
  return randomElement;
};
