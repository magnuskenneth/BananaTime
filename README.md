# BananaTime - [![Build Status](https://travis-ci.org/magnuskenneth/BananaTime.svg?branch=master)](https://travis-ci.org/magnuskenneth/BananaTime)
This is a web app counting down to when it is time to eat banana. Init the bananaTime module with when it is time to eat banana, e.g. if time to eat banana is 10:26: bananaTime.init({ h: 10, m: 26 });

## Test and development
To install, run:

	npm install

To build run:

	gulp build

If the build is successful the output will be found in a folder named build.

This gulp task will run the unit tests:

	gulp test

Run this gulp task to automatically run lint and tests whenever a js file has been edited and less whenever any less file has been edited:

	gulp watch

See gulpfile.js for more gulp commands.

## License
ISC License (ISC)

Copyright (c) 2015, Magnus Sillén
Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.