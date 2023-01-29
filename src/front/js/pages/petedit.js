import React, {useState, useEffect, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Detail } from './pets';
import PetEditCard from '../component/petEditCard';


const PetEdit = (id) => {

  
    // const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams()
    const [ date, setDate] = useState(new Date());
    const onChange = date => {
        setDate(date);
    };

//     // Show pet info on Cards
    const [pets, setPets] = useState ([])
    const body = document.body;
    const theme = localStorage.getItem("theme")
    useEffect (() => {
        if (theme == "dark"){
            body.classList.add(theme);
        } else {
            body.classList.add("light");
        }
    }, [])

    // Checks if logged-in
    useEffect (() => {
        const userToken = localStorage.getItem('jwt-token');

        if (!userToken) {navigate("/login")}
        // else {navigate('/profile')}

    }, [navigate])

    useEffect (() => {
      const fetchData = async () => {
          const result = await fetch (process.env.BACKEND_URL + `/pet/edit/${params.id}`,
          {
              method: "GET",
              mode: 'cors',
              credentials: 'omit',
              headers: {'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`},
              body: null
              })
          const jsonResult = await result.json()

          console.log(jsonResult)

          setPets(jsonResult[0])
      }

      fetchData();

  }, [])


  return (
    <div className='container' style={{marginTop:"5%"}}>  
        <div className='row justify-content-center'>
            <div className='col-9'>
              
     
                <PetEditCard 
                    
                    key={pets.id}
                    petsname={pets.name}
                    species={pets.species}
                    breed={pets.breed}
                    gender={pets.gender}
                    birthday={pets.date_of_birth}
                    colour={pets.colour}
                    features={pets.caracteristics}
                />

            </div>
        </div>
    </div>
  )
  }
export default PetEdit