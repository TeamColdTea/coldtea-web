(function () {
  'use strict';

  var url = {
    'uploadimage': 'http://uploadimage-coldtea.chinacloudsites.cn/uploadimage'
  };

  var sayCheese = new SayCheese('#container-element', { snapshots: true });

  sayCheese.on('start', function () {
    // do something when started
    this.takeSnapshot();
  });

  sayCheese.on('error', function (error) {
    // handle errors, such as when a user denies the request to use the webcam,
    // or when the getUserMedia API isn't supported
  });

  sayCheese.on('snapshot', function (snapshot) {
    var img = document.createElement('img');

    $(img).on('load', function () {
      $('#snapshots').prepend(img);
    });
    img.src = snapshot.toDataURL('image/png');

    $.post(url.uploadimage, {base64str: img.src}, function (data) {
      console.log(data);
    });
  });

  sayCheese.start();

  $('#snapshot').click(function() {
    console.log('take a photo');
    sayCheese.takeSnapshot();
  });

})();
