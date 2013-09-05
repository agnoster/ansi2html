# ansi2html.js [![build status](https://secure.travis-ci.org/agnoster/ansi2html.png?branch=master)](http://travis-ci.org/agnoster/ansi2html)


Convert text with ANSI escape sequences to styled HTML.

## Example

```
test[1mBold[32mGreen[31mRed[0mNone
```

becomes

```html
test<span style="font-weight:bold">Bold</span><span style="font-weight:bold;color:green">Green</span><span style="font-weight:bold;color:red">Red</span>None
```

## Usage

In Node.js:

```js
var ansi2html = require('ansi2html')

console.log(ansi2html("test[1mBold"))
```

In the browser:

```js
<pre id="test"></pre>
<script type="text/javascript" src="ansi2html.js"></script>
<script type="text/javascript">
document.getElementById('test').innerHTML = ansi2html("test[1mBold")
</script>
```

In the terminal:

```bash
git log --color | ansi2html > result.html
```

That's right, ansi2html.js works in Node *and* in the browser, in more or less the same way.

## Supported

* bold
* underline
* foreground & background color

## MIT License

Copyright (C) 2011 by Isaac Wolkerstorfer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

