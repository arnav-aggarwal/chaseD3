const container = document.getElementById('container');

const width = $(document).width();
const height = $(document).height();

const abs = Math.abs;

const svg = d3.select("#container").append("svg")
  .attr("width", width)
  .attr("height", height)
  // .attr("class", "overlay");

const dots = [
  {x: width / 4, y: height / 4}, 
  {x: width * 3/4, y: height * 3/4},
  {x: width / 4, y: height * 3/4},
  {x: width * 3/4, y: height / 4},
];

svg.append("g")
  .attr("class", "dot")
  .selectAll("circle")
  .data(dots)
  .enter().append("circle")
  .attr("r", 10)
  .attr("cx", d => d.x)
  .attr("cy", d => d.y);

const circles = d3.selectAll('circle');

//http://bl.ocks.org/adamhurst/13dd439047b66ee78c45
svg.on('mousemove', function() {
  const [x] = d3.mouse(this);
  circles.transition(1000)
    .attr('cx', x);
});

function generateDots() {
  const circles = d3.selectAll('circle');

}

function draw() {
  const dots = generateDots();
}

setInterval(draw, 20);
