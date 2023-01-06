import React, {useState} from 'react'

const PetInfo = () => {

    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [breed, setBreed] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [color, setcolor] = useState('');
    const [features, setFeatures] = useState('');
    const [clinicname, setClinicname] = useState('')
    const [adress, setAdress] = useState('')

  return (

         
        <form>
            <div className='container' style={{marginTop:"5%"}}>  
                <div className='row justify-content-center'>
                    <div className='col-9'>
                        <div>
                            <h2>Pet Info</h2>
                            <input style={{marginTop:'2%'}} className='form-control' type='text' name='name' placeholder='Name' onChange={(e)=>setName(e.target.value)}></input>
                            <input style={{marginTop:'2%'}} className='form-control' list='datalistOptions' name='species' placeholder='Species' onChange={(e)=>setSpecies(e.target.value)}></input>
                                <datalist id='species'>
                                    <option value='dog'/>
                                    <option value='cat'/>
                                </datalist>
                            
                            <input style={{marginTop:'2%'}} className='form-control' type='text' name='breed' placeholder='Breed' onChange={(e)=>setBreed(e.target.value)}></input>
                            <input style={{marginTop:'2%'}} className='form-control' list='datalistOptions' name='gender' placeholder='Gender' onChange={(e)=>setGender(e.target.value)}></input>
                                <datalist id='datalistOptions'>
                                    <option value='male'/>
                                    <option value='female'/>
                                </datalist>
                            <input style={{marginTop:'2%'}} className='form-control' type='date' name='birthday' placeholder='Date of Birth' onChange={(e)=>setBirthday(e.target.value)}></input>
                            <input style={{marginTop:'2%'}} className='form-control' type='text' name='color' placeholder='Color' onChange={(e)=>setcolor(e.target.value)}></input>
                            
                            <input style={{marginTop:'2%'}} className='form-control' type='text' rows='3' name='features' placeholder='Any notable or dicernable features or characteristics' onChange={(e)=>setFeatures(e.target.value)}></input>
                        
                        </div>  
                        <div style={{marginTop:'7%'}}>
                            <label for="formFile" class="form-label"><strong>Upload image</strong></label>
                            <input className="form-control" type="file" id="formFile"/>
                        </div>
                        <div style={{marginTop:'7%'}}> 
                            <label for="formFile" class="form-label"><strong>Veterinary info</strong></label>  
                            <p>Find your vet clini on Google</p>
                            <p>Can't find it? No proble, add it manually bellow</p> 
                            <input style={{marginTop:'2%'}}  className='form-control' type='text' name='clinicname' placeholder='Clinic Name' onChange={(e)=>setClinicname(e.target.value)}></input>
                            <input style={{marginTop:'2%'}}  className='form-control' type='text' name='adress' placeholder='Adress' onChange={(e)=>setAdress(e.target.value)}></input>
                        </div>
                        <div style={{marginTop:'7%', textAlign:'center'}}>
                            <div>
                                <input type="checkbox" class="btn-check" id="btn-check-2" checked autocomplete="off"/>
                                <label class="btn btn-primary" for="btn-check-2"> ✓ Save</label>
                            </div>
                            <div style={{marginTop:'3%'}}>
                                <input type="checkbox" class="btn-check" id="btn-check-2" checked autocomplete="off"/>
                                <label class="btn btn-secondary" for="btn-check-2">+ Add another pet</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </form>
            


  )
}

export default PetInfo
