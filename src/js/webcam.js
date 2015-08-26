(function () {
  'use strict';

  var url = {
    'uploadImageUrl': 'http://coldtea-img.herokuapp.com/uploadimage',
    'uploadImageUrlLocal': 'http://localhost:3000/uploadimage',
    'imageBaseUrl': 'https://imageuploaded4coldtea.blob.core.windows.net/fromweb'
  };

  var sayCheese = new SayCheese('#say-cheese-container', {snapshots: true});
  sayCheese.on('start', function() {
    $('#action-buttons').fadeIn('fast');

    $('#take-snapshot').on('click', function(evt) {
      sayCheese.takeSnapshot();
    });
  });

  sayCheese.on('error', function(error) {
    var $alert = $('<div>');
    $alert.addClass('alert alert-error').css('margin-top', '20px');

    if (error === 'NOT_SUPPORTED') {
      $alert.html("<strong>:(</strong> your browser doesn't support video yet!");
    } else if (error === 'AUDIO_NOT_SUPPORTED') {
      $alert.html("<strong>:(</strong> your browser doesn't support audio yet!");
    } else {
      $alert.html("<strong>:(</strong> you have to click 'allow' to try me out!");
    }

    $('.say-cheese').prepend($alert);
  });


  sayCheese.on('snapshot', function (snapshot) {
    var btn = $('#take-snapshot').button('loading');
    var img = document.createElement('img');

    img.src = snapshot.toDataURL('image/jpeg', 0.2);

    var imgData = {
      base64str: img.src,
      name: makeid() + '.jpg'
    };

    $.post(url.uploadImageUrl, imgData, function (data) {
      console.log(data);
      var imgUrl = url.imageBaseUrl + '/' + imgData.name;
      img.src = imgUrl;
      console.log(imgUrl);
      $('#say-cheese-snapshots').prepend(img);
      btn.button('reset');
    });
  });

  sayCheese.start();

  function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
})();
