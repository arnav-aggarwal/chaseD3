const container = document.getElementById('container');

const width = $(document).width();
const height = $(document).height();

const abs = Math.abs;

const svg = d3.select("#container").append("svg")
  .attr("width", width)
  .attr("height", height)
  .attr("class", "overlay");

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
  .attr("r", 5)
  .attr("cx", d => d.x)
  .attr("cy", d => d.y);


svg.on("mousemove", function() {
  const circles = d3.selectAll("circle")
    .each(function(d) {
      console.log(d);
    });

  // console.log(circles);

  // circles.attr('cx', function(d) { 
  //   return d.x + 100
  // });

})
