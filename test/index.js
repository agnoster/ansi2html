var ansi2html = require('../lib/')
  , vows = require('vows')
  , assert = require('assert')

function makeBatchFromTestCases(testCases) {
  function makeTest(input, args) {
    var test = { topic: function() { return (new ansi2html(args[0])).render({use_class: args[2]}); } }
    test['we get "' + args[1] + '"'] = function(topic) { assert.equal(topic, args[1]) }
    return test
  }

  var batch = {}
  for (var key in testCases) {
    if (!testCases.hasOwnProperty(key)) continue
    batch['When encoding "' + key + '"'] = makeTest(key, testCases[key])
  }
  return batch
}
// name : [ input, output, external_styles ]
var suite = vows.describe('ansi2html')
suite.addBatch(makeBatchFromTestCases(
{
    'inline_equal': ['testString', 'testString', false]
  , 'inline_null': ['test[0mString', 'testString', false]
  , 'inline_green': ['test[32mString', 'test<span style="color:green">String</span>', false]
  , 'inline_boldcolour': ['test[1mBold[32mGreen[31mRed[0mNone', 'test<span style="font-weight:bold">Bold</span><span style="font-weight:bold;color:green">Green</span><span style="font-weight:bold;color:red">Red</span>None', false]
  , 'inline_colourbold': ['test[31mRed[1mBold[39mString', 'test<span style="color:red">Red</span><span style="color:red;font-weight:bold">Bold</span><span style="font-weight:bold">String</span>', false]
  , 'inline_background': ['test[42mGreenBG', 'test<span style="background:green">GreenBG</span>', false]
  , 'external_equal': ['testString', 'testString', true]
  , 'external_green': ['test[32mString', 'test<span class="ansi fg_green">String</span>', true]
  , 'external_boldcolour': ['test[1mBold[32mGreen[31mRed[0mNone', 'test<span class="ansi bold">Bold</span><span class="ansi bold fg_green">Green</span><span class="ansi bold fg_red">Red</span>None', true]
  , 'external_colourbold': ['test[31mRed[1mBold[39mString', 'test<span class="ansi fg_red">Red</span><span class="ansi fg_red bold">Bold</span><span class="ansi bold">String</span>', true]
  , 'external_background': ['test[42mGreenBG', 'test<span class="ansi bg_green">GreenBG</span>', true]
}))
suite.export(module)

