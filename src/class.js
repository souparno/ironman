var Class = (function() {
    'use strict';

    var util = {
        isFunc: function(arr) {
            var key;

            for (key in arr) {
                if (typeof arr[key] !== 'function') {
                    return false;
                }
            }
            return true;
        },
        overrideFunc: function(super_fn, base_fn) {
            return function() {
                var tmp = this._super,
                    ret;

                this._super = super_fn;
                ret = base_fn.apply(this, arguments);
                this._super = tmp;
                return ret;
            };
        },
        createProp: function(supr_prop, base_prop) {
            if (this.isFunc([supr_prop, base_prop])) {
                return this.overrideFunc(supr_prop, base_prop);
            }

            return base_prop;
        },
        mergeObj: function(supr_obj, base_obj) {
            for (var prop in base_obj) {
                supr_obj[prop] = this.createProp(supr_obj[prop], base_obj[prop]);

            }

            return supr_obj;
        }
    };

    return {
        __extending: false,
        Create: function(o) {
            return this.Extend.call(function() {}, o);
        },
        Extend: function(base_obj) {
            var F = function() {
                    if (!Class.__extending && this.init) {
                        this.init.apply(this, arguments);
                    }
                },
                super_obj;

            Class.__extending = true;
            super_obj = new this();
            F.prototype = util.mergeObj(super_obj, base_obj);
            Class.__extending = false;

            F.Extend = Class.Extend;
            return F;
        }
    };
}());

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Class;
} else {
    window.class = Class;
}
