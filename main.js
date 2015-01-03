'use strict';

var initializing = false;

var Class = {

  Create: function(o) {
    var F = function() {
    };
    F.Extend = this.Extend;
    return F.Extend(o);
  },

  Extend: function(o) {
    var supr, property, F;

    initializing = true;
    supr = new this();
    initializing = false;

    for (property in o) {
      supr[property] = typeof o[property] === 'function'
        && typeof supr[property] === 'function' ?
          (function(super_fn, base_fn) {
            return function() {
              var tmp = this._super,
                ret;

              this._super = super_fn;
              ret = base_fn.apply(this, arguments);
              this._super = tmp;
              return ret;
            };
          }(supr[property],o[property])) : o[property];
    }

    F = function() {
      if (!initializing && this.init) {
        this.init.apply(this, arguments);
      }
    };

    F.prototype = supr;
    F.Extend = this.Extend;
    return F;
  }
};
