"use strict";
/*
 * 
 * @type Boolean
 * stops invoking the constructor function during the operation
 */
var initializing = false;

var Class = {
    Create: function(o) {

        /*
         * 
         * calls the extended property of the Class object 
         * though a new function varibale.
         */
        var F = function() {
        };
        F.Extend = this.Extend;
        return F.Extend(o);

    },
    Extend: function(o) {

        /*
         * 
         * Gets the prototype of the base class
         */
        var _super = this.prototype;


        /*
         * 
         * Getting the object of the base class ,
         * without invoking the constructor function
         */
        initializing = true;
        var _base_obj = new this();
        initializing = false;


        /*
         * 
         * Adding the new object properties to the base object property
         */
        for (var property in o) {
            /*
             * 
             * check if there is a same function expression present in the base class
             */
            _base_obj[property] = typeof o[property] === "function" && typeof _super[property] === "function" ?
                    (function(property, fn) {
                        return function() {
                            /*
                             * 
                             * _super property hold the function of the base class
                             */
                            var tmp = this._super;
                            this._super = _super[property];

                            /*
                             * method execution is bind to this._super property
                             * the property is then restored to the inital value
                             */
                            var ret = fn.apply(this, arguments);
                            this._super = tmp;

                            return ret;
                        };
                    }(property, o[property])) : o[property];

        }

        /*
         * 
         * Encaptutalating the object withing a new function variable,
         * and return the variable
         */
        var F = function() {

            /*
             * 
             * calls the class constructor when a new object is created
             */
            if (!initializing && this.init)
                this.init.apply(this, arguments);

        };
        F.prototype = _base_obj;
        F.Extend = this.Extend;
        return F;
    }
};


/*
 * 
 * Examples ===============================================================================
 */


// Class 1

var Person = Class.Create({
    init: function(isDancing) {
        this.dancing = isDancing;
    },
    dance: function() {
        return this.dancing;
    }
});

var Ninja = Person.Extend({
    init: function() {
        this._super(false);
    },
    dance: function() {
        // Call the inherited version of dance()
        return this._super();
    },
    swingSword: function() {
        return true;
    }
});


// Class 2

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
        console.log('I am a truck and I have ' + this.wheels + ' wheels and ' + this.horsepower + ' hp.');
    }
});



var p = new Person(true);
console.log("Person Dance " + p.dance()); // => true

var n = new Ninja();
console.log("Ninja Dance " + n.dance()); // => false
console.log("Ninja Swing Sword " + n.swingSword()); // => true



var t = new Truck(350, 4);
t.printInfo(); // =>I am a truck and I have 4 wheels and 350 hp. 


console.log("p instanceof Person");
console.log(p instanceof Person);
console.log("n instanceof Person");
console.log(n instanceof Person);
console.log("==check to see if theere is a leak in the inheritance ==");
console.log("p instanceof Ninja");
console.log(p instanceof Ninja);
console.log("t instanceof Vehicle");
console.log(t instanceof Vehicle);
console.log("==check to see if there is a leak in the class==");
console.log(p instanceof Vehicle);
console.log(t instanceof Person);
