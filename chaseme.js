const container = document.getElementById('container');
const width = $(document).width();
const height = $(document).height();

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
let mouseX, mouseY;
let previousX, previousY;

const svg = d3.select("#container").append("svg")
  .attr("width", width)
  .attr("height", height);

//Place 256 dots on the page; will look like 4 dots,
//but each dot is stacked 64 deep
svg.append("g")
  .attr("class", "dot")
  .selectAll("circle")
  .data(dots256)
  .enter().append("circle")
  .attr("r", 10)
  .attr("cx", d => d.x)
  .attr("cy", d => d.y);

//Took the strategy from
//http://bl.ocks.org/adamhurst/13dd439047b66ee78c45
//Transition the circles to the mouse's x-position
svg.on('mousemove', function() {
  [mouseX, mouseY] = d3.mouse(this);
});

function moveDotsToMouse() {
  if(previousX !== mouseX) {
    d3.selectAll('circle')
      .each(function(d) {
        const radius = 75;
        const degree = Math.random() * 360;
        const circleX = Math.cos(degree) * radius;
        const circleY = Math.sin(degree) * radius;
        d3.select(this)
          .attr('cx', mouseX + circleX)
          .attr('cy', mouseY + circleY);
      });
  }

  [previousX, previousY] = [mouseX, mouseY];
}

setInterval(moveDotsToMouse, 15);
