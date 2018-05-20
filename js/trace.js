		        function calx(coordx)
		        {
		        	coordx=(coordx*3078/189+115)*660/3300;
		        	return Math.floor(coordx);
		        }

		        function caly(coordy)
		        {
		        	coordy=((111-coordy)*1806/111+372)*510/2550;
		        	return Math.floor(coordy);
		        }  

		    	function DrawFloor1()
		    	{	
		    		document.getElementById("Floor1").style.display = 'inline';
		    		document.getElementById("Floor2").style.display = 'none';
					document.getElementById("Floor3").style.display = 'none';
                    UpdateBox1(dataset1);
		    	}
		    	function DrawFloor2()
		    	{
		    		document.getElementById("Floor1").style.display = 'none';
		    		document.getElementById("Floor2").style.display = 'inline';
					document.getElementById("Floor3").style.display = 'none';
                    UpdateBox1(dataset1);
		    	}
		    	function DrawFloor3()
		    	{
		    		document.getElementById("Floor1").style.display = 'none';
		    		document.getElementById("Floor2").style.display = 'none';
					document.getElementById("Floor3").style.display = 'inline';
                    UpdateBox1(dataset1);
		    	}
		    	function UpdateBox()
		    	{
		    		var value=slider.jRange("getValue");
					value=value.split(",");
		    		document.getElementById("Leftbox").value =value[0];
		    		document.getElementById("Rightbox").value =value[1];
		    	}


		    	function start()
		    	{
		    	var canvasF1 = document.getElementById("Floor1");
				var canvasF2 = document.getElementById("Floor2");
				var canvasF3 = document.getElementById("Floor3");
		        var canvasfront =document.getElementById("canvas2");
				var contextF1 = canvasF1.getContext("2d");
				var contextF2 = canvasF2.getContext("2d");
				var contextF3 = canvasF3.getContext("2d");
				var contextfront = canvasfront.getContext("2d");
		 
				var imgF1 = new Image();
				var imgF2 = new Image();
				var imgF3 = new Image();

				imgF1.src="https://raw.githubusercontent.com/ddouup/COMP4901F_Project/master/data/FloorPlan/VAST_Basic_F1.jpg";
				imgF2.src="https://raw.githubusercontent.com/ddouup/COMP4901F_Project/master/data/FloorPlan/VAST_Basic_F2.jpg";
				imgF3.src="https://raw.githubusercontent.com/ddouup/COMP4901F_Project/master/data/FloorPlan/VAST_Basic_F3.jpg";
				//3300*2550->660*510  Original coordinates:189*111 
		        imgF1.onload = function() 
				{
		    		contextF1.drawImage(imgF1, 0, 0,660,510);
			    }    
			    imgF2.onload = function() 
				{
		    		contextF2.drawImage(imgF2, 0, 0,660,510);
			    }  
			    imgF3.onload = function() 
				{
		    		contextF3.drawImage(imgF3, 0, 0,660,510);
			    }
		          //  document.getElementById("Floor1").style.display = 'none';
			    document.getElementById("Floor2").style.display = 'none';
				document.getElementById("Floor3").style.display = 'none';
		    	}

				function trace(StartIndex,EndIndex,ID)
				{
				    w = 660;
		            h = 510;

			    var linear = d3.scale.linear()
			        .domain([0,30])
			        .range([0,1]);
		            timestamp1 = new Date(StartIndex);
		            timestamp2 = new Date(EndIndex);
		            var dataset=   new Array();
		            name=ID;
		            dataset1=new Array();
		            d3.csv("data/trace.csv",function(error,csvset){		            
		            for(var i = 0, len = csvset.length; i < len; i++){
		                csvset[i].timestamp = new Date(csvset[i].timestamp);
		                    if(csvset[i].proxid==name&&csvset[i].timestamp-timestamp2>=0&&csvset[i].timestamp-timestamp1<=0){
		                        csvset[i].x=Number(csvset[i].x)+Math.random()*4-2;
		                        csvset[i].y=Number(csvset[i].y)+Math.random()*4-2;
		                        dataset1.push(csvset[i]);
		                }}

		                var range='0,'+(dataset1.length-1);
		                $('.slider-input').jRange('updateRange', range,range);
		            UpdateBox1(dataset1);
				});
				}

		    	function UpdateBox1(set)
		    	{
		    		if(set.length>0)
		    		{
		    		var value=slider.jRange("getValue");
					value=value.split(",");
					Date1 = new Date(set[value[0]].timestamp);
					Date2 = new Date(set[value[1]].timestamp);
		    		document.getElementById("Leftbox").value =Date1;
		    		document.getElementById("Rightbox").value =Date2;
		    		huahua(set,Date1,Date2);
		    		}
		    	}



				function huahua(csvset,timestamp1,timestamp2)
				{
                    d3.selectAll("svg").remove();
                    //d3.selectAll("circle").remove();
                    timestamp1=new Date(timestamp1);
                    timestamp2=new Date(timestamp2);

									//console.log(csvset);
			    var NS = "http://www.w3.org/2000/svg";
		            var colorring=new Array(d3.rgb(255,0,0),d3.rgb(255,255,0),d3.rgb(0,255,0),d3.rgb(0,255,255),d3.rgb(0,0,255),d3.rgb(125,0,255));
			    	var compute=new Array();
			    for(var i=0;i<5;i++){
			        compute[i]= d3.interpolate(colorring[i],colorring[i+1]);
			    }
			    var width = 690,
			        height = 510;
			    var svgContainer=document.getElementById('svg');
			    var svg = d3.select(svgContainer).append("svg")

                        .attr("width", width)
                        .attr("height", height);

		            dataset=   new Array();

		            for(var i = 0, len = csvset.length; i < len; i++){
		                csvset[i].timestamp = new Date(csvset[i].timestamp);
		                    if(csvset[i].timestamp>=timestamp1&&csvset[i].timestamp<=timestamp2){
		                        csvset[i].x=Number(csvset[i].x);
		                        csvset[i].y=Number(csvset[i].y);
		                        dataset.push(csvset[i]);

		                }}
                    var len=dataset.length;
                    svg.selectAll("rect")
                        .data(dataset)
                        .enter()
                        .append("rect")
                        .attr("x",650)
                        .attr("y", function (d,i) {
                            return 100+300*i/len;
                        })
                        .attr("width","10")
                        .attr("height",300/len)
                        .attr("font-size","11px")
                        .attr("font-weight","bold")
                        .attr("fill", function (d,i) {

                            var theTime = new Date(d.timestamp)-(timestamp2);
                            var tl=timestamp1-timestamp2;
                            if(tl>=0){
                                return compute[0](1);
                            }
                            // console.log(Math.floor(theTime*5/(tl)));
                            return compute[Math.abs(Math.floor(theTime*5/(tl)-0.00001))]((theTime-Math.floor(theTime*5/(tl))*(tl/5))/(tl/5));
                        });
                    svg.selectAll("text")
                        .data(dataset)
                        .enter()
						.append("text")
                        .attr("x",675)
                        .attr("y", function (d,i) {
                            return 100+300*i/len+0.5*300/len;
                        })
                        .attr("text-anchor","middle")
                        .attr("font-family","sans-setif")
                        .attr("font-size","10px")
                        .attr("font-weight","bold")
                        .attr("fill","black")
                        .text(function (d,i){
                            da=(new Date(d.timestamp));
                            var datesp =da.getHours()+":"+da.getMinutes();
                            return datesp;
                        });

		        svg.selectAll("line")
                .data(dataset)
                .enter()
                .append("line")
                .attr("id",function(d) {
                    if(d.floor=='1'){
                        return "f1";
                    }
                    else if(d.floor=='2'){
                        return "f2";
                    }else if(d.floor=='3'){

                        return "f3";
                    }

                })
                .attr("x1", function (d,i) {
                    if(i<dataset.length-1&&dataset[i+1].floor==dataset[i].floor)
                    	return calx(dataset[i+1].x);
                    else
                        return calx(dataset[i].x);
                })
                .attr("x2", function (d,i) {
                    return calx(dataset[i].x);
                })
                .attr("y1", function (d,i) {
                    if(i<dataset.length-1&&dataset[i+1].floor==dataset[i].floor)
                        return caly(dataset[i+1].y);
                    else
                        return caly(dataset[i].y);
                })
                .attr("y2", function (d,i) {
                    return caly(dataset[i].y);
                })
                .attr("stroke-width", 2)
                .attr("stroke",   "black");

            svg.selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle")
                .attr("id",function(d) {
                    if(d.floor=='1'){
                        return "f1";
					}
					else if(d.floor=='2'){
                        return "f2";
                    }else if(d.floor=='3'){
                        return "f3";
                    }

                })
                .attr("cx", function (d,i) {
                    return calx(dataset[i].x);
                })
                .attr("cy",function (d,i) {
                    return caly(dataset[i].y);
                })
                .attr("fill", function (d,i) {

                    var theTime = new Date(d.timestamp)-(timestamp2);
                    var tl=timestamp1-timestamp2;
                    if(tl>=0){
                    	return compute[0](1);
					}
                   // console.log(Math.floor(theTime*5/(tl)));
                    return compute[Math.abs(Math.floor(theTime*5/(tl)-0.00001))]((theTime-Math.floor(theTime*5/(tl))*(tl/5))/(tl/5));
                })

                .attr("stroke", "black")
                .attr("stroke-width", 1)
                .attr("r", 4)
            	.on("mouseover",function(d){
                
                var xPosition=parseFloat(d3.select(this).attr("cx"))+20;
                var yPosition=parseFloat(d3.select(this).attr("cy"))-10;

                
                svg.append("text")
                    .attr("id","tooltip")
                    .attr("x",xPosition)
                    .attr("y",yPosition)
                    .attr("text-anchor","middle")
                    .attr("font-family","sans-setif")
                    .attr("font-size","11px")
                    .attr("font-weight","bold")
                    .attr("fill","black")
                    .text(new Date(d.timestamp));
            })
            
                .on("mouseout",function(){
                    d3.select("#tooltip").remove();
                })


			if(document.getElementById("Floor1").style.display =='none'){
                d3.selectAll("#f1").remove();
			}
            if(document.getElementById("Floor2").style.display =='none'){
                d3.selectAll("#f2").remove();
            }
            if(document.getElementById("Floor3").style.display =='none'){
                d3.selectAll("#f3").remove();
            }
			   
			}