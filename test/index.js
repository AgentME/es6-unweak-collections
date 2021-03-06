var assert = require('better-assert');
var Map = require('../index').Map;
var Set = require('../index').Set;

describe('ES Collections test', function(){
  it("Map existence", function () {
    assert(Map);
  });

  it("Map constructor behavior", function () {
    assert(new Map() instanceof Map);
    assert(Map() instanceof Map);
    var a = 1;
    var b = {};
    var c = Map();
    var m = new Map([[1,1], [b,2], [c, 3]]);
    assert(m.has(a));
    assert(m.has(b));
    assert(m.has(c));
    assert(m.size, 3);
    assert(Object.getPrototypeOf(Map()).isPrototypeOf(Map()));
    assert(Object.getPrototypeOf(Map()) === Map.prototype);
  });

  it("Map#size", function () {
    var o = Map();
    assert(o.size === 0);
    o.set("a", "a");
    assert(o.size === 1);
    o["delete"]("a");
    assert(o.size === 0);
  });

  it("Map#has", function () {
    var
      o = Map(),
      generic = {},
      callback = function () {}
    ;
    assert(false === o.has(callback));
    o.set(callback, generic);
    assert(true === o.has(callback));
  });

  it("Map#get", function () {
    var
      o = Map(),
      generic = {},
      callback = function () {}
    ;
    //:was assert(o.get(callback, 123) === 123);
    o.set(callback, generic);
    assert(o.get(callback, 123) === generic);
    assert(o.get(callback) === generic);
  });

  it("Map#set", function () {
    var
      o = Map(),
      generic = {},
      callback = function () {}
    ;
    o.set(callback, generic);
    assert(o.get(callback) === generic);
    o.set(callback, callback);
    assert(o.get(callback) === callback);
    o.set(callback, o);
    assert(o.get(callback) === o);
    o.set(o, callback);
    assert(o.get(o) === callback);
    o.set(NaN, generic);
    assert(o.has(NaN));
    assert(o.get(NaN) === generic);
    o.set("key", undefined);
    assert(o.has("key"));
    assert(o.get("key") === undefined);

    o.set(-0, callback);
    o.set(0, generic);
    assert(o.has(-0));
    assert(o.get(-0) === callback);
    assert(o.has(0));
    assert(o.get(0) === generic);
  });

  it("Map#['delete']", function () {
    var
      o = Map(),
      generic = {},
      callback = function () {}
    ;
    o.set(callback, generic);
    o.set(generic, callback);
    o.set(o, callback);
    assert(o.has(callback) && o.has(generic) && o.has(o));
    o["delete"](callback);
    o["delete"](generic);
    o["delete"](o);
    assert(!o.has(callback) && !o.has(generic) && !o.has(o));
    assert(o["delete"](o) === false);
    o.set(o, callback);
    assert(o["delete"](o));
  });

  it("non object key does not throw an error", function () {
    var o = Map();
    try {
      o.set("key", o);
      assert(true);
    } catch(emAll) {
      assert(false);
    }
  });

  it("keys and values behavior", function () {
    var o = Map();
    o.set("key", "value");
    if ("keys" in o) {
      assert(o.keys() instanceof Array);
      assert(o.keys().length === 1);
      assert(o.keys()[0] === "key");
      assert(o.keys(1).join("") === o.keys().join(""));
    }
    if ("values" in o) {
      assert(o.values() instanceof Array);
      assert(o.values().length === 1);
      assert(o.values()[0] === "value");
      assert(o.values(1).join("") === o.values().join(""));
    }
  });

  it("Map#forEach", function () {
    var o = Map(), i;
    o.set("key 0", 0);
    o.set("key 1", 1);
    if ("forEach" in o) {
      o.forEach(function (value, key, obj) {
        assert(key === "key " + value);
        assert(obj === o);
        // even if dropped, keeps looping
        o["delete"](key);
      });
      assert(!o.keys().length);
    }
  });

  it("Map#clear", function(){
    var o = Map();
    o.set(1, '1');
    o.set(2, '2');
    o.set(3, '3');
    o.clear();
    assert(!o.size);
    assert(!o.values().length);
  });

  it("Set existence", function () {
    assert(Set);
  });

  it("Set constructor behavior", function () {
    assert(new Set() instanceof Set);
    assert(Set() instanceof Set);
    var s = Set([1,2]);
    assert(s.has(1));
    assert(s.has(2));
    assert(s.size, 2);
    assert(Object.getPrototypeOf(Set()).isPrototypeOf(Set()));
    assert(Object.getPrototypeOf(Set()) === Set.prototype);
  });

  it("Set#size - Mozilla only", function () {
    var
      o = Set()
    ;
    if ("size" in o) {
      assert(o.size === 0);
      o.add("a");
      assert(o.size === 1);
      o["delete"]("a");
      assert(o.size === 0);
    }
  });

  it("Set#add", function () {
    var o = Set();
    assert(o.add(NaN));
    assert(o.has(NaN));
  });

  it("Set#['delete']", function () {
    var
      o = Set(),
      generic = {},
      callback = function () {}
    ;
    o.add(callback);
    o.add(generic);
    o.add(o);
    assert(o.has(callback) && o.has(generic) && o.has(o));
    o["delete"](callback);
    o["delete"](generic);
    o["delete"](o);
    assert(!o.has(callback) && !o.has(generic) && !o.has(o));
    assert(o["delete"](o) === false);
    o.add(o);
    assert(o["delete"](o) === true);
  });

  it("values behavior", function () {
    var o = Set();
    o.add("value");
    if ("values" in o) {
      assert(o.values() instanceof Array);
      assert(o.values().length === 1);
      assert(o.values()[0] === "value");
      assert(o.values(1).join("") === o.values().join(""));
    }
  });

  it("Set#has", function () {
    var
      o = Set(),
      generic = {},
      callback = function () {}
    ;
    assert(false === o.has(callback));
    o.add(callback);
    assert(true === o.has(callback));
  });

  it("Set#forEach", function () {
    var o = Set(), i = 0;
    o.add("value 0");
    o.add("value 1");
    if ("forEach" in o) {
      o.forEach(function (value, sameValue, obj) {
        assert(value === "value " + i++);
        assert(obj === o);
        assert(value === sameValue);
        // even if dropped, keeps looping
        o["delete"](value);
      });
      assert(!o.values().length);
    }
  });

  it("Set#clear", function(){
    var o = Set();
    o.add(1);
    o.add(2);
    o.clear();
    assert(!o.size);
    assert(!o.values().length);
  });

  it("Set#add and Map#set are chainable now", function(){
    var s = Set();
    var m = Map();
    var a = {}, b = {};

    s.add(1).add(2);
    assert(s.has(1) && s.has(2) && s.size === 2);

    m.set(1, 1).set(a, 2);
    assert(m.has(1) && m.has(a) && m.size === 2);
  });

  it("Recognize any iterable as the constructor input", function(){
    var a = new Set(new Set([1,2]));
    assert(a.has(1));
  });
});
