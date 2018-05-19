var parseDate = d3.timeParse("%Y/%m/%e %H:%M");
var inputParse = d3.timeParse("%m/%d/%Y")

function newgantt(from, to) {
    console.log(inputParse(from));
    to = new Date(inputParse(to).getTime()+24*60*60*1000);
    console.log(to);
    d3.csv("data/csv/gantt.csv", function(d) {
        if (parseDate(d.from)>=inputParse(from) && parseDate(d.to)<=to) {
            return{
            prox_id: d["prox-id"],
            from: d.from,
            to: d.to,
            position: d.position,
            type: d.type,
            floor: d.floor,
            zone: d.zone
            };
        }
    }).then(function(dd){
        console.log(dd);
        gantt(dd);
    });
}

function gantt(data) {
        
    var types_of_statuses = ["In Office","Out of Office"];
    var statuses_color = ["#99ccff","#ff99cc"];

    data.forEach(function(d) {
        d.from = parseDate(d.from);
        d.to = parseDate(d.to);
    });
    var margin = {top: 20, right: 50, bottom: 20, left: 100},
        width = 1200 - margin.left - margin.right,
        height = 1500 - margin.top - margin.bottom;

    var y = d3.scaleBand().rangeRound([0, height], .2);

    var x = d3.scaleTime().range([0, width]);

    y.domain(data.map(function(d) { return d.prox_id; }));
    x.domain([d3.min(data,function(d){return d.from;}), d3.max(data,function(d){return d.to;})]);

    var xAxis = d3.axisBottom()
        .scale(x)
        .ticks(15)
        .tickFormat(d3.timeFormat("%m/%d %H:%M"));

    var yAxis = d3.axisLeft()
        .scale(y);

    d3.select("svg").remove();

    var svg = d3.select("#body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("x", width-margin.right)
            .attr("dx", ".71em")
            .attr("dy", "-0.2em")
            .text("Date");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        svg.selectAll(".in_office,.out_office")
            .data(data)
            .enter().append("rect")
            .attr("stroke", "black")
            .attr("stroke-width", "0.5")
            .attr("class", function(d) { return d.position; })
            .attr("y", function(d) { return y(d.prox_id); })
            .attr("height", y.bandwidth())
            .attr("x", function(d) { return x(d.from); })
            .attr("width", function(d) { return x(d.to) - x(d.from); });

        // add legend
    var legend = svg.append("g")
            .attr("class", "legend")

        legend.selectAll(".swatch")
            .data(types_of_statuses)
            .enter()
            .append("rect")
            .attr("x", width-margin.left-margin.right-25)
            .attr("y", function(d, i){ return -margin.top/2 + i*20;})
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function(d,i) {
              return statuses_color[i];
            })

        legend.selectAll(".labels")
            .data(types_of_statuses)
            .enter()
            .append("text")
            .attr("x", width-margin.left-margin.right)
            .attr("y", function(d, i){ return -margin.top/2 + i*20 + 10;})
            .text(function(d,i){return types_of_statuses[i]});


    var tooltip = d3.select("body")
            .append('div')
            .attr('class', 'tooltip');

        tooltip.append('div').attr('class', 'prox_id');
        tooltip.append('div').attr('class', 'tempRange');
        tooltip.append('div').attr('class', 'position');
        tooltip.append('div').attr('class', 'floor');
        tooltip.append('div').attr('class', 'zone');

        svg.selectAll(".in_office,.out_office")
            .on('mouseover', function(d) {

                tooltip.select('.prox_id').html("<b>" + d.prox_id + "</b>");
                tooltip.select('.tempRange').html(d.from.toString() + " to " + d.to.toString());
                tooltip.select('.position').html(d.position);
                tooltip.select('.floor').html("Floor: "+d.floor);
                tooltip.select('.zone').html("Zone: "+d.zone);

                tooltip.style('display', 'block');
                tooltip.style('opacity',2);

            })
            .on('mousemove', function(d) {
                tooltip.style('top', (d3.event.layerY + 10) + 'px')
                .style('left', (d3.event.layerX - 25) + 'px');
            })
            .on('mouseout', function() {
                tooltip.style('display', 'none');
                tooltip.style('opacity',0);
            });
}