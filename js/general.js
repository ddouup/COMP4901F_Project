var parseTime = d3.timeParse("%Y/%m/%d %H:%M");

//'use strict';
function Drawgraph(filepath,STR,COL){
  $.getJSON(filepath, function (data) {
    var ds = new DataSet({
      state: {
        st: '2016/5/31 12:00',
        end: '2016/6/20 12:00'
      }
    });
    const dv = ds.createView();
    dv.source(data)
        .transform({
          type: 'filter',
          callback: obj => {
            return parseTime(obj.DateTime) >= parseTime(ds.state.st) && parseTime(obj.DateTime) <= parseTime(ds.state.end);
          }
        });
    //console.log(data);
    //data = [{ year: '1991', value: 3 }, { year: '1992', value: 4 }, { year: '1995', value: 4.9 }, { year: '1996', value: 6 }];
    const chart = new G2.Chart({
      container: STR,
      forceFit: true,
      height: 350,
      animate: false,
      padding: [ 20, 100, 60 ],
      sync: true,
    });
    chart.source(dv)
    chart.line().position('DateTime*Value').color(COL);
    chart.render();
    var sli='Slider'+STR;
    const slider = new Slider({
      //container: document.getElementById('slider'),
      container: sli,
      padding: [ 20, 100, 60 ],
      //start: ds.state.st,
      //end: ds.state.end,
      data,
      xAxis: 'DateTime',
      yAxis: 'Value',
      scales: {
        release: {
          formatter: (val) => {
            return parseInt(val, 10);
          }
        }
      },
      backgroundChart: {
        type: 'interval',
        color: 'rgba(0, 0, 0, 0.3)'
      },
      onChange: ({ startText, endText }) => {
        // !!! 更新状态量
        ds.setState('st', startText);
        ds.setState('end', endText);
      }
    });
    slider.render();
  });
}

Drawgraph('data/csvjsonELEC.json','ELEC','#24b4f2');
Drawgraph('data/csvjsonHVAC.json','HVAC','#47e55e');
Drawgraph('data/csvjsonHEAT.json','HEAT','#c727e8');
Drawgraph('data/csvjsonInlet.json','Inlet','#e827b7');
Drawgraph('data/csvjsonOutlet.json','Outlet','#0bddb7');
Drawgraph('data/csvjsonBulb.json','Bulb','#ef647e');

