const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;
let initialDots = 16;
const dots = [];

//Global variables
//mouseX and mouseY are initialized high to ensure that no
//dots start rotating without a mousemove event
let mouseX = pageWidth * 2;
let mouseY = pageHeight * 2;
let dotNum = 0;
let numRevolving = 0;

//Fill up dots array
while(dotNum++ < initialDots) dots.push(makeDot());

const svg = d3.select('#container').append('svg')
  .attr('width', pageWidth)
  .attr('height', pageHeight)
  .on('mousemove', function() {
    [mouseX, mouseY] = d3.mouse(this);
  });

//Append dots to the page
svg.append('g')
  .attr('class', 'dot')
  .selectAll('circle')
  .data(dots)
  .enter().append('circle')
  .attr('r', 10)
  .attr('cx', dot => dot.x)
  .attr('cy', dot => dot.y)
  .classed('notRevolving', true);

function makeDot() {
  const padding = 100;
  return {
    x: Math.random() * (pageWidth - padding * 2) + padding,
    y: Math.random() * (pageHeight - padding * 2) + padding,
  };
}

//Took the general strategy of combining a mousemove
//event listener with a setInterval from
//http://bl.ocks.org/adamhurst/13dd439047b66ee78c45

/**
 * Find every dot with a class 'revolving' and revolve it repeatedly
 * @param  {Number} offset - this is what actually does the revolving
 */
function revolveDots(offset = 0) {
  const offsetIncrement = 1.5;
  const interval = 20;
  const radiusIncrement = 5;
  const radius = radiusIncrement * numRevolving;
  collectDots();

  d3.selectAll('.revolving')
    .each(function(dot) {
      const degree = 2 * Math.PI * dot.number / numRevolving + offset / 360;
      const circleX = Math.cos(degree) * radius;
      const circleY = Math.sin(degree) * radius;
      d3.select(this)
        .transition()
        .duration(interval - 1)
        .attr('cx', mouseX + circleX)
        .attr('cy', mouseY + circleY);
    });

  //nextOffset is what does the revolving
  const nextOffset = offset + offsetIncrement * numRevolving;
  setTimeout(revolveDots.bind(null, nextOffset), interval);
} 

/**
 * Gather every non-revolving dot and check to see if it's within range;
 * if so, change the notRevolving class to revolving
 */
function collectDots() {
  const radius = 75;
  d3.selectAll('.notRevolving')
    .each(function(dot) {
      const xDistance = dot.x - mouseX;
      const yDistance = dot.y - mouseY;
      const distance = Math.sqrt(xDistance ** 2 + yDistance ** 2);
      if(distance < radius) {
        dot.number = numRevolving++;
        d3.select(this)
          .classed('revolving', true)
          .classed('notRevolving', false);
      }
    });
}

function addDots() {
  dots.push(makeDot());

  svg.append('g')
    .attr('class', 'dot')
    .selectAll('circle')
    .data(dots)
    .enter().append('circle')
    .attr('r', 10)
    .attr('cx', dot => dot.x)
    .attr('cy', dot => dot.y)
    .classed('notRevolving', true);
}

revolveDots();
