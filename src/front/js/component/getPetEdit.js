

const getPetEdit = async (id) => {
    const result = await fetch (process.env.BACKEND_URL + `/api/pet/${id}`,
    {
        method: "GET",
        mode: 'cors',
        credentials: 'omit',
        headers: {'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`},
        body: null
        })
    const jsonResult = await result.json()

    console.log(jsonResult, jsonResult)
}

export default getPetEdit
