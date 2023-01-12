import React from 'react'

const Petname = () => {
  return (
    <div className='container' style={{padding:"5%"}}>
        <div className='row justify-content-center'>
            <div className='col align-self-start' style={{textAlign:'center'}}>
                <h2>Pet Name</h2>
               
                <img src='' className='img-circle' alt='...'/>
                <br/>
                <button className='btn btn-primary' type='button'>Edit</button>
                <br/>
                <button className='btn btn-secondary' type='button'>View another pet -></button>
            </div>
            <div className='col align-items-end'>
                <div >
                    <h5>ID</h5>
                    <h5>Species</h5>
                    <h5>Breed</h5>
                    <h5>Sex</h5>
                    <h5>Date of bith</h5>
                    <h5>Color</h5>
                    <h5>Any notable or dicernable features or characteristics</h5>
                </div>
                <div >
                    <h5>Clinic name</h5>
                    <h5>Adress</h5>
                </div>
            </div>
        </div>    
    </div>
  )
}

export default Petname