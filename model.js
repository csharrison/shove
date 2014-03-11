/*
	dx/dt = v
	dv/dt = a
	da/dt = 1
*/
var color = "rgb(200,0,0)";
var length = 5;
var width = 5;
var _h = Vec2.create(0,0);
var _acc = Vec2.create(0,0);
var _xacc = Vec2.create(0,0);
var system = {
	xdot: function(me, sys){
		Vec2.add(me.x, me.v, me.x);
		Vec2.mod(sys.dim, me.x);
	},
	vdot: function(me, sys){
		Vec2.add(me.v, me.a, me.v);
		if(Vec2.length(me.v) > .5){
			Vec2.normalize(me.v, me.v);
			Vec2.scale(me.v, .5,  me.v);
		}
	},
	adot: function(me, sys){
		var i;
		var es = sys.ents;
		Vec2.set(0,0,me.a);
		Vec2.set(0,0,_acc);
		Vec2.set(0,0, _xacc);
		neighs = 0;
		me.color = get_color(me.mtype);

		for(i = 0; i < es.length; i++){
			var e = es[i];
			var d = Vec2.distance(me.x, e.x);
			/* flocking force */
			if(me.mtype && e.mtype){
				if(d < 2 * (me.r + e.r)){
					Vec2.add(_acc, e.v, _acc);
					neighs = neighs + 1;
				}
				if(me != e && d < 4 * (me.r + e.r)){
					Vec2.add(_xacc, e.x, _xacc);
				}
			}

			if(me == e) continue;
			if(d < me.r + e.r){
				/*repulsion force*/
				//me.color = "rgb(0,200,0)";
				//e.color = "rgb(0,200,0)";

				Vec2.subtract(me.x, e.x, _h);

				ep = 25;
				Vec2.scale(_h, ep * Math.pow((1 - d/(me.r + e.r)), 3/2), _h)

				Vec2.add(me.a, _h, me.a);

			}

		}
		/* self propulsion */
		curspeed = Vec2.length(me.v);
		preferred_speed = me.mtype;
		mu = 1;
		Vec2.scale(me.v, mu*(preferred_speed - curspeed), _h);
		Vec2.add(me.a, _h, me.a);

		/* apply the flocking force */
		if(me.mtype){
			alpha = .5;
			beta = 0.0;
			len = Vec2.length(_acc);
			if(neighs !== 0){
				Vec2.add(me.v, _acc, _acc);
				Vec2.scale(_acc, alpha/neighs, _acc);
				Vec2.add(me.a, _acc, me.a);
			}

			if(neighs !== 0){
				Vec2.scale(_xacc, 1/neighs, _xacc);
				Vec2.subtract(me.x, _xacc, _xacc);

				Vec2.scale(_xacc, beta, _xacc);
				Vec2.add(me.a, _xacc, me.a);
			}

			/* noise force */
			Vec2.randomize_gauss(0,.01, _h);
			Vec2.add(me.a, _h, me.a);
		}
	}
};
function get_color(mtype){
	return mtype === 0 ? "rgb(0,0,200)" : "rgb(200,0,0)";
}
var Entity = function(mtype, r, x, v, a){
	this.mtype = mtype || (Math.random() > .7 ? 1 : 0);
	this.r = r || 6;
	this.x = x || Vec2.create(100,100);
	this.v = v || Vec2.create(1,.5);
	this.a = a || Vec2.create(0, 0);
	this.color = get_color(this.mtype);
	Vec2.randomize(0,3000, this.x);
	Vec2.randomize(-1,1, this.v);
};

Entity.prototype.apply_forces = function(sys){
	system.adot(this, sys);
}
Entity.prototype.update = function(sys){
	system.vdot(this, sys);
	system.xdot(this, sys);
};

Entity.prototype.draw = function(){
	ctx.strokeStyle = this.color;

	ctx.beginPath();
	ctx.arc(this.x[0], this.x[1], this.r, 2*Math.PI, false);
	ctx.stroke();

};

