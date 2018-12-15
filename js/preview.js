'use strict';

// Модуль для отрисовки увеличенного изображения

(function () {

  // Блок для создания больщой фотографии по шаблону
  function renderBigPicturesOnPage(bigStyle, data) {
    bigStyle.querySelector('img').src = data.photos[data.selectPhotoIndex].url;
    bigStyle.querySelector('.likes-count').textContent = data.photos[data.selectPhotoIndex].likes;
    bigStyle.querySelector('.comments-count').textContent = data.photos[data.selectPhotoIndex].comments.length;
    bigStyle.querySelector('.social__caption').textContent = data.photos[data.selectPhotoIndex].description;
    // - скрытие элементов п.5 задания
    bigStyle.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigStyle.querySelector('.comments-loader').classList.add('visually-hidden');
  }


  // Блок для создания комментариев к большой фото
  function renderCommentsOnPage(bigStyle, data) {
    // - выборка коментрия, чтобы сохранился шаблон.
    var socialComment = bigStyle.querySelector('.social__comment');
    var socialComments = bigStyle.querySelector('.social__comments');

    // -удаление коментариев созданых в верстве
    var removeAllChildren = function (elem) {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
      }
    };
    removeAllChildren(socialComments);

    // - создание одного комментария по шаблону из верстки
    var renderComment = function (dataa) {
      var commentElement = socialComment.cloneNode(true);
      commentElement.querySelector('img').src = 'img/avatar-' + window.ulil.getRandInt(1, 6) + '.svg';
      commentElement.querySelector('p').textContent = dataa.photos[0].comments[i];
      return commentElement;
    };

    // - создание и вставка фрагмента комментариев
    var fragmentComments = document.createDocumentFragment();
    for (var i = 0; i < data.photos[0].comments.length; i++) {
      fragmentComments.appendChild(renderComment(data));
      socialComments.appendChild(fragmentComments);
    }
  }


  // Блок для описания сценария popup большой фотографии
  var showBigPictureModal = function (bigStyle) {
    var openBigPicture = document.querySelectorAll('.picture__img');
    var closeBigPicture = document.querySelector('#picture-cancel');

    var onPopupEscPress = function (evt) {
      window.ulil.onEscPress(evt, closeModal);
    };

    // - открытие большой фотографии при нажатии на любую из галерии маленьких
    for (var i = 0; i < openBigPicture.length; i++) {
      openBigPicture[i].addEventListener('click', function () {
        bigStyle.classList.remove('hidden');
        document.addEventListener('keydown', onPopupEscPress);
      });
    }
    // описание как закрывается окно
    var closeModal = function () {
      bigStyle.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    };
    // -кнопка закрыть большую фотографию
    closeBigPicture.addEventListener('click', function () {
      closeModal();
    });
  };

  // Запуск отрисовки элементов на основе данных
  var bigPicrure = document.querySelector('.big-picture'); // шаблон для больших фото
  renderBigPicturesOnPage(bigPicrure, window.mockdata);
  renderCommentsOnPage(bigPicrure, window.mockdata);
  showBigPictureModal(bigPicrure);

})();
