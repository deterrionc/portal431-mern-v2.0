import React from 'react'
import { connect } from 'react-redux'
import { getClientOrders } from '../../actions/admin'
import { messagesRead } from '../../actions/message'
import { deleteNotification } from '../../actions/client'
import Chart from 'react-apexcharts'
import { getTotalSales, getClientChartOptions, getClientChartSeries } from '../../utils/clientCharts'
import { formatDateAndTimeInPDT, formatDate } from '../../utils/formatDate1'
import { totalNetProfit, totalNetProfitChange, totalGrossProfit, totalGrossProfitChange, totalSales, totalSalesChange, getTrendingItem, getMostSoldItem } from '../../utils/storeStatistics'
import { useHistory } from 'react-router'

const ClientStoreReport = ({ getClientOrders, clientID, clientOrders, notifications, deleteNotification, clientUnreadMessages, messagesRead }) => {
  const history = useHistory()

  React.useEffect(() => {
    getClientOrders(clientID)
  }, [getClientOrders, clientID])

  const [pageOrders, setPageOrders] = React.useState([])
  const [pageNumber, setPageNumber] = React.useState(1)
  const [maxPageNumber, setMaxPageNumber] = React.useState(1)

  React.useEffect(() => {
    setPageOrders(clientOrders.slice((pageNumber - 1) * 5, pageNumber * 5))
    setMaxPageNumber(Math.ceil(clientOrders.length / 5))
  }, [clientOrders, pageNumber])

  const nextPage = () => {
    if (pageNumber + 1 > maxPageNumber) {
      lastPage()
      return
    }
    setPageNumber(pageNumber + 1)
  }

  const prevPage = () => {
    if (pageNumber - 1 < 1) {
      firstPage()
      return
    }
    setPageNumber(pageNumber - 1)
  }

  const firstPage = () => {
    setPageNumber(1)
  }

  const lastPage = () => {
    setPageNumber(maxPageNumber)
  }

  return (
    <div className='admin-dashboard client-store-report'>
      <div className='h4 pt-2 pl-1'>
        Store Report
      </div>

      <div className='row pt-2'>
        <div className='col-lg-8'>
          <div className='bg-white m-1 mb-4 rounded-lg p-3 mixed-chart'>
            <h3 className='ml-3'>$ {getTotalSales(clientOrders).toFixed(2)}</h3>
            <Chart
              options={getClientChartOptions()}
              series={getClientChartSeries(clientOrders)}
              type='area'
              height='300px'
              width='100%'
            />
          </div>
        </div>
        <div className='col-lg-4'>
          <div className='bg-white m-1 mb-4 rounded-lg p-3' style={{ minHeight: '90%' }}>
            <div className='h5'>
              Notifications
            </div>
            <ul className='notification-list'>
              {notifications.map((item, index) =>
                <li key={index} className='notification-item p-1 mb-1'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div className='text-justify'>{item.content} <span className='text-secondary ml-3'>{formatDate(item.date)}</span></div>
                    <div><button onClick={() => deleteNotification(clientID, item._id)} className='btn btn-sm'><i className='fa fa-remove'></i></button></div>
                  </div>
                </li>
              )}
              {clientUnreadMessages > 0 ?
                <li className='notification-item p-1 mb-1' onClick={() => {
                  messagesRead(clientID)
                  history.push('/messages')
                }}>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div className='text-justify'>There are {clientUnreadMessages} new message(s).</div>
                    <div><button onClick={e => {
                      e.stopPropagation()
                      messagesRead(clientID)
                    }} className='btn btn-sm'><i className='fa fa-remove'></i></button></div>
                  </div>
                </li>
                : null}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <div className='bg-white m-1 mb-4 rounded-lg'>
          <div className='p-3 h5'>
            Customer Store Statistics
          </div>
          <div className='p-2'>
            <div className='table-responsive table-customer-store-statistics'>
              <table className='table table-borderless'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Date</th>
                    <th>Product</th>
                    <th>Amazon Sale Price</th>
                    <th>Product Cost</th>
                    <th>Shipping Cost</th>
                    <th>Supplier Tax</th>
                    <th>Gross Profit</th>
                    <th>Amazon Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {pageOrders.map((item, index) =>
                    <tr key={index} className='table-row-customer-store-statistics-round'>
                      <td>{index + 1}</td>
                      <td>{formatDateAndTimeInPDT(item.date)}</td>
                      <td>{item.product}</td>
                      <td>{item.amazonSalePrice.toFixed(2)}</td>
                      <td>{item.productCost.toFixed(2)}</td>
                      <td>{item.shippingCost.toFixed(2)}</td>
                      <td>{item.supplierTax.toFixed(2)}</td>
                      <td>{item.grossProfit.toFixed(2)}</td>
                      <td>{item.amazonFees.toFixed(2)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className='text-center'>
                {(pageNumber - 1) * 5 + 1} - {(pageNumber - 1) * 5 + pageOrders.length} of {clientOrders.length}
              </div>
              <div className='text-center pb-2'>
                <button className='btn btn-sm' onClick={() => firstPage()}>
                  <i className="material-icons">first_page</i>
                </button>
                <button className='btn btn-sm' onClick={() => prevPage()}>
                  <i className="material-icons">navigate_before</i>
                </button>
                <button className='btn btn-sm' onClick={() => nextPage()}>
                  <i className="material-icons">navigate_next</i>
                </button>
                <button className='btn btn-sm' onClick={() => lastPage()}>
                  <i className="material-icons">last_page</i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-lg-4'>
          <div className='p-3 bg-white rounded-lg mt-3'>
            <div className='d-flex align-items-center'>
              <div className='border border-4 border-light-green rounded-circle text-center mr-2 p-2'>
                <i className='fa fa-shopping-cart' style={{ fontSize: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div className='h6'>Store Status</div>
                <div className='h5'>Really Good</div>
              </div>
            </div>
          </div>
          <div className='p-3 bg-white rounded-lg mt-3'>
            <div className='d-flex align-items-center'>
              <div className='border rounded-circle text-center mr-2 p-2'>
                <i className='fa fa-shopping-cart' style={{ fontSize: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div>Net Profit</div>
                <div className='h6'>$ {totalNetProfit(clientOrders)}</div>
                {totalNetProfitChange(clientOrders) > 0
                  ?
                  <small className='text-success'><i className='fa fa-arrow-up'></i> {totalNetProfitChange(clientOrders)}% Since last month</small>
                  :
                  <small className='text-danger'><i className='fa fa-arrow-down'></i> {totalNetProfitChange(clientOrders)}% Since last month</small>
                }
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4'>
          <div className='p-3 bg-white rounded-lg mt-3'>
            <div className='d-flex align-items-center'>
              <div className='border rounded-circle text-center mr-2 p-2'>
                <i className='fa fa-shopping-cart' style={{ fontSize: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div className='h6'>Trending Item</div>
                <div style={{
                  textOverflow: 'ellipsis',
                  height: '45px',
                  overflow: 'hidden'
                }}>{getTrendingItem(clientOrders)}</div>
              </div>
            </div>
          </div>
          <div className='p-3 bg-white rounded-lg mt-3'>
            <div className='d-flex align-items-center'>
              <div className='border rounded-circle text-center mr-2 p-2'>
                <i className='fa fa-shopping-cart' style={{ fontSize: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div>Gross Profit</div>
                <div className='h6'>$ {totalGrossProfit(clientOrders)}</div>
                {totalGrossProfitChange(clientOrders) > 0
                  ?
                  <small className='text-success'><i className='fa fa-arrow-up'></i> {totalGrossProfitChange(clientOrders)}% Since last month</small>
                  :
                  <small className='text-danger'><i className='fa fa-arrow-down'></i> {totalGrossProfitChange(clientOrders)}% Since last month</small>
                }
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4'>
          <div className='p-3 bg-white rounded-lg mt-3'>
            <div className='d-flex align-items-center'>
              <div className='border rounded-circle text-center mr-2 p-2'>
                <i className='fa fa-bullhorn' style={{ fontSize: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div className='h6'>Most Sold Item</div>
                <div style={{
                  textOverflow: 'ellipsis',
                  height: '45px',
                  overflow: 'hidden'
                }}>{getMostSoldItem(clientOrders)}</div>
              </div>
            </div>
          </div>
          <div className='p-3 bg-white rounded-lg mt-3'>
            <div className='d-flex align-items-center'>
              <div className='border rounded-circle text-center mr-2 p-2'>
                <i className='fa fa-bullhorn' style={{ fontSize: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div>Total Sales</div>
                <div className='h6'>$ {totalSales(clientOrders)}</div>
                {totalSalesChange(clientOrders) > 0
                  ?
                  <small className='text-success'><i className='fa fa-arrow-up'></i> {totalSalesChange(clientOrders)}% Since last month</small>
                  :
                  <small className='text-danger'><i className='fa fa-arrow-down'></i> {totalSalesChange(clientOrders)}% Since last month</small>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  clientID: state.auth.user._id,
  clientOrders: state.admin.adminClientOrders,
  notifications: state.client.notifications,
  clientUnreadMessages: state.message.clientUnreadMessages
})

export default connect(mapStateToProps, { getClientOrders, deleteNotification, messagesRead })(ClientStoreReport)