'use strict';

// БЛОК ВЫБОРА СЛУЧАЙНОГО

// 1. Выбирает  случайное значение  по диапазону
var getRandInt = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};
// 2. Выбирает случайное значение из массива
var getRandArr = function (arr) {
  var rand = Math.random() * arr.length;
  rand = Math.floor(rand);
  return arr[rand];
};
// 3. Выбирает случайное значение да/нет
var randBolean = Boolean(Math.round(Math.random()));
// 4. Магические числа
var ESC_KEYCODE = 27;

// СОЗДАНИЕ СЛУЧАЙНЫХ ДАННЫХ
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

  // Формирование случайной последовательности, путем создание нового массива  данных из исходного
  for (var k = 0; k < PHOTOS_LENGHT; k++) {
    var randSpliceNum = getRandInt(1, originPhotos.length);
    var a = originPhotos.splice((randSpliceNum - 1), 1);
    data.photos.push(a[0]);
  }
  return data;
}


// ГЕНЕРАЦИЯ НА ОСНОВЕ ДАННЫХ
function renderAll(data) {

  // Создание страницы с маленькими фотографиями
  function renderPhotosOnPage() {
    // - создание одной фотографии в соответсвии с данными

    var renderPhoto = function () {
      var photoElement = template.cloneNode(true);
      photoElement.querySelector('.picture__img').src = data.photos[i].url;
      photoElement.querySelector('.picture__likes').textContent = data.photos[i].likes;
      photoElement.querySelector('.picture__comments').textContent = data.photos[i].comments.length;
      return photoElement;
    };
    //  - создание и вставка фрагмента маленьких фотографий
    var blockInt = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.photos.length; i++) {
      fragment.appendChild(renderPhoto());
      blockInt.appendChild(fragment);
    }
  }

  // Изменение блока с большой картинкой
  function renderBigPicturesOnPage(bigStyle) {
    // - заполнение блока большой фотографии данными из первого элемента сгенерированного  массива свойств, так указано в задании
    bigStyle.querySelector('img').src = data.photos[data.selectPhotoIndex].url;
    bigStyle.querySelector('.likes-count').textContent = data.photos[data.selectPhotoIndex].likes;
    bigStyle.querySelector('.comments-count').textContent = data.photos[data.selectPhotoIndex].comments.length;
    bigStyle.querySelector('.social__caption').textContent = data.photos[data.selectPhotoIndex].description;
    // - скрытие элементов п.5 задания
    bigStyle.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigStyle.querySelector('.comments-loader').classList.add('visually-hidden');
  }

  // Изменение блока с комментариями к большой фото
  function renderCommentsOnPage(bigStyle) {
    // - выборка коментрия, чтобы сохранился шаблон.  Удаление коментариев созданых в верстве
    var socialComment = bigStyle.querySelector('.social__comment');
    var socialComments = bigStyle.querySelector('.social__comments');
    // - удаление всех потомков, применяем ее на список коментариев
    var removeAllChildren = function (elem) {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
      }
    };
    removeAllChildren(socialComments);
    // - создание одного комментария по шаблону из верстки
    var renderComment = function () {
      var commentElement = socialComment.cloneNode(true);
      commentElement.querySelector('img').src = 'img/avatar-' + getRandInt(1, 6) + '.svg';
      commentElement.querySelector('p').textContent = data.photos[0].comments[i];
      return commentElement;
    };
    // - создание и вставка фрагмента комментариев
    var fragmentComments = document.createDocumentFragment();
    for (var i = 0; i < data.photos[0].comments.length; i++) {
      fragmentComments.appendChild(renderComment());
      socialComments.appendChild(fragmentComments);
    }
  }

  // Запуск отрисовки элементов на основе данных
  var template = document.querySelector('#picture').content.querySelector('a'); // шаблон для маленьких фото
  var bigPicrure = document.querySelector('.big-picture'); // шаблон для больших фото
  renderPhotosOnPage(data.photos);
  renderBigPicturesOnPage(bigPicrure);
  renderCommentsOnPage(bigPicrure);
}


// Блок для описания сценария popup большой фотографии
var showBigPictureModal = function () {
  var bigPicture = document.querySelector('.big-picture');
  var openBigPicture = document.querySelectorAll('.picture__img');
  var closeBigPicture = bigPicture.querySelector('#picture-cancel');

  // - открытие большой фотографии при нажатии на любую из галерии маленьких
  for (var i = 0; i < openBigPicture.length; i++) {
    openBigPicture[i].addEventListener('click', function () {
      bigPicture.classList.remove('hidden');
      document.addEventListener('keydown', onEscPress);
    });
  }
  // описание как закрывается окно
  var closeModal = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onEscPress);
  };
  // -кнопка закрыть большую фотографию
  closeBigPicture.addEventListener('click', function () {
    closeModal();
  });


  // -закрытие окна по Esc
  var onEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal();
    }
  };
};


/* !!!! этот вопрос не решен  С ЭТИМ Я НЕ РАЗОБРАЛАСЬ ЧТО ЗНАЧИТ СБРАСЫВАТЬ ЗНАЧЕНИЕ !!!!!
При написании обработчиков, реагирующих на закрытие формы, обратите внимание на то, что при закрытии формы, дополнительно нужно
сбрасывать значение поля выбора файла #upload-file. */

// Блок для описания сценария popup фильтров фотографий
var showUploadModal = function () {
  var filtersSetting = document.querySelector('.img-upload__overlay');
  var openUploadFile = document.querySelector('#upload-file');
  var closeFiltersSetting = document.querySelector('#upload-cancel');
  var uploadPreview = document.querySelector('.img-upload__preview img');


  // функция которая проверяет, что какой radio button и  возвращает  cоответвующий номер объекта из массива фильтров
  var getFilters = function () {
    for (var i = 0; i < effectRadioButton.length; i++) {
      if (effectRadioButton[i].checked === true) {
        currentRadio = effectRadioButton[i].value;
      }
    }
    for (var k = 0; k < EFFECTS.length; k++) {
      if (currentRadio === EFFECTS[k].name) {
        uploadPreview.classList.add(EFFECTS[k].classList);
        var numberFilter = k;
      }
    }
    return numberFilter;
  };

  // - открытие большой фото-фильтров
  openUploadFile.addEventListener('change', function () {
    filtersSetting .classList.remove('hidden');
    getFilters();
    document.addEventListener('keydown', onEscPress);
  });
  // описание как закрывается окно фото-фильтров
  var closeModal = function () {
    filtersSetting.classList.add('hidden'); // !!!! Не сделано- обратите внимание на то, что при закрытии формы, дополнительно нужно сбрасывать значение поля выбора файла #upload-file.
    document.removeEventListener('keydown', onEscPress);
  };
  // -кнопка закрыть настройку фото-фильтров
  closeFiltersSetting.addEventListener('click', function () {
    closeModal();
  });


  // ограничение на закрытие при активных полях ввода
  var isFocused = function () {
    var elementFocus = (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA');
    return elementFocus;
  };

  // -закрытие окна по Esc
  var onEscPress = function (evt) {
    if (!isFocused() && evt.keyCode === ESC_KEYCODE) {
      closeModal();
    }
  };

  // Применение фиьтров
  var EFFECTS = [
    {name: 'none',
      filter: 'none',
      maxEffect: 1
    },

    {name: 'chrome',
      filter: 'grayscale',
      maxEffect: 1,
      classList: 'effects__preview--chrome',
      metrick: ''},

    {name: 'sepia',
      filter: 'sepia',
      maxEffect: 1,
      classList: 'effects__preview--sepia',
      metrick: ''},

    {name: 'marvin',
      filter: 'invert',
      maxEffect: 100,
      classList: 'effects__preview--marvin',
      metrick: '%'},

    {name: 'phobos',
      filter: 'blur',
      maxEffect: 5,
      classList: 'effects__preview--phobos',
      metrick: 'px'},

    {name: 'heat',
      filter: 'brightness',
      maxEffect: 3,
      classList: 'effects__preview--heat',
      metrick: ''},
  ];

  // Ищем все необходимые перемееные: radio button, блок со шкалой, и изображение для применения фильтра
  var effectRadioButton = document.querySelectorAll('.effects__radio');
  var levelLine = document.querySelector('.effect-level__line');

  var effectHandle = document.querySelector('.effect-level__pin');
  var effectLineDepth = document.querySelector('.effect-level__depth');
  var currentRadio = 'heat';


  // при переключении сброс до начального состояния
  var changeFilter = function () {
    uploadPreview.classList = '';
    uploadPreview.style.filter = '';
    getFilters();
  };

  // устанавливает на все radio button обработчик клика
  for (var k = 0; k < effectRadioButton.length; k++) {
    effectRadioButton[k].addEventListener('click', changeFilter);
  }


  // Пользовательская настройка фильтра изображения
  effectHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordsX = evt.clientX;
    var coordsLimits = levelLine.getBoundingClientRect();

    // При передвижении пина отрисовка элементов с учетом ограничений
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      if (moveEvt.clientX < coordsLimits.left) {
        effectHandle.style.left = '0px';
        effectLineDepth.style.width = '0px';
        startCoordsX = coordsLimits.left;
      } else if (moveEvt.clientX > coordsLimits.right) {
        effectHandle.style.left = coordsLimits.width + 'px';
        effectLineDepth.style.width = coordsLimits.width + 'px';
        startCoordsX = coordsLimits.right;
      } else {
        var shiftX = startCoordsX - moveEvt.clientX;
        effectHandle.style.left = (effectHandle.offsetLeft - shiftX) + 'px';
        effectLineDepth.style.width = (effectLineDepth.offsetWidth - shiftX) + 'px';
        startCoordsX = moveEvt.clientX;
      }
    };

    // При отпускании пина расчет значения фильтра
    var onMouseUp = function (upEvt) {
      var elv = document.querySelector('.effect-level__value');
      console.log(elv);
      elv.value = '2';
      console.log(elv.value);

      var i = getFilters();
      var leveLineWidth = coordsLimits.right - coordsLimits.left;
      var valueEffectLevel = (upEvt.clientX - coordsLimits.left) / leveLineWidth;
      if (upEvt.clientX < coordsLimits.left) {
        valueEffectLevel = 0;
      }
      if (upEvt.clientX > coordsLimits.right) {
        valueEffectLevel = 1;
      }
      // uploadPreview.style.filter = EFFECTS[i].filter + '(' + valueEffectLevel * EFFECTS[i].maxEffect + EFFECTS[i].metrick + ')';
      elv.value = valueEffectLevel * EFFECTS[i].maxEffect + EFFECTS[i].metrick;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  // БЛОК ВАЛИДАЦИИ ПОЛЯ ХЭШ-ТЕГОВ
  var hashTagsInput = document.querySelector('.text__hashtags');
  hashTagsInput.addEventListener('input', function (evt) {
    var tags = evt.target.value.split(' ');


    // - получение массивов имен с некорректной длинной
    var normalName = tags.filter(function (tag) {
      return tag.length > 0;
    });
    var shortName = tags.filter(function (tag) {
      return tag.length === 1;
    });
    var longName = tags.filter(function (tag) {
      return tag.length > 20;
    });


    // - перевожу значения в нижний регистр
    function getTagsLowerCase() {
      var tagsLowerCase = [];
      for (var i = 0; i < tags.length; i++) {
        tagsLowerCase[i] = tags[i].toLowerCase();
      }
      return tagsLowerCase;
    }

    // - получение массива имен с корректным началом
    function getCorrectBegin() {
      var correctBegin = [];
      for (var i = 0; i < tags.length; i++) {
        if (tags[i][0] === '#') {
          correctBegin.push(tags[i]);
        }
      }
      return correctBegin;
    }

    // - получение массива с одинаковыми именами
    function getUniqueName(arr) {
      var obj = {};
      for (var i = 0; i < arr.length; i++) {
        var str = arr[i];
        obj[str] = true;
      }
      return Object.keys(obj);
    }

    var sуmbolTags = evt.target.value.split('#');

    // - назначение условий валидности для поля ввода и создание подсказок об ошибках
    if (longName.length > 0) {
      hashTagsInput.setCustomValidity('Mаксимальная длина одного хэш-тега 20 символов, включая решётку');
    } else if (tags.length > 5) {
      hashTagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    } else if (normalName.length > getCorrectBegin().length) {
      hashTagsInput.setCustomValidity('Хэш-тег должен начинается с символа # (решётка)');
    } else if ((sуmbolTags.length - 1) > getCorrectBegin().length) {
      hashTagsInput.setCustomValidity('Хэш-теги разделяются пробелами');
    } else if (shortName.length > 0) {
      hashTagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
    } else if (tags.length > getUniqueName(getTagsLowerCase()).length) {
      hashTagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды.Теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом.');
    } else {
      hashTagsInput.setCustomValidity('');
    }
  });
};


// Запуск функций срипта
var mockData = generateMockData();
renderAll(mockData);
showBigPictureModal();
showUploadModal();

