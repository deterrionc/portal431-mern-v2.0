import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Vimeo from '@u-wave/react-vimeo'
import { getCourses, deleteCourse } from '../../actions/admin'
import { useHistory } from 'react-router'

const AdminEducation = ({ getCourses, courses, deleteCourse }) => {
  const history = useHistory()

  React.useEffect(() => {
    getCourses()
  }, [getCourses])

  return (
    <div>
      <div className='h4 pt-2 pl-1 d-flex align-items-center'>
        <div>Admin Dashboard</div>
        <span className='badge-pending rounded-lg p-1 px-2 font-20 ml-4 text-center'><Link to='/education/create'>Create Course</Link></span>
      </div>
      <div className='bg-white m-1 p-3 my-4 rounded-lg'>
        {courses.map((item, index) =>
          <div key={index} className='mb-2'>
            <p>
              <b>{item.title}</b>
              <span>
                <i onClick={() => history.push(`/education/edit/${item._id}`)} className='fa fa-gear cursor-pointer pl-2 font-20'></i>
                <i onClick={() => window.confirm('Are you sure?') ? deleteCourse(history, item._id) : null} className='fa fa-trash-o cursor-pointer pl-2 font-20'></i>
              </span>
            </p>
            <p>{item.description}</p>
            <div className="text-center">
              <Vimeo
                video={item.video}
                responsive={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  courses: state.admin.courses
})

export default connect(mapStateToProps, { getCourses, deleteCourse })(AdminEducation)
