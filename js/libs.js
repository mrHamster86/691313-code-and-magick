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
window.getRandomNumber = function (a, b) {
  if (b) {
    var min = b < a ? b : a;
    var max = b < a ? a : b;
  } else {
    min = 0;
    max = a;
  }
  var randomNumber = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  return randomNumber;
};
window.getRandomElement = function (arr) {
  var randomElement = arr[window.getRandomNumber(0, arr.length - 1)];
  return randomElement;
};
