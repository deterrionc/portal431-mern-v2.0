import React from 'react'
import { connect } from 'react-redux'
import readXlsxFile from 'read-excel-file'
import { getClientOrders, storeClientOrders, storeClientNotification } from '../../../actions/admin'
import { formatDateAndTimeInPDT } from '../../../utils/formatDate1'
import { setAlert } from '../../../actions/alert'
import Spinner from '../../layout/Spinner'
import { totalNetProfit, totalNetProfitChange, totalGrossProfit, totalGrossProfitChange, totalSales, totalSalesChange, getTrendingItem, getMostSoldItem } from '../../../utils/storeStatistics'

const AdminClientStore = ({ clientID, getClientOrders, storeClientOrders, clientOrders, storeClientNotification, setAlert, isLoading }) => {
  React.useEffect(() => {
    getClientOrders(clientID)
  }, [getClientOrders, clientID])

  const fileInputW9Ref = React.useRef()

  const [excelFile, setExcelFile] = React.useState([])
  const [orders, setOrders] = React.useState([])
  const [notification, setNotification] = React.useState('')

  const excelToJson = file => {
    setExcelFile(excelFile)
    readXlsxFile(file).then((rows) => {
      var outRows = []
      rows.forEach((row, index) => {
        if (index < 3) return
        if (row[0] === null && row[0] === null) return
        var outRow = {
          date: row[0],
          product: row[1],
          amazonSalePrice: row[2],
          productCost: row[3],
          shippingCost: row[4],
          supplierTax: row[5],
          grossProfit: row[6],
          amazonFees: row[7],
          adminFees: row[8],
          netProfit: row[9],
          shipStatus: row[10],
          refunded: row[11],
          shipperName: row[12],
          walmartOrder: row[13],
          amazonOrderID: row[14],
          notes: row[15],
          amazonTax: row[16],
          returnLabelFees: row[17],
          amazonRefundAudit: row[18],
          amazonOrderIdTotalAudit: row[19],
          refundLabelAudit: row[20],
          adminFeeFormula: row[21],
        }
        outRows.push(outRow)
      })
      setOrders(outRows)
    })
  }

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
    <div className='admin-client-store'>
      {isLoading
        ?
        <Spinner />
        :
        <div className='mt-3'>
          <div className='p-3 bg-white rounded-lg'>
            <div className='h5'>
              Shop Management
            </div>
            <div className='text-right'>
              <button
                className='btn btn-light shadow mb-3'
                onClick={() => fileInputW9Ref.current.click()}
              >
                <i className='fa fa-cloud-upload mr-2'></i>
                Upload Spreadsheet
              </button>
              <button
                className='btn btn-light shadow mb-3 ml-3'
                style={{ display: orders.length ? 'inline-block' : 'none' }}
                onClick={() => {
                  storeClientOrders(clientID, orders)
                  setOrders([])
                }}
              >Submit</button>
              <input
                type='file'
                className='file excel-importer'
                id="excelImporter"
                onChange={e => excelToJson(e.target.files[0])}
                value={excelFile}
                ref={fileInputW9Ref}
                required
              />
            </div>
            <div className='table-responsive table-client-store'>
              <table className='table table-borderless'>
                <thead>
                  <tr>
                    <th>No</th>
                    <th className='min-width-1'>Date</th>
                    <th className='min-width-2'>Product</th>
                    <th>Amazon Sale Price</th>
                    <th>Product Cost</th>
                    <th>Shipping Cost</th>
                    <th>Supplier Tax</th>
                    <th>Gross Profit</th>
                    <th>Amazon Fees</th>
                    <th>Net Profit</th>
                    <th>Ship Status</th>
                    <th>Refunded</th>
                    <th>Shipper Name</th>
                    <th>Walmart Order</th>
                    <th>Amazon Order ID</th>
                    <th>Notes</th>
                    <th>Amazon Tax</th>
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
                      <td>{item.netProfit.toFixed(2)}</td>
                      <td>{item.shipStatus}</td>
                      <td>{item.refunded}</td>
                      <td>{item.shipperName}</td>
                      <td>{item.walmartOrder}</td>
                      <td>{item.amazonOrderID}</td>
                      <td>{item.notes}</td>
                      <td>{item.amazonTax.toFixed(2)}</td>
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
      }

      <div className='row'>
        <div className='col-lg-3'>
          <div className='p-3 bg-white rounded-lg mt-3'>
            <p>Notifications</p>
            <textarea
              className='form-control'
              onChange={e => setNotification(e.target.value)}
              value={notification}
            />
            <div className='text-center mt-4'>
              <button
                className='btn btn-sm btn-light shadow rounded-lg'
                onClick={() => {
                  if (notification.length) {
                    storeClientNotification(clientID, notification)
                    setNotification('')
                  } else {
                    setAlert('Notification Invalid!', 'warning')
                  }
                }}
              >Submit</button>
            </div>
          </div>
        </div>
        <div className='col-lg-3'>
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
        <div className='col-lg-3'>
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
        <div className='col-lg-3'>
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
  clientOrders: state.admin.adminClientOrders,
  isLoading: state.admin.isLoading
})

export default connect(mapStateToProps, { getClientOrders, storeClientOrders, storeClientNotification, setAlert })(AdminClientStore)