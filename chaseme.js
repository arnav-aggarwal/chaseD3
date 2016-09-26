const pageWidth = window.innerWidth;
const pageHeight = window.innerHeight;
const NUM_DOTS = 16;

const dots = [];
let dotNum = 0;
while(dotNum < NUM_DOTS) {
  dots.push({
    number: dotNum++,
    x: Math.random() * pageWidth,
    y: Math.random() * pageHeight,
  });
}

//Global variables, for dirty-checking mouse position
let mouseX = pageWidth / 2;
let mouseY = pageHeight / 2;
let previousX, previousY;

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
  .attr('cy', dot => dot.y);

//Took this strategy from
//http://bl.ocks.org/adamhurst/13dd439047b66ee78c45
//Transition the circles to the mouse's x-position
svg.on('mousemove', function() {
  [mouseX, mouseY] = d3.mouse(this);
});

const updateMousePosition = () => [previousX, previousY] = [mouseX, mouseY];

function circleDotsAroundMouse(offset = 0) {
  d3.selectAll('circle')
    .each(function(dot) {
      const radius = 75;
      const degree = 2 * Math.PI * dot.number / NUM_DOTS  + offset;
      const circleX = Math.cos(degree) * radius;
      const circleY = Math.sin(degree) * radius;
      d3.select(this)
        .attr('cx', mouseX + circleX)
        .attr('cy', mouseY + circleY);
    });

  updateMousePosition();
  setTimeout(circleDotsAroundMouse.bind(null, offset + 0.012),  20);
}

//currently collects dots
function collectDots() {
  const radius = 100;
  d3.selectAll('circle')
    .each(function(dot) {
      const xDiff = dot.x - mouseX;
      const yDiff = dot.y - mouseY;

      let quadrant;
      if(xDiff > 0) {
        quadrant = yDiff > 0 ? 1 : 4;
      } else {
        quadrant = yDiff > 0 ? 2 : 3;
      }

      Math.sqrt(xDiff ** 2 + yDiff ** 2) < 25 && console.log('yay!')
      if(Math.sqrt(xDiff ** 2 + yDiff ** 2) < radius) {
        const angle = Math.atan(yDiff / xDiff);
        d3.select(this)
          .transition(9)
          .attr('cx', function() {

            dot.x += Math.cos(Math.abs(angle)) * (radius * (xDiff > 0 ? 1: -1)  - xDiff);
            return dot.x;
          })
          .attr('cy', function() {
            dot.y += Math.sin(Math.abs(angle)) * (radius * (yDiff > 0 ? 1: -1) - yDiff);
            return dot.y;
          });
      }
    });

  updateMousePosition();
  setTimeout(collectDots, 20);
}

circleDotsAroundMouse();
// setInterval(moveDotsAway, 10);
