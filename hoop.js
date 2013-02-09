var repl = require('repl').start({})
registreer({
	hoop: {
		f: hoop,
		hulp: 'hoop(r): verander rooster r in hoop'
	},
	hoopVanOnder: {
		f: hoop,
		hulp: 'hoopVanOnder(r): verander rooster r in hoop deur onder te begin'
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
	haalKopAf: {
		f: haalKopAf,
		hulp: 'haalKopAf(h): haal die boonste element uit en herstel hoop h'
	},
	rHoopBo: {
		f: rHoopBo,
		hulp: 'rHoopBo(n): bou reeks van hope tot by grootte n van bo af'
	},
	rHoopOnder: {
		f: rHoopOnder,
		hulp: 'rHoopOnder(n): bou reeks van hope tot by grootte n van onder af'
	},
	rGroei: {
		f: rGroei,
		hulp: 'rGroei(n): begin by lee rooster en groei met een element tot by n' 
	},
	i: {
		f: iElement,
		hulp: 'i(r, i): kry die i-grootste element van rooster r'
	},
	iGroterAs: {
		f: iGroterAs,
		hulp: 'iGroterAs(r, i, x): is i-grootste element groter as x?'
	}
})
return

function iGroterAs(r, indeks, x) {
	var h = hoop(r)
	return telHoeveelGroterAs(indeks + 1, 0) > indeks
	function telHoeveelGroterAs(stopTelling, i) {
		if (i >= h.length || h[i] <= x)
			return 0
		var telling = 1
		if (telling >= stopTelling)
			return telling
		telling += telHoeveelGroterAs(stopTelling - telling, linkerKind(i))
		if (telling >= stopTelling)
			return telling
		telling += telHoeveelGroterAs(stopTelling - telling, regterKind(i))
		return telling
	}
}

function iElement(r, indeks) {
	var h = hoop(r)
	, i
	
	for (i = 0; i < indeks; ++i)
		haalKopAf(h)
	return haalKopAf(h)
}

function rHoopBo(n) {
	rHoop(n, hoop)
}

function rHoopOnder(n) {
	rHoop(n, hoopVanOnder)
}

function rHoop(n, f) {
	var r = []
	, i
	, h
	, t = (new Date()).getTime()
	, t1

	for (i = 0; i < n; ++i) {
		groei(r)
		h = f(r)
		if (i % 1000 === 0) {
			t1 = (new Date()).getTime()
			console.log('[' + i + '] ' + (t1 - t))
			t = t1
		}
	}
}

function rGroei(n) {
	var r = []
	, i
	, t = (new Date()).getTime()
	, t1

	for (i = 0; i < n; ++i) {
		groei(r)
		if (i % 1000 === 0) {
			t1 = (new Date()).getTime()
			console.log('[' + i + '] ' + (t1 - t))
			t = t1
		}
	}
}

function registreer(funksies) {
	console.log('')
	Object.keys(funksies).forEach(function (funksieNaam) {
		repl.context[funksieNaam] = funksies[funksieNaam].f
		console.log(funksies[funksieNaam].hulp)
	})
}

function groei(r) {
	r = r || []
	r.push(Math.round(Math.random()*(r.length+1)))
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

function hoopVanOnder(elemente) {
	var h = []
	, i

	elemente.forEach(function (el) {
		h.push(el)
	})
	for (i = h.length - 1; i >= 0; --i) {
		ruilAsKleinerAsKinders(h, i)
	}
	return h
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

function haalKopAf(h) {
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