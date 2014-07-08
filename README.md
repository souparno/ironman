ironman
=======

an object oriented javascript framework

####

function Core(){

this.Create=function(o){
    var F=function (){};
    F.Extend=this.Extend;
    for(var property in o){
        F.prototype[property]=o[property];    
    }
    return F;
};

this.Extend=function(o){
  for(var property in o){
      this.prototype[property]=o[property];    
  }
  return this;
};
};
var Class=new Core();
