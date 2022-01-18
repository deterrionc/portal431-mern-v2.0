export const ordersThisMonth = orders => {
  var today = new Date()
  var dayBeforeOneMonth = today - 2628000000
  var ordersThisMonth = []
  orders.forEach(order => {
    if (new Date(order.date) - dayBeforeOneMonth > 0) {
      ordersThisMonth.push(order)
    }
  })
  return ordersThisMonth
}

export const ordersLastMonth = orders => {
  var today = new Date()
  var dayBeforeOneMonth = today - 2628000000
  var dayBeforeTwoMonths = today - 5256000000
  var ordersLastMonth = []
  orders.forEach(order => {
    if (new Date(order.date) - dayBeforeTwoMonths > 0 && dayBeforeOneMonth - new Date(order.date) > 0) {
      ordersLastMonth.push(order)
    }
  })
  return ordersLastMonth
}

export const totalNetProfit = orders => {
  var totalNetProfit = 0
  orders.forEach(order => {
    totalNetProfit += order.netProfit
  })
  return Math.abs(totalNetProfit.toFixed(2))
}

export const totalNetProfitChange = orders => {
  if (totalNetProfit(ordersThisMonth(orders)) === 0) return 0

  var change = (1 - totalNetProfit(ordersLastMonth(orders)) / totalNetProfit(ordersThisMonth(orders))) * 100
  change = change.toFixed(2)

  return change
}

export const totalGrossProfit = orders => {
  var totalGrossProfit = 0
  orders.forEach(order => {
    totalGrossProfit += order.grossProfit
  })
  return Math.abs(totalGrossProfit.toFixed(2))
}

export const totalGrossProfitChange = orders => {
  if (totalGrossProfit(ordersThisMonth(orders)) === 0) return 0

  var change = (1 - totalGrossProfit(ordersLastMonth(orders)) / totalGrossProfit(ordersThisMonth(orders))) * 100
  change = change.toFixed(2)

  return change
}

export const totalSales = orders => {
  var totalSales = 0
  orders.forEach(order => {
    totalSales += order.amazonSalePrice
  })
  return Math.abs(totalSales.toFixed(2))
}

export const totalSalesChange = orders => {
  if (totalSales(ordersThisMonth(orders)) === 0) return 0

  var change = (1 - totalSales(ordersLastMonth(orders)) / totalSales(ordersThisMonth(orders))) * 100
  change = change.toFixed(2)

  return change
}

export const getTrendingItem = orders => {
  var sameProductNameOrderArrayObject = orders.reduce(function (r, a) {
    r[a.product] = r[a.product] || []
    r[a.product].push(a)
    return r
  }, Object.create(null))

  var mostAppearedProductArray = sameProductNameOrderArrayObject[Object.keys(sameProductNameOrderArrayObject)[0]]
  var mostAppearedProductName = Object.keys(sameProductNameOrderArrayObject)[0]

  Object.keys(sameProductNameOrderArrayObject).forEach(function (key) {
    if (sameProductNameOrderArrayObject[key].length > mostAppearedProductArray.length) {
      mostAppearedProductArray = sameProductNameOrderArrayObject[key]
      mostAppearedProductName = key
    }
  })

  return mostAppearedProductName
}

export const getMostSoldItem = orders => {
  var sameProductNameOrderArrayObject = orders.reduce(function (r, a) {
    r[a.product] = r[a.product] || []
    r[a.product].push(a)
    return r
  }, Object.create(null))

  var leastAppearedProductArray = sameProductNameOrderArrayObject[Object.keys(sameProductNameOrderArrayObject)[0]]
  var leastAppearedProductName = Object.keys(sameProductNameOrderArrayObject)[0]

  Object.keys(sameProductNameOrderArrayObject).forEach(function (key) {
    if (sameProductNameOrderArrayObject[key].length < leastAppearedProductArray.length) {
      leastAppearedProductArray = sameProductNameOrderArrayObject[key]
      leastAppearedProductName = key
    }
  })

  return leastAppearedProductName
}