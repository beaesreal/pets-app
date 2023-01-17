const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		

		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			checkToken: (token) => {
				return token
			},

			handleCreateUser: async (username, email, pass) => {
				console.log("Username: "+username, "E-mail: "+email, "Password: "+pass);
				const response = await fetch(
				  process.env.BACKEND_URL+"/signup",
				  {
					method: "POST",
					mode: 'cors',
					credentials: 'omit',
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({'username': username, 'email': email, 'password': pass}),
				  }
				)
			  
				if (!response.ok){
				  console.log(response.body)
				  const message = `An error has occured: ${response.status}`;
				  throw new Error(message);
				  
				}
			  
				else {
				  alert("Welcome, new user!!")
				  location.replace('https://3000-beaesreal-petsapp-sonqzrrpgm8.ws-eu82.gitpod.io/login')
				}
				
			},

			handleLogin:  async (email, pass) => {

				const regexEmail = /^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$/g;
				let jsonBody;

				if (regexEmail.test(email)){
					jsonBody = {'username': null, 'email': email, 'password': pass}
				}

				else {
					jsonBody = {'username': email, 'email': null, 'password': pass}
				}
  
				const resp = await fetch(
					//process.env.BACKEND_URL+"/login"
				  process.env.BACKEND_URL+"/login",
				  {
					method: "POST",
					mode: 'cors',
					credentials: 'omit',
					headers: {"Content-Type": "application/json",},
					body: JSON.stringify(jsonBody),
				  }
				)
			  
				if (!resp.ok){
				  console.log(resp.body);
				  document.getElementById("email").style.borderColor = "red";
				  document.getElementById("pass").style.borderColor = "red";
				  document.getElementById("loginError").style.display = "block";
				  const message = `An error has occured: ${resp.status}`;
				  throw new Error(message);
				  
				}
			  
				const data = await resp.json()
				
				localStorage.setItem("jwt-token", data.token);
			  
				location.replace('https://3000-beaesreal-petsapp-sonqzrrpgm8.ws-eu82.gitpod.io/')
			  
				return data
				
			  },

			handleLogout: () => {
			
				localStorage.removeItem('jwt-token');
			
				location.replace("/")
			  
			},

			handleDeleteUser: async () => {
				const response = await fetch(
					process.env.BACKEND_URL+"/delete_user",
					{
					  method: "DELETE",
					  mode: 'cors',
					  credentials: 'omit',
					  headers: {'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`},
					  body: null
					}
				  )
				
				  if (!response.ok){
					console.log(response.body)
					const message = `An error has occured: ${response.status}`;
					throw new Error(message);
					
				  }
				
				  else {
					getActions().handleLogout();
					location.replace('https://3000-beaesreal-petsapp-sonqzrrpgm8.ws-eu82.gitpod.io');
				  }
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			getItems: async (resource) => {
				const store = getStore();
				const response = await fetch (process.env.BACKEND_URL + "/create");
				const body = await response.json();
				setStore({
					[resource]: body.results.map((item)=>{
						return {
							...item, resource
						}
					}),
				});
			},

			getDetails: async (resource, uid) => {
				const store = getStore();
				const response = await fetch(process.env.BACKEND_URL + "/create");
				const body = await response.json();
				if (!response.ok) return;
				setStore({
					currentItem: body.result,
				});
			},
		}
	};
};

export default getState;
