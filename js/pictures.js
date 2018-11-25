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
for (var i = 0; i < PHOTOS_LENGHT; i++) {
  photos[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandInt(15, 200),
    comments: generComments(),
    description: getRandArr(DESCRIPTION)
  };
}

// Генерация случайного массива  из исходного, очень важно не забыть занулить длинну массива на push
var photosRand = [];
for (var i = 0; i < PHOTOS_LENGHT; i++) {
  var randSpliceNum = getRandInt(1, photos.length);
  var a = photos.splice((randSpliceNum - 1), 1);
  photosRand.push(a[0]);
}

// Формирование фотографии по базе. С присвоением адреса картинки
var template = document.querySelector('#picture').content.querySelector('a');
var renderPhoto = function () {
  var photoElement = template.cloneNode(true);
  photoElement.querySelector('.picture__img').src = photosRand[i].url;
  photoElement.querySelector('.picture__likes').textContent = photosRand[i].likes;
  photoElement.querySelector('.picture__comments').textContent = photosRand[i].comments.length;
  return photoElement;
};

//  Создание и вставка фрагмента
var blockInt = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
for (var i = 0; i < photosRand.length; i++) {
  fragment.appendChild(renderPhoto());
  blockInt.appendChild(fragment);
}


