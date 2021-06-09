import React,{useState} from 'react'
import {Formik, Form, Field,ErrorMessage,FieldArray, FastField} from 'formik' 
import texterror from './4texterror';

//Load the saved data which the user has already saved
//2.Reset the data using single button

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

// Make the same object as inital and now let us say till comments user has filled
const loadValues= {
  name: 'Prafull',
  email: 'p@gmail.com',
  channel: 'prafullsingh',
  comments : 'It is very good',
  address: '',
  social:{
    facebook: '', 
    twitter: ''
  },
  phonenumber : ['',''],
  phNumbers :[''] 
}

const onSubmit = (values, onsubmitprops) => {
  console.log('Submissin Values: ',values)
  console.log('onsubmitprops', onsubmitprops)
  onsubmitprops.setSubmitting(false) 
  onsubmitprops.resetForm()//reseeting the form

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
  // import usestate to update the state and not allowing Formik component to use initial values
 const [savedState,setSavedSatate] = useState(null)
  return (
    // imp saved state should be ahead
    <Formik initialValues ={savedState || initialValues}
            validate ={validate}
            onSubmit ={onSubmit}
            enableReinitialize//really importatnt to load
            >
      {
        (formik) => {
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
 {/* Clicking and loadind the saved data  */}
              <br/>
              <button type='button' onClick = {() => setSavedSatate(loadValues)}>Load Data</button>
              <br/>
{/* 2. resetting the data and also after sucessfull submitting the form */}
              <br/>
              <button type='reset'>Reset Form</button>
              <br/>
                <button type='submit' disabled={(!(formik.dirty && formik.isValid)) || formik.isSubmitting}>
                  Submit</button>
          </Form>
          )
        }
      }        
      
    </Formik>  )
}

export default NewYoutubeform;
