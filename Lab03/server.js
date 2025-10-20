const connect = require('connect');
const url = require('url');

const app = connect();

function calculate(req, res) {
    const query = url.parse(req.url, true).query;
    const method = query.method;
    const x = parseFloat(query.x);
    const y = parseFloat(query.y);

    if (isNaN(x) || isNaN(y)) {
        res.end("Error: x and y must be valid numbers.");
        return;
    }

    let result;
    let symbol;

    if (method === "add") {
        result = x + y;
        symbol = "+";
    } else if (method === "subtract") {
        result = x - y;
        symbol = "-";
    } else if (method === "multiply") {
        result = x * y;
        symbol = "*";
    } else if (method === "divide") {
        if (y === 0) {
            res.end("Error: Cannot divide by zero.");
            return;
        }
        result = x / y;
        symbol = "/";
    } else {
        res.end("Error: Invalid method. Use add, subtract, multiply, or divide.");
        return;
    }

    res.end(`${x} ${symbol} ${y} = ${result}`);
}

app.use('/lab2', calculate);

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/lab2");
});