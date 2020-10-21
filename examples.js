const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
const w = 500;
const h = 100;
const svg = d3.select('body').append('svg').attr('width', w).attr('height', h);
svg
  .selectAll('rect') // Add your code below this line
  .data(dataset)
  .enter()
  .append('rect') // Add your code above this line
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', 25)
  .attr('height', 100);

const dataset = [12, 31, 22, 17, 25, 18, 29, 14, 9];
const w = 500;
const h = 100;
const svg = d3.select('body').append('svg').attr('width', w).attr('height', h);
svg
  .selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr('x', (d, i) => {
    return i * 30;
  })
  .attr('y', 0)
  .attr('width', 25)
  .attr('height', 100);

// Padding between the SVG canvas boundary and the plot
const padding = 30;

// Create an x and y scale

const xScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, (d) => d[0])])
  .range([padding, w - padding]);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset, (d) => d[1])])
  .range([h - padding, padding]);
const output = yScale(411);
d3.select('body').append('h2').text(output);
