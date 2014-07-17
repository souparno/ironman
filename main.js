"use strict";

var Class = {
    Create: function(o) {
        return this.Extend.call(function() {
        }, o);
    },
    Extend: function(o) {
        var _prototype = new this();
        for (var property in o) {
            _prototype[property] = o[property]
        }
        var F = function() {
        };
        F.prototype = _prototype;
        F.prototype['super'] = new this();
        F.Extend = Class.Extend;
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
        this.super.init(wheels);
        this.horsepower = hp;
    },
    printInfo: function() {
        console.log('I am a truck and I have ' + this.super.wheels + ' wheels and ' + this.horsepower + ' hp.');
    }
});

//var t = new Truck();
var t = new Truck();
t.init(350, 4);
t.printInfo();