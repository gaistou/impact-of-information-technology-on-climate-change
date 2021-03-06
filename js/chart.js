function renderStackedBarChart(inputData, chartFin, colorScheme) {
	data = inputData

	var margin = {top: 20, right: 20, bottom: 30, left: 40},
	width = 600 - margin.left - margin.right,
	height = 520 - margin.top - margin.bottom,
	height2 = height*0.75;

	var x = d3.scale.ordinal()
	.rangeRoundBands([0, width/2], .1);

	var y = d3.scale.linear()
	.rangeRound([height2, 0]);

	var color = d3.scale.ordinal()
	.range(colorScheme);

	var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.tickFormat(function(d) {
		return ("Consommation Numérique Totale");
	});

	var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left")
	.tickFormat(d3.format(".2s"));
	

	var tip = d3.tip()
	.attr('class', 'd3-tip')
	.offset([-10, 0])
	.html(function(d) {
		return "<div><strong> " +d.name + ":</strong></div><div> <span style='color:white'>" + (d.y1 - d.y0).toFixed(0) + "</span></div>";
	})

	var svg = d3.select(chartFin).append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)

	var main = svg.append("g")
	.attr("height", height2)
	.attr("transform", "translate(" + margin.left + "," + (height*0.20) + ")");

	var active_link = "0";
	var legendClicked;
	var legendClassArray = [];
	var y_orig;

	svg.call(tip);

	color.domain(d3.keys(data[0]).filter(function(key) { return key !== "label"; }));

	data.forEach(function(d) {
		var mylabel = d.label;
		var y0 = 0;

		d.params = color.domain().map(function(name) { return {mylabel:mylabel, name: name, y0: y0, y1: y0 += +d[name]}; });
		d.total = d.params[d.params.length - 1].y1;

	});

	data.sort(function(a, b) { return b.total - a.total; });

	x.domain(data.map(function(d) { return (d.label); }));
	y.domain([0, d3.max(data, function(d) { return d.total; })]);

	main.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height2 + ")")
	.call(xAxis);

	main.append("g")
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("transform", "rotate(-90)")
	.attr("y", 6)
	.attr("dy", ".71em")
	.style("text-anchor", "end");

	svg.append("text")
	  .attr("class","yLegend")
      .attr("transform",
            "translate(" + (29) + " ," + 
                           (90) + ")")
      .style("text-anchor", "middle")
      .text("Mt CO2");

	var state = main.selectAll(".state")
	.data(data)
	.enter().append("g")
	.attr("class", "g")
	.attr("transform", function(d) { return "translate(" + "0" + ",0)"; });


	state.selectAll("rect")
	.data(function(d) {
		return d.params;
	})
	.enter().append("rect")
	.attr("width", x.rangeBand())
	.attr("y", function(d) { return y(d.y1); })
	.attr("x",function(d) {
		return x(d.mylabel)
	})
	.attr("height", function(d) { return y(d.y0) - y(d.y1); })
	.attr("class", function(d) {
		var classLabel = d.name.replace(/\s/g, '');
		return "class" + classLabel;
	})
	.style("fill", function(d) { return color(d.name); });

	state.selectAll("rect")
	.on("mouseover", function(d){

		var delta = d.y1 - d.y0;
		var xPos = parseFloat(d3.select(this).attr("x"));
		var yPos = parseFloat(d3.select(this).attr("y"));
		var height = parseFloat(d3.select(this).attr("height"))

		d3.select(this).attr("stroke","blue").attr("stroke-width",0.8);
		tip.show(d);
		/*main.append("text")
		.attr("x",xPos)
		.attr("y",yPos +height/2)
		.attr("class","tooltip")
		.text(d.name +": "+ delta.toFixed(0)); */

	})
	.on("mouseout",function(){
		tip.hide();
		/*main.select(".tooltip").remove();*/
		d3.select(this).attr("stroke","pink").attr("stroke-width",0.2);

	})


	var legend = svg.selectAll(".legend")
	.data(color.domain().slice().reverse())
	.enter().append("g")
	.attr("class", function (d) {
		legendClassArray.push(d.replace(/\s/g, ''));
		return "legend";
	})
	.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


	legendClassArray = legendClassArray.reverse();

	legend.append("rect")
	.attr("x", width -60)
	.attr("y", 90)
	.attr("width", 18)
	.attr("height", 18)
	.style("fill", color)
	.attr("id", function (d, i) {
		return "id" + d.replace(/\s/g, '');
	})
	.on("mouseover",function(){

		if (active_link === "0") d3.select(this).style("cursor", "pointer");
		else {
			if (active_link.split("class").pop() === this.id.split("id").pop()) {
				d3.select(this).style("cursor", "pointer");
			} else d3.select(this).style("cursor", "auto");
		}
	})
	.on("click",function(d){

		if (active_link === "0") {
			d3.select(this)
			.style("stroke", "black")
			.style("stroke-width", 2);

			active_link = this.id.split("id").pop();
			plotSingle(this);


			for (i = 0; i < legendClassArray.length; i++) {
				if (legendClassArray[i] != active_link) {
					d3.select("#id" + legendClassArray[i])
					.style("opacity", 0.5);
				}
			}

		}
		else {
			if (active_link === this.id.split("id").pop()) {
				d3.select(this)
				.style("stroke", "none");

				active_link = "0";


				for (i = 0; i < legendClassArray.length; i++) {
					d3.select("#id" + legendClassArray[i])
					.style("opacity", 1);
				}

				restorePlot(d);

			}

		}
	});

	legend.append("text")
	.attr("x", width - 65 )
	.attr("y", 98)
	.attr("dy", ".35em")
	.style("text-anchor", "end")
	.text(function(d) { return d; });

	function restorePlot(d) {

		state.selectAll("rect").forEach(function (d, i) {

			d3.select(d[idx])
			.transition()
			.duration(1000)
			.attr("y", y_orig[i]);
		})


		for (i = 0; i < legendClassArray.length; i++) {
			if (legendClassArray[i] != class_keep) {
				d3.selectAll(".class" + legendClassArray[i])
				.transition()
				.duration(1000)
				.delay(750)
				.style("opacity", 1);
			}
		}

	}

	function plotSingle(d) {

		class_keep = d.id.split("id").pop();
		idx = legendClassArray.indexOf(class_keep);


		for (i = 0; i < legendClassArray.length; i++) {
			if (legendClassArray[i] != class_keep) {
				d3.selectAll(".class" + legendClassArray[i])
				.transition()
				.duration(1000)
				.style("opacity", 0);
			}
		}


		y_orig = [];
		state.selectAll("rect").forEach(function (d, i) {


			h_keep = d3.select(d[idx]).attr("height");
			y_keep = d3.select(d[idx]).attr("y");

			y_orig.push(y_keep);

			h_base = d3.select(d[0]).attr("height");
			y_base = d3.select(d[0]).attr("y");

			h_shift = h_keep - h_base;
			y_new = y_base - h_shift;


			d3.select(d[idx])
			.transition()
			.ease("bounce")
			.duration(1000)
			.delay(750)
			.attr("y", y_new);

		})

	}
};