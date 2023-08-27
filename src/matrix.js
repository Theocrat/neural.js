const py = require(".\\py")

exports.Matrix = class {
    // A class to hold the data inside a matrix.
    // An object of this class, for all intents and purposes, can be
    // considered to be a matrix, as understood in Linear Algebra
    constructor(data) {
        // Arguments: nested Array containing elements of the matrix
        // Constructs a matrix with the information inside the nested array
        this.nrows = data.length
        this.ncols = data[0].length
        this.data  = data.reduce((x, y) => [...x, ...y], [])
    }

    shape() {
        // Returns: Array of two members containing the dimensions of
        //          the matrix, in the order of (#rows, #columns)
        return [this.nrows, this.ncols]
    }

    at(row, col) {
        // Arguments: Row and Column indices of a specific element in
        //            the array, which we wish to read or modify
        // Returns: An object with two methods - `get` for reading the
        //          value at the desired position and `set` for modifying
        //          that value.
        // Usage: matrix.at(row, col).get() --> Returns the value at (row, col)
        //        matrix.at(row, col).set(v) --> Sets the (row, col) position
        //                                       element to the value `v`
        return {
            get: () => this.data[ this.ncols * row + col ],
            set: (value) => {this.data [this.ncols * row + col] = value}
        }
    }

    toString() {
        // Returns: Multiline string representation of the matrix.
        // TODO: Proper formatting and spacing, not just tabs
        let rows = py.range(this.nrows).map(i => this.data.slice(this.ncols * i, this.ncols * i + this.ncols))
        let row_text = rows.map(row => "|" + row.join(",\t") + "|")
        return "\n" + row_text.join("\n") + "\n"
    }

    valueOf() {
        // Returns: Nested array containing the elements of the matrix, in case
        //          you want to loop through it using a nested for loop or something
        return py.range(this.nrows).map(i => this.data.slice(this.ncols * i, this.ncols * i + this.ncols))
    }

    add(other) {
        // Matrix Addition, as they taught in high school math class
        // Argument: Another matrix object
        // Returns: Sum of the matrix in the argument and the matrix to which
        //          this bound method is encapsulated --> type: Matrix object
        let result = new exports.Matrix(this.valueOf())
        py.indices(result.data).forEach(i => {
            result.data[i] = this.data[i] + other.data[i]            
        })
        return result
    }

    multiply(other) {
        // Matrix Multiplication, as they taught in high school math class
        // Argument: Another matrix object
        // Returns: Product of the matrix in the argument and the matrix to
        //          which this bound method is encapsulated --> type: Matrix object
        let result = py.range(this.nrows).map(_ => py.range(other.ncols).map(_ => 0))
        for(let row = 0; row < this.nrows; row++) {
            for(let col = 0; col < other.ncols; col++) {
                let lmatrix_row = this.valueOf()[row]
                let rmatrix_col = other.valueOf().map(_ => _[col])
                let products = py.zip(lmatrix_row, rmatrix_col).map(values => values[0] * values[1])
                result[row][col] = products.reduce((x, y) => (x + y), 0)
            }
        }
        return new exports.Matrix(result)
    }

    transpose() {
        // Transpose of the matrix, as they taught in high school mathematics
        // Returns: Matrix object containing the transpose of this matrix object
        let result = py.range(this.ncols).map(_ => py.range(this.nrows).map(_ => 0))
        let values = this.valueOf()
        for (let row = 0; row < this.nrows; row++) {
            for (let col = 0; col < this.ncols; col++) {
                result[col][row] = values[row][col]
            }
        }
        return new exports.Matrix(result)
    }

    zerosLike() {
        // Returns a matrix of the same dimensions as this one, but the elements of
        // that matrix are all zeros
        let zeros = py.range(this.nrows).map(_ => py.range(this.ncols).map(_ => 0))
        return new exports.Matrix(zeros)
    }

    copy() {
        // Returns a copy of this matrix object. Relevant since the `set`
        // method of the object returned by the `at` method allows state
        // mutation, and sometimes we are very wary of that
        return new exports.Matrix( this.valueOf() )
    }
}


exports.randomMatrix = function(nrows, ncols) {
    // Method for returning a matrix of random elements in [0, 1)
    // Arguments:
    //   - `nrows`: Integer, number of rows of the random matrix
    //   - `ncols`: Integer, number of columns of the random matrix
    // Returns: Matrix object containing a matrix of `nrows` rows and `ncols` columns
    let randomData = py.range(nrows).map(_ => py.range(ncols).map(_ => Math.random()))
    return new exports.Matrix(randomData)
}

exports.zeroMatrix = class {
    // Method for returning a matrix of only zeros as its elements
    // Arguments:
    //   - `nrows`: Integer, number of rows of the zero matrix
    //   - `ncols`: Integer, number of columns of the zero matrix
    // Returns: Matrix object containing a matrix of `nrows` rows and `ncols` columns
    constructor(nrows, ncols) {
        let zeroData = py.range(nrows).map(_ => py.range(ncols).map(_ => 0))
        return new exports.Matrix(zeroData)
    }
}
