'use strict'
const pipe = (...fns) => {
	for (const fn of fns) {
		if (typeof fn !== 'function') {
			throw new TypeError('pipe очікує тільки функції')
		}
	}
	return x => fns.reduce((result, fn) => fn(result), x)
}
const inc = x => ++x
const twice = x => x * 2
const cube = x => x ** 3
console.log(pipe(inc, twice, cube)(5))
console.log(pipe(inc, inc)(7))

