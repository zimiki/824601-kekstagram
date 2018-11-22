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
    url: 25,
    likes: getRandInt(15, 200),
    comments: generComments(),
    description: getRandArr(DESCRIPTION)
  };
}

/* Проверка на тестовой странице
var AAA = {name: 'Olgah', age: 15};
document.write('<b>Массив</b>:<br>');
document.write('Имя:' + photos[4].likes + ' / ' + photos[4].comments + ' / ' + photos[4].description + '.<br>');
document.write('Имя:' + photos[5].likes + ' / ' + photos[5].comments + ' / ' + photos[5].description + '.<br>');
document.write('<b>Массив</b>:<br>');
document.write('Имя:' + AAA.name + AAA.age);
document.write(generComments())
;
*/
