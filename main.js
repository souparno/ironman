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
    var _super = this.prototype,
      _base_obj,
      property,
      F;

    initializing = true;
    _base_obj = new this();
    initializing = false;

    for (property in o) {

      _base_obj[property] = typeof o[property] === 'function'
        && typeof _super[property] === 'function' ?
          (function(prop, fn) {
            return function() {
              var tmp = this._super, ret;

              this._super = _super[prop];
              ret = fn.apply(this, arguments);
              this._super = tmp;
              return ret;
            };
          }(property, o[property])) : o[property];

    }

    F = function() {
      if (!initializing && this.init) {
        this.init.apply(this, arguments);
      }
    };
    F.prototype = _base_obj;
    F.Extend = this.Extend;
    return F;
  }
};
