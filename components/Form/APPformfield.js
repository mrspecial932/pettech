import React from 'react'
import AppTextInput from '../AppTextInput'
import { useFormikContext } from 'formik'
import Errormessages from './Errormessages'
import { ErrorMessage } from 'formik'

export default function APPformfield({name , ...otherProps}) {

   const {setFieldTouched, handleChange, errors, touched} =useFormikContext();

  return (
    <>
    <AppTextInput
    icon="email"
    placeholder="email"
   
    onBlur={()=>setFieldTouched(name)}
    onChangeText={handleChange(name)}
    {...otherProps}
   
    />
   
    <Errormessages error={errors[name]} visible={touched[name]}/>
    
    </>

  )
}
