import React from 'react'
// import {useFormik} from 'formik' 2nd refactor
import {Formik, Form, Field,ErrorMessage} from 'formik'

//doing refraction

const initialValues= {
  name: '',
  email: '',
  channel: ''
}

const onSubmit = values => {
  console.log('Submissin Values: ',values)
}

const validate = values => {
  let error = {} 

  if(!values.name){
    error.name = 'Required...!!!'
  }
  if(!values.email){
    error.email = 'Required...!!!'
  }
  if(!values.channel){
    error.channel = 'Required...!!!'
  }

  return error
}

function NewYoutubeform() {
//2nd  const formik = useFormik({ 
  //   initialValues,
  //   onSubmit,
  //   validate
  // })
  return (
    // <div className='ytform'> 2nd
    <Formik initialValues ={initialValues}
            validate ={validate}
            onSubmit ={onSubmit}
            >
 {/*2nd <form onSubmit={formik.handleSubmit}> */}
      <Form>
        <div className='formcontrol'>
          <label htmlFor="name">Name</label>
          {/*3rd refactor field <input to Field  */}
          <Field
                type="text" 
                id='name' 
                name='name' 
                // {...formik.getFieldProps('name')} we will remove this as 3rd refactor field will handle 
 //1st refactor These three lines are refactored and replaced by single line from formik 
                // because using same line of codes
                // onChange={formik.handleChange} 
                // value={formik.values.name} 
                // onBlur={formik.handleBlur}
                />
           <ErrorMessage name = 'name'/>    
        </div>
        <br/>
        <div className='formcontrol'>
          <label htmlFor="email">Email</label>
          <Field 
                type="email" 
                id='email' 
                name='email' 
                />

           <ErrorMessage name = 'email'/>      
           {/* 4th this will replaced by errormessage component <div className='error'>{formik.errors.email && formik.touched.email ? 
                                   formik.errors.email: 
                                   null }
           </div>      */}
        </div>              
        <br/>
        <div className='formcontrol'>
          <label htmlFor="channel">Channel</label>
          <Field 
                type="text" 
                id='channel' 
                name='channel' 
               
                />
        <ErrorMessage name = 'channel'/>    
     
        </div>

        <br/>
        <button type='submit'>Submit</button>
      </Form>
    </Formik>  )
}

export default NewYoutubeform;
