describe('The Ten 26 Banana module', function () {
	var expect = chai.expect;

	describe('isItBananaTime function', function () {
		it('should throw error of no date is passed when called', function () {
			var fn = ten26Banana.isItBananaTime.bind(ten26Banana);
			expect(fn).to.throw(Error);
		});

		it('should return true if the date passed has time 10:26', function () {
			var date = new Date();
			date.setHours(10);
			date.setMinutes(26);

			expect(ten26Banana.isItBananaTime(date)).to.be.true;
		});

		it('should return false if the date passed has time 10:27', function () {
			var date = new Date();
			date.setHours(10);
			date.setMinutes(27);

			expect(ten26Banana.isItBananaTime(date)).to.be.false;
		});

		it('should return false if the date passed has time 10:25', function () {
			var date = new Date();
			date.setHours(10);
			date.setMinutes(25);

			expect(ten26Banana.isItBananaTime(date)).to.be.false;
		});
	})

	describe('timeToNextBanana function', function () {
		it('should throw error if no date is passed when called', function () {
			var fn = ten26Banana.timeToNextBanana.bind(ten26Banana);
			expect(fn).to.throw(Error);
		});

		it('should return { h: 2, m: 20: s: 24 } if sending a date with time set to 08:05:36', function () {
			var date = new Date();
			date.setHours(8);
			date.setMinutes(5);
			date.setSeconds(36);

			expect(ten26Banana.timeToNextBanana(date)).to.eql({
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

			expect(ten26Banana.timeToNextBanana(date)).to.eql({
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

			ten26Banana.setCountDownString(element, date);

			expect(element.innerHTML).to.equal('20h 15m 24s');
		});

		it('should set innerHTML in the element to "15m 24s" if sending a date with time set to 10:10:36', function () {
			var element = {};
			var date = new Date();
			date.setHours(10);
			date.setMinutes(10);
			date.setSeconds(36);

			ten26Banana.setCountDownString(element, date);

			expect(element.innerHTML).to.equal('15m 24s');
		});

		it('should set innerHTML in the element to "24s" if sending a date with time set to 10:25:36', function () {
			var element = {};
			var date = new Date();
			date.setHours(10);
			date.setMinutes(25);
			date.setSeconds(36);

			ten26Banana.setCountDownString(element, date);

			expect(element.innerHTML).to.equal('24s');
		});
	});
});