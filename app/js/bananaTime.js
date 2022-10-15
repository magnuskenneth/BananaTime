(function () {
	var bananaTime = {
		h1El: document.querySelector('h1'),
		bananaSpanEl: document.querySelector('.banana-wrapper > span'),
		countdownEl: document.querySelector('.countdown'),
		goBananasActive: false,

		init: function (timeToEatBanana) {

			if (timeToEatBanana.length) {
				this.timeToEatBananaArray = timeToEatBanana;
				this.timeToEatBananaArray.sort(this.sortTimeObjects);
				this.timeToEatBanana = this.getNextTimeObject(this.timeToEatBananaArray, new Date());
			} else {
				this.timeToEatBanana = timeToEatBanana;
			}

			var that = this;

			this.countdownTimer = setInterval(function () {
				var now = new Date();
				if (that.isItBananaTime(now)) {
					that.goBananas();
				} else {
					that.stopBananas();
					that.setCountDownString(that.countdownEl, now);
				}
			}, 1000);
		},

		getNextTimeObject: function (timeArray, date) {
			var h = date.getHours();
			var m = date.getMinutes();
			var i = 0;

			for (i = 0; i < timeArray.length; i++) {
				if (h < timeArray[i].h || (h === timeArray[i].h && m <= timeArray[i].m)) {
					break;
				}
			}

			return i < timeArray.length ? timeArray[i] : timeArray[0];
		},

		sortTimeObjects: function (a, b) {
			if (a.h === b.h) {
				return a.m > b.m ? 1 : -1;
			}
			return a.h > b.h ? 1 : -1;
		},

		goBananas: function () {
			if (!this.goBananasActive) {
				this.goBananasActive = true;
				var index = 0;
				var gifs = document.querySelectorAll('.banana-gifs img');
				function toggleGif() {
					var prev = index === 0 ? gifs.length - 1 : index - 1;
					gifs[prev].className = '';
					gifs[index].className = 'show';
					index = index < gifs.length - 1 ? index + 1 : 0;
				}
				this.h1El.innerHTML = 'EAT BANANA NOW';
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
				this.timeToEatBanana = this.getNextTimeObject(this.timeToEatBananaArray, new Date());
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

			return date.getHours() === this.timeToEatBanana.h && date.getMinutes() === this.timeToEatBanana.m;
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
			if (dateH >= this.timeToEatBanana.h && dateM > this.timeToEatBanana.m || dateH >= (this.timeToEatBanana.h + 1)) {
				nextBananaDate.setDate(dateCopy.getDate() + 1);
			}
			nextBananaDate.setHours(this.timeToEatBanana.h);
			nextBananaDate.setMinutes(this.timeToEatBanana.m);
			nextBananaDate.setSeconds(0);
			nextBananaDate.setMilliseconds(0);

			var secondsLeft = Math.ceil((nextBananaDate.getTime() - dateCopy.getTime()) / 1000);
			var timeLeft = {};
			var secondsPerHour = 3600;
			timeLeft.h = Math.floor(secondsLeft / (secondsPerHour));
			secondsLeft -= timeLeft.h * secondsPerHour;
			timeLeft.m = Math.floor(secondsLeft / 60);
			secondsLeft -= timeLeft.m * 60;
			timeLeft.s = secondsLeft;

			return timeLeft;
		},

		stopTimers: function () {
			clearInterval(this.showGifsInterval);
			clearInterval(this.countdownTimer);
		}
	};

	window.bananaTime = bananaTime;
}());
