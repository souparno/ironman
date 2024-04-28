[![Build Status](https://travis-ci.org/souparno/Class.js.svg?branch=master)](https://travis-ci.org/souparno/Class.js)
<br/>
[![NPM](https://nodei.co/npm/@bonnie/class.png?downloads=true)](https://nodei.co/npm/@bonnie/class/)

a super small javascript Inheritance framework based out on John Resig blog https://johnresig.com/blog/simple-javascript-inheritance/

<pre>
  var Vehicle = Class.Create({
    init: function(wheels) {
      this.wheels = wheels;
    }
  });

  var Truck = Vehicle.Extend({
    init: function(hp, wheels) {
      this._super(wheels);
      this.horsepower = hp;
    },
    printInfo: function() {
      console.log('I am a truck and I have ' + this.wheels +
        ' wheels and ' + this.horsepower + ' hp.');
    }
  });
  
  var t = new Truck(350, 4);
  t.printInfo();
</pre>
