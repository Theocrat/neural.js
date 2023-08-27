// This extremely ugly file ports some built-in methods from Python, which
// Python programmers like me take for granted when designing mathematical 
// and statistical modules using Lambda Calculus
//
// The user will forgive this insolent author for being lazy and not defining
// the ported functions to have their full potential. I have only implemented
// the basic functionalities. Python built-in functions with variadic argument
// signatures are implemented here with support only for their most commonly
// used signatures

// 1. `range(limit)`: Implements `range` method of Python for a single argument
//    Arguments:
//      - `limit`: Integer - represents how wide a range we want
//    Returns: Array of integers starting from 0 and ending at `(limit - 1)`
exports.range = limit => [...Array(limit).keys()]

// 2. `indices(arr)`: Implements a helper function to return the array's keys
//    Arguments:
//      - `arr`: Array containing basically anything (it doesn't matter)
//    Returns: Array containing integers which are the indices of the members 
//             of `arr` in the `arr` array
exports.indices = arr => exports.range(arr.length)

// 3. `zip(a1, a2)`: Implements the `zip` method of Python for two arguments
//    Arguments: 
//      - `a1`: An array
//      - `a2`: Another array, of the same length as `a1`
//    Returns: Array, the ith member of which is itself a two-member array
//             containing the ith members of `a1` and `a2` respectively
exports.zip = (a1, a2) => exports.indices(a1).map(i => [a1[i], a2[i]])

// 4. `enumerate(arr)`: Implements the built-in `enumerate` method of Python
//    Arguments: 
//      - `arr`: An array
//    Returns: Array, the ith member of which is itself a two-member array
//             containing i and the ith member of the array `arr`
exports.enumerate = arr => exports.zip(exports.indices(arr), arr)

// 3. `product(a1, a2)`: Implements the `itertools.product` method of Python
//    Arguments: 
//      - `a1`: An array
//      - `a2`: Another array, of any length (need not be the same as a1)
//    Returns: Array, containing all possible ordered pairs which can be formed
//             where the first member belongs to `a1` and the second member to
//             `a2` --> in math, we call this the Cross Product. Physicists call
//             it the Tensor Product, but they're just trying to sound smart.
exports.product = (a1, a2) => exports.range(a1.length * a2.length).map(i => [a1[Math.floor(i / a1.length)], a2[i % a1.length]])

// 4. `random(length)`: One-dimensional implementation of `numpy.random` in Python
//    Arguments:
//      - `length`: An integer, telling the function how long a random array you want
//    Returns: Array, containing `length` elements which are all random real numbers
//             in the range [0, 1), of `double` datatype
exports.random = length => [...Array(length).keys()].map(_ => Math.random())
