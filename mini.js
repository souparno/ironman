'use strict';

var Class = {

  extending: false,

  Create: function(o) {
    var F = function() {};

    F.Extend = this.Extend;
    return F.Extend(o);
  },

  Extend: function(o) {
    var _util = {
      isFunc: function (arr) {
        var key;

        for(key in arr){
          if (typeof arr[key] !== 'function') {
            return false;
          }
        }
        return true;
      },
      overrideFunc: function (super_fn, base_fn) {
        return function() {
          var tmp = this._super,
            ret;

          this._super = super_fn;
          ret = base_fn.apply(this, arguments);
          this._super = tmp;
          return ret;
        };
      },
      mergeObj: function (super_obj, base_obj) {
        var property, func1, func2;

        for (property in base_obj) {

          func1 = super_obj[property];
          func2 = base_obj[property];

          if (this.isFunc([func1, func2])) {
            func1 = this.overrideFunc(func1, func2);
          } else {
            func1 = func2;
          }
          super_obj[property] = func1;
        }
        return super_obj;
      }
    }, F = function() {
      if (!Class.extending && this.init) {
        this.init.apply(this, arguments);
      }
    };

    Class.extending = true;
    F.prototype = _util.mergeObj(new this(), o);
    Class.extending = false;

    F.Extend = this.Extend;
    return F;
  }
};
