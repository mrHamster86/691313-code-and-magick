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
var lengthListWizards = 4;

var getRandomWizard = function (dataWizards) {
  var wizardFirstname = dataWizards.name.firstname[getRandomNumber(0, dataWizards.name.firstname.length - 1)];
  var wizardSurname = dataWizards.name.surname[getRandomNumber(0, dataWizards.name.surname.length - 1)];
  var randomWizard = {
    name: wizardFirstname + ' ' + wizardSurname,
    coatColor: dataWizards.coatColor[getRandomNumber(0, dataWizards.coatColor.length - 1)],
    eyersColor: dataWizards.eyersColor[getRandomNumber(0, dataWizards.eyersColor.length - 1)]
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
var randomWizardsList = getRandomWizardsList(lengthListWizards, dataWizardsTemplate);

var userDialog = document.querySelector('.setup');
var similarWizardsList = userDialog.querySelector('.setup-similar-list');
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

similarWizardsList.appendChild(getFragmentWizards(randomWizardsList));
userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');

