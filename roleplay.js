// Скрипт RolePlay
// Предназначен для использования в форумных играх 5druzey.ru/forum
// Скрипт заменяет аватарки и имена игроков форумной ролевой игры только в нужных ветках форума.
//
// Автор: Shark0n callups@gmail.com
//
// Требования:
// движок форума phpbb 3.1.х
// jQuery 1.5.х или выше
//
// История версий:
// 1.0 2015.02.10 Рабочая версия скрипта для одной игры
// 1.1 2015.02.10 Переделан для использования одного скрипта для нескольких игр. Добавлены комментарии по коду.
// 1.2 2015.02.10 Повышено удобство инициализации скрипта, добавлены дополнительные настройки для игровых аватарок: высота и ширина
// 1.3 2015.02.10 Добавлены функции автоматической подгонки и центрирования изображения под заданные размеры аватарок: avatarHeight х avatarWidth

jQuery(document).ready(function () {
    // Выполняем шаги 1 и 2. Затем копируем скрипт roleplay.js на хостинг в корневую папку форума или папку скриптов js для форума <локальный путь до скрипта на хостинге>/.
    // Прописываем в <header> в index.php форума следующую строку без "//"

    // <script src="<локальный путь до скрипта на хостинге>/roleplay.js"></script>
    
	// Можно описать несколько игр сразу или добавлять по мере необходимости.
    // Скрипт сам определяет по названию темы - нужно ли ему выполняться или нет.
	//###########################################################################
    
	// Можно задать свою высоту и ширину для всех игровых аватарок в пикселях
	var avatarHeight = '128';
	var avatarWidth = '128';
	
    var gamesArr = [];
	var gametitle = '';
	
	//1. Указываем название существующей игры №1
	gametitle = 'Случай в тихом океане';
	gamesArr[gametitle] = [];
	//2. Описываем существующих игроков
	gamesArr[gametitle]['Shark0n'] = {
		'fakeNickname':'Бенджамин Тод',
		'fakeAvatar':'http://webnewsmedia.net/wp-content/uploads/2012/12/Detective-903x1024.jpg'
	  };
    gamesArr[gametitle]['Starc'] = {
        'fakeNickname':'Элиос Мур',
        'fakeAvatar':'http://rewalls.com/images/201012/reWalls.com_12147.jpg'
      };
    gamesArr[gametitle]['Фрайзен'] = {
        'fakeNickname':'Стив Лоуренс',
        'fakeAvatar':'http://img2.1001golos.ru/ratings/73000/72387/pic1.jpg'
      };
    gamesArr[gametitle]['Gellert Grindelwald'] = {
        'fakeNickname':'Эмили Джонс',
        'fakeAvatar':'http://static.kinokopilka.tv/system/images/photos/images/000/128/772/128772_large.jpg'
      };

	/*
	// Повторяем тоже самое для следующей игры
	gametitle = '<Название темы>';
	gamesArr[gametitle]['<Ник игрока>'] = {
        'fakeNickname':'<игровое имя>',
        'fakeAvatar':'<игровая аватарка>'
      };
    */
	  
    //3. Готово! Остальное, скрипт сделает сам

	function replaceGamer(nameAObj, parentObj, gameIndex) {
		//Создаем игровую аватарку
		var newNameAObj = nameAObj.attr("title", nameAObj.html())
      .clone()
      .html('<div style="overflow: hidden; width:' + avatarWidth + 'px; height:' + avatarHeight + 'px;">' +
            '<img alt="' + nameAObj.html() +  '" src="'+ gamesArr[gameIndex][nameAObj.html()].fakeAvatar +'"></img>' +
            '</div><br/>')
      .prependTo(parentObj);
		
		// берем картинку
		var $img = newNameAObj.children("div").children("img");
		var newHeight;
		var newWidth;
		var shiftTop;
		var shiftLeft;
		
		var width  = $img.width();
		var height = $img.height();
    var pow;
    
		if ((height/avatarHeight) > (width/avatarWidth)) {
      if (avatarHeight - height > 0) { pow = 1 } 
      else { pow = -1 }
      newWidth = avatarWidth;
			newHeight = height * Math.pow(width/avatarWidth, pow);
			shiftLeft = 0;
			shiftTop = - (newHeight - avatarHeight) / 2;
		}
		else {
      if (avatarWidth - width > 0) { pow = 1 } 
      else { pow = -1 }
			newHeight = avatarHeight;
			newWidth = width * Math.pow(height/avatarHeight, pow);
			shiftTop = 0;
			shiftLeft = - (newWidth - avatarWidth) / 2;
		}
		
		//console.log(newHeight + ', ' + newWidth + ', ' + shiftTop + ', ' + shiftLeft);
		$img.attr("height", newHeight)
      .attr("width", newWidth)
      .attr("style", 'margin-top: '+ shiftTop +'px; margin-left: '+ shiftLeft +'px;');
    
		//Изменяем имя пользователя
		nameAObj.html(gamesArr[gameIndex][nameAObj.html()].fakeNickname);
	}
  
	var currentTitle = $("#page-body").children("h2:first-child").children("a:first-child").html();
    
	if ($.inArray(currentTitle, gamesArr)) {
		$('dl.postprofile dt').each(function (index) {
			if ($(this).children('a').size() == 1) {
				//У пользователя нет аватар, но нам надо изменить имя и вставить свою аватарку
				var nicknameAObj = $(this).children('a:eq(0)');
				if ($.inArray(nicknameAObj.html(), gamesArr[currentTitle])) {
					replaceGamer(nicknameAObj, $(this), currentTitle);
				}
			}
			else if ($(this).children('a').size() == 2) {
				//У пользователя есть своя аватар, нам надо изменить имя и аватарку
				var nicknameAObj = $(this).children('a:eq(1)');
				var avatarAObj = $(this).children('a:eq(0)');
				if ($.inArray(nicknameAObj.html(), gamesArr[currentTitle])) {
					replaceGamer(nicknameAObj, $(this), currentTitle);
					avatarAObj.hide();
				}
			}  
		});
	}
});  
