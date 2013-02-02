var repl = require('repl').start({})
registreer({
	hoop: {
		f: hoop,
		help: 'hoop(r): verander rooster r in hoop'
	},
	wys: {
		f: wys,
		help: 'wys(h): druk die hoop h uit in vlakke'
	},
	bou: {
		f: bou,
		help: 'bou(n): bou hoop met n ewekansige heelgetalle kleiner as n'
	}
})
return

function registreer(funksies) {
	console.log('')
	Object.keys(funksies).forEach(function (funksieNaam) {
		repl.context[funksieNaam] = funksies[funksieNaam].f
		console.log(funksies[funksieNaam].help)
	})
}

function bou(n) {
	var elemente = []
	, i
	for (i = 0; i < n; ++i) {
		elemente.push(Math.round(Math.random()*n))
	}
	return hoop(elemente)
}

function wys(h) {
	var begin = 0
	, einde = 1
	, x
	while (einde <= h.length) {
		wysVlak(begin, einde)
		x = begin
		begin = einde
		einde = (einde-x)*2+einde
	}
	wysVlak(begin, h.length)
	return
	function wysVlak(begin, einde) {
		var i
		, lyn = ''
		for (i = begin; i < einde; ++i)
			lyn += h[i] + ' '
		console.log(lyn)
	}
}

function hoop(elemente) {
	var h = []
	elemente.forEach(function voegby(el) {
		voegbyHoop(h, el)
	})
	return h
}

function voegbyHoop(h, el) {
	h.push(el)
	ruilAsGroterAsOuer(h, h.length-1)
}

function ruilAsGroterAsOuer(h, i) {
	if (i === 0)
		return
	var ouerIndeks = Math.floor((i-1)/2) 
	if (h[ouerIndeks] < h[i]) {
		ruil(h, ouerIndeks, i)
		ruilAsGroterAsOuer(h, ouerIndeks)
	}
}

function ruil(h, i, j) {
	var x = h[i]
	h[i] = h[j]
	h[j] = x
}