import React from 'react'
import {Formik, Form, Field,ErrorMessage,FieldArray, FastField} from 'formik' //1 import Field array
import texterror from './4texterror';

//New fieldarray component = dynamically assign values in array

//FastField component: If change any value in any form field than all the elements get rerender
// to remove this we use FastField like eg. we use console log in address

//formik runs validation when 1. onchange happens in component, 2. on blur event and 3. on submit
//we can control this by giving validateOnChange = {false}, validateOnBlur = {false} in props in Formik component.


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
  phNumbers :[''] //2  assign a new field in state

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
            // validateOnChange ={false}// for only rendering the fields which is chnaging
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
          <FastField name='address'>
            {
              (props) => {
                console.log('Address form render') //even if we write anything in comments form than also it will 
                                                   //renderred to deny it we use FastField component instead of Field
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

{/* 3 make div tag with label and use Field array component instead Field */}
<div className="formcontrol">
{/* note htmlfor is not present in label for field array */}
         <label>List of phNumber</label>
{/* using field array component it uses render prop(function as children) */}
         <FieldArray name='phNumbers'>       
         {
           (fieldarrayprops) => {
             console.log('FieldArrayProps',fieldarrayprops) //see what all props are given by field array
             const{ push, remove, form} = fieldarrayprops
             const{values} = form
             const{phNumbers} = values 
             return (
               <div>
                 {
                  //  here please note that index will come after phnumber
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
        <button type='submit'>Submit</button>
      </Form>
    </Formik>  )
}

export default NewYoutubeform;
