import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import reactDom from 'react-dom'
import PropType from "prop-types"

const PetEditCard = (props) => {

    const {petsname} = props
    const params = useParams()

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

    const handleInputChangeEdit= (event) => {
        // console.log(event.target.value)
        setPetinfo({
            ...petinfo, 
            [event.target.name] : event.target.value
        })
    }

    const sendPetDataEdit = async (event) => {
        event.preventDefault()
        
        console.log(petinfo)

        let jsonBody;

        jsonBody = {
            'name': petinfo.petname, 
            'date_of_birth': petinfo.birthday, 
            'species': petinfo.species,
            'gender' : petinfo.gender,
            'breed': petinfo.breed,
            'colour': petinfo.colour,
            'caracteristics': petinfo.features,
  
        }
            
 

        const resp = await fetch(
            process.env.BACKEND_URL + `/pet/edit/${params.id}`,
            {
              method: "PUT",
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
    }

    console.log("props=>", props)

  return (

        <div className='container' style={{marginTop:"5%"}}>  
            <div className='row justify-content-center'>
                <div className='col-9' >
                    <form onSubmit={sendPetDataEdit}>
                        <div>
                            <h2>Edit your Pet </h2>
                            <input  style={{marginTop:'2%'}} 
                                    className='form-control' 
                                    type='text' 
                                    name='petname' 
                                    placeholder={props.petsname}
                                    onChange={handleInputChangeEdit}
                                    />
                            <select style={{marginTop:'2%'}} 
                                    name='species' 
                                    className='form-select' 
                                    onChange={handleInputChangeEdit}
                                    >
                                    
                                <option selected>Species</option> 
                                <option value='canine' >Canine</option>
                                <option value='feline'>Feline</option>
                                <option selected value={props.species}>{props.species}</option>
                            </select>
                            
                            <input  style={{marginTop:'2%'}} 
                                    className='form-control' 
                                    type='text' 
                                    name='breed' 
                                    placeholder={props.breed} 
                                    onChange={handleInputChangeEdit}
                                    />
                            <select style={{marginTop:'2%'}} 
                                    className='form-control' 
                                    name='gender' 
                                    placeholder='Gender' 
                                    onChange={handleInputChangeEdit}
                                    >
                                <option  selected>Gender</option>
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                    <option selected value={props.gender}>{props.gender}</option>
                            </select>
                            <input style={{marginTop:'2%'}} 
                                    className='form-control' 
                                    type='date' 
                                    name='birthday' 
                                    placeholder={props.birthday} 
                                    
                                    onChange={handleInputChangeEdit}
                                    />
                            <input style={{marginTop:'2%'}} 
                                    className='form-control' 
                                    type='text' name='colour' 
                                    placeholder={props.colour}
                                    onChange={handleInputChangeEdit}
                                    />
                            
                            <input style={{marginTop:'2%'}} 
                                    className='form-control' 
                                    type='text' 
                                    name='features' 
                                    placeholder={props.features} 
                                    onChange={handleInputChangeEdit}
                                    />
                        
                        </div>  
                        {/* <div>
                            <input style={{marginTop:'2%'}}
                                type="file"
                                name="file"
                                placeholder='Upload an Image'
                                />
                            
                        </div>                */}
                    
                        <div style={{marginTop:'7%',marginBottom:'7%', textAlign:'center'}}>
                            <div>
                                <button className='btn btn-primary' type='submit'>✓ Save</button>
                            </div>
                        
                        </div>
                    </form>    
                </div>
            </div>
        </div>    

  )
}
PetEditCard.propTypes = {
    //add pproperties
    
    petsname : PropType.string,
    species: PropType.string,
    breed: PropType.string,
    gender: PropType.string,
    birthday: PropType.string,
	colour: PropType.string,
    features: PropType.string

}
export default PetEditCard