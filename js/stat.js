'use strict';

var cloud = {
  height: 270,
  width: 420,
  positionX: 100,
  positionY: 10,
  gap: 15,
  color: 'white',
  stroke: true,
  strokeColor: 'black',
  shadowOffset: 10,
  shadowColor: 'rgba(0, 0, 0, 0.7)'
};
var cloudTitle = {
  positionX: cloud.positionX + cloud.gap,
  positionY: cloud.positionY + cloud.gap,
  textColor: 'black',
  font: '16px PT Mono',
  textGap: 20
};
var chart = {
  positionX: cloud.positionX + cloud.gap * 2,
  positionY: cloud.height - cloud.gap,
  heightColumn: 150,
  widthColumn: 40,
  offsetColumn: 50,
  textColor: cloudTitle.textColor
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderCloud = function (ctx, x, y, color, isStroke) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, cloud.width, cloud.height);
  if (isStroke) {
    ctx.strokeStyle = cloud.strokeColor;
    ctx.strokeRect(x, y, cloud.width, cloud.height);
  }
};
var renderTitle = function (ctx, text, x, y) {
  ctx.fillStyle = cloudTitle.textColor;
  ctx.font = cloudTitle.font;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
};
var renderChart = function (ctx, names, times) {
  var chartColumn = chart.widthColumn + chart.offsetColumn;
  var maxHeight = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var currentHeightColumn = chart.heightColumn * times[i] / maxHeight;

    ctx.fillStyle = (names[i] === 'Вы' ? 'red' : 'blue');
    ctx.fillRect(chart.positionX + chartColumn * i, chart.positionY - cloud.gap - currentHeightColumn, chart.widthColumn, currentHeightColumn);

    ctx.fillStyle = chart.textColor;
    ctx.fillText(Math.round(times[i]), chart.positionX + chartColumn * i, chart.positionY - (cloud.gap * 2) - currentHeightColumn);
    ctx.fillText(names[i], chart.positionX + chartColumn * i, chart.positionY);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloud.positionX + cloud.shadowOffset, cloud.positionY + cloud.shadowOffset, cloud.shadowColor);
  renderCloud(ctx, cloud.positionX, cloud.positionY, cloud.color, cloud.stroke);

  renderTitle(ctx, 'Ура вы победили!', cloudTitle.positionX, cloudTitle.positionY);
  renderTitle(ctx, 'Список результатов:', cloudTitle.positionX, cloudTitle.positionY + cloudTitle.textGap);

  renderChart(ctx, names, times);
};
