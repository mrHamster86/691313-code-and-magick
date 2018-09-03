'use strict';


var CLOUD = {
  height: 270,
  width: 420,
  positionX: 100,
  positionY: 10,
  shadowOffset: 10,
  gap: 15
};
var CLOUD_TITLE = {
  positionX: CLOUD.positionX + CLOUD.gap,
  positionY: CLOUD.positionY + CLOUD.gap
};
var CHART = {
  positionX: CLOUD.positionX + CLOUD.gap * 2,
  positionY: CLOUD.height - CLOUD.gap,
  heightColumn: 150,
  widthColumn: 40,
  offsetColumn: 50
};

var renderCloud = function (ctx, x, y, color, isStroke) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD.width, CLOUD.height);
  if (isStroke) {
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x, y, CLOUD.width, CLOUD.height);
  }
};
var renderTitle = function (ctx, text, x, y) {
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
};
var maxElementArr = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};
var renderChart = function (ctx, names, times) {
  var chartColumn = CHART.widthColumn + CHART.offsetColumn;
  var maxHeight = maxElementArr(times);

  for (var i = 0; i < names.length; i++) {
    var currentHeight = CHART.heightColumn * times[i] / maxHeight;

    names[i] === 'Вы' ? ctx.fillStyle = 'red' : ctx.fillStyle = 'blue';
    ctx.fillRect(CHART.positionX  + chartColumn * i, CHART.positionY - CLOUD.gap - currentHeight, CHART.widthColumn, currentHeight);

    ctx.fillStyle = 'black';
    ctx.fillText(Math.round(times[i]), CHART.positionX + chartColumn * i, CHART.positionY - (CLOUD.gap * 2) - currentHeight);
    ctx.fillText(names[i], CHART.positionX  + chartColumn * i, CHART.positionY);

  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD.positionX + CLOUD.shadowOffset, CLOUD.positionY + CLOUD.shadowOffset, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD.positionX, CLOUD.positionY, 'white', true);

  renderTitle(ctx, 'Ура вы победили!', CLOUD_TITLE.positionX, CLOUD_TITLE.positionY);
  renderTitle(ctx, 'Список результатов:', CLOUD_TITLE.positionX, CLOUD_TITLE.positionY + CLOUD.gap);

  renderChart(ctx, names, times);
};
