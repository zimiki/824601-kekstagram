'use strict';


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
  // переменные для открытия/закрытия окна
  var filtersSetting = document.querySelector('.img-upload__overlay');
  var openUploadFile = document.querySelector('#upload-file');
  var closeFiltersSetting = document.querySelector('#upload-cancel');
  var uploadPreview = document.querySelector('.img-upload__preview img');

  // БЛОК управления закрытием открытием
  // - открытие большой фото-фильтров
  openUploadFile.addEventListener('change', function () {
    filtersSetting .classList.remove('hidden');
    setStartPositionSlider();
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
    var elementFocus = document.activeElement === hashTagsInput || document.activeElement === descriptionText;
    return elementFocus;
  };
  // -закрытие окна по Esc
  var onEscPress = function (evt) {
    if (!isFocused() && evt.keyCode === ESC_KEYCODE) {
      closeModal();
    }
  };

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
  var sliderLine = document.querySelector('.effect-level__line');
  var slider = document.querySelector('.img-upload__effect-level');
  var effectInputValue = document.querySelector('.effect-level__value');
  var sliderHandle = document.querySelector('.effect-level__pin');
  var effectLineDepth = document.querySelector('.effect-level__depth');

  // Функция которая проверяет, что какой radio button и  возвращает  cоответвующий номер объекта из массива фильтров
  var getNumberFilters = function () {
    var currentRadio = 'heat';
    for (var i = 0; i < effectRadioButton.length; i++) {
      if (effectRadioButton[i].checked === true) {
        currentRadio = effectRadioButton[i].value;
      }
    }
    for (var k = 0; k < EFFECTS.length; k++) {
      if (currentRadio === EFFECTS[k].name) {
        var numberFilter = k;
      }
    }
    return numberFilter;
  };

  // Установка исхдного отображения окна с эффектами
  var setStartPositionSlider = function () {
    var i = getNumberFilters();
    if (getNumberFilters() === 0) {
      slider.classList.add('visually-hidden');
    }
    var cLimits = sliderLine.getBoundingClientRect();
    sliderHandle.style.left = (cLimits.width - sliderHandle.offsetWidth / 2) + 'px';
    effectLineDepth.style.width = cLimits.width + 'px';
    effectInputValue.setAttribute('value', EFFECTS[i].maxEffect);
    uploadPreview.classList.add(EFFECTS[i].classList);
  };


  // Переключении radio button - сброс до начального состояния
  var changeFilter = function () {
    uploadPreview.classList = '';
    uploadPreview.style.filter = '';
    slider.classList.remove('visually-hidden');
    setStartPositionSlider();
  };

  // устанавливает на все radio button обработчик клика
  for (var k = 0; k < effectRadioButton.length; k++) {
    effectRadioButton[k].addEventListener('click', changeFilter);
  }


  // Пользовательская настройка фильтра изображения
  sliderHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordsX = evt.clientX;
    var coordsLimits = sliderLine.getBoundingClientRect();


    // функция отображение изменений в просмотре
    var changePreviewStyle = function (changeEvt) {
      var i = getNumberFilters();
      var leveLineWidth = coordsLimits.right - coordsLimits.left;
      var valueEffectLevel = (changeEvt.clientX - coordsLimits.left) / leveLineWidth;
      if (changeEvt.clientX < coordsLimits.left) {
        valueEffectLevel = 0;
      }
      if (changeEvt.clientX > coordsLimits.right) {
        valueEffectLevel = 1;
      }
      effectInputValue.value = valueEffectLevel * EFFECTS[i].maxEffect;
      effectInputValue.setAttribute('value', effectInputValue.value);
      uploadPreview.style.filter = EFFECTS[i].filter + '(' + effectInputValue.value + EFFECTS[i].metrick + ')';
    };


    // При передвижении пина отрисовка элементов с учетом ограничений
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      if (moveEvt.clientX < coordsLimits.left) {
        sliderHandle.style.left = '0px';
        effectLineDepth.style.width = '0px';
        startCoordsX = coordsLimits.left;
      } else if (moveEvt.clientX > coordsLimits.right) {
        sliderHandle.style.left = (coordsLimits.width - sliderHandle.offsetWidth / 2) + 'px';
        effectLineDepth.style.width = coordsLimits.width + 'px';
        startCoordsX = coordsLimits.right;
      } else {
        var shiftX = startCoordsX - moveEvt.clientX;
        sliderHandle.style.left = (sliderHandle.offsetLeft - shiftX) + 'px';
        effectLineDepth.style.width = (effectLineDepth.offsetWidth - shiftX) + 'px';
        startCoordsX = moveEvt.clientX;
      }
      changePreviewStyle(moveEvt);
    };

    // При отпускании пина расчет значения фильтра
    var onMouseUp = function (upEvt) {
      changePreviewStyle(upEvt);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  // БЛОК ВАЛИДАЦИИ ПОЛЯ ХЭШ-ТЕГОВ
  var hashTagsInput = document.querySelector('.text__hashtags');
  var descriptionText = document.querySelector('.text__description');
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
    // - получение количества заков #
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
      hashTagsInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    } else {
      hashTagsInput.setCustomValidity('');
    }
  });
};


// Запуск функций срипта

renderAll(mockData);
showBigPictureModal();
showUploadModal();

