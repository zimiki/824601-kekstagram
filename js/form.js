'use strict';

// Модуль, который работает с формой редактирования изображения
(function () {

  // Блок для описания сценария popup фильтров фотографий

  // переменные для открытия/закрытия окна
  var filtersSetting = document.querySelector('.img-upload__overlay');
  var openUploadFile = document.querySelector('#upload-file');
  var closeFiltersSetting = document.querySelector('#upload-cancel');

  var onPopupEscPress = function (evt) {
    if (!isFocused() && window.ulil.onEscPress(evt, closeModal)) {
      closeModal();
    }
  };

  // - открытие большой фото-фильтров
  openUploadFile.addEventListener('change', function () {
    filtersSetting .classList.remove('hidden');
    setStartPositionSlider();
    document.addEventListener('keydown', onPopupEscPress);
  });


  // описание как закрывается окно фото-фильтров
  var closeModal = function () {
    filtersSetting.classList.add('hidden'); // !!!! Не сделано- обратите внимание на то, что при закрытии формы, дополнительно нужно сбрасывать значение поля выбора файла #upload-file.
    document.removeEventListener('keydown', onPopupEscPress);
  };


  // -кнопка закрыть настройку фото-фильтров
  closeFiltersSetting.addEventListener('click', function () {
    closeModal();
  });
  // ограничение на закрытие при активных полях ввода

  var hashTagsInput = document.querySelector('.text__hashtags');
  var descriptionText = document.querySelector('.text__description');

  var isFocused = function () {
    var elementFocus = document.activeElement === hashTagsInput || document.activeElement === descriptionText;
    return elementFocus;
  };


  // Блок для описания сценария popup фильтров фотографий

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
  var uploadPreview = document.querySelector('.img-upload__preview img');
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

  // Установка исходного отображения окна с эффектами
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

  // функция отображение изменений в просмотре
  var changePreviewStyle = function () {
    var i = getNumberFilters();
    var valueEffectLevel = window.slider(sliderLine, sliderHandle, effectLineDepth);
    // Как сюда вернуть значение я не знаю
    effectInputValue.value = valueEffectLevel * EFFECTS[i].maxEffect;
    effectInputValue.setAttribute('value', effectInputValue.value);
    uploadPreview.style.filter = EFFECTS[i].filter + '(' + effectInputValue.value + EFFECTS[i].metrick + ')';
  };
  changePreviewStyle();

})();


