var entities = [];
var sys = {
	ents: entities,
	dim: Vec2.create(200,200)
};

function resize(){
	Vec2.set(window.innerWidth, window.innerHeight, sys.dim);
	c.width = sys.dim[0];
	c.height = sys.dim[1];
}

function main(){
	var i;
	for(i = 0; i < entities.length; i++){
		entities[i].apply_forces(sys);
	}
	for(i = 0; i < entities.length; i++){
		entities[i].update(sys);
	}

	ctx.fillStyle = "rgba(0,0,0,.5)";
	ctx.fillRect(0,0, sys.dim[0], sys.dim[1]);

	for(i = 0; i< entities.length; i++){
		entities[i].draw();
	}
}

function setup(){
	var interval_length = 2;
	window.onresize = resize;
	for(var i = 0; i < 1000; i++){
		var e = new Entity();
		entities.push(e);
	}
	resize();
	interval = setInterval(main, interval_length);
}
