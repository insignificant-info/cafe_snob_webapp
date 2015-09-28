var width = 225,
    height = 225,
    radius = Math.min(width, height) / 2,
    innerRadius = 0.3 * radius;

var pie = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.width; });

var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([0, 0])
  .html(function(d) {
    return d.data.label + ": <span style='color:orangered'>" + d.data.score + "</span>";
  });

var arc = d3.svg.arc()
  .innerRadius(innerRadius)
  .outerRadius(function (d) { 
    return (radius - innerRadius) * (d.data.score / 100.0) + innerRadius; 
  });

var outlineArc = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius);

var svg = d3.select("#result-0").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg.call(tip);

d3.csv('./static/aster_data0.csv', function(error, data) {

  data.forEach(function(d) {
    d.id     =  d.id;
    d.order  = +d.order;
    d.color  =  d.color;
    d.weight = +d.weight;
    d.score  = +d.score;
    d.width  = +d.weight;
    d.label  =  d.label;
  });
  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
  
   var outerPath = svg.selectAll(".outlineArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", "white")
      .attr("stroke", "gray")
      .attr("stroke-width", "2")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);  




  var path = svg.selectAll(".solidArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("stroke-width", "2")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);




  // calculate the weighted mean score
   // var score = 12;
    // data.reduce(function(a, b) {
    //   //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
    //   return a + (b.score * b.weight); 
    // }, 0) / 
    // data.reduce(function(a, b) { 
    //   return a + b.weight; 
    // }, 0);

  svg.append("svg:text")
    .attr("fill","white")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle") // text-align: right
    .text(Math.round(score));

});

// This should be a for loop but I don't know javascript and don't have time to learn

var svg1 = d3.select("#result-1").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg1.call(tip);

d3.csv('./static/aster_data1.csv', function(error, data) {

  data.forEach(function(d) {
    d.id     =  d.id;
    d.order  = +d.order;
    d.color  =  d.color;
    d.weight = +d.weight;
    d.score  = +d.score;
    d.width  = +d.weight;
    d.label  =  d.label;
  });
  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
  
   var outerPath = svg1.selectAll(".outlineArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", "white")
      .attr("stroke", "gray")
      .attr("stroke-width", "2")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);  




  var path = svg1.selectAll(".solidArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("stroke-width", "2")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);




  // calculate the weighted mean score
   // var score = 12;
    // data.reduce(function(a, b) {
    //   //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
    //   return a + (b.score * b.weight); 
    // }, 0) / 
    // data.reduce(function(a, b) { 
    //   return a + b.weight; 
    // }, 0);

  svg1.append("svg:text")
    .attr("fill","white")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle") // text-align: right
    .text(Math.round(score));

});

// plot #2

var svg2 = d3.select("#result-2").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg2.call(tip);

d3.csv('./static/aster_data2.csv', function(error, data) {

  data.forEach(function(d) {
    d.id     =  d.id;
    d.order  = +d.order;
    d.color  =  d.color;
    d.weight = +d.weight;
    d.score  = +d.score;
    d.width  = +d.weight;
    d.label  =  d.label;
  });
  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
  
   var outerPath = svg2.selectAll(".outlineArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", "white")
      .attr("stroke", "gray")
      .attr("stroke-width", "2")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);  




  var path = svg2.selectAll(".solidArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("stroke-width", "2")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);




  // calculate the weighted mean score
   // var score = 12;
    // data.reduce(function(a, b) {
    //   //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
    //   return a + (b.score * b.weight); 
    // }, 0) / 
    // data.reduce(function(a, b) { 
    //   return a + b.weight; 
    // }, 0);

  svg2.append("svg:text")
    .attr("fill","white")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle") // text-align: right
    .text(Math.round(score));

});

//Plot # 3

var svg3 = d3.select("#result-3").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg3.call(tip);

d3.csv('./static/aster_data3.csv', function(error, data) {

  data.forEach(function(d) {
    d.id     =  d.id;
    d.order  = +d.order;
    d.color  =  d.color;
    d.weight = +d.weight;
    d.score  = +d.score;
    d.width  = +d.weight;
    d.label  =  d.label;
  });
  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
  
   var outerPath = svg3.selectAll(".outlineArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", "white")
      .attr("stroke", "gray")
      .attr("stroke-width", "2")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);  




  var path = svg3.selectAll(".solidArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("stroke-width", "2")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);




  // calculate the weighted mean score
   // var score = 12;
    // data.reduce(function(a, b) {
    //   //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
    //   return a + (b.score * b.weight); 
    // }, 0) / 
    // data.reduce(function(a, b) { 
    //   return a + b.weight; 
    // }, 0);

  svg3.append("svg:text")
    .attr("fill","white")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle") // text-align: right
    .text(Math.round(score));

});

// plot #4
var svg4 = d3.select("#result-4").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

svg2.call(tip);

d3.csv('./static/aster_data4.csv', function(error, data) {

  data.forEach(function(d) {
    d.id     =  d.id;
    d.order  = +d.order;
    d.color  =  d.color;
    d.weight = +d.weight;
    d.score  = +d.score;
    d.width  = +d.weight;
    d.label  =  d.label;
  });
  // for (var i = 0; i < data.score; i++) { console.log(data[i].id) }
  
   var outerPath = svg4.selectAll(".outlineArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", "white")
      .attr("stroke", "gray")
      .attr("stroke-width", "2")
      .attr("class", "outlineArc")
      .attr("d", outlineArc);  




  var path = svg4.selectAll(".solidArc")
      .data(pie(data))
    .enter().append("path")
      .attr("fill", function(d) { return d.data.color; })
      .attr("class", "solidArc")
      .attr("stroke", "gray")
      .attr("stroke-width", "2")
      .attr("d", arc)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);




  // calculate the weighted mean score
   // var score = 12;
    // data.reduce(function(a, b) {
    //   //console.log('a:' + a + ', b.score: ' + b.score + ', b.weight: ' + b.weight);
    //   return a + (b.score * b.weight); 
    // }, 0) / 
    // data.reduce(function(a, b) { 
    //   return a + b.weight; 
    // }, 0);

  svg4.append("svg:text")
    .attr("fill","white")
    .attr("class", "aster-score")
    .attr("dy", ".35em")
    .attr("text-anchor", "middle") // text-align: right
    .text(Math.round(score));

});