/*
 * spec/tacular
 *
 * A minimal spec library for node.js
 *
 * To run:
 *
 * 1. Place this file in your project's spec directory.
 * 2. Run with "node spec/tacular.js" to test all files beginning with the word "spec".
 *
 * Synopsis:
 *
 * var foo = require("../lib/foo.js"); // the file you are specing
 *
 * describe("A foo", function() {
 *   beforeEach(function() {
 *     // setup goes here
 *   });
 *
 *   afterEach(function() {
 *     // teardown goes here
 *   });
 *
 *   it("should do X", function() {
 *     // place code and assertions here
 *     // available: assert(x), assertEqual(x, y), assertNotEqual(x, y)
 *   });
 *
 * });
 *
 * Copyright 2009, Jon Crosby, MIT Licensed
 *
 */
(function() {
  var specCount    = 0;
  var specStack    = [];
  var specFailures = [];

  var describe = function(name, func) {
    specStack.push(name);
    specBeforeEach = specAfterEach = function() {};
    func();
    specStack.pop();
  };

  var it = function(name, func) {
    specCount++;
    specStack.push(name);
    specBeforeEach();
    func();
    specStack.pop();
    specAfterEach();
  };

  var specFail = function() {
    print("F");
    specFailures.push(specStack.join(" "));
  };

  var specPass = function() {
    print(".");
  };

  var assert = function(value) {
    value ? specPass() : specFail();
  };

  var assertEqual = function(a, b) {
    a == b ? specPass() : specFail();
  };

  var assertNotEqual = function(a, b) {
    a != b ? specPass() : specFail();
  }

  var beforeEach = function(func) {
    specBeforeEach = func;
  };

  var afterEach = function(func) {
    specAfterEach = func;
  };

  var summarize = function() {
    var plural = function(word, isPlural) {
      return word + (isPlural ? "s" : "");
    };

    var specSummary = function() {
      return [specCount, plural("example", specCount != 1)].join(" ");
    };

    var failSummary = function() {
      return [specFailures.length, plural("failure", specFailures.length != 1)].join(" ");
    };

    var summary = function() {
      return [specSummary(), failSummary()].join(", ");
    };

    if(specFailures.length) {
      var i;
      for(i = 1; i <= specFailures.length; i++) {
        puts("" + i + ")");
        puts(specFailures[i-1]);
        puts("");
      }
    }
    puts(summary());
  };

  var specDirectory = node.path.dirname(__filename);
  var files = node.fs.readdir(specDirectory).wait();
  var i;
  for(i = 0; i < files.length; i++) {
    var file = files[i];
    if(file.match(/^spec/)) {
      var content = node.fs.cat(specDirectory + "/" + file, "utf8").wait();
      eval(content);
    }
  }
  puts("\n");
  summarize();
})();
