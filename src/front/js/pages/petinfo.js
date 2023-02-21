import { object } from 'prop-types';
import React, {useContext, useState, Fragment, useEffect} from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import CatSide from "../../img/CatSide.png";
import DogSide from "../../img/DogSide.png";

let imageUrl = ''

const PetInfo = () => {

    // Dark mode
    const body = document.body;

    const theme = localStorage.getItem("theme")
    useEffect (() => {
        if (theme == "dark"){
            body.classList.add(theme);
        } else {
            body.classList.add("light");
        }
    }, [])
    
    const {store, actions} = useContext(Context)
    const navigate = useNavigate();

    
    const [petinfo, setPetinfo] = useState({
        petname:'',
        species:'',
        breed:'',
        gender:'',
        birthday:'',
        colour:'',
        features:'',
        image: '',
        clinicname:'',
        adress:'',
    })

    const [clinic, setClinic] = useState({
        clinicname:'',
        adress:''
    })

    const [loading, setLoading] = useState(false)

    //Checks if logged-in
    useEffect (() => {
        const userToken = localStorage.getItem('jwt-token');

        if (!userToken) {navigate("/login")}

    }, [navigate])

    const handleInputChange= (event) => {
        // console.log(event.target.value)
        setPetinfo({
            ...petinfo, 
            [event.target.name] : event.target.value
        })
    }

    const handleInputVeterinary = (event) => {
        setClinic({
            ...clinic,
            [event.target.name] : event.target.value
        })
    }
    
    const uploadImage = async (event) => {
        const files = event.target.files
            const data = new FormData()
            data.append('file', files[0])
            data.append('upload_preset', 'petnameapp')
            setLoading(true)
    
            const res = await fetch('https://api.cloudinary.com/v1_1/deoudn7hx/image/upload',
            {
                method:'POST',
                body:data
            } )
            const file = await res.json()
            //setImage(file.secure_url)
            console.log(res)
            // PROBANDO COSAS
            // setPetinfo.image = setImage()
            console.log(file.secure_url)
            //setPetinfo.image(file.secure_url)
            imageUrl = file.secure_url
            console.log('imageUrl->' + imageUrl)

            setLoading(false)
    }

    const sendPetData = async (event) => {
        event.preventDefault()

        console.log(petinfo.petname + " " + petinfo.birthday + " " + petinfo.breed)

        let jsonBody;

        jsonBody = {
            'name': petinfo.petname, 
            'date_of_birth': petinfo.birthday, 
            'species': petinfo.species,
            'gender' : petinfo.gender,
            'breed': petinfo.breed,
            'colour': petinfo.colour,
            'caracteristics': petinfo.features,
            'img_1': imageUrl,
            'img_2' : petinfo.image,
            'img_3' : petinfo.image,
            'img_mimeType': petinfo.image,
            
            'clinic_name' : clinic.clinicname,
            'adress' : clinic.adress,    
        }
            
 

        const resp = await fetch(
            process.env.BACKEND_URL + "/pet/create",
            {
              method: "POST",
              mode: 'cors',
			  credentials: 'omit',
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`
                },
              body: JSON.stringify(jsonBody),
            }
            
          )
          console.log(resp)
          if (resp.ok){
            alert("Pet added successfully!")
            location.replace("/profile")
          }
    }

    const [warning, setWarning] = useState(false)
    const handleBlur = () => {
        if (petinfo.petname.trim() === ' ' || petinfo.species.trim() === " " || petinfo.breed.trim() === ""){
            console.log("prueba:" + petinfo.petname)
            setWarning(true)
        }
    }
 

  return (

        <Fragment>
            <div className='container-fluid' style={{marginTop:"5%"}}>  
                <div className='row'>
                    <div className="col-3 p-0 m-0 align-text-bottom pet-col-form justify-content-end">
                    <img className="d-flex w-100" src={DogSide} id="DogSide"/>
                    </div>
                    <div className='col-sm justify-content-center'>
                        <form onSubmit={sendPetData}>
                            <div>
                                <h2>Pet Info</h2>
                                <input  style={{marginTop:'2%'}} 
                                        className='form-control' 
                                        type='text' 
                                        name='petname' 
                                        placeholder='Name'
                                        required
                                        onBlur={handleBlur}                                     
                                        onChange={handleInputChange}/>
                                   
                                        {warning && petinfo.petname.trim() === '' && <div style={{ fontSize: "0.875em", color: "red"}}>We want to know your pet name</div>}
                                <select style={{marginTop:'2%'}} 
                                        name='species' 
                                        className='form-select' 
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}>
                                        
                                    <option selected>Species</option> 
                                    <option value='canine' >Canine</option>
                                    <option value='feline'>Feline</option>
                                </select>
                                {warning && petinfo.species.trim() === '' && <div style={{ fontSize: "0.875em", color: "red"}}>Is it a Cat or a Dog</div>}
                                
                                <input  style={{marginTop:'2%'}} 
                                        className='form-control' 
                                        type='text' 
                                        name='breed' 
                                        placeholder='Breed' 
                                        required
                                        onBlur={handleBlur}
                                        onChange={handleInputChange}/>
                                        {warning && petinfo.breed.trim() === '' && <div style={{ fontSize: "0.875em", color: "red"}}>What is the breed?</div>}
                                <select style={{marginTop:'2%'}} 
                                        className='form-control' 
                                        name='gender' 
                                        placeholder='Gender' 
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        >
                                    <option  selected>Gender</option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                </select>
                                {warning && petinfo.gender.trim() === '' && <div style={{ fontSize: "0.875em", color: "red" }}>Male or Female?</div>}

                                <input style={{marginTop:'2%'}} 
                                        className='form-control' 
                                        type='date' 
                                        name='birthday' 
                                        placeholder='Date of Birth' 
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}/>
                                    {warning && petinfo.birthday.trim() === '' && <div style={{ fontSize: "0.875em", color: "red" }}>Let us to know his birthday</div>}

                                <input style={{marginTop:'2%'}} 
                                        className='form-control' 
                                        type='text' name='colour' 
                                        placeholder='Colour' 
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}/>
                                {warning && petinfo.gender.trim() === '' && <div style={{ fontSize: "0.875em", color: "red"}}>I think it has a color</div>}

                                <input style={{marginTop:'2%'}} 
                                        className='form-control' 
                                        type='text' 
                                        name='features' 
                                        placeholder='Any notable or dicernable features or characteristics' 
                                        onChange={handleInputChange}/>
                            
                            </div>  
                            <div>
                                <input style={{marginTop:'2%'}}
                                    type="file"
                                    name="file"
                                    placeholder='Upload an Image'
                                    onChange={uploadImage}
                                    />
                                   
                            </div>
                            {/* <div style={{marginTop:'7%'}}>
                                <label for="formFile" class="form-label"><strong>Upload image</strong></label>
                                <input 
                                    className="form-control" 
                                    type="file" 
                                    name="image" 
                                    id="formFile" 
                                    onChange={handleInputImage}/>
                            </div> */}
                            <div style={{marginTop:'7%'}}> 
                                <label for="formFile" class="form-label"><strong>Veterinary info</strong></label>  

                                <input  style={{marginTop:'2%'}}  
                                        className='form-control' 
                                        type='text' 
                                        name='clinicname' 
                                        placeholder='Clinic Name' 
                                        onChange={handleInputVeterinary}></input>
                                <input  style={{marginTop:'2%'}}  
                                        className='form-control' 
                                        type='text' 
                                        name='adress' 
                                        placeholder='Adress' 
                                        onChange={handleInputVeterinary}></input>
                            </div>
                            <div style={{marginTop:'7%',marginBottom:'7%', textAlign:'center'}}>
                                <div>
                                    <button className='btn btn-primary' type='submit'>✓ Save</button>
                                </div>
                                {/* <div style={{marginTop:'3%'}}>
                                    <button className='btn btn-secondary' type='submit' >+ Add another pet</button> */}
                                {/* </div> */}
                            </div>
                        </form>    
                    </div>
                    <div className="col-3 p-0 m-0 align-text-bottom pet-col-form">
                    <img className="d-block w-100" src={CatSide} id="CatSide"/>
                    </div>
                </div>
            </div>    
        </Fragment>
            


  )
}

export default PetInfo
