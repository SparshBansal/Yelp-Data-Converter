#!/usr/bin/env node
var program = require('commander');
var fs = require('fs')
    , util = require('util')
    , stream = require('stream')
    , es = require('event-stream');
var filendir = require('filendir');

program.parse(process.argv);
var arr = program.args;

var filename = arr[0];
var dir = arr[1];
var count = arr[2];
var destDir = null;

if (dir) {
  if (dir.charAt(dir.length-1) == '/') {
    destDir = dir;
  }
  else{
    destDir = dir + '/';
  }
}

if (filename && destDir && !isNaN(count)) {
  var count_1 = 0 , count_2 = 0 , count_3 = 0 , count_4 = 0 , count_5 = 0;
  var ctr = 0;
  var stream = fs.createReadStream(filename)
  .pipe(es.split())
  .pipe(es.mapSync(function(line){
    stream.pause();
    var obj = JSON.parse(line);
    if (obj.stars == 1) {
      var line = obj.text;
      filendir.writeFile(destDir  + '1/' + count_1.toString() , line , function(err){

      });
      ctr++;
      count_1++;
    }
    if (obj.stars == 2) {
      var line = obj.text;
      filendir.writeFile(destDir + '2/' + count_2.toString() , line , function(err){

      });
      ctr++;
      count_2++;
    }
    if (obj.stars == 3) {
      var line = obj.text;
      filendir.writeFile(destDir + '3/'  + count_3.toString() , line , function(err){

      });
      ctr++;
      count_3++;
    }
    if (obj.stars == 4) {
      var line = obj.text;
      filendir.writeFile(destDir + '4/'  + count_4.toString() , line , function(err){

      });
      ctr++;
      count_4++;
    }
    if (obj.stars == 5) {
      var line = obj.text;
      filendir.writeFile(destDir + '5/'  + count_5.toString() , line , function(err){

      });
      ctr++;
      count_5++;
    }
    console.log(ctr.toString() , " files written ");
    stream.resume();
    if (ctr == count) {
        stream.destroy();
    }
  }));
}
