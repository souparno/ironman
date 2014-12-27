QUnit.test("Class.create should return a function", function (assert) {
  var klass = Class.Create({});
  assert.equal(_.isFunction(klass), true);
});

QUnit.test("Class.create should return a function " +
  "with Extend property", function (assert) {
  var klass = Class.Create({}),
    prop;
  for (prop in klass) {
    assert.equal(prop, 'Extend');
  }
});

QUnit.test("Class.create should call the Extend function", function (assert) {
  var stub_class_extend = sinon.stub(Class, 'Extend').returns(1);

  assert.equal(Class.Create({}), 1);
  stub_class_extend.restore();
});

QUnit.test("Class should return a function appending " +
  "all the function expressions to its prototype property", function (assert) {
    var testClass = Class.Create({
        init: function() { },
        dance: function() { }
      }),
      prop_array = [],
      prop;

    for (prop in testClass.prototype) {
      prop_array.push(prop);
    }
    assert.equal(prop_array.length, 2);
    assert.equal(prop_array[0], 'init');
    assert.equal(prop_array[1], 'dance');
});

QUnit.test("base class should extend from " +
  "the super class by appending the super class functions " +
  "with the base class functions and returning it", function (assert) {
    var test_super_class = Class.Create({
        dance: function() {}
      }),
      test_base_class = test_super_class.Extend({
        dance: function () {}
      }),
      prop_array = [],
      prop;

    for (prop in test_base_class.prototype) {
      prop_array.push(prop);
    }

    assert.equal(prop_array.length, 1);
    assert.equal(prop_array[0], 'dance');
});

QUnit.test("base class function should append the superclass functions " +
    "within the super instance varibale, if both the " +
    "functions have same name", function (assert) {
    var test_variable = false,
      test_super_class = Class.Create({
        dance: function() { 
         test_variable = true;
        }
      }),
      test_base_class = test_super_class.Extend({
        dance: function () {
          this._super();
        }
      }),
      obj;
    
    obj = new test_base_class();
    obj.dance();
    assert.equal(test_variable, true);
    //console.log("Hello i am here =====");
    //console.log(obj.dance);
});

QUnit.test("base class object should be instance of super class", function (assert) {
  var test_super_class = Class.Create({
      foo: function() {}
    }),
    test_base_class = test_super_class.Extend({
      bar: function () {}
    }),
    obj =  new test_base_class();
   
  assert.equal(obj instanceof test_super_class, true);
});

QUnit.test("super class object should not be instance of base class", function (assert) {
  var test_super_class = Class.Create({
      foo: function() {}
    }),
    test_base_class = test_super_class.Extend({
      bar: function () {}
    }),
    obj =  new test_super_class();
     
  assert.equal(obj instanceof test_base_class, false);
});

QUnit.test("object instances should not leak", function (assert) {
  var Foo = Class.Create({ }),
    Bar = Class.Create({ }),
    foo_obj =  new Foo(),
    bar_obj= new Bar();
     
  assert.equal(foo_obj instanceof Bar, false);
  assert.equal(bar_obj instanceof Foo, false);
});

QUnit.test("constructor should be called when a class is instantiated", function (assert) {
  var test_var = false,
    test_class = Class.Create({
      init: function() {
        test_var = true;
      },
      foo: function() {}
    });
      
  new test_class();
  assert.equal(test_var, true);
});

QUnit.test("super class constructor should not be called while " +
  "base class appending the its prototype properties", function (assert) {
  var test_var = false,
    supr= Class.Create({
      init: function() {
        test_var = true;
      }        
    });
  
  supr.Extend({});
  assert.equal(test_var, false);
});