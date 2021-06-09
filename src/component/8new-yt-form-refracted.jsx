import React from 'react'
import {Formik, Form, Field,ErrorMessage,FieldArray, FastField} from 'formik' 
import texterror from './4texterror';

//VDisabling Submit button 1. on form state is valid or invalid  2. Form Submission is in progress

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

// 2.Enabling the submit button using onsubmitprops
const onSubmit = (values, onsubmitprops) => {
  console.log('Submissin Values: ',values)
  console.log('onsubmitprops', onsubmitprops)
  onsubmitprops.setSubmitting(false) //2. wait for API response than set it to false
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

const validateComments = (value) => {
  let errComment

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
            // validateOnMount //. with this prop the submit button is disabled whenever screen starts 1st time
                            // but for more than 20 validations to do even before user has not typed anything is not good
                            //so we will use dirty from formik prop
            >
      {
        (formik) => {
// we need to understand this prop.  isValid: if errors object is empty is valid is true 
            console.log('Formik Props',formik)

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
                        validate ={validateComments}
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
          <button type='button' onClick={() => formik.setFieldTouched('comments')}>Visit Comments</button>
          <br/>
              <button type='button' onClick={() => formik.setTouched({
                name:true,
                email:true,
                channel:true,
                comments:true
              })}>Visit all Fields</button>
           <br/>
              <button type='button' onClick={() => formik.validateField('comments')}>Validate Comments</button>
          <br/>
              <button type='button' onClick={() => formik.validateForm()}>Validate all Fields</button>
           <br/>
{/* We will disable the submit button based on isValid in formik  */}
{/* dirty will keep track of even single value is changed from initial value rendered */}

{/*2. Form submission is in progress after submitting correct value it is disabled bcz
formik doesnt know when API will respond so we manually set isSubmitting to false in onSubmit method */}

                <button type='submit' disabled={(!(formik.dirty && formik.isValid)) || formik.isSubmitting}>
                  Submit</button>
          </Form>
          )
        }
      }        
      
    </Formik>  )
}

export default NewYoutubeform;
