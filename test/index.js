var ansi2html = require('../lib/')
  , vows = require('vows')
  , assert = require('assert')

function makeBatchFromTestCases(testCases) {
  function makeTest(input, expected) {
    var test = { topic: function() { return (new ansi2html(input)).render(); } }
    test['we get "' + expected + '"'] = function(topic) { assert.equal(topic, expected) }
    return test
  }

  var batch = {}
  for (var key in testCases) {
    if (!testCases.hasOwnProperty(key)) continue
    batch['When encoding "' + key + '"'] = makeTest(key, testCases[key])
  }
  return batch
}

var suite = vows.describe('ansi2html')
suite.addBatch(makeBatchFromTestCases(
{ 'testString': 'testString'
, 'test[0mString': 'testString'
, 'test[32mString': 'test<span style="color:green">String</span>'
, 'test[1mBold[32mGreen[31mRed[0mNone': 'test<span style="font-weight:bold">Bold</span><span style="font-weight:bold;color:green">Green</span><span style="font-weight:bold;color:red">Red</span>None'
, 'test[31mRed[1mBold[39mString': 'test<span style="color:red">Red</span><span style="color:red;font-weight:bold">Bold</span><span style="font-weight:bold">String</span>'
, 'test[42mGreenBG': 'test<span style="background:green">GreenBG</span>'
}))
suite.export(module)

