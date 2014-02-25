/*
	dx/dt = v
	dv/dt = a
	da/dt = 1
*/
var color = "rgb(200,0,0)";
var length = 5;
var width = 5;
var system = {
	xdot: function(x, v, a, sys, out){
		Vec2.add(x, v, x);
		Vec2.mod(sys.dim, x);
	},
	vdot: function(x, v, a, sys, out){
		Vec2.add(v, a, v);
	},
	adot: function(x, v, a, sys, out){
		Vec2.set(0, 0, a);
	}
};

var Entity = function(x, v, a){
	this.x = x || Vec2.create(100,100);
	this.v = v || Vec2.create(1,.5);
	this.a = a || Vec2.create(0,0);
};

Entity.prototype.update = function(sys){
	var x, v, a;
	x = this.x;
	v = this.v;
	a = this.a;

	system.adot(x, v, a, sys);
	system.vdot(x, v, a, sys);
	system.xdot(x, v, a, sys);
};

Entity.prototype.draw = function(){
	ctx.fillStyle = color;
	ctx.fillRect(this.x[0]-(length/2), this.x[1]-(width/2), length , width);
};

