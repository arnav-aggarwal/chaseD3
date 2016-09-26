const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;
const TOTAL_DOTS = 16;
const rotatingDots = [];
const dots = [];

//Global variables
let mouseX = pageWidth * 2;
let mouseY = pageHeight * 2;
let dotNum = 0;
let numRotating = 0;

//Fill up dots array
while(dotNum++ < TOTAL_DOTS) {
  dots.push({
    x: Math.random() * pageWidth,
    y: Math.random() * pageHeight,
  });
}

//Append dots to the page
const svg = d3.select('#container').append('svg')
  .attr('width', pageWidth)
  .attr('height', pageHeight);

svg.append('g')
  .attr('class', 'dot')
  .selectAll('circle')
  .data(dots)
  .enter().append('circle')
  .attr('r', 10)
  .attr('cx', dot => dot.x)
  .attr('cy', dot => dot.y)
  .classed('notRotating', true);

//Took this strategy from
//http://bl.ocks.org/adamhurst/13dd439047b66ee78c45
//Transition the circles to the mouse's x-position
svg.on('mousemove', function() {
  [mouseX, mouseY] = d3.mouse(this);
});

function circleDotsAroundMouse(offset = 0) {
  collectDots();
  d3.selectAll('.rotating')
    .each(function(dot) {
      const radius = 75;
      const degree = 2 * Math.PI * dot.number / numRotating + offset;
      const circleX = Math.cos(degree) * radius;
      const circleY = Math.sin(degree) * radius;
      d3.select(this)
        .transition()
        .duration(50)
        .attr('cx', mouseX + circleX)
        .attr('cy', mouseY + circleY);
    });

  setTimeout(circleDotsAroundMouse.bind(null, offset + 0.025), 50);
} 

function collectDots() {
  const radius = 75;
  d3.selectAll('.notRotating')
    .each(function(dot) {
      const xDistance = dot.x - mouseX;
      const yDistance = dot.y - mouseY;
      const distance = Math.sqrt(xDistance ** 2 + yDistance ** 2);
      if(distance < radius) {
        dot.number = numRotating++;
        d3.select(this)
          .classed('rotating', true)
          .classed('notRotating', false);
      }
    });
}

circleDotsAroundMouse();
