import React from 'react'
import { connect } from 'react-redux'
import soccerBall from '../../img/common/soccerBall.png'
import DeniReactTreeView from 'deni-react-treeview'

const ClientStoreManagement = () => {
  const fruitsAndVegetables = [
    {
      id: 100,
      text: 'Audio',
      children: [
        {
          id: 101,
          text: 'HeadPhones',
        },
        {
          id: 102,
          text: 'Computer Speakers',
          isLeaf: true
        },
        {
          id: 103,
          text: 'Bluetooth Speakers',
          isLeaf: true
        },
        {
          id: 104,
          text: 'Audio Cables',
          isLeaf: true
        },
      ]
    },
    {
      id: 200,
      text: 'Cameras',
      children: [
        {
          id: 201,
          text: 'Carrot',
          isLeaf: true
        },
      ]
    },
    {
      id: 300,
      text: 'Batteries',
      children: [
        {

        }
      ]
    },
    {
      id: 400,
      text: 'Office Equipment',
      children: [
        {

        }
      ]
    },
    {
      id: 500,
      text: 'OutDoor',
      children: [
        {

        }
      ]
    },
  ]

  return (
    <div className='admin-client-store'>
      <div className='h4 pt-2 pl-1'>
        Store Management
      </div>
      <div className='row'>
        <div className='col-lg-3 mt-3'>
          <div className='p-3 bg-white rounded-lg'>
            <div className='h5'>
              Item Management
            </div>
            <div>
              <DeniReactTreeView items={fruitsAndVegetables} />
            </div>
          </div>
        </div>
        <div className='col-lg-9 mt-3'>
          <div className='p-3 bg-white rounded-lg'>
            <div className='h5'>
              Shop Management
            </div>
            <div className='table-responsive table-client-store'>
              <table className='table table-borderless'>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Sales</th>
                    <th>Record Point</th>
                    <th>Stock</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4].map((item, index) =>
                    <tr key={index} className='table-row-customer-store-statistics-round'>
                      <td>Joe Frank</td>
                      <td><img src={soccerBall} alt='PRODUCT' height='50px' width='70px' /></td>
                      <td>854</td>
                      <td>08</td>
                      <td>447</td>
                      <td>$252.01</td>
                      <td>
                        <button className='btn btn-sm border'>edit order</button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-lg-4 mt-3'>
          <div className='p-3 bg-white rounded-lg'>
            <div className='d-flex justify-content-center align-items-center'>
              <div className='border border-4 border-light-green rounded-circle text-center mr-4 p-2'>
                <i className='fa fa-shopping-cart' style={{ fontSize: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div className='h6'>Trending Item</div>
                <div className='h5'>Really Good</div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4 mt-3'>
          <div className='p-3 bg-white rounded-lg'>
            <div className='d-flex justify-content-center align-items-center'>
              <div className='border rounded-circle text-center mr-4 p-2'>
                <i className='fa fa-shopping-cart' style={{ fontSize: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div>Trending Item</div>
                <div className='h6'>Soccer Ball</div>
                <small className='text-success'><i className='fa fa-arrow-up text-success'></i> 9% Since last month</small>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4 mt-3'>
          <div className='p-3 bg-white rounded-lg'>
            <div className='d-flex justify-content-center align-items-center'>
              <div className='border rounded-circle text-center mr-4 p-2'>
                <i className='fa fa-shopping-cart' style={{ fontSize: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div>Most Sold Item</div>
                <div className='h6'>Fishing Rod</div>
                <small className='text-success'><i className='fa fa-arrow-up text-success'></i> 9% Since last month</small>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4 mt-3'>
          <div className='p-3 bg-white rounded-lg'>
            <div className='d-flex justify-content-center align-items-center'>
              <div className='border rounded-circle text-center mr-4 p-2'>
                <i className='fa fa-shopping-cart' style={{ fontSize: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div>Total Sales</div>
                <div className='h6'>$984K</div>
                <small className='text-success'><i className='fa fa-arrow-up text-success'></i> 9% Since last month</small>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4 mt-3'>
          <div className='p-3 bg-white rounded-lg'>
            <div className='d-flex justify-content-center align-items-center'>
              <div className='border rounded-circle text-center mr-4 p-2'>
                <i className='fa fa-bullhorn' style={{ fontSize: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div>Total Sales</div>
                <div className='h6'>$15K</div>
                <small className='text-danger'><i className='fa fa-arrow-down text-danger'></i> 9% Since last month</small>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4 mt-3'>
          <div className='p-3 bg-white rounded-lg'>
            <div className='d-flex justify-content-center align-items-center'>
              <div className='border rounded-circle text-center mr-4 p-2'>
                <i className='fa fa-bullhorn' style={{ fontSize: '45px' }}></i>
              </div>
              <div className='ml-3'>
                <div>Total Sales</div>
                <div className='h6'>$15K</div>
                <small className='text-danger'><i className='fa fa-arrow-down text-danger'></i> 9% Since last month</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {})(ClientStoreManagement)