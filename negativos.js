var negativos = [
		/ladrão/,
		/ladrao/,
		/ladroes/,
		/ladrões/,
		/roubo/,
		/roubalheira/,
		/preso/,
		/prisão/,
		/prisao/,
		/corrupto/,
		/corruptos/,
	];

var countNegativos = db.posts.find({owner:"user8", text:{$in: negativos}}).count();


print("Negativos: "+ countNegativos);