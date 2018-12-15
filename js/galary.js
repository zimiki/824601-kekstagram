'use strict';

// Модуль для отрисовки миниатюр

(function () {
  var template = document.querySelector('#picture').content.querySelector('a'); // шаблон для маленьких фото

  // - создание одной фотографии в соответсвии с данными

  var renderPhoto = function (data) {
    var photoElement = template.cloneNode(true);
    photoElement.querySelector('.picture__img').src = data.photos[i].url;
    photoElement.querySelector('.picture__likes').textContent = data.photos[i].likes;
    photoElement.querySelector('.picture__comments').textContent = data.photos[i].comments.length;
    return photoElement;
  };

  //  - создание и вставка фрагмента маленьких фотографий
  var blockInt = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.mockdata.photos.length; i++) {
    fragment.appendChild(renderPhoto(window.mockdata));
    blockInt.appendChild(fragment);
  }
})();
