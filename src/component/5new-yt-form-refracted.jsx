import React from 'react'
import {Formik, Form, Field,ErrorMessage} from 'formik'
import texterror from './4texterror';

//Nested object and the fields in state grouped together
//Managing field state as an array

const initialValues= {
  name: '',
  email: '',
  channel: '',
  comments : '',
  address: '',
  social:{
    facebook: '', //nested object
    twitter: ''
  },
  phonenumber : ['','']//array
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
                />  
     
        </div>

        <br/>

        <div className="formcontrol">
          <label htmlFor="address">Address</label>
          <Field name='address'>
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
          </Field>
        </div>
        <br/>
        
        <div className="formcontrol">
          <label htmlFor="facebook">FB</label>
{/*Just change the name accordingly to the nested object   */}
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
{/*Just change the phone number index  accordingly to the array object   */}
          <Field type='number' name='phonenumber[0]' id='primarynumber'/> 
        </div>
        <br/>
        <div className="formcontrol">
          <label htmlFor="secondarynumber">secondarynumber</label>
          <Field type='number' name='phonenumber[1]' id='secondarynumber'/>
        </div>
        <br/>
        <button type='submit'>Submit</button>
      </Form>
    </Formik>  )
}

export default NewYoutubeform;
