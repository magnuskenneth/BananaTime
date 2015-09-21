(function () {
	var ten26Banana = {
		h1El: document.querySelector('h1'),
		bananaSpanEl: document.querySelector('.banana-wrapper > span'),
		countdownEl: document.querySelector('.countdown'),
		goBananasActive: false,

		init: function () {
			var that = this;
			setInterval(function () {
				var now = new Date();
				var h = now.getHours();
				var m = now.getMinutes();
				
				if (h === 10 && m === 26) {
					// Go bananas at 10:26 :)
					that.goBananas();	
				} else {
					that.stopBananas();
					that.setCountDownString(that.countdownEl, now);
				}
			}, 1000);
		},

		goBananas: function () {
			if (!this.goBananasActive) {
				this.goBananasActive = true;
				var index = 0;
				var gifs = document.querySelectorAll('.banana-gifs img');
				function toggleGif() {
					var prev = index === 0 ? gifs.length-1 : index-1;
					gifs[prev].className = '';
					gifs[index].className = 'show';
					index = index < gifs.length-1 ? index+1 : 0;
				}
				this.h1El.innerHTML = 'EAT 10:26 BANANA';
				this.bananaSpanEl.className = 'animate';
				this.countdownEl.innerHTML = '';
				toggleGif();
				this.showGifsInterval = setInterval(toggleGif, 5000);
			}
		},

		stopBananas: function () {
			if (this.goBananasActive) {
				this.goBananasActive = false;
				clearInterval(this.showGifsInterval);
				this.h1El.innerHTML = 'Banana time in:';
				this.bananaSpanEl.className = '';
				var visibleGif = document.querySelector('.show');
				if (visibleGif) {
					visibleGif.className = '';
				}
			}
		},

		setCountDownString: function (element, date) {
			var countdownStr = '';
			var timeLeft = this.timeToNextBanana(date);
			if (timeLeft.h) {
				countdownStr += timeLeft.h + 'h ';
			}
			if (timeLeft.h && !timeLeft.m || timeLeft.m) {
				countdownStr += timeLeft.m + 'm ';
			}
			countdownStr += timeLeft.s + 's';
			element.innerHTML = countdownStr;
		},
		
		isItBananaTime: function (date) {
			if (date === undefined) {
				throw new Error('No date passed');
			}

			return date.getHours() === 10 && date.getMinutes() === 26;
		},

		timeToNextBanana: function (date) {
			if (date === undefined) {
				throw new Error('No date passed');
			}

			var dateCopy = new Date(date.getTime());
			var dateH = dateCopy.getHours();
			var dateM = dateCopy.getMinutes();
			dateCopy.setMilliseconds(0);

			var nextBananaDate = new Date();
			if (dateH >= 10 && dateM > 26 || dateH >= 11) {
				nextBananaDate.setDate(dateCopy.getDate() + 1);
			}
			nextBananaDate.setHours(10);
			nextBananaDate.setMinutes(26);
			nextBananaDate.setSeconds(0);
			nextBananaDate.setMilliseconds(0);

			var secondsLeft = Math.ceil((nextBananaDate.getTime() - dateCopy.getTime())/1000);
			var timeLeft = {};
			var secondsPerHour = 3600;
			timeLeft.h = Math.floor(secondsLeft / (secondsPerHour));
			secondsLeft -= timeLeft.h * secondsPerHour;
			timeLeft.m = Math.floor(secondsLeft/60);
			secondsLeft -= timeLeft.m * 60;
			timeLeft.s = secondsLeft;

			return timeLeft;
		}
	};

	window.ten26Banana = ten26Banana;
}());