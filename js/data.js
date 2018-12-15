'use strict';

// Модуль, который создаёт данные

(function () {
  var data = {
    photos: [],
    selectPhotoIndex: 0
  };
  var PHOTOS_LENGHT = 25;
  var MAX_COMMENTS = 4;
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var DESCRIPTION = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];


  //  Создает случайный комментарий из 1 или 2 предложений
  var generComments = function () {
    var comment = window.ulil.getRandArr(COMMENTS);
    var twoSentence = window.ulil.randBolean;
    if (twoSentence === true) {
      comment = window.ulil.getRandArr(COMMENTS) + ' ' + window.ulil.getRandArr(COMMENTS);
    }
    return comment;
  };

  //  Создает массив  с коментариями к одной фото
  var generArrComments = function () {
    var NumPhotoComments = window.ulil.getRandInt(1, MAX_COMMENTS);
    var photoComments = [];
    for (var i = 0; i < NumPhotoComments; i++) {
      photoComments[i] = generComments();
    }
    return photoComments;
  };

  //  Создает массив из всех возможных картинок
  var originPhotos = [];
  for (var i = 0; i < PHOTOS_LENGHT; i++) {
    originPhotos[i] = {
      url: 'photos/' + (i + 1) + '.jpg',
      likes: window.ulil.getRandInt(15, 200),
      comments: generArrComments(),
      description: window.ulil.getRandArr(DESCRIPTION)
    };
  }

  // Формирование случайной последовательности, путем создание нового массива  данных из исходного
  for (var k = 0; k < PHOTOS_LENGHT; k++) {
    var randSpliceNum = window.ulil.getRandInt(1, originPhotos.length);
    var a = originPhotos.splice((randSpliceNum - 1), 1);
    data.photos.push(a[0]);
  }
  window.mockdata = data;
})();
