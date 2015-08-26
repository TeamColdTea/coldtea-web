(function() {
  'use strict';

  var from = document.querySelector('#say-cheese-snapshots');
  var to = document.querySelector('#face');

  dragula([from, to], {
    /*accepts: function (el, target) {
      if(target === to && to.children.length != 0) {
        return false;
      }
      if(target === from && from.children.length != 0) {
        return false;
      }
      return true;
    }*/
  });

  var baseUrl = 'http://coldtea.chinacloudapp.cn/Service2.svc/';
  var func = {
    calSim: baseUrl + 'CalculateSimilar',
    morphFace: baseUrl + 'MorphFaceByURL'
  };

  $('#compare-button').click(function() {
    $('#modalShowResult').html('Please Wait...');
    if(from.children.length === 0 || to.children.length === 0) {
      $('#modalShowResult').html('Please ensure everyList has at least one snapshot!');
      return;
    }
    $.getJSON(func.calSim, {
      URL1: from.children[0].src,
      URL2: to.children[0].src
    }, function(data) {
      $('#modalShowResult').html('Simularity: ' + data);
      console.log(data);
    });
  });

  $('#synthesis-button').click(function() {
    $('#modalShowResult').html('Please Wait...');
    if(from.children.length === 0 || to.children.length === 0) {
      $('#modalShowResult').html('Please ensure everyList has at least one snapshot!');
      return;
    }
    $.getJSON(func.morphFace, {
      URL1: from.children[0].src,
      URL2: to.children[0].src,
      Parameter: 0.5
    }, function(data) {
      console.log(data);
      prependImage(data[0]);
    });
  });

  function prependImage(src) {
    var img = document.createElement('img');
    $(img).on('load', function() {
      $('#modalShowResult').html(img);
    });
    img.src = src;
  }
})();
