import React from 'react'
import {Formik, Form, Field,ErrorMessage} from 'formik'

//refracted version 

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

  return (
    <Formik initialValues ={initialValues}
            validate ={validate}
            onSubmit ={onSubmit}
            >
      <Form>
        <div className='formcontrol'>
          <label htmlFor="name">Name</label>
          <Field
                type="text" 
                id='name' 
                name='name' 
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
