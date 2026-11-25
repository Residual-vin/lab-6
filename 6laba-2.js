'use strict'
const fail = x => {
	throw new Error(`Помилка при обробці числа ${x}`)
}
const inc = x => ++x
const twice = x => x * 2
const cube = x => x ** 3
const compose = (...fns) => {
	const handlers = []
	const composed = value => {
		try {
			return fns.reduceRight((result, fn) => fn(result), value)
		} catch (error) {
			for (const handler of handlers) handler(error)
			return undefined
		}
	}
	composed.on = (event, handler) => {
		if (event === 'error' && typeof handler === 'function') {
			handlers.push(handler)
		}
		return composed
	}
	return composed
}
console.log(compose(inc, twice, cube)(4))
const f = compose(inc, twice, fail, cube)
f.on('error', error => console.log(error.message))
console.log(f(5))
