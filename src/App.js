/*
Cole Na
cna1@umbc.edu
1/10/25
Description: code for ValueGlance intern assignment. It takes data from an API, gives sorting and filtering options,
and displays the API data.
*/

import React, { useState, useEffect} from "react"

import './App.css'



function App() {
  let APIurl = 'https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=<api_key>'
  const [originalData, setOriginalData] = useState([])
  const [dataShown, setDataShown] = useState([])

  const [filter, setFilter] = useState(0) //0:no filter 1:date, 2:revenue, 3:net income
  const [filterMin, setFilterMin] = useState(0)
  const [filterMax, setFilterMax] = useState(0)

  const [sort, setSort] = useState(0) //0:no filter 1:date, 2:revenue, 3:net income
  const [sortOrder, setSortOrder] = useState(0) //'increasing' or 'decreasing' 0 when not sorting

  //after clicking filter, this will be ran and change what is displayed
  const updateGraphDisplayFilter = () => {
    let updatedData = []

    if(sort === 0){
      updatedData = [...originalData]
    }else{
      updatedData = [...dataShown]
    }
    //logic for filtering
    if(filter === '1'){ //date
      updatedData = updatedData.filter((instance) => {
        const instanceYear = new Date(instance.date).getFullYear()
        return instanceYear >= filterMin && instanceYear <= filterMax
      })
    }else if (filter === '2'){ //revenue
      updatedData = updatedData.filter(instance => (instance.revenue >= filterMin) && (instance.revenue <= filterMax))
    }else if (filter === '3'){ //net income
      updatedData = updatedData.filter(instance => (instance.netIncome >= filterMin) && (instance.netIncome <= filterMax))
    }
    setDataShown(updatedData)
  }

  //after clicking filter, this will be ran and change what is displayed
  const updateGraphDisplaySort = () => {
    let updatedData = []
    if(filter === 0){
      updatedData = [...originalData]
    }else{
      updatedData = [...dataShown]
    }
    let temporaryData = updatedData
    //logic for sorting
    if(sort === '1'){ //date
      if(sortOrder === 'increasing'){ //increasing
        updatedData = temporaryData.sort((a,b) => new Date(a.date) - new Date(b.date))
      }else{
        updatedData = temporaryData.sort((a,b) => new Date(b.date) - new Date(a.date))
      }
    }else if (sort === '2'){ //revenue
      if(sortOrder === 'increasing'){ //increasing
        updatedData = temporaryData.sort((a,b) => a.revenue - b.revenue)
      }else{
        updatedData = temporaryData.sort((a,b) => b.revenue - a.revenue)
      }
    }else if (sort === '3'){ //net income
      if(sortOrder === 'increasing'){ //increasing
        updatedData = temporaryData.sort((a,b) => a.netIncome - b.netIncome)
      }else{
        updatedData = temporaryData.sort((a,b) => b.netIncome - a.netIncome)
      }
    }
    setDataShown(updatedData)
  }

  //clears filter but if sorting it keeps the sort
  const clearFilter = () => {
    let updatedData = [...originalData]
    setFilter(0)
    setFilterMin(0)
    setFilterMax(0)
    if(sort === 0){
      setDataShown(updatedData)
    }else{
      let temporaryData = updatedData
      //logic for sorting
      if(sort === '1'){ //date
        if(sortOrder === 'increasing'){ //increasing
          updatedData = temporaryData.sort((a,b) => new Date(a.date) - new Date(b.date))
        }else{
          updatedData = temporaryData.sort((a,b) => new Date(b.date) - new Date(a.date))
        }
      }else if (sort === '2'){ //revenue
        if(sortOrder === 'increasing'){ //increasing
          updatedData = temporaryData.sort((a,b) => a.revenue - b.revenue)
        }else{
          updatedData = temporaryData.sort((a,b) => b.revenue - a.revenue)
        }
      }else if (sort === '3'){ //net income
        if(sortOrder === 'increasing'){ //increasing
          updatedData = temporaryData.sort((a,b) => a.netIncome - b.netIncome)
        }else{
          updatedData = temporaryData.sort((a,b) => b.netIncome - a.netIncome)
        }
      }
      setDataShown(updatedData)
    }
  }

  //clears sort but if filtering it keeps the filter
  const clearSort = () => {
    let updatedData = [...originalData]
    setSort(0)
    setSortOrder(0)
    if(filter === 0){
      setDataShown(updatedData)
    }else{
      if(filter === '1'){ //date
        updatedData = updatedData.filter((instance) => {
          const instanceYear = new Date(instance.date).getFullYear()
          return instanceYear >= filterMin && instanceYear <= filterMax
        })
      }else if (filter === '2'){ //revenue
        updatedData = updatedData.filter(instance => (instance.revenue >= filterMin) && (instance.revenue <= filterMax))
      }else if (filter === '3'){ //net income
        updatedData = updatedData.filter(instance => (instance.netIncome >= filterMin) && (instance.netIncome <= filterMax))
      }
      setDataShown(updatedData)
    }
  }

  //retrieve data from API
  useEffect(() => {
    fetch(APIurl)
    .then(res => res.json())
    .then(apiData => {
      setOriginalData(apiData)
    }, [])
  })

  //------------------------------------------------------Testing code
  /*
  useEffect(() => {
  let array = [{"date": "2022-09-24", "revenuefromcontractwithcustomerexcludingassessedtax": 516199000000, "grossprofit": 170782000000, "operatingincomeloss": 119437000000, "netincomeloss": 616199000000, "earningspersharebasic": 6.15,"earningspersharediluted": 6.11}, 
    {"date": "2022-12-24", "revenuefromcontractwithcustomerexcludingassessedtax": 416199000000, "grossprofit": 270782000000, "operatingincomeloss": 113437000000, "netincomeloss": 506199000000, "earningspersharebasic": 6.15,"earningspersharediluted": 6.12},
    {"date": "2021-09-24", "revenuefromcontractwithcustomerexcludingassessedtax": 616199000000, "grossprofit": 190782000000, "operatingincomeloss": 129437000000, "netincomeloss": 416199000000, "earningspersharebasic": 6.15,"earningspersharediluted": 7.11}
  ]
  setOriginalData(array)
  }, [])
  */
  //------------------------------------------------------
  useEffect(() => {
    setDataShown(originalData)
  }, [originalData])

    return (
      <div className="App bg-gray-900 min-h-screen p-6">
      <header className="bg-gray-900 shadow-md rounded-lg p-6 max-w-4xl mx-auto">

        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div className="p-6 bg-gray-700 shadow-md rounded-md">
    <h2 className="text-2xl font-semibold mb-4 text-gray-100">Filter Functions</h2>
    <div className="space-y-2">
      <label className="flex items-center text-gray-100">
        <input
          type="radio"
          name="filter"
          value="1"
          checked={filter === "1"}
          onChange={(e) => setFilter(e.target.value)}
          className="mr-2"
        />
        Filter By Date
      </label>
      <label className="flex items-center text-gray-100">
        <input
          type="radio"
          name="filter"
          value="2"
          checked={filter === "2"}
          onChange={(e) => setFilter(e.target.value)}
          className="mr-2"
        />
        Filter By Revenue
      </label>
      <label className="flex items-center text-gray-100">
        <input
          type="radio"
          name="filter"
          value="3"
          checked={filter === "3"}
          onChange={(e) => setFilter(e.target.value)}
          className="mr-2"
        />
        Filter By Income
      </label>
    </div>
    <div className="mt-4">
      <label className="block mb-2">
        <span className="text-base font-medium text-gray-100">Maximum</span>
        <input
          type="number"
          value={filterMax}
          onChange={(e) => setFilterMax(e.target.value)}
          className="w-full mt-1 border rounded-md p-2"
        />
      </label>
      <label className="block mb-4">
        <span className="text-base font-medium text-gray-100">Minimum</span>
        <input
          type="number"
          value={filterMin}
          onChange={(e) => setFilterMin(e.target.value)}
          className="w-full mt-1 border rounded-md p-2"
        />
      </label>
    </div>
    <div className="flex justify-between space-x-2">
      <button
        onClick={updateGraphDisplayFilter}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Apply Filter
      </button>
      <button
        onClick={clearFilter}
        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
      >
        Clear Filter
      </button>
    </div>
  </div>

  {/* Sort Section */}
  <div className="p-6 bg-gray-700 shadow-md rounded-md">
  <h2 className="text-2xl font-semibold mb-4 text-gray-100">Sort Functions</h2>
  <div className="space-y-2">
    <label className="flex items-center text-gray-100">
      <input
        type="radio"
        name="sort"
        value="1"
        checked={sort === "1"}
        onChange={(e) => setSort(e.target.value)}
        className="mr-2"
      />
      Sort By Date
    </label>
    <label className="flex items-center text-gray-100">
      <input
        type="radio"
        name="sort"
        value="2"
        checked={sort === "2"}
        onChange={(e) => setSort(e.target.value)}
        className="mr-2"
      />
      Sort By Revenue
    </label>
    <label className="flex items-center text-gray-100">
      <input
        type="radio"
        name="sort"
        value="3"
        checked={sort === "3"}
        onChange={(e) => setSort(e.target.value)}
        className="mr-2"
      />
      Sort By Income
    </label>
  </div>
  <div className="mt-12">
    <h3 className="text-lg font-medium mb-2 text-gray-100">Sort Order</h3>
    <label className="flex items-center text-gray-100">
      <input
        type="radio"
        name="order"
        value="increasing"
        checked={sortOrder === "increasing"}
        onChange={(e) => setSortOrder(e.target.value)}
        className="mr-2"
      />
      Increasing
    </label>
    <label className="flex items-center text-gray-100">
      <input
        type="radio"
        name="order"
        value="decreasing"
        checked={sortOrder === "decreasing"}
        onChange={(e) => setSortOrder(e.target.value)}
        className="mr-2"
      />
      Decreasing
    </label>
  </div>
  <div className="flex justify-between space-x-2 mt-12">
    <button
      onClick={updateGraphDisplaySort}
      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
    >
      Apply Sort
    </button>

    <button
      onClick={clearSort}
      className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 "
    >
      Clear Sort
    </button>
  </div>
</div>
</div>

{/*graph*/}
<div className="overflow-x-auto mt-6">
  <table className="min-w-full bg-gray-800 text-gray-100 rounded-lg">
    <thead className="bg-gray-700 text-sm uppercase font-semibold">
      <tr>
        <th className="py-3 px-4 text-left">Date</th>
        <th className="py-3 px-4 text-left">Revenue</th>
        <th className="py-3 px-4 text-left">Gross Profit</th>
        <th className="py-3 px-4 text-left">Operating Income</th>
        <th className="py-3 px-4 text-left">Net Income</th>
        <th className="py-3 px-4 text-left">EPS Basic</th>
        <th className="py-3 px-4 text-left">EPS Diluted</th>
      </tr>
    </thead>
    <tbody>
      {dataShown.map((instance, index) => (
        <tr
          key={index}
          className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}
        >
          <td className="py-2 px-4">{instance.date}</td>
          <td className="py-2 px-4">{instance.revenue.toLocaleString()}</td>
          <td className="py-2 px-4">{instance.grossProfit.toLocaleString()}</td>
          <td className="py-2 px-4">{instance.operatingIncome.toLocaleString()}</td>
          <td className="py-2 px-4">{instance.netIncome.toLocaleString()}</td>
          <td className="py-2 px-4">{instance.eps}</td>
          <td className="py-2 px-4">{instance.epsdiluted}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        </header>
      </div>
    )
  }

export default App;