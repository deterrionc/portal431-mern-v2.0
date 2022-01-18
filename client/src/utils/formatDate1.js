export const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2)
    month = '0' + month
  if (day.length < 2)
    day = '0' + day

  return [year, month, day].join('-')
}

export const formatDateTime = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),
    hour = String(d.getHours()),
    minute = String(d.getMinutes())

  if (month.length < 2)
    month = '0' + month
  if (day.length < 2)
    day = '0' + day
  if (hour.length < 2)
    hour = '0' + hour
  if (minute.length < 2)
    minute = '0' + minute

  return `${year}/${month}/${day} ${hour}:${minute}`
}


export const formatDateAndTimeInPDT = (date) => {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  var d = new Date(new Date(date).toLocaleString(undefined, {
    timeZone: 'America/Los_Angeles'
  })),
    month = d.getMonth(),
    date_ = '' + d.getDate(),
    year = d.getFullYear(),
    hour = d.getHours(),
    minute = d.getMinutes(),
    day = d.getDay()

  if (date.length < 2)
    date_ = '0' + date_

  var fullDate = `${days[day]}, ${months[month]} ${date_}, ${year}, ${hour}:${minute} PDT`

  return fullDate
}