'use strict';

(function () {
// Магические числа
  var ESC_KEYCODE = 27;


  window.ulil = {
    // Выбирает  случайное значение  по диапазону
    getRandInt: function (min, max) {
      var rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },

    // Выбирает случайное значение из массива
    getRandArr: function (arr) {
      var rand = Math.random() * arr.length;
      rand = Math.floor(rand);
      return arr[rand];
    },

    // Выбирает случайное значение да/нет
    randBolean: Boolean(Math.round(Math.random())),

    // -Действие по нажатию Esc
    onEscPress: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    }
  };


})();
