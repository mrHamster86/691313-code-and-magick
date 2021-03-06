'use strict';

var cloud = {
  height: 270,
  width: 420,
  position: {
    x: 100,
    y: 10
  },
  gap: 15,
  color: 'white',
  stroke: true,
  strokeColor: 'black',
  shadowOffset: 10,
  shadowColor: 'rgba(0, 0, 0, 0.7)'
};
var cloudTitle = {
  position: {
    x: cloud.position.x + cloud.gap,
    y: cloud.position.y + cloud.gap
  },
  textColor: 'black',
  font: '16px PT Mono',
  textGap: 20
};
var chart = {
  position: {
    x: cloud.position.x + cloud.gap * 2,
    y: cloud.height - cloud.gap
  },
  heightColumn: 150,
  widthColumn: 40,
  offsetColumn: 50,
  textColor: cloudTitle.textColor
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
  var maxHeight = window.getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var currentHeightColumn = chart.heightColumn * times[i] / maxHeight;
    var hue = window.getRandomNumber(230, 250);
    var saturation = window.getRandomNumber(10, 100);
    var lightness = window.getRandomNumber(20, 70);
    var randomBlue = 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';

    ctx.fillStyle = (names[i] === 'Вы' ? 'red' : randomBlue);
    ctx.fillRect(chart.position.x + chartColumn * i, chart.position.y - cloud.gap - currentHeightColumn, chart.widthColumn, currentHeightColumn);

    ctx.fillStyle = chart.textColor;
    ctx.fillText(Math.round(times[i]), chart.position.x + chartColumn * i, chart.position.y - (cloud.gap * 2) - currentHeightColumn);
    ctx.fillText(names[i], chart.position.x + chartColumn * i, chart.position.y);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloud.position.x + cloud.shadowOffset, cloud.position.y + cloud.shadowOffset, cloud.shadowColor);
  renderCloud(ctx, cloud.position.x, cloud.position.y, cloud.color, cloud.stroke);

  renderTitle(ctx, 'Ура вы победили!', cloudTitle.position.x, cloudTitle.position.y);
  renderTitle(ctx, 'Список результатов:', cloudTitle.position.x, cloudTitle.position.y + cloudTitle.textGap);

  renderChart(ctx, names, times);
};
