Inheritance Eaxmple
<pre>
var Vehicle = Class(function () {
    this.init = function (wheels) {
        this.wheels = wheels;
    };
});

var Truck = Class(Vehicle, function (supr) {
    
    this.init = function (hp, wheels) {
        supr(this, "init", [wheels]);
        this.horsepower = hp;
    };
    
    this.printInfo = function () {
        console.log('I am a truck and I have ' + this.wheels +
                ' wheels and ' + this.horsepower + ' hp.');
    };
});

var t = new Truck(350, 4);
t.printInfo();
</pre>
