"use strict";

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
                             * methiod execution is bind to this._super property
                             * the property is then restored to the inital value
                             */
                            fn.apply(this, arguments);
                            this._super = tmp;
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


//Example 

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

var t = new Truck(350,4);
t.printInfo();


