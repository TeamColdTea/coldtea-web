(function () {
  'use strict';

  var url = {
    'uploadImageUrl': 'http://coldtea-img.herokuapp.com/uploadimage',
    'uploadImageUrlLocal': 'http://localhost:3000/uploadimage',
    'imageBaseUrl': 'https://imageuploaded4coldtea.blob.core.windows.net/fromweb'
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

    img.src = snapshot.toDataURL('image/jpeg', 0.2);

    var imgData = {
      base64str: img.src,
      name: makeid() + '.jpg'
    };

    $.post(url.uploadImageUrl, imgData, function (data) {
      console.log(data);
      console.log(url.imageBaseUrl + '/' + imgData.name);
    });
  });

  sayCheese.start();

  $('#snapshot').click(function () {
    console.log('take a photo');
    sayCheese.takeSnapshot();
  });

  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
})();
