let w = 1200;
let h = 700;
const padding = 60;

let svgBuild = d3
  .select('.container')
  .append('svg')
  .attr('width', w + 100)
  .attr('height', h + 100);

d3.json(
  'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
).then(function (data) {
  let dataArray = data.data;
  console.log(dataArray);
  let timeData = dataArray.map((el) => el[0]);
  let gdp = dataArray.map((el) => el[1]);
  let dates = timeData.map((el) => {
    return new Date(el);
  });
  console.log(dates);

  let dataScale = d3
    .scaleLinear()
    .domain([0, d3.max(gdp)])
    .range([0, h]);

  let maxDate = new Date(d3.max(dates));
  let adjMaxDate = maxDate.setMonth(maxDate.getMonth() + 3);
  // console.log(maxDate);
  // console.log(adjMaxDate);

  let xScale = d3
    .scaleTime()
    .domain([d3.min(dates), adjMaxDate])
    .range([0, w]);

  let yScale = d3
    .scaleLinear()
    .domain([0, d3.max(gdp)])
    .range([h, 0]);

  let scaledGDP = gdp.map((el) => dataScale(el));

  let barW = w / gdp.length;

  let tooltip = d3
    .select('.container')
    .append('div')
    .attr('id', 'tooltip')
    .style('position', 'absolute')
    .style('top', '15%')
    .style('opacity', 0);

  let mouseover = function (d, i) {
    tooltip.style('opacity', 1).html(`\$${gdp[i]} billion <br> ${timeData[i]}`);
  };

  var mouseleave = function (d) {
    tooltip.style('opacity', 0);
  };

  svgBuild
    .selectAll('rect')
    .data(scaledGDP)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => xScale(dates[i]))
    .attr('y', (d) => h - d)
    .attr('width', barW)
    .attr('height', (d) => d)
    .attr('data-date', (d, i) => timeData[i])
    .attr('data-gdp', (d) => d)
    .attr('transform', 'translate(' + padding + ', 0)')
    .on('mouseover', mouseover)
    .on('mouseleave', mouseleave);

  let xAxis = d3.axisBottom(xScale);
  svgBuild
    .append('g')
    .attr('transform', 'translate(' + padding + ',' + h + ')')
    .attr('id', 'x-axis')
    .call(xAxis);

  let yAxis = d3.axisLeft(yScale);
  svgBuild
    .append('g')
    .attr('transform', 'translate(' + padding + ', 0)')
    .attr('id', 'y-axis')
    .call(yAxis);
});
