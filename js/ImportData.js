function importData() {
	d3.csv("data/Employee List.csv", function(d) {
	  return {
	    Last_Name: d["Last Name"],
	    First_Name: d["First Name"],
	    Department: d.Department,
	    Office: +d.Office
	  };
	}).then(function(data) {
		console.log(data);
		if (data.Department == "Security"){
			console.log(data);
		}
	});
}

function importData_test() {
	var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var parseTime = d3.timeParse("%Y-%m-%d %H:%M:%S");

	var x = d3.scaleTime()
	    .rangeRound([0, width]);

	var y = d3.scaleLinear()
	    .rangeRound([height, 0]);

	var area = d3.area()
	    .x(function(d) { return x(d["Date/Time"]); })
	    .y1(function(d) { return y(d["F_1_Z_8A: Hazium Concentration"]); });

	d3.csv("data/csv/f1z8a-MC2.csv", 
		function(d) {
			return{
				Date: parseTime(d["Date/Time"]),
				F_1_Z_8A_Hazium_Concentration: +d["F_1_Z_8A: Hazium Concentration"]
			};
		}, 
		function(error, data) {
			if (error) throw error;

			x.domain(d3.extent(data, function(d) { return d["Date/Time"]; }));
			y.domain([0, d3.max(data, function(d) { return d["F_1_Z_8A: Hazium Concentration"]; })]);
			area.y0(y(0));

			g.append("path")
			    .datum(data)
			    .attr("fill", "steelblue")
			    .attr("d", area);

			g.append("g")
			    .attr("transform", "translate(0," + height + ")")
			    .call(d3.axisBottom(x));

			g.append("g")
			    .call(d3.axisLeft(y))
			  .append("text")
			    .attr("fill", "#000")
			    .attr("transform", "rotate(-90)")
			    .attr("y", 6)
			    .attr("dy", "0.71em")
			    .attr("text-anchor", "end")
			    .text("F_1_Z_8A: Hazium Concentrationn");
			}
	);
}