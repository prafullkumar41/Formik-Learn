import React from 'react'
import {Formik, Form, Field,ErrorMessage} from 'formik'
import texterror from './4texterror';
// More on Field component and Errormessage component

const initialValues= {
  name: '',
  email: '',
  channel: '',
  comments : '',
  address: '' //render props pattern 
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
  {/* By default not in html element so we will do it by component tag */}
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
 {/* now we will do the above thing by render props pattern */}
 {/*Render props pattern, we use function as children  */}

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

{/* Placeholder and as keyword is used to render any otther type element other than text and both 
are going as props in Field component */}
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

{/*Render props pattern, we use function as children  */}
        <div className="formcontrol">
          <label htmlFor="address">Address</label>
          <Field name='address'>
            {
              (props) => {
                console.log('Render props',props)//field for name,blur,onchange,value
                                                 //meta for error handling
                                                 //form object for the methods that we are using having useFormik
                const {field,form,meta} = props
                return (                        //simple input will be tagged to formik using props of field
                <div>
                  <input type='text' id='address' {...field}/> 
                  {meta.touched && meta.error ? <div>{meta.error}</div>:null}
                </div>
                )
              }
            }
          </Field>
        </div>
        <button type='submit'>Submit</button>
      </Form>
    </Formik>  )
}

export default NewYoutubeform;
