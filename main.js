"use strict";

var Class = {
    
    Create: function(o) {
        var F = function() {
        };
        F.Extend = this.Extend;
        for (var property in o) {
            F.prototype[property] = o[property];
        }
        return F;
    },
            
    Extend: function(o) {
        for (var property in o) {
            this.prototype[property] = o[property];
        }
        return this;
    }
};


// How to use this library


var Person = Class.Create({
    walk: function() {
        console.log("I am Walking");
    },
    sayHello: function() {
        console.log("Hello there");
    }
});


var Student = Person.Extend({
    sayHi: function() {
        console.log("Hi i am a student");

    },
    sayGoodBye: function() {
        console.log("Good Bye");
    }
});



var HiSchoolStudent = Student.Extend({
    study: function() {
        console.log("I study in high school");
    }
});

var Vehicle = Class.Create({
    run: function() {
        console.log("I am a vehicle and I run");
    }
});

var Truck = Vehicle.Extend({
    init: function(hp, wheels) {
        this.horsepower = hp;
        this.wheels = wheels;
    },
    printInfo: function() {
        console.log('I am a truck and I have ' + this.horsepower + ' hp. and ' + this.wheels + ' wheels');
    }
});

var student1 = new HiSchoolStudent();
student1.sayHi();
student1.study();
student1.sayHello();
student1.walk();
student1.sayGoodBye();

var obj = new Truck();
obj.run();
obj.init();
obj.printInfo(350, 4);

console.log(obj instanceof Person);
console.log(obj instanceof Vehicle);
