const container = document.getElementById('container');
const width = window.innerWidth;
const height = window.innerHeight;
const dots4 = [
  {x: width / 4, y: height / 4}, 
  {x: width * 3/4, y: height * 3/4},
  {x: width / 4, y: height * 3/4},
  {x: width * 3/4, y: height / 4},
];
const dots16 = [...dots4, ...dots4, ...dots4, ...dots4];
const dots64 = [...dots16, ...dots16, ...dots16, ...dots16];
const dots256 = [...dots64, ...dots64, ...dots64, ...dots64];

//Global variables, for dirty-checking mouse position
let mouseX = width / 2;
let mouseY = height / 2;
let previousX, previousY;

const svg = d3.select("#container").append("svg")
  .attr("width", width)
  .attr("height", height);

//Place 256 dots on the page; will look like 4 dots,
//but each dot is stacked 64 deep
svg.append("g")
  .attr("class", "dot")
  .selectAll("circle")
  .data(dots16)
  // .data(dots4)
  .enter().append("circle")
  .attr("r", 10)
  .attr("cx", d => d.x)
  .attr("cy", d => d.y);

const numDots = d3.selectAll('circle')[0].length;

//Took the strategy from
//http://bl.ocks.org/adamhurst/13dd439047b66ee78c45
//Transition the circles to the mouse's x-position
svg.on('mousemove', function() {
  [mouseX, mouseY] = d3.mouse(this);
});

const updateMousePosition = () => [previousX, previousY] = [mouseX, mouseY];

function moveDotsToMouse() {
  if(previousX !== mouseX) {
    d3.selectAll('circle')
      .each(function() {
        const radius = 75;
        const degree = Math.random() * 360;
        const circleX = Math.cos(degree) * radius;
        const circleY = Math.sin(degree) * radius;
        d3.select(this)
          .attr('cx', mouseX + circleX)
          .attr('cy', mouseY + circleY);
      });
  }

  updateMousePosition();
}

let count = 0;
function circleDotsAroundMouse() {
  d3.selectAll('circle')
      .each(function(__, thisDotNum) {
        const radius = 75;
        const degree = 2 * Math.PI / numDots * thisDotNum + count;
        const circleX = Math.cos(degree) * radius;
        const circleY = Math.sin(degree) * radius;
        d3.select(this)
          .attr('cx', mouseX + circleX)
          .attr('cy', mouseY + circleY);
      });

  count += 0.012;
  updateMousePosition();
}

function moveDotsAway() {
  if(previousX !== mouseX) {
    d3.selectAll('circle')
      .each(function(dot) {
        const xDiff = dot.x - mouseX;
        const yDiff = dot.y - mouseY;
        if(Math.abs(xDiff) < 50 && Math.abs(yDiff) < 50) {
          console.log(mouseX + 30);
          d3.select(this)
            .attr('cx', mouseX + (50 - xDiff))
            .attr('cy', mouseY + (50 - yDiff));
        }
      });
  }

  updateMousePosition();
}

// setInterval(moveDotsToMouse, 15);
setInterval(circleDotsAroundMouse, 10);
// setInterval(moveDotsAway, 15);
