'use strict';
var PHOTOS_LENGHT = 25;
var MAX_COMMENTS = 3;

// Дает случайную генерацию из массива
var getRandArr = function (arr) {
  var rand = Math.random() * arr.length;
  rand = Math.floor(rand);
  return arr[rand];
};

// Дает случайное значение  по диапазону
var getRandInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// Дает случайное значение да/нет
var randBolean = Boolean(Math.round(Math.random()));

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


var generComments = function () {
  // Выбирает количестко коментариев к фото
  var NumPhotoComments = getRandInt(1, MAX_COMMENTS);
  // Комментарии из 1 или 2 предложения
  var comment = getRandArr(COMMENTS);
  var twoSentence = randBolean;
  if (twoSentence === true) {
    comment = getRandArr(COMMENTS) + getRandArr(COMMENTS);
  }
  //  Формирует массив  с коментариями к одной фото
  var photoComments = [];
  for (var i = 0; i < NumPhotoComments; i++) {
    photoComments[i] = comment;
  }
  return photoComments;
};

// Генерация всего массива 25 объеков
var photos = [];
for (var k = 0; k < PHOTOS_LENGHT; k++) {
  photos[k] = {
    url: 'photos/' + i + '.jpg',
    likes: getRandInt(15, 200),
    comments: generComments(),
    description: getRandArr(DESCRIPTION)
  };
}

// Формирование фотографии по базе. С присвоением адреса картинки беда-беда не могу понять как делать
var template = document.querySelector('#picture').content.querySelector('a');
var renderPhoto = function (photo) {
  var photoElement = template.cloneNode(true);
  //   photoElement.querySelector('.picture__img').src = photos/1.jpg;     -Это мне не удается реализовать
  photoElement.querySelector('.picture__likes').textContent = photos[i].likes;
  photoElement.querySelector('.picture__comments').textContent = photos[i].comments.length;
  return photoElement;
};

//  Создание и вставка фрагмента
var blockInt = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var i = 0; i < PHOTOS_LENGHT; i++) {
  fragment.appendChild(renderPhoto(photos[i]));
  blockInt.appendChild(fragment);
}


/*
<!-- Шаблон изображения случайного пользователя -->
<template id="picture">
  <a href="#" class="picture">
    <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
    <p class="picture__info">
      <span class="picture__comments"></span>
      <span class="picture__likes"></span>
    </p>
  </a>
</template>
*/


