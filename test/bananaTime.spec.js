describe('The Banana Time module initialized to banana time at 10:26', function () {
	var expect = chai.expect;
	before(function () {
		bananaTime.init({
			h: 10,
			m: 26
		});
	});

	describe('isItBananaTime function', function () {
		
		it('should throw error of no date is passed when called', function () {
			var fn = bananaTime.isItBananaTime.bind(bananaTime);
			expect(fn).to.throw(Error);
		});

		it('should return true if the date passed has time 10:26', function () {
			var date = new Date();
			date.setHours(10);
			date.setMinutes(26);

			expect(bananaTime.isItBananaTime(date)).to.be.true;
		});

		it('should return false if the date passed has time 10:27', function () {
			var date = new Date();
			date.setHours(10);
			date.setMinutes(27);

			expect(bananaTime.isItBananaTime(date)).to.be.false;
		});

		it('should return false if the date passed has time 10:25', function () {
			var date = new Date();
			date.setHours(10);
			date.setMinutes(25);

			expect(bananaTime.isItBananaTime(date)).to.be.false;
		});
	})

	describe('timeToNextBanana function', function () {
		it('should throw error if no date is passed when called', function () {
			var fn = bananaTime.timeToNextBanana.bind(bananaTime);
			expect(fn).to.throw(Error);
		});

		it('should return { h: 2, m: 20: s: 24 } if sending a date with time set to 08:05:36', function () {
			var date = new Date();
			date.setHours(8);
			date.setMinutes(5);
			date.setSeconds(36);

			expect(bananaTime.timeToNextBanana(date)).to.eql({
				h: 2,
				m: 20,
				s: 24
			});
		});

		it('should return { h: 20, m: 15: s: 24 } if sending a date with time set to 14:10:36', function () {
			var date = new Date();
			date.setHours(14);
			date.setMinutes(10);
			date.setSeconds(36);

			expect(bananaTime.timeToNextBanana(date)).to.eql({
				h: 20,
				m: 15,
				s: 24
			});
		});
	});

	describe('setCountDownString function', function () {
		it('should set innerHTML in the element to "20h 15m 24s" if sending a date with time set to 14:10:36', function () {
			var element = {};
			var date = new Date();
			date.setHours(14);
			date.setMinutes(10);
			date.setSeconds(36);

			bananaTime.setCountDownString(element, date);

			expect(element.innerHTML).to.equal('20h 15m 24s');
		});

		it('should set innerHTML in the element to "15m 24s" if sending a date with time set to 10:10:36', function () {
			var element = {};
			var date = new Date();
			date.setHours(10);
			date.setMinutes(10);
			date.setSeconds(36);

			bananaTime.setCountDownString(element, date);

			expect(element.innerHTML).to.equal('15m 24s');
		});

		it('should set innerHTML in the element to "24s" if sending a date with time set to 10:25:36', function () {
			var element = {};
			var date = new Date();
			date.setHours(10);
			date.setMinutes(25);
			date.setSeconds(36);

			bananaTime.setCountDownString(element, date);

			expect(element.innerHTML).to.equal('24s');
		});
	});
});