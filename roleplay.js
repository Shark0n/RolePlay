// RolePlay - is jQuery script for better user experience forum role playing!
// HOW TO INSTALL see on https://github.com/Shark0n/RolePlay

jQuery(document).ready(function() {
	// height and width - you want to avatar
	var avatarHeight = '128'; // pixels
	var avatarWidth = '128'; // pixels

	var gamesArr = [];
	var gametitle = '';

	// Game title in forum thread
	gametitle = 'Случай в тихом океане';
	gamesArr[gametitle] = [];
	// Gamers: real name, fake name and fake avatar
	gamesArr[gametitle]['Shark0n'] = {
		'fakeNickname': 'Бенджамин Тод',
		'fakeAvatar': 'http://webnewsmedia.net/wp-content/uploads/2012/12/Detective-903x1024.jpg' //903x1024
	};
	gamesArr[gametitle]['Starc'] = {
		'fakeNickname': 'Элиос Мур',
		'fakeAvatar': 'http://rewalls.com/images/201012/reWalls.com_12147.jpg'
	};
	gamesArr[gametitle]['Фрайзен'] = {
		'fakeNickname': 'Стив Лоуренс',
		'fakeAvatar': 'http://img2.1001golos.ru/ratings/73000/72387/pic1.jpg'
	};
	gamesArr[gametitle]['Gellert Grindelwald'] = {
		'fakeNickname': 'Эмили Джонс',
		'fakeAvatar': 'http://static.kinokopilka.tv/system/images/photos/images/000/128/772/128772_large.jpg'
	};
	// Ready

	function replaceGamer(nameAObj, parentObj, gameIndex) {
		// Make fake avatar
		var newNameAObj = nameAObj.attr("title", nameAObj.html())
			.clone()
			.html('<div style="overflow: hidden; width:' + avatarWidth + 'px; height:' + avatarHeight + 'px;">' +
				'<img alt="' + nameAObj.html() + '" src="' + gamesArr[gameIndex][nameAObj.html()].fakeAvatar + '"></img>' +
				'</div><br/>')
			.prependTo(parentObj);

		var $img = newNameAObj.children("div").children("img");
		var newHeight;
		var newWidth;
		var shiftTop;
		var shiftLeft;

		var width = $img.width();
		var height = $img.height();
		var pow;

		// Comment with picture 903x1024 example
		if ((height / avatarHeight) > (width / avatarWidth)) { // 1024/128 > 903/128
			if (avatarHeight - height > 0) {
				pow = 1
			} // 128 - 1024 < 0
			else {
				pow = -1
			} // pow = -1
			newWidth = avatarWidth; // = 128
			newHeight = height * Math.pow(width / avatarWidth, pow); // = 1024 * (903/128)^(-1) = 1024 * 128 / 903 = 145,15171650055370985603543743079
			newHeight = Math.ceil(newHeight); // 146
			shiftLeft = 0;
			shiftTop = -(newHeight - avatarHeight) / 2; // = - ( 145 - 128 ) / 2 = -8,5
			shiftTop = Math.floor(shiftTop); // -8
		} else {
			if (avatarWidth - width > 0) {
				pow = 1
			} else {
				pow = -1
			}
			newHeight = avatarHeight;
			newWidth = width * Math.pow(height / avatarHeight, pow);
			newWidth = Math.ceil(newWidth);
			shiftTop = 0;
			shiftLeft = -(newWidth - avatarWidth) / 2;
			shiftLeft = Math.floor(shiftLeft);
		}

		$img.attr("height", newHeight)
			.attr("width", newWidth)
			.attr("style", 'margin-top: ' + shiftTop + 'px; margin-left: ' + shiftLeft + 'px;');

		// Change name
		nameAObj.html(gamesArr[gameIndex][nameAObj.html()].fakeNickname);
	}

	var currentTitle = $("#page-body").children("h2").children("a").html();

	if (currentTitle in gamesArr) {
		$('dl.postprofile dt').each(function(index) {
			if ($(this).children('a').size() == 1) {
				// User have only real name - adding avatar and changing name
				var nicknameAObj = $(this).children('a:eq(0)');
				if (nicknameAObj.html() in gamesArr[currentTitle]) {
					replaceGamer(nicknameAObj, $(this), currentTitle);
				}
			} else if ($(this).children('a').size() == 2) {
				// User have both real name and his avatar - changing avatar and name
				var nicknameAObj = $(this).children('a:eq(1)');
				var avatarAObj = $(this).children('a:eq(0)');
				if (nicknameAObj.html() in gamesArr[currentTitle]) {
					replaceGamer(nicknameAObj, $(this), currentTitle);
					avatarAObj.hide();
				}
			}
		});
	}
});