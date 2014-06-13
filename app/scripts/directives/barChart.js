'use strict';

angular.module('DataVisualizationApp')
  .directive('barChart', function () {
    return {
      template: '<div class="bar-chart"></div>',
      restrict: 'E',
      scope: {
      	items: '='
      },
      link: function postLink(scope, element, attrs) {
        		var margin = {top: 20, right: 20, bottom: 30, left: 40},
				    width = 960 - margin.left - margin.right,
				    height = 350 - margin.top - margin.bottom;

				var formatPercent = d3.format(".0%");

				//Creat the scale and associated axes
				var x = d3.scale.ordinal()
				    .rangeRoundBands([0, width], .1, .25);

				var y = d3.scale.linear()
				    .range([height, 0]);

				var xAxis = d3.svg.axis()
				    .scale(x)
				    .orient("bottom");

				var yAxis = d3.svg.axis()
				    .scale(y)
				    .orient("left")
				    .tickFormat(formatPercent);

				var svg = d3.select("div.bar-chart").append("svg")
				    .attr("width", width + margin.left + margin.right)
				    .attr("height", height + margin.top + margin.bottom)
				  .append("g")
				    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			  	svg.append("g")
			      	.attr("class", "x axis")
			      	.attr("transform", "translate(0," + height + ")")
			      	.call(xAxis);

			  	svg.append("g")
			      	.attr("class", "y axis")
			      	.call(yAxis)
			    .append("text")
			      	.attr("transform", "rotate(-90)")
			      	.attr("y", 6)
			      	.attr("dy", ".71em")
			      	.style("text-anchor", "end")
			      	.text("Percentage");


      			scope.$watch('items', function (barChartData, oldVal) {
					x.domain(barChartData.map(function(d) { return d.letter; }));
			  		y.domain([0, d3.max(barChartData, function(d) { return d.frequency; })]);

					svg.select(".x.axis").call(xAxis);

				  	var chart = svg.selectAll(".bar")
				      			.data(barChartData);
				  	
				  	//Perform updates
				  	chart.transition()
				  		.duration(500)
				  		.attr("height", function(d) { return height - y(d.frequency); })
				      	.attr("y", function(d) { return y(d.frequency); });

				  	chart.enter().append("rect")
				      	.attr("class", "bar")
				      	.attr("x", function(d) { return x(d.letter); })
				      	.attr("width", x.rangeBand())
				      	.attr("y", function(d) { return y(d.frequency); })
				      	.attr("height", function(d) { return height - y(d.frequency); });


				  	function change() {
				    	// Copy-on-write since tweens are evaluated after a delay.
				    	var x0 = x.domain(barChartData.sort(this.checked
				        	? function(a, b) { return b.frequency - a.frequency; }
				        	: function(a, b) { return d3.ascending(a.letter, b.letter); })
				        	.map(function(d) { return d.letter; }))
				        	.copy();

				    	var transition = svg.transition().duration(750),
				        	delay = function(d, i) { return i * 50; };

				    	transition.selectAll(".bar")
				        	.delay(delay)
				        	.attr("x", function(d) { return x0(d.letter); })

				    	transition.select(".x.axis")
				        	.call(xAxis)
				      		.selectAll("g")
				        	.delay(delay);
					}
				});

				
      	}	
    };
  });
