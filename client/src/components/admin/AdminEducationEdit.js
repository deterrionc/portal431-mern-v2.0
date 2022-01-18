import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import { getCourseByID, updateCourse } from '../../actions/admin'

const AdminEducationEdit = ({ match, getCourseByID, course, updateCourse }) => {
  const history = useHistory()
  const courseID = match.params.id

  React.useEffect(() => {
    getCourseByID(courseID)
  }, [getCourseByID, courseID])

  React.useEffect(() => {
    setFormData(course)
  }, [course])

  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    video: ''
  })

  const {title, description, video} = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    updateCourse(history, courseID, formData)
  }

  return (
    <div className='new-course-page'>
      <div className='h4 pt-2 pl-1'>
        Edit Course
      </div>
      <div className='bg-white m-1 p-3 mb-4 rounded-lg'>
        <form className='form' onSubmit={onSubmit}>
          <div className='form-group'>
            <label className='manual-shadow'>Course Title</label>
            <input
              type='text'
              className='form-control manual-input'
              name='title'
              value={title}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label className='manual-shadow'>Description</label>
            <textarea
              type='text'
              className='form-control manual-input'
              name='description'
              rows={7}
              value={description}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <label className='manual-shadow'>Video Link (Vimeo)</label>
            <input
              type='text'
              className='form-control manual-input'
              name='video'
              value={video}
              onChange={onChange}
              required
            />
          </div>
          <div className='signoutLink text-center mt-5'>
            <button type='submit' className='btn manual-input px-5'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  course: state.admin.course
})

export default connect(mapStateToProps, { getCourseByID, updateCourse })(AdminEducationEdit)