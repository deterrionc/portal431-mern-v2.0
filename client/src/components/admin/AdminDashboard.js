import React from 'react'
import { connect } from 'react-redux'
import Chart from 'react-apexcharts'
import { getAdminClients, goPage } from '../../actions/admin'
import { useHistory } from 'react-router'
import { totalNetProfit, totalGrossProfit, totalSales, totalSalesChange } from '../../utils/storeStatistics'
import { getTotalSales, getAdminChartOptions, getAdminChartSeries } from '../../utils/adminChart'

const AdminDashboard = ({ getAdminClients, clients, goPage }) => {
  const history = useHistory()

  React.useEffect(() => {
    getAdminClients()
  }, [getAdminClients])

  const [searchKey, setSearchKey] = React.useState('')
  const [showClients, setShowClients] = React.useState([])

  React.useEffect(() => {
    setShowClients(clients.filter(client => client.firstName.toLowerCase().includes(searchKey.toLowerCase()) || client.lastName.toLowerCase().includes(searchKey.toLowerCase())))
  }, [clients, searchKey])

  return (
    <div className='admin-dashboard'>
      <div className='h4 pt-2 pl-1'>
        Admin Dashboard
      </div>
      <div className='row'>
        <div className='col-lg-3'>
          <div className='bg-white m-1 mb-4 rounded-lg'>
            <div className='p-2'>
              <div className='h-auto border rounded-lg'>
                <span>
                  <i className='fa fa-search mx-2'></i>
                  <input
                    placeholder='Search'
                    className='border border-0'
                    style={{ outline: 'none', width: '70%' }}
                    value={searchKey}
                    onChange={e => setSearchKey(e.target.value)}
                  />
                </span>
              </div>
            </div>
            <div className='px-2 h5'>
              Client List
            </div>
            <div className='p-2'>
              {showClients.map((item, index) =>
                <div key={index} onClick={() => goPage(history, `client/${item._id}`)} className='d-flex align-items-center p-1 rounded mb-1 link-item'>
                  <img src={item.avatar} alt='userAvatar' className='rounded-circle mr-2' width='40px' />
                  <div style={{ lineHeight: '1' }}>
                    <div>{`${item.firstName} ${item.lastName}`}</div>
                    <small className='text-muted text-break'>{item.email}</small>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='col-lg-9'>
          <div className='bg-white m-1 mb-4 rounded-lg p-3 mixed-chart'>
            <h3 className='ml-3'>$ {getTotalSales(clients).toFixed(2)}</h3>
            <Chart
              options={getAdminChartOptions()}
              series={getAdminChartSeries(clients)}
              type='area'
              height='300px'
              width='100%'
            />
          </div>
          <div className='bg-white m-1 mb-4 rounded-lg'>
            <div className='p-3 h5'>
              Client Store Statistics
            </div>

            <div className='p-2'>
              <div className='table-responsive table-customer-store-statistics'>
                <table className='table table-borderless'>
                  <thead>
                    <tr>
                      <th>Client Name</th>
                      <th>Net Profit</th>
                      <th>Gross Profit</th>
                      <th>Total # Sales</th>
                      <th>Total Sales</th>
                      <th>Store Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((item, index) =>
                      <tr key={index} className='table-row-customer-store-statistics-round'>
                        <td>{`${item.firstName} ${item.lastName}`}</td>
                        <td>$ {totalNetProfit(item.orders)}</td>
                        <td>$ {totalGrossProfit(item.orders)}</td>
                        <td>{item.orders.length}</td>
                        <td>$ {totalSales(item.orders)}</td>
                        <td className='have-length'>
                          {totalSalesChange(item.orders) > 0
                            ?
                            <small className='text-success'><i className='fa fa-arrow-up'></i> {totalSalesChange(item.orders)}% Since last month</small>
                            :
                            <small className='text-danger'><i className='fa fa-arrow-down'></i> {totalSalesChange(item.orders)}% Since last month</small>
                          }
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  clients: state.admin.clients
})

export default connect(mapStateToProps, { getAdminClients, goPage })(AdminDashboard)