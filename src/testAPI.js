let filter = false
let sort = false
let filteredData = []
let sortedData = []
let originalData = []
let randDate = ""

fetch('https://financialmodelingprep.com/api/v3/income-statement-as-reported/AAPL?period=annual&limit=50&apikey=tGQXLm7dzS9Ck7XKHBTHgd8vKWW8wRay')
.then(res => res.json())
.then(data => {
    data.forEach((item) => {
        randDate = item.date;
    });
})
console.log(randDate)
//if filter = true  display filteredData
//if sortedData = true display sortedData (use ...object to append to lists)
//if sort is clicked and filter = true sort filteredData (use .filter((item) => {return upper bound}))
//if filter is clicked and sort = true filter sortedData
//filter ranges - year, net income, revenue
//sort decending and ascending date, net income, revenue