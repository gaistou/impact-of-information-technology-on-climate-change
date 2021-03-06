//The data for our lines
 var spam = [ { "x": 1,   "y": 0, value: 114 , opacity: "1", color: " green",name:"Limiter les spams"},
{ "x": 19,   "y": 20, value: 114 , opacity: "1", color: " green",name:"Limiter les spams"},
{ "x": 18,   "y": 200, value: 114 , opacity: "1", color: " green",name:"Limiter les spams"}];


var obsolescence = [
{ "x": 26,   "y": 0, value: 22 , opacity: "1", color: "#e68c40",name:"Lutte contre l'obsolescence"},
{ "x": 26,   "y": 20, value: 22 , opacity: "1", color: "#e68c40",name:"Lutte contre l'obsolescence"},
{ "x": 26,   "y": 200, value: 22 , opacity: "1", color: "#e68c40",name:"Lutte contre l'obsolescence"}];


var mail = [
{ "x": 30,   "y": 0, value: 0.416 , opacity: "1", color: "#9400D3",name:"Suppression des mails"},
{ "x": 27.2,   "y": 20, value: 0.416 , opacity: "1", color: "#9400D3",name:"Suppression des mails"},
{ "x": 27.2,   "y": 200, value: 0.416 , opacity: "1", color: "#9400D3",name:"Suppression des mails"}];


var veille = [
{ "x": 50,   "y": 0, value: 113.5 , opacity: "0.2", color: "#336eff",name:"Disparition du mode veille"},
{ "x": 33.7,   "y": 20, value: 113.5 , opacity: "0.2", color: "#336eff",name:"Disparition du mode veille"},
{ "x": 33,   "y": 200, value: 113.5 , opacity: "0.2", color: "#336eff",name:"Disparition du mode veille"}];


var streaming = [
{ "x": 80,   "y": 0, value: 200 , opacity: "1", color: "#960018",name:"Réduire la qualité du Streaming"},
{ "x": 49.5,   "y": 22, value: 200 , opacity: "1", color: "#960018",name:"Réduire la qualité du Streaming"},
{ "x": 50,   "y": 200, value: 200 , opacity: "1", color: "#960018",name:"Réduire la qualité du Streaming"}];

//var maxCapacite = [
//{ "x": 36.2,   "y": 25, value: 449.916 , opacity: "1", color: "#606060",name:"Economie Total"},
//{ "x": 36.2,   "y": 50, value: 449.916 , opacity: "1", color: "#606060",name:"Economie Total"},
//{ "x": 36.2,   "y": 200, value: 449.916 , opacity: "1", color: "#606060",name:"Economie Total"}];

function flow_p1(scroll)
{
    //Make an SVG Container
    var width = $(window).width()/2;
    var height = $(window).height();

    var svgContainer = d3.select("#vis").selectAll("svg")
    svgContainer.attr("width", width)
                .attr("height", height);

 var lineFunction = d3.svg.line()
                          .x(function(d) { return d.x*10; })
                          .y(function(d) { return d.y*20; })
                         .interpolate("cardinal");


var lineGraph = svgContainer.append("g")
                         .selectAll("path")
                         .data(mail)
                         .enter()
                          .append("path")
                          .classed("links", true)
                          .attr('d', function(d) { return lineFunction(mail); })
                          .attr("stroke", function(d) {return d.color; })
                          .attr("stroke-width", function(d) {return d.value; })
                          .attr("fill", "none")
                          .attr("width", width)
                          .attr("height", height)
                          .attr("opacity", 1)
						  .attr("data-legend",function(d) { return d.name});

var lineGraph2 = svgContainer.append("g")
                           .selectAll("path")
                           .data(obsolescence)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(obsolescence); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 0);

var lineGraph3 = svgContainer.append("g")
                         .selectAll("path")
                         .data(spam)
                         .enter()
                          .append("path")
                          .classed("links", true)
                          .attr('d', function(d) { return lineFunction(spam); })
                          .attr("stroke", function(d) {return d.color; })
                          .attr("stroke-width", function(d) {return d.value; })
                          .attr("fill", "none")
                          .attr("width", width)
                          .attr("height", height)
                          .attr("opacity", 0);

var lineGraph4 = svgContainer.append("g")
                           .selectAll("path")
                           .data(veille)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(veille); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 0);

var lineGraph5 = svgContainer.append("g")
                           .selectAll("path")
                           .data(streaming)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(streaming); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 0);


var totalLength = lineGraph.node().getTotalLength();

lineGraph.attr("stroke-dasharray",  totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
          .duration(2000)
          .ease("linear")
          .attr("stroke-dashoffset", 0);



svgContainer.append("g")
    .append("svg:image")
    .attr('x', 262)
    .attr('y', 60)
    .attr('width', 40)
    .attr('height', 40)
    .attr("xlink:href", "https://image.flaticon.com/icons/svg/138/138690.svg")
    .attr("opacity",1);

legend = svgContainer.append("g")
    .attr("class","legend")
    .attr("transform","translate(30,400)")
    .style("font-size","12px")
    .call(d3.legend)


/*
          //Add the SVG Text Element to the svgContainer
          var text = svgContainer.select("g")
                                 .append("text");
          //Add SVG Text Element Attributes
          var textLabels = text
                           .attr("x", width/4)
                           .attr("y", height-100)
                           .text( "consommation économisés : 416 000 tonnes de co2 ")
                           .attr("font-family", "sans-serif")
                           .attr("font-size", "20px");
//                           .attr("fill", "red");*/
}



function flow_p2(scroll)
{
    //Make an SVG Container
    var width = $(window).width()/2;
    var height = $(window).height();

    var svgContainer = d3.select("#vis").selectAll("svg")
    svgContainer.attr("width", width)
                .attr("height", height);

 var lineFunction = d3.svg.line()
                          .x(function(d) { return d.x*10; })
                          .y(function(d) { return d.y*20; })
                         .interpolate("cardinal");


var lineGraph = svgContainer.append("g")
                         .selectAll("path")
                         .data(mail)
                         .enter()
                          .append("path")
                          .classed("links", true)
                          .attr('d', function(d) { return lineFunction(mail); })
                          .attr("stroke", function(d) {return d.color; })
                          .attr("stroke-width", function(d) {return d.value; })
                          .attr("fill", "none")
                          .attr("width", width)
                          .attr("height", height)
                          .attr("opacity", 1)
						  .attr("data-legend",function(d) { return d.name});

var lineGraph2 = svgContainer.append("g")
                           .selectAll("path")
                           .data(obsolescence)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(obsolescence); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 1)
							.attr("data-legend",function(d) { return d.name});

var lineGraph3 = svgContainer.append("g")
                         .selectAll("path")
                         .data(spam)
                         .enter()
                          .append("path")
                          .classed("links", true)
                          .attr('d', function(d) { return lineFunction(spam); })
                          .attr("stroke", function(d) {return d.color; })
                          .attr("stroke-width", function(d) {return d.value; })
                          .attr("fill", "none")
                          .attr("width", width)
                          .attr("height", height)
                          .attr("opacity", 0);

var lineGraph4 = svgContainer.append("g")
                           .selectAll("path")
                           .data(veille)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(veille); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 0);

var lineGraph5 = svgContainer.append("g")
                           .selectAll("path")
                           .data(streaming)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(streaming); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 0);

var totalLength = lineGraph2.node().getTotalLength();

lineGraph2.attr("stroke-dasharray",  totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
          .duration(2000)
          .ease("linear")
          .attr("stroke-dashoffset", 0);


	svgContainer.append("g")
		.append("svg:image")
		.attr('x', 262)
		.attr('y', 60)
		.attr('width', 40)
		.attr('height', 40)
		.attr("xlink:href", "https://image.flaticon.com/icons/svg/138/138690.svg")
		.attr("opacity",1)
    svgContainer.append("g")
        .append("svg:image")
        .attr('x', 240)
        .attr('y', 180)
        .attr('width', 40)
        .attr('height', 40)
        .attr("xlink:href", "https://image.flaticon.com/icons/svg/733/733492.svg")
        .attr("opacity",1)

	legend = svgContainer.append("g")
    .attr("class","legend")
    .attr("transform","translate(30,400)")
    .style("font-size","12px")
    .call(d3.legend)
}



function flow_p3(scroll)
{
    //Make an SVG Container
    var width = $(window).width()/2;
    var height = $(window).height();

    var svgContainer = d3.select("#vis").selectAll("svg")
    svgContainer.attr("width", width)
                .attr("height", height);

 var lineFunction = d3.svg.line()
                          .x(function(d) { return d.x*10; })
                          .y(function(d) { return d.y*20; })
                         .interpolate("cardinal");


var lineGraph = svgContainer.append("g")
                         .selectAll("path")
                         .data(mail)
                         .enter()
                          .append("path")
                          .classed("links", true)
                          .attr('d', function(d) { return lineFunction(mail); })
                          .attr("stroke", function(d) {return d.color; })
                          .attr("stroke-width", function(d) {return d.value; })
                          .attr("fill", "none")
                          .attr("width", width)
                          .attr("height", height)
                          .attr("opacity", 1)
						  .attr("data-legend",function(d) { return d.name});

var lineGraph2 = svgContainer.append("g")
                           .selectAll("path")
                           .data(obsolescence)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(obsolescence); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 1)
							.attr("data-legend",function(d) { return d.name});

var lineGraph3 = svgContainer.append("g")
                         .selectAll("path")
                         .data(spam)
                         .enter()
                          .append("path")
                          .classed("links", true)
                          .attr('d', function(d) { return lineFunction(spam); })
                          .attr("stroke", function(d) {return d.color; })
                          .attr("stroke-width", function(d) {return d.value; })
                          .attr("fill", "none")
                          .attr("width", width)
                          .attr("height", height)
                          .attr("opacity", 1)
						  .attr("data-legend",function(d) { return d.name});

var lineGraph4 = svgContainer.append("g")
                           .selectAll("path")
                           .data(veille)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(veille); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 0);

var lineGraph5 = svgContainer.append("g")
                           .selectAll("path")
                           .data(streaming)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(streaming); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 0);
							

var totalLength = lineGraph3.node().getTotalLength();

lineGraph3.attr("stroke-dasharray",  totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
          .duration(2000)
          .ease("linear")
          .attr("stroke-dashoffset", 0);

	svgContainer.append("g")
		.append("svg:image")
		.attr('x', 262)
		.attr('y', 60)
		.attr('width', 40)
		.attr('height', 40)
		.attr("xlink:href", "https://image.flaticon.com/icons/svg/138/138690.svg")
		.attr("opacity",1)
    svgContainer.append("g")
        .append("svg:image")
        .attr('x', 240)
        .attr('y', 180)
        .attr('width', 40)
        .attr('height', 40)
        .attr("xlink:href", "https://image.flaticon.com/icons/svg/733/733492.svg")
        .attr("opacity",1)
	svgContainer.append("g")
        .append("svg:image")
        .attr('x', 162)
        .attr('y', 300)
        .attr('width', 40)
        .attr('height', 40)
        .attr("xlink:href", "https://image.flaticon.com/icons/svg/1334/1334579.svg")
        .attr("opacity",1)

legend = svgContainer.append("g")
    .attr("class","legend")
    .attr("transform","translate(30,400)")
    .style("font-size","12px")
    .call(d3.legend)
		}

function flow_p4(scroll)
{
    //Make an SVG Container
    var width = $(window).width()/2;
    var height = $(window).height();

    var svgContainer = d3.select("#vis").selectAll("svg")
    svgContainer.attr("width", width)
                .attr("height", height);

 var lineFunction = d3.svg.line()
                          .x(function(d) { return d.x*10; })
                          .y(function(d) { return d.y*20; })
                         .interpolate("cardinal");


var lineGraph = svgContainer.append("g")
                         .selectAll("path")
                         .data(mail)
                         .enter()
                          .append("path")
                          .classed("links", true)
                          .attr('d', function(d) { return lineFunction(mail); })
                          .attr("stroke", function(d) {return d.color; })
                          .attr("stroke-width", function(d) {return d.value; })
                          .attr("fill", "none")
                          .attr("width", width)
                          .attr("height", height)
                          .attr("opacity", 1)
						  .attr("data-legend",function(d) { return d.name});

var lineGraph2 = svgContainer.append("g")
                           .selectAll("path")
                           .data(obsolescence)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(obsolescence); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 1)
							.attr("data-legend",function(d) { return d.name});

var lineGraph3 = svgContainer.append("g")
                         .selectAll("path")
                         .data(spam)
                         .enter()
                          .append("path")
                          .classed("links", true)
                          .attr('d', function(d) { return lineFunction(spam); })
                          .attr("stroke", function(d) {return d.color; })
                          .attr("stroke-width", function(d) {return d.value; })
                          .attr("fill", "none")
                          .attr("width", width)
                          .attr("height", height)
                          .attr("opacity", 1)
						  .attr("data-legend",function(d) { return d.name});

var lineGraph4 = svgContainer.append("g")
                           .selectAll("path")
                           .data(veille)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(veille); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 1)
							.attr("data-legend",function(d) { return d.name});

var lineGraph5 = svgContainer.append("g")
                           .selectAll("path")
                           .data(streaming)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(streaming); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 0);


							
var totalLength = lineGraph4.node().getTotalLength();

lineGraph4.attr("stroke-dasharray",  totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
          .duration(2000)
          .ease("linear")
          .attr("stroke-dashoffset", 0);

    svgContainer.append("g")
		.append("svg:image")
		.attr('x', 262)
		.attr('y', 60)
		.attr('width', 40)
		.attr('height', 40)
		.attr("xlink:href", "https://image.flaticon.com/icons/svg/138/138690.svg")
		.attr("opacity",1)
    svgContainer.append("g")
        .append("svg:image")
        .attr('x', 240)
        .attr('y', 180)
        .attr('width', 40)
        .attr('height', 40)
        .attr("xlink:href", "https://image.flaticon.com/icons/svg/733/733492.svg")
        .attr("opacity",1)
	svgContainer.append("g")
        .append("svg:image")
        .attr('x', 162)
        .attr('y', 300)
        .attr('width', 40)
        .attr('height', 40)
        .attr("xlink:href", "https://image.flaticon.com/icons/svg/1334/1334579.svg")
        .attr("opacity",1)
    svgContainer.append("g")
        .append("svg:image")
        .attr('x', 315)
        .attr('y', 420)
        .attr('width', 40)
        .attr('height', 40)
        .attr("xlink:href", "https://image.flaticon.com/icons/svg/31/31116.svg")
        .attr("opacity",1)
		
legend = svgContainer.append("g")
    .attr("class","legend")
    .attr("transform","translate(30,400)")
    .style("font-size","12px")
    .call(d3.legend)
		}


function flow_p5(scroll)
{
    //Make an SVG Container
    var width = $(window).width()/2;
    var height = $(window).height();

    var svgContainer = d3.select("#vis").selectAll("svg")
    svgContainer.attr("width", width)
                .attr("height", height);

 var lineFunction = d3.svg.line()
                          .x(function(d) { return d.x*10; })
                          .y(function(d) { return d.y*20; })
                         .interpolate("cardinal");


var lineGraph = svgContainer.append("g")
                         .selectAll("path")
                         .data(mail)
                         .enter()
                          .append("path")
                          .classed("links", true)
                          .attr('d', function(d) { return lineFunction(mail); })
                          .attr("stroke", function(d) {return d.color; })
                          .attr("stroke-width", function(d) {return d.value; })
                          .attr("fill", "none")
                          .attr("width", width)
                          .attr("height", height)
                          .attr("opacity", 1)
						  .attr("data-legend",function(d) { return d.name});

var lineGraph2 = svgContainer.append("g")
                           .selectAll("path")
                           .data(obsolescence)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(obsolescence); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 1)
							.attr("data-legend",function(d) { return d.name});

var lineGraph3 = svgContainer.append("g")
                         .selectAll("path")
                         .data(spam)
                         .enter()
                          .append("path")
                          .classed("links", true)
                          .attr('d', function(d) { return lineFunction(spam); })
                          .attr("stroke", function(d) {return d.color; })
                          .attr("stroke-width", function(d) {return d.value; })
                          .attr("fill", "none")
                          .attr("width", width)
                          .attr("height", height)
                          .attr("opacity", 1)
						  .attr("data-legend",function(d) { return d.name});

var lineGraph4 = svgContainer.append("g")
                           .selectAll("path")
                           .data(veille)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(veille); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 1)
							.attr("data-legend",function(d) { return d.name});

var lineGraph5 = svgContainer.append("g")
                           .selectAll("path")
                           .data(streaming)
                           .enter()
                            .append("path")
                            .classed("links", true)
                            .attr('d', function(d) { return lineFunction(streaming); })
                            .attr("stroke", function(d) {return d.color; })
                            .attr("stroke-width", function(d) {return d.value; })
                            .attr("fill", "none")
                            .attr("width", width)
                            .attr("height", height)
                            .attr("opacity", 1)
							.attr("data-legend",function(d) { return d.name});


var totalLength = lineGraph5.node().getTotalLength();

lineGraph5.attr("stroke-dasharray",  totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
          .duration(2000)
          .ease("linear")
          .attr("stroke-dashoffset", 0);


	svgContainer.append("g")
		.append("svg:image")
		.attr('x', 262)
		.attr('y', 60)
		.attr('width', 40)
		.attr('height', 40)
		.attr("xlink:href", "https://image.flaticon.com/icons/svg/138/138690.svg")
		.attr("opacity",1)
	svgContainer.append("g")
		.append("svg:image")
		.attr('x', 240)
		.attr('y', 180)
		.attr('width', 40)
		.attr('height', 40)
		.attr("xlink:href", "https://image.flaticon.com/icons/svg/733/733492.svg")
		.attr("opacity",1)
	svgContainer.append("g")
		.append("svg:image")
		.attr('x', 162)
		.attr('y', 300)
		.attr('width', 40)
		.attr('height', 40)
		.attr("xlink:href", "https://image.flaticon.com/icons/svg/1334/1334579.svg")
		.attr("opacity",1)
	svgContainer.append("g")
		.append("svg:image")
		.attr('x', 315)
		.attr('y', 420)
		.attr('width', 40)
		.attr('height', 40)
		.attr("xlink:href", "https://image.flaticon.com/icons/svg/31/31116.svg")
		.attr("opacity",1)
	svgContainer.append("g")
	  .append("svg:image")
	  .attr('x', 470)
	  .attr('y', 540)
	  .attr('width', 40)
	  .attr('height', 40)
	  .attr("xlink:href", "https://image.flaticon.com/icons/svg/1384/1384868.svg")
	  .attr("opacity",1)

	  legend = svgContainer.append("g")
    .attr("class","legend")
    .attr("transform","translate(30,400)")
    .style("font-size","12px")
    .call(d3.legend)
	}
