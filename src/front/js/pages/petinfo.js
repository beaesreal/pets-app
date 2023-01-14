import { object } from 'prop-types';
import React, {useContext, useState, Fragment} from 'react'
import { Context } from "../store/appContext.js";

const PetInfo = () => {
    
    const {store, actions} = useContext(Context)

    const [petinfo, setPetinfo] = useState({
        petname:'',
        species:'',
        breed:'',
        gender:'',
        birthday:'',
        color:'',
        features:'',
        clinicname:'',
        adress:''
    })

    const handleInputChange= (event) => {
        // console.log(event.target.value)
        setPetinfo({
            ...petinfo, 
            [event.target.name] : event.target.value
        })
    }

    const sendPetData = async (event) => {
        event.preventDefault()
        
        console.log(petinfo.petname + " " + petinfo.birthday + " " + petinfo.breed)

        let jsonBody;

        jsonBody = {'name': petinfo.petname, 'campo2': 'valor2', 'campo3': 'valor3'}

        const resp = await fetch(
            process.env.BACKEND_URL + "/pet/create",
            {
              method: "POST",
              headers: {"Content-Type": "application/json",},
              body: JSON.stringify(jsonBody),
            }
          )

    }


  return (

        <Fragment>
            <div className='container' style={{marginTop:"5%"}}>  
                <div className='row justify-content-center'>
                    <div className='col-9'>
                        <form onSubmit={sendPetData}>
                            <div>
                                <h2>Pet Info</h2>
                                <input  style={{marginTop:'2%'}} 
                                        className='form-control' 
                                        type='text' 
                                        name='petname' 
                                        placeholder='Name'
                                        required

                        
                                        onChange={handleInputChange}/>
                                <select style={{marginTop:'2%'}} 
                                        name='species' 
                                        className='form-select' 
                                        onChange={handleInputChange}>
                                        required
                                    <option selected>Species</option> 
                                    <option value='dog' >Dog</option>
                                    <option value='cat'>Cat</option>
                                </select>
                                
                                <input  style={{marginTop:'2%'}} 
                                        className='form-control' 
                                        type='text' 
                                        name='breed' 
                                        placeholder='Breed' 
                                        onChange={handleInputChange}/>
                                <select style={{marginTop:'2%'}} 
                                        className='form-control' 
                                        name='gender' 
                                        placeholder='Gender' 
                                        onChange={handleInputChange}>
                                    <option  selected>Gender</option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                </select>
                                <input style={{marginTop:'2%'}} 
                                        className='form-control' 
                                        type='date' 
                                        name='birthday' 
                                        placeholder='Date of Birth' 
                                        onChange={handleInputChange}/>
                                <input style={{marginTop:'2%'}} 
                                        className='form-control' 
                                        type='text' name='color' 
                                        placeholder='Color' 
                                        onChange={handleInputChange}/>
                                
                                <input style={{marginTop:'2%'}} 
                                        className='form-control' 
                                        type='text' 
                                        name='features' 
                                        placeholder='Any notable or dicernable features or characteristics' 
                                        onChange={handleInputChange}/>
                            
                            </div>  
                            <div style={{marginTop:'7%'}}>
                                <label for="formFile" class="form-label"><strong>Upload image</strong></label>
                                <input className="form-control" type="file" id="formFile"/>
                            </div>
                            <div style={{marginTop:'7%'}}> 
                                <label for="formFile" class="form-label"><strong>Veterinary info</strong></label>  
                                <p>Find your vet clini on Google</p>
                                <p>Can't find it? No proble, add it manually bellow</p> 
                                <input  style={{marginTop:'2%'}}  
                                        className='form-control' 
                                        type='text' name='clinicname' 
                                        placeholder='Clinic Name' 
                                        onChange={handleInputChange}></input>
                                <input  style={{marginTop:'2%'}}  
                                        className='form-control' 
                                        type='text' 
                                        name='adress' 
                                        placeholder='Adress' 
                                        onChange={handleInputChange}></input>
                            </div>
                            <div style={{marginTop:'7%', textAlign:'center'}}>
                                <div>
                                    <button className='btn btn-primary' type='submit'>✓ Save</button>
                                </div>
                                {/* <div style={{marginTop:'3%'}}>
                                    <button className='btn btn-secondary' type='submit' >+ Add another pet</button> */}
                                {/* </div> */}
                            </div>
                        </form>    
                    </div>
                </div>
            </div>    
        </Fragment>
            


  )
}

export default PetInfo
