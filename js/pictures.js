'use strict';

// Выбирает  случайное значение  по диапазону
var getRandInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};

// Создание случайных данных
function generateMockData() {
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

  // Выбирает случайное значение из массива
  var getRandArr = function (arr) {
    var rand = Math.random() * arr.length;
    rand = Math.floor(rand);
    return arr[rand];
  };

  // Выбирает случайное значение да/нет
  var randBolean = Boolean(Math.round(Math.random()));

  //  Создает случайный комментарий из 1 или 2 предложений
  var generComments = function () {
    var comment = getRandArr(COMMENTS);
    var twoSentence = randBolean;
    if (twoSentence === true) {
      comment = getRandArr(COMMENTS) + ' ' + getRandArr(COMMENTS);
    }
    return comment;
  };

  //  Создает массив  с коментариями к одной фото
  var generArrComments = function () {
    var NumPhotoComments = getRandInt(1, MAX_COMMENTS);
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
      likes: getRandInt(15, 200),
      comments: generArrComments(),
      description: getRandArr(DESCRIPTION)
    };
  }

  // Генерация случайной последовательности, путем создание нового массива  данных из исходного
  for (var k = 0; k < PHOTOS_LENGHT; k++) {
    var randSpliceNum = getRandInt(1, originPhotos.length);
    var a = originPhotos.splice((randSpliceNum - 1), 1);
    data.photos.push(a[0]);
  }
  return data;
}

function renderAll(data) {
  function renderPhotosOnPage() {
    // Создание фотографии в соответсвии с данными
    var template = document.querySelector('#picture').content.querySelector('a');
    var renderPhoto = function () {
      var photoElement = template.cloneNode(true);
      photoElement.querySelector('.picture__img').src = data.photos[i].url;
      photoElement.querySelector('.picture__likes').textContent = data.photos[i].likes;
      photoElement.querySelector('.picture__comments').textContent = data.photos[i].comments.length;
      return photoElement;
    };
    //  Создание и вставка фрагмента маленьких фотографий
    var blockInt = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.photos.length; i++) {
      fragment.appendChild(renderPhoto());
      blockInt.appendChild(fragment);
    }
  }

  // Поиск .big-picture и удаление у него класса .hidden
  var bigPicrure = document.querySelector('.big-picture');
  function renderBigPicturesOnPage() {
    bigPicrure.classList.remove('hidden');

    // Заполнение блока большой фотографии данными из первого элемента сгенерированного  массива свойств, так указано в задании
    bigPicrure.querySelector('img').src = data.photos[data.selectPhotoIndex].url;
    bigPicrure.querySelector('.likes-count').textContent = data.photos[data.selectPhotoIndex].likes;
    bigPicrure.querySelector('.comments-count').textContent = data.photos[data.selectPhotoIndex].comments.length;
    bigPicrure.querySelector('.social__caption').textContent = data.photos[data.selectPhotoIndex].description;

    // Скрытие элементов п.5 задания
    bigPicrure.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicrure.querySelector('.comments-loader').classList.add('visually-hidden');
  }

  function renderCommentsOnPage() {
    // Выборка коментрия, чтобы сохранился шаблон.  Удаление коментариев созданых в верстве
    var socialComment = bigPicrure.querySelector('.social__comment');
    var socialComments = bigPicrure.querySelector('.social__comments');

    // Функция удаления всех потомков, применяем ее на список коментариев
    var removeAllChildren = function (elem) {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
      }
    };
    removeAllChildren(socialComments);

    // Создание комментария по шаблону
    var renderComment = function () {
      var commentElement = socialComment.cloneNode(true);
      commentElement.querySelector('img').src = 'img/avatar-' + getRandInt(1, 6) + '.svg';
      commentElement.querySelector('p').textContent = data.photos[0].comments[i];
      return commentElement;
    };

    //  Создание и вставка фрагмента комментариев
    var fragmentComments = document.createDocumentFragment();
    for (var i = 0; i < data.photos[0].comments.length; i++) {
      fragmentComments.appendChild(renderComment());
      socialComments.appendChild(fragmentComments);
    }
  }
  renderPhotosOnPage(data.photos);
  renderBigPicturesOnPage(data.photos[data.selectPhotoIndex]);
  renderCommentsOnPage(data.photos);
}

var mockData = generateMockData();
renderAll(mockData);


