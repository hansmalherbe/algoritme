var repl = require('repl').start({})
registreer({
	hoop: {
		f: hoop,
		hulp: 'hoop(r): verander rooster r in hoop'
	},
	wys: {
		f: wys,
		hulp: 'wys(h): druk die hoop h uit in vlakke'
	},
	bou: {
		f: bou,
		hulp: 'bou(n): bou rooster met n ewekansige heelgetalle kleiner as n'
	},
	ouer: {
		f: function (h, i) {
			return element(h, ouer(i))
		},
		hulp: 'ouer(h, i): kry die ouer van die element by i in hoop h'
	},
	regterKind: {
		f: function (h, i) {
			return element(h, regterKind(i))
		},
		hulp: 'regterKind(h, i): kry die regter kind van element by i in hoop h'
	},
	linkerKind: {
		f: function (h, i) {
			return element(h, linkerKind(i))
		},
		hulp: 'linkerKind(h, i): kry die linker kind van element by i in hoop h'
	},
	voegbyHoop: {
		f: voegbyHoop,
		hulp: 'voegbyHoop(h, el): voeg el by hoop h'
	},
	haalMinUit: {
		f: haalMinUit,
		hulp: 'haalMinUit(h): haal die minimum uit en herstel hoop h'
	}
})
return

function registreer(funksies) {
	console.log('')
	Object.keys(funksies).forEach(function (funksieNaam) {
		repl.context[funksieNaam] = funksies[funksieNaam].f
		console.log(funksies[funksieNaam].hulp)
	})
}

function bou(n) {
	var elemente = []
	, i
	for (i = 0; i < n; ++i) {
		elemente.push(Math.round(Math.random()*n))
	}
	return elemente
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
	return h
}

function ruilAsGroterAsOuer(h, i) {
	if (i === 0)
		return
	var ouerIndeks = ouer(i) 
	if (h[ouerIndeks] < h[i]) {
		ruil(h, ouerIndeks, i)
		ruilAsGroterAsOuer(h, ouerIndeks)
	}
}

function haalMinUit(h) {
	var min = h[0]
	h[0] = h.pop()
	ruilAsKleinerAsKinders(h, 0)
	return min
}

function ruilAsKleinerAsKinders(h, i) {
	var x = element(h, i)
	, li = linkerKind(i)
	, ri = regterKind(i)
	, l = element(h, li)
	, r = element(h, ri)
	//console.log('x:' + x + ' l:' + l + ' r:' + r)
	if (typeof(l) === 'undefined')
		return
	if (typeof(r) === 'undefined' || l > r)
		kykLinks()
	else
		kykRegs()
	return
	function kykLinks() {
		if (x >= l)
			return
		ruil(h, i, li)
		ruilAsKleinerAsKinders(h, li)
	}
	function kykRegs() {
		if (x >= r)
			return
		ruil(h, i, ri)
		ruilAsKleinerAsKinders(h, ri)
	}
}

function ruil(h, i, j) {
	var x = h[i]
	h[i] = h[j]
	h[j] = x
}

function ouer(i) {
	return Math.floor((i-1)/2)
}

function linkerKind(i) {
	return 2*i + 1
}

function regterKind(i) {
	return 2*(i+1)
}

function element(r, i) {
	if (i < r.length)
		return r[i]
}