(function(){
  var declare = function declare (module_name, exports) {
    if (module) module.exports = exports;
    else window[module_name] = exports;
  }

  var ansi2html = function ansi2html (str) {
    this.props = {};
    this.open = false;
    this.str = str;
  };
  
  ansi2html.prototype.stylemap = {
      bold: "font-weight"
    , underline: "text-decoration"
    , color: "color"
    , background: "background"
  };
  
  ansi2html.prototype.classmap = {
      color: 'fg'
    , background: 'bg'
    , bold: 'bold'
    , underline: 'ul'
  }

  ansi2html.prototype.style = function style () {
    var key, val, style = [];
    for (var key in this.props) {
      val = this.props[key];
      if (!val) continue;
      if (val == true) {
        style.push(this.stylemap[key] + ':' + key)
      } else {
        style.push(this.stylemap[key] + ':' + val)
      }
    }
    return style.join(';');
  }

  ansi2html.prototype.classGen = function () {
    var key, val, classes = [];
    for (key in this.props) {
      val = this.props[key];
      if (!val) continue;
      if (val == true)
        classes.push(this.classmap[key]);
      else {
        classes.push(this.classmap[key] + '_' + val);
      }
    }
    return classes.join(' ');
  }

  ansi2html.prototype.tag = function tag (code, use_class) {
    var i
      , tag = ''
      , n = this.table[code];

    if (this.open) {
      tag += '</span>';
      this.open = false;
    }

    if (n) {
      for (i in n) this.props[i] = n[i];
      if (use_class === true) {
        tag += '<span class="ansi ' + this.classGen() + '">';
      } else {
        tag += '<span style="' + this.style() + '">';
      }
      this.open = true;
    } else {
      props = {};
    }

    return tag;
  }

  ansi2html.prototype.render = function render (opts) {
    return this.str.replace(/\[(\d+;)?(\d+)+m/g, function(match, b1, b2) {
      var i, code, res = '';
      for (i = 1; i < arguments.length - 2; i++) {
        if (!arguments[i]) continue;
        code = parseInt(arguments[i]);
        res += this.tag(code, opts.use_class);
      }
      return res;
    }.bind(this)) + this.tag(undefined, opts.use_class);
  };

  /* not implemented:
   *   italic
   *   blink
   *   invert
   *   strikethrough
   */
  ansi2html.prototype.table =
  { 0: null
  , 1: { bold: true }
  , 3: { italic: true }
  , 4: { underline: true }
  , 5: { blink: true }
  , 6: { blink: true }
  , 7: { invert: true }
  , 9: { strikethrough: true }
  , 23: { italic: false }
  , 24: { underline: false }
  , 25: { blink: false }
  , 27: { invert: false }
  , 29: { strikethrough: false }
  , 30: { color: 'black' }
  , 31: { color: 'red' }
  , 32: { color: 'green' }
  , 33: { color: 'yellow' }
  , 34: { color: 'blue' }
  , 35: { color: 'magenta' }
  , 36: { color: 'cyan' }
  , 37: { color: 'white' }
  , 39: { color: null }
  , 40: { background: 'black' }
  , 41: { background: 'red' }
  , 42: { background: 'green' }
  , 43: { background: 'yellow' }
  , 44: { background: 'blue' }
  , 45: { background: 'magenta' }
  , 46: { background: 'cyan' }
  , 47: { background: 'white' }
  , 49: { background: null }
  }

  declare('ansi2html', ansi2html);
})();

