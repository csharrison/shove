function mod(x,y){
    return ((x%y) + y)%y;
}

var Vec2 = {
    create: function(a, b) {
        return new Float32Array([a, b]);
    },

    add: function(a, b, out) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
    },

    subtract: function(a, b, out) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
    },

    scale: function(a, v, out) {
        out[0] = a[0] * v;
        out[1] = a[1] * v;
    },

    normalize: function(a, out) {
        var iLen = 1 / Vec2.length(a);
        out[0] = a[0] * iLen;
        out[1] = a[1] * iLen;
    },

    copy: function(a, out){
        out[0] = a[0];
        out[1] = a[1];
    },

    set: function(a, b, out){
        out[0] = a;
        out[1] = b;
    },

    mod: function(m, out){
        out[0] = mod(out[0], m[0]);
        out[1] = mod(out[1], m[1]);
    }
};