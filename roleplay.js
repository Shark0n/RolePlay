// RolePlay - is jQuery script for better user experience forum role playing!
// HOW TO INSTALL see on https://github.com/Shark0n/RolePlay

jQuery(document).ready(function() {
	// height and width - you want to avatar
	var avatarHeight = '128'; // pixels
	var avatarWidth = '128'; // pixels

	var gamesArr = [];
	var gametitle = '';

	// {START GAME DESCRIPTION}
	// Game title in forum thread
	gametitle = 'Случай в тихом океане';
	gamesArr[gametitle] = [];
	// Gamers: real name, fake name and fake avatar
	gamesArr[gametitle]['Shark0n'] = {
		'fakeNickname': 'Бенджамин Тод',
		'fakeAvatar': 'http://webnewsmedia.net/wp-content/uploads/2012/12/Detective-903x1024.jpg', //903x1024
		'fakeAvatarObj': 'empty'
	};
	gamesArr[gametitle]['Starc'] = {
		'fakeNickname': 'Элиос Мур',
		'fakeAvatar': 'http://rewalls.com/images/201012/reWalls.com_12147.jpg',
		'fakeAvatarObj': 'empty'
	};
	gamesArr[gametitle]['Фрайзен'] = {
		'fakeNickname': 'Стив Лоуренс',
		'fakeAvatar': 'http://img2.1001golos.ru/ratings/73000/72387/pic1.jpg',
		'fakeAvatarObj': 'empty'
	};
	gamesArr[gametitle]['Gellert Grindelwald'] = {
		'fakeNickname': 'Эмили Джонс',
		'fakeAvatar': 'http://static.kinokopilka.tv/system/images/photos/images/000/128/772/128772_large.jpg',
		'fakeAvatarObj': 'empty'
	};
	// {STOP GAME DESCRIPTION}
	// Ready


	// Declare functions

	function replaceGamer(nameAObj, parentObj, gameIndex) 
	{
		if (gamesArr[gameIndex][nameAObj.html()].fakeAvatarObj === 'empty') 
		{
			// If we meet player for a first time - we will create in-game avatar and remeber this avatar - as player's object

			// Make fake avatar
			var newNameAObj = nameAObj.attr("title", nameAObj.html())
				.clone()
				.html('<div style="position: relative; overflow: hidden; width:' + avatarWidth + 'px; height:' + avatarHeight + 'px;">' +
					'<img style="position: absolute; display: block;" alt="' + nameAObj.html() + '" src="' + gamesArr[gameIndex][nameAObj.html()].fakeAvatar + '"></img>' +
					'</div>')
				.prependTo(parentObj);

			var $img = newNameAObj.children("div").children("img");
			var newHeight;
			var newWidth;
			var shiftTop;
			var shiftLeft;

			// Calculate new height and width
			var width = $img.width();
			var height = $img.height();

			if (height > width) 
			{
				newWidth = avatarWidth + 'px';
				newHeight = 'auto';
			} 
			else 
			{
				newWidth = 'auto';
				newHeight = avatarHeight + 'px';
			}

			$img.css("height", newHeight)
				.css("width", newWidth);

			// Calculate margin top and left to centerlize image         
			width = $img.width(); // image have already new width - get it
			height = $img.height(); // image have already new height - get it

			shiftTop = (avatarHeight - height) / 2 + 'px';
			shiftLeft = (avatarWidth - width) / 2 + 'px';

			$img.css("margin-top", shiftTop)
				.css("margin-left", shiftLeft);

			gamesArr[gameIndex][nameAObj.html()].fakeAvatarObj = newNameAObj;
		} 
		else 
		{
			// Else we have already met this avatar earlier, so we can clone it and make a substitution

			// No need to recalculate image size again ;)
			gamesArr[gameIndex][nameAObj.html()].fakeAvatarObj
				.clone()
				.prependTo(parentObj);
		}

		// Change name
		nameAObj.html(gamesArr[gameIndex][nameAObj.html()].fakeNickname);
	}


	// MAIN()

	var currentTitle = $("#page-body").children("h2").children("a").html();

	if (currentTitle in gamesArr) 
	{
		$('dl.postprofile dt').each(function(index) 
		{
			if ($(this).children('a').size() == 1) 
			{
				// User have only real name - adding avatar and changing name
				var nicknameAObj = $(this).children('a:eq(0)');
				if (nicknameAObj.html() in gamesArr[currentTitle]) 
				{
					replaceGamer(nicknameAObj, $(this), currentTitle);
				}
			} 
			else if ($(this).children('a').size() == 2) 
			{
				// User have both real name and his avatar - changing avatar and name
				var nicknameAObj = $(this).children('a:eq(1)');
				var avatarAObj = $(this).children('a:eq(0)');
				if (nicknameAObj.html() in gamesArr[currentTitle]) 
				{
					replaceGamer(nicknameAObj, $(this), currentTitle);
					avatarAObj.hide();
				}
			}
		});
	}
});