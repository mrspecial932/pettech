import React from "react";
import { useFormikContext } from "formik";
import AppPicker from "../AppPicker";
import Errormessages from "./Errormessages";

function AppFormPicker ({items , name , placeholder}){
    const {errors, setFieldValue, touched , values}=useFormikContext();
    
    return(
        <>
        <AppPicker items={items}
        onSelectItem={(item)=>setFieldValue(name,item)}
        placeholder={placeholder}
        selectedItem={values[name]}
        />
        <Errormessages error={errors[name]} visible={touched[name]}/>    
        </>
    )
}