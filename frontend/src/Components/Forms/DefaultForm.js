import React, { useState } from 'react'
import { FormField, Button, Form, Input } from 'semantic-ui-react'
import Papa from "papaparse";

const DefaultForm = ({handleData}) => {
    const [file, setFile] = useState(null)
    const [complete, SetComplete] = useState(false)
    const [cols, setCols] = useState([])
    const [ Y, SetY ] = useState([])

    const handleFile = (val) =>{
        console.log(val);
        setFile(val)
        Papa.parse(val, {
            download: true,
            header: true,
            complete: data => {
                if(data.meta.fields)
                  setCols(data.meta.fields)
            }
          });
          SetComplete(false)
    }


    const handleSubmit = () =>{
        let formData = new FormData();
        if(file){
            
        }
        const X = cols.filter(e=>{
            if(!Y.includes(e)){
                return true
            }
            return false
        })
        
        
        formData.append('file', file);
        formData.append('X', X)
        formData.append('Y', Y)

        fetch(`http://localhost:8000/`, 
        {
            method: 'POST',
            body: formData
        })
        .then(resp => resp.json())
        .then((data)=>{
            if(data)
            {
                console.log("data=> ",data);
                handleData(data)
                SetY([])
            }
        })

    }

    const HandleY = (e) =>{
        SetY([e.target.value])
        SetComplete(true)
    }
    


    return(
        <>
            <Form onSubmit={handleSubmit} >
                <FormField>
                    <Input
                        type="file"
                        name="file"
                        icon='file text outline'
                        iconPosition='left'
                        label='Upload CSV'
                        labelPosition='right'
                        placeholder='UploadFile...'
                        onChange={(event)=>handleFile(event.target.files[0])}
                    />

                {
                    cols.length ?
                        <div>
                            <label>Select Target Column</label>
                            <select placeholder={"Select Target Column"} onChange={(e)=>HandleY(e)}>
                            <option></option>
                            {
                                cols.map(col=>
                                    <option key={col} value={col}>{col}</option>
                                )
                            }
                            </select>
                        </div>
                    :
                    null
                }
                </FormField>
                {
                    complete ?
                    <Button type='submit' primary>Submit</Button>
                    :
                    <Button type='button' >Submit</Button>
                }
            </Form>
            
      </>
    )
        
}

export default DefaultForm