'use strict';

// Модуль, валидации поля хэш-тегов
(function () {
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
})();
