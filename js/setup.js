'use strict';
var dataWizardsTemplate = {
  name: {
    firstname: [
      'Иван',
      'Хуан Себастьян',
      'Мария',
      'Кристоф',
      'Виктор',
      'Юлия',
      'Люпита',
      'Вашингтон'
    ],
    surname: [
      'да Марья',
      'Верон',
      'Мирабелла',
      'Вальц',
      'Онопко',
      'Топольницкая',
      'Нионго',
      'Ирвинг'
    ]
  },
  coatColor: [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ],
  eyersColor: [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
  ]
};
var LENGTH_LIST_WIZARDS = 4;
var USER_DIALOG = document.querySelector('.setup');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var OPEN_SETUP_BTN = document.querySelector('.setup-open');
var CLOSE_SETUP_BTN = USER_DIALOG.querySelector('.setup-close');
var USER_NAME = USER_DIALOG.querySelector('.setup-user-name');
var SETUP_FORM = USER_DIALOG.querySelector('.setup-wizard-form');
var SETUP_WIZARD = USER_DIALOG.querySelector('.setup-wizard-wrap');
var SETUP_FIREBALL = USER_DIALOG.querySelector('.setup-fireball-wrap');


var getRandomWizard = function (dataWizards) {
  var wizardFirstname = window.getRandomElement(dataWizards.name.firstname);
  var wizardSurname = window.getRandomElement(dataWizards.name.surname);
  var randomWizard = {
    name: wizardFirstname + ' ' + wizardSurname,
    coatColor: window.getRandomElement(dataWizards.coatColor),
    eyersColor: window.getRandomElement(dataWizards.eyersColor)
  };
  return randomWizard;
};
var getRandomWizardsList = function (lengthArr, dataWizards) {
  var wizardsList = [];
  for (var i = 0; i < lengthArr; i++) {
    var wizard = getRandomWizard(dataWizards);
    wizardsList.push(wizard);
  }
  return wizardsList;
};
var randomWizardsList = getRandomWizardsList(LENGTH_LIST_WIZARDS, dataWizardsTemplate);
var SIMULAR_WIZARDS_LIST = USER_DIALOG.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyersColor;
  return wizardElement;
};
var getFragmentWizards = function (wizardsList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsList.length; i++) {
    fragment.appendChild(renderWizard(wizardsList[i]));
  }
  return fragment;
};
SIMULAR_WIZARDS_LIST.appendChild(getFragmentWizards(randomWizardsList));

var SETUP_COLOR = {
  fireballColor: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ]
};
SETUP_COLOR.coatColor = dataWizardsTemplate.coatColor;
SETUP_COLOR.eyersColor = dataWizardsTemplate.eyersColor;

var onPopupPressEsc = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    onClosePopupClick();
  }
};

var onOpenPopupClick = function () {
  USER_DIALOG.classList.remove('hidden');
  document.addEventListener('keydown', onPopupPressEsc);
};
var onClosePopupClick = function () {
  USER_DIALOG.classList.add('hidden');
  document.removeEventListner('keydown', onPopupPressEsc);
};

var onCoatClick = function () {
  var currentColor = SETUP_WIZARD.querySelector('.wizard-coat').style.fill;
  var color = SETUP_COLOR.coatColor[window.getRandomNumber(SETUP_COLOR.coatColor.length - 1)];
  if (color !== currentColor) {
    SETUP_WIZARD.querySelector('.wizard-coat').style.fill = color;
    SETUP_FORM.querySelector('input[name = "coat-color"]').value = color;
    return;
  }
  onCoatClick();
};
var onEyesClick = function () {
  var currentColor = SETUP_WIZARD.querySelector('.wizard-eyes').style.fill;
  var color = SETUP_COLOR.eyersColor[window.getRandomNumber(SETUP_COLOR.eyersColor.length - 1)];
  if (color !== currentColor) {
    SETUP_WIZARD.querySelector('.wizard-eyes').style.fill = color;
    SETUP_FORM.querySelector('input[name = "eyes-color"]').value = color;
    return;
  }
  onEyesClick();
};
var onFireballClick = function () {
  var currentColor = SETUP_FORM.querySelector('input[name = "fireball-color"]').value;
  var color = SETUP_COLOR.fireballColor[window.getRandomNumber(SETUP_COLOR.fireballColor.length - 1)];
  if (color !== currentColor) {
    SETUP_FIREBALL.querySelector('.setup-fireball').style.backgroundColor = color;
    SETUP_FORM.querySelector('input[name = "fireball-color"]').value = color;
    return;
  }
  onFireballClick();
};


OPEN_SETUP_BTN.addEventListener('click', onOpenPopupClick);
OPEN_SETUP_BTN.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onOpenPopupClick();
  }
});
CLOSE_SETUP_BTN.addEventListener('click', onClosePopupClick);
CLOSE_SETUP_BTN.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    onClosePopupClick();
  }
});
USER_NAME.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupPressEsc);
});
USER_NAME.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupPressEsc);
});
SETUP_WIZARD.querySelector('.wizard-coat').addEventListener('click', onCoatClick);
SETUP_WIZARD.querySelector('.wizard-eyes').addEventListener('click', onEyesClick);
SETUP_FIREBALL.querySelector('.setup-fireball').addEventListener('click', onFireballClick);
