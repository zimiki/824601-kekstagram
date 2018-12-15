'use strict';

// Модуль, валидации поля хэш-тегов
(function () {


  // Пользовательская настройка фильтра изображения

  window.slider = function (sliderLineLimits, sliderHand, sliderLineDepth) {

    sliderHand.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      var startCoordsX = evt.clientX;
      var coordsLimits = sliderLineLimits.getBoundingClientRect();

      // Рассчет значения положения пина сладера
      var changePreviewStyle = function (changeEvt) {
        var leveLineWidth = coordsLimits.right - coordsLimits.left;
        var valueEffectLevel = (changeEvt.clientX - coordsLimits.left) / leveLineWidth;

        if (changeEvt.clientX < coordsLimits.left) {
          valueEffectLevel = 0;
        }
        if (changeEvt.clientX > coordsLimits.right) {
          valueEffectLevel = 1;
        }
        return (valueEffectLevel);
      };

      // При передвижении пина отрисовка элементов с учетом ограничений
      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        if (moveEvt.clientX < coordsLimits.left) {
          sliderHand.style.left = '0px';
          sliderLineDepth.style.width = '0px';
          startCoordsX = coordsLimits.left;
        } else if (moveEvt.clientX > coordsLimits.right) {
          sliderHand.style.left = (coordsLimits.width - sliderHand.offsetWidth / 2) + 'px';
          sliderLineDepth.style.width = coordsLimits.width + 'px';
          startCoordsX = coordsLimits.right;
        } else {
          var shiftX = startCoordsX - moveEvt.clientX;
          sliderHand.style.left = (sliderHand.offsetLeft - shiftX) + 'px';
          sliderLineDepth.style.width = (sliderLineDepth.offsetWidth - shiftX) + 'px';
          startCoordsX = moveEvt.clientX;
        }
        changePreviewStyle(moveEvt);
      };

      var onMouseUp = function () {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);


    });
  };
})();
