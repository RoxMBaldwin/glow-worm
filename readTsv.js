var fs = require('fs'); //not fsp`


fs.readFile('./trand_domain_crawler.tsv', function(err, data) {
  // console.log(data)
  var x = data.toString().split('\n');
  for (var i=0; i<x.length; i++) {
      if (x[i] !== '') {
        y = x[i].split('\t');
        x[i] = y;
      } else
        x.splice(i, 1);
  }
  console.log(x[x.length-1]);
})
