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
        var F=function(){            
        };
        F.Extend=this.Extend;
        F.prototype['super']=new this;
        for (var property in o) {
            F.prototype[property] = o[property];
        }        
        return F;
    }
};


var MusicInstrument=Class.Create({
    
    sayHello:function(){
        console.log("I am a musical instrument");
    }
    
});


var Guitar=MusicInstrument.Extend({
    
    sayHello:function(){
        this.super.sayHello();
        console.log("Hello i am a guitar");
    }
    
});


var guitar=new Guitar();
guitar.sayHello();
