import { formatDate } from './formatDate1'
import { totalSales } from './storeStatistics'

export const getMonthlyLandmarks = () => {
  var monthlyLandmarks = []
  var today = new Date()
  var monthlyInterval = 2628000000
  for (var index = 0; index < 6; index++) {
    var targetDay = today - monthlyInterval * index
    monthlyLandmarks.unshift(targetDay)
  }
  return monthlyLandmarks
}

export const getTotalSales = clients => {
  var orders = []

  clients.forEach(client => {
    client.orders.forEach(order => {
      orders.push(order)
    })
  })

  return totalSales(orders)
}

export const getAdminChartOptions = () => {
  var categories = []
  var monthlyLandmarks = getMonthlyLandmarks()

  for (var index = 0; index < monthlyLandmarks.length; index++) {
    categories.push(formatDate(monthlyLandmarks[index]))
  }

  return {
    dataLabels: {
      enabled: true
    },
    xaxis: {
      type: 'date',
      categories: categories
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy'
      },
    },
  }
}

export const getAdminChartSeries = (clients) => {
  var monthlyLandmarks = getMonthlyLandmarks()
  var orders = []

  clients.forEach(client => {
    client.orders.forEach(order => {
      orders.push(order)
    })
  })

  var monthlyOrders = []

  for (var monthIndex = 0; monthIndex < monthlyLandmarks.length; monthIndex++) {
    var newArray = []
    monthlyOrders.push(newArray)
  }

  for (var orderIndex = 0; orderIndex < orders.length; orderIndex++) {
    var order = orders[orderIndex]
    for (monthIndex = 0; monthIndex < monthlyLandmarks.length; monthIndex++) {
      if (new Date(order.date) < monthlyLandmarks[monthIndex] && new Date(order.date) > monthlyLandmarks[monthIndex - 1]) {
        monthlyOrders[monthIndex].push(order)
      }
    }
  }

  var monthlyTotalSales = []

  monthlyOrders.forEach(ordersByMonth => {
    monthlyTotalSales.push(totalSales(ordersByMonth))
  })

  return [
    {
      name: 'Monthly Sales',
      data: monthlyTotalSales
    }
  ]
}