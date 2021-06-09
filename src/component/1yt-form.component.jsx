import React from 'react'
import {useFormik} from 'formik'

//basic version

const initialValues= {
  name: '',
  email: '',
  channel: ''
}

const onSubmit = values => {
  console.log('Submissin Values: ',values)
}

const validate = values => {
  // values.name values.email values.channel
  // error.name error.email error.channel
  // error.name = 'This field is mandatory'
  let error = {} // IMP validate function in formik must return an object

  if(!values.name){
    error.name = 'Required'
  }
  if(!values.email){
    error.email = 'Required'
  }
  if(!values.channel){
    error.channel = 'Required'
  }

  return error
}

function Youtubeform() {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })
  return (
    <div className='ytform'>
      <form onSubmit={formik.handleSubmit}>
        <div className='formcontrol'>
          <label htmlFor="name">Name</label>
          <input 
                type="text" 
                id='name' 
                name='name' 
                onChange={formik.handleChange} 
                value={formik.values.name} 
                onBlur={formik.handleBlur}//to check whether field is visted or not formik.touched is used
                />
           <div className='error'>{formik.errors.name  && formik.touched.name?
                                  formik.errors.name:null}
          </div>     
        </div>
        <br/>
        <div className='formcontrol'>
          <label htmlFor="email">Email</label>
          <input 
                type="email" 
                id='email' 
                name='email' 
                onChange={formik.handleChange} 
                value={formik.values.email}
                onBlur={formik.handleBlur}
                />
           <div className='error'>{formik.errors.email && formik.touched.email ? 
                                   formik.errors.email: 
                                   null }
           </div>     
        </div>             
        <br/>
        <div className='formcontrol'>
          <label htmlFor="channel">Channel</label>
          <input 
                type="text" 
                id='channel' 
                name='channel' 
                onChange={formik.handleChange} 
                value={formik.values.channel}  
                onBlur={formik.handleBlur}
                />
           <div className='error'>{formik.errors.channel && formik.touched.channel?
                                    formik.errors.channel:null}
            </div>     
        </div>

        <br/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Youtubeform;
