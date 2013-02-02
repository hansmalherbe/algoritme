var repl = require('repl').start({
	useGlobal: true
})
repl.context.rFibbonacci = rFibbonacci
repl.context.rrFibbonacci = rrFibbonacci
repl.context.dFibbonacci = dFibbonacci
repl.context.rdFibbonacci = rdFibbonacci
return

function rrFibbonacci(n) {
	var i
	for (i = 0; i < n; ++i)
		console.log('[' + i + '] ' + rFibbonacci(i))
	return i
}
function rFibbonacci(n) {
	if (n === 0)
		return 0
	if (n === 1)
		return 1
	return rFibbonacci(n-1) + rFibbonacci(n-2)
}

function rdFibbonacci(n) {
	var i
	for (i = 0; i < n; ++i)
		console.log('[' + i + '] ' + dFibbonacci(i))
	return i
}
function dFibbonacci(n) {
	var i0 = 0
	, i1 = 1
	, i = 1
	, i2

	if (n === 0)
		return 0
	if (n === 1)
		return 1
	while (i < n) {
		i2 = i1 + i0
		i0 = i1
		i1 = i2
		++i
	}
	return i2
}