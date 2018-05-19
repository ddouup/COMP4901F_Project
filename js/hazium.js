var f1z8 = document.getElementById("f1z8");
var svg = d3.select(f1z8),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var parseTime = d3.timeParse("%Y/%m/%d %H:%M");

var x = d3.scaleTime()
    .rangeRound([0, width]);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.hazium); });

function hazium_chart(filepath, id) {
  d3.csv(filepath, function(d) {
    d.date = parseTime(d.Date_Time);
    d.hazium = +d.Hazium_Concentration;
    return d;
  }, function(error, data) {
    if (error) throw error;
    var svg = d3.select(document.getElementById(id)),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain(d3.extent(data, function(d) { return d.hazium; }));

    var xAxis = g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%m/%d %H:%M")))
        .select(".domain");


    var yAxis = g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Hazium Concentration");

    var path = g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 2)
        .attr("d", line);

  });
}
hazium_chart("data/csv/ww_f1z8a-MC2.csv", "f1z8");
hazium_chart("data/csv/ww_f2z2-MC2.csv", "f2z2");
hazium_chart("data/csv/ww_f2z4-MC2.csv", "f2z4");
hazium_chart("data/csv/ww_f2z4-MC2.csv", "f3z1");