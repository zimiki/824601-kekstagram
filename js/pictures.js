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
    url: 1,
    likes: getRandInt(15, 200),
    comments: generComments(),
    description: getRandArr(DESCRIPTION)
  };
}

// Объявление элемента для вставки и фрагмента
var blockInt = document.querySelector('.pictures');
var fragmentPict = document.createDocumentFragment();

for (var i = 0; i < PHOTOS_LENGHT; i++) {
// Создаю клон по шаблону со всей вложенностью по <a>
  var template = document.querySelector('#picture').content.querySelector('a');
  var newElement = template.cloneNode(true);
  fragmentPict .appendChild(newElement);
}


// Вставка нового элемента в DOM, поиск, замена значений по заданию
blockInt.appendChild(fragmentPict);
var photoSmall = document.querySelector('.picture__img');
photoSmall.src = 'photos/1.jpg'; //                               ??????   1. а можно раньше во фрагменте изменить адрес изображения, пока его не в DOM
var likesSmall = document.querySelector('.picture__likes');
likesSmall.texContent = photos[3].likes; //                        ??????  2. в спан не вставилось значение
var commentSmall = document.querySelector('.picture__comment');
commentSmall = photos[3].comments.lenght; //                       ?????   3.тоже фигня получается

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


