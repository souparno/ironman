"use strict";

var Class = {
    
    Create: function(o) {
        var F = function() {
            this.init();
        };
        F.Extend = this.Extend;
        for (var property in o) {
            F.prototype[property] = o[property];
        }
        return F;
    },
            
    Extend: function(o) {
        var F=Class.Create(o);
        F.prototype['super']=new this;
        return F;
    }
};


var MusicInstrument=Class.Create({
    
    init:function(){
      this.me='Bonnie';
      console.log("Hello i am the parent constructor");
    },
    
    sayHello:function(){
        console.log("I am a musical instrument");
    }
    
});


var Guitar=MusicInstrument.Extend({
    
    init:function(){
      console.log('Hello i am the child constructor');  
    },
    
    sayHello:function(){
        this.super.sayHello();
        console.log("Hello i am a guitar");
    }
    
});

var mi=new MusicInstrument();
console.log(mi.me);
var guitar=new Guitar();
console.log(Guitar instanceof MusicInstrument);
guitar.sayHello();
console.log(guitar.super.me);
