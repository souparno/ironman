var isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
};

var __class__ = function (cls, name, parent, proto) {
    var clsProto = function () {};
    var logger;

    if (typeof name !== 'string') {
        proto = parent;
        parent = name;
        name = null;
    }

    if (name) {
        logger = exports.logging.get(name);
    }

    if (!parent) {
        throw new Error('parent or prototype not provided');
    }
    if (!proto) {
        proto = parent;
        parent = null;
    }

    if (parent) {
        if (isArray(parent)) { // multiple inheritance, use at your own risk =)
            clsProto.prototype = {};
            for (var i = 0, p; p = parent[i]; ++i) {
                if (p == Error && ErrorParentClass) {
                    p = ErrorParentClass;
                }
                for (var item in p.prototype) {
                    if (!(item in clsProto.prototype)) {
                        clsProto.prototype[item] = p.prototype[item];
                    }
                }
            }
            parent = parent[0];
        } else {
            if (parent == Error && ErrorParentClass) {
                parent = ErrorParentClass;
            }
            clsProto.prototype = parent.prototype;
        }
    }

    var supr = parent ? function (context, method, args) {
        var f = parent.prototype[method];
        if (!f) {
            throw new Error('method ' + method + ' does not exist');
        }
        return f.apply(context, args || []);
    } : null;

    var p = cls.prototype = new clsProto();
    p.constructor = cls;
    p.__parentClass__ = parent;
    if (name) {
        p.__class__ = name;
    }
    proto.call(p, logger || supr, logger && supr);
    return cls;
};

var Class = function (name, parent, proto) {
    return __class__(function () {
        return this.init && this.init.apply(this, arguments);
    }, name, parent, proto);
};
