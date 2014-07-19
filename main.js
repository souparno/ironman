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
            _base_obj[property] = o[property];
            
        }

        /*
         * 
         * Encaptutalating the object withing a new function variable,
         * and returning the variable
         */
        var F = function() {
            if (!initializing && this.init)
                this.init();

        };
        F.prototype = _base_obj;
        F.prototype['super'] = _base_obj;
        F.Extend = this.Extend;
        return F;
    }
};


//Example 

var parent = Class.Create({
    init: function() {
        this.a = 2;
        console.log('Hello i am the parent constructor');

    },
    abc: function() {
        //this.def();
        console.log("Hello this is the parent method");
        //this.def();
    }
});

var child = parent.Extend({
    init: function() {
        console.log(this.a);
        this.a = 4;
        console.log(this.a);
        console.log('Hello i am the child constructor');
    },
    def: function() {
        this.super.abc;
        console.log(this.super.a);
        console.log("Hello form child");
    }

});

var obj1 = new child();
obj1.def();


console.log("=== parent proto===")
for (var p in parent.prototype) {
    console.log(p);
    console.log(parent.prototype[p]);
    console.log("=======");
}


console.log("==child proto ===");
for (var p in child.prototype) {
    console.log(p);
    console.log(child.prototype[p]);
    console.log("=======");
}




