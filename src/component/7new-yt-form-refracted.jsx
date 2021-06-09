import React from 'react'
import {Formik, Form, Field,ErrorMessage,FieldArray, FastField} from 'formik' 
import texterror from './4texterror';

//1. Field level validation other than validate function and validate schema

// Now we will trigger both field level and form level validation manually for this we will use
// prop render method on Formik component

const initialValues= {
  name: '',
  email: '',
  channel: '',
  comments : '',
  address: '',
  social:{
    facebook: '', 
    twitter: ''
  },
  phonenumber : ['',''],
  phNumbers :[''] 
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

//1. Field level validation for comments is same as form level validate function

const validateComments = (value) => {
  let errComment // please note that no object is defined as in previous

  if (!value) {
    errComment = 'Comment Required...!!'    
  }
  return errComment
}

function NewYoutubeform() {

  return (
    <Formik initialValues ={initialValues}
            validate ={validate}
            onSubmit ={onSubmit}
            >
 {/* this formik proc will help us control everything that has to do with Form  */}
      {
        (formik) => {
            console.log('Formik Prop',formik)

          return(
            <Form>
                <div className='formcontrol'>
                  <label htmlFor="name">Name</label>
                  <Field
                        type="text" 
                        id='name' 
                        name='name' 
                    />
                  <ErrorMessage name = 'name' component={texterror}/>    
                </div>
                <br/>
                <div className='formcontrol'>
                  <label htmlFor="email">Email</label>
                  <Field 
                        type="email" 
                        id='email' 
                        name='email' 
                        />
                  <ErrorMessage name = 'email'>
                  {
                    (errmsg) => {
                      return(
                        <div className='error'>{errmsg}</div>
                      )
                    }
                  }  
                  </ErrorMessage>      
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

                <div className='formcontrol'>
                  <label htmlFor="comments">Channel</label>
                  <Field 
                        as="textarea" 
                        id='comments' 
                        name='comments' 
                        placeholder = 'COMMENTS'
                        validate ={validateComments}//1. In comments field write the function 
                        />  
                  <ErrorMessage name='comments' component={texterror}/>
                </div>

                <br/>

                <div className="formcontrol">
                  <label htmlFor="address">Address</label>
                  <FastField name='address'>
                    {
                      (props) => {
                        const {field,form,meta} = props
                        return (                      
                        <div>
                          <input type='text' id='address' {...field}/> 
                          {meta.touched && meta.error ? <div>{meta.error}</div>:null}
                        </div>
                        )
                      }
                    }
                  </FastField>
                </div>
                <br/>
                
                <div className="formcontrol">
                  <label htmlFor="facebook">FB</label>
                  <Field type='text' name='social.facebook' id='facebook'/> 
                </div>
                <br/>
                <div className="formcontrol">
                  <label htmlFor="twitter">TW</label>
                  <Field type='text' name='social.twitter' id='twitter'/>
                </div>
                <br/>
                <div className="formcontrol">
                  <label htmlFor="primarynumber">primarynumber</label>
                  <Field type='number' name='phonenumber[0]' id='primarynumber'/> 
                </div>
                <br/>
                <div className="formcontrol">
                  <label htmlFor="secondarynumber">secondarynumber</label>
                  <Field type='number' name='phonenumber[1]' id='secondarynumber'/>
                </div>
                <br/>

              <div className="formcontrol">
                <label>List of phNumber</label>
                <FieldArray name='phNumbers'>       
                {
                  (fieldarrayprops) => {
                    const{ push, remove, form} = fieldarrayprops
                    const{values} = form
                    const{phNumbers} = values 
                    return (
                      <div>
                        {
                          phNumbers.map((phnumber,index) => (
                            <div key={index}>
                                <Field name={`phNumbers[${index}]`}/>
                                <button type='button' onClick={() => remove(index)}> - </button>
                                <button type='button' onClick={() => push('')}> + </button>
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                }
                </FieldArray> 
              </div>
              <br/>
 {/*We need to set the field touch as well so that we can see the errors on screen  */}
          <button type='button' onClick={() => formik.setFieldTouched('comments')}>Visit Comments</button>
          <br/>
              <button type='button' onClick={() => formik.setTouched({
                name:true,
                email:true,
                channel:true,
                comments:true
              })}>Visit all Fields</button>
           <br/>
{/* to check the manually validation we will provide button  */}
              <button type='button' onClick={() => formik.validateField('comments')}>Validate Comments</button>
          <br/>
              <button type='button' onClick={() => formik.validateForm()}>Validate all Fields</button>
           <br/>
                <button type='submit'>Submit</button>
          </Form>
          )
        }
      }        
      
    </Formik>  )
}

export default NewYoutubeform;
