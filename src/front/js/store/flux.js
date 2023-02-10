import moment from "moment";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			emailModal: false,
			test: false,
			username_exists: false,
			email_exists: false,
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
				setStore({username_exists: false})
				setStore({email_exists: false})
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
					const resp = await response.json()

					if (resp['user'] === true) {
						setStore({username_exists: true})
					}

					if (resp['email'] === true) {
						setStore({email_exists: true})
					}
					
					console.log(resp)
					console.log(resp['msg'])

					//Failed attempts to setStore a nested object

					/*setStore( (prevState) => {
						let checkCreateUser = {...prevState.checkCreateUser};
						checkCreateUser.user_exists = true;
						return {checkCreateUser}
					})*/

					/*setStore((prevState) => {
						checkCreateUser: {
							...prevState.checkCreateUser,
							email_exists: true
						}
					})*/
				  
				}
			  
				else {
				  alert("Welcome, new user!!")
				  location.replace('/login')
				}
				
			},

			handleLogin:  async (email, pass) => {

				console.log("email: "+email)
				console.log("pass: "+pass)
				const regexEmail = /^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$/g;
				let jsonBody;

				if (regexEmail.test(email)){
					jsonBody = {'username': null, 'email': email, 'password': pass}
				}

				else {
					jsonBody = {'username': email, 'email': null, 'password': pass}
				}
  
				const resp = await fetch(
					
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
				  document.getElementById("noPassword").style.display = "block";
				  const message = `An error has occured: ${resp.status}`;
				  throw new Error(message);
				  
				}
			  
				const data = await resp.json()
				
				localStorage.setItem("jwt-token", data.token);
				localStorage.setItem("email", email)
			  
				location.replace("/profile")
			  
				return data
				
			  },

			handleLogout: () => {
			
				localStorage.removeItem('jwt-token');
			
				location.replace("/");
			  
			},

			//Function to send reset password link
			handleLink_New_Password: async (email) => {
				const regexEmail = /^([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+$/g
				console.log(email)
				if (!email || !regexEmail.test(email)){
					document.getElementById("reset-email-invalid").style.display = "block";
					document.getElementById("reset-email").style.borderColor = "red";
				}
				else {
					try {
						const response = await fetch(
							process.env.BACKEND_URL+"/resetpassword",
							{
								method: "POST",
								mode: 'cors',
								credentials: 'omit',
								headers: {"Content-Type": "application/json",},
								body: JSON.stringify({'email': email}),
							}
						)
						
						if(response.ok){
							const objson = await response.json();
							const url = `https://${window.location.host}/resetpassword/${objson['token']}`
							console.log(url)
							//console.log(objson);


							// Commented the function that sends de email

							/*const sendEmail = (obj, str) => {

								const templateParams = {
								user_email: obj['email'],
								message: str
								};

								emailjs.send('service_gglai03', 'contact_form', templateParams) //use your Service ID and Template ID
									.then(function(response) {
									console.log('SUCCESS!', response.status, response.text);
									}, function(error) {
									console.log('FAILED...', error);
									});
							}*/

							//sendEmail(objson, url);
							setStore({emailModal: true})
							
						}

						if(!response.ok){
							const resp = await response.json();
							document.getElementById("reset-email").style.borderColor = "red";
							document.getElementById("reset-email-not-exists").style.display = "block";
						}
					
					} catch (error) {
						console.log(error)
					}
				}
			},

			handleResetPassword: async (token, pass) => {
				if (!token || !pass){
					throw new Error('Token or password is missing!')
				}
				try {
					const response = await fetch(
						process.env.BACKEND_URL+"/resetpassword/"+token,
						{
							method: "PUT",
							mode: 'cors',
							credentials: 'omit',
							headers: {"Content-Type": "application/json",},
							body: JSON.stringify({
								'pass': pass,
								'token': token
							}),
						}
					)

					if(response.ok){
						const resp = await response.json()
						alert("Backend msg: "+resp['msg']);
						location.replace('/login')
					}

					if(!response.ok){
						const resp = await response.json()
						console.log("Backend msg: ", resp['msg']);
					}

				} catch (error) {
					console.log(error)
				}
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
					location.replace('/');
				  }
			},

			handleEventAdd: async (title, start, end) => {
				console.log("Title: "+title, "Start: "+start, "End: "+end);
				const response = await fetch(

				process.env.BACKEND_URL+"/event/create",

				  {
					method: "POST",
					mode: 'cors',
					credentials: 'omit',
					headers: {"Content-Type": "application/json", 'Authorization': `Bearer ${localStorage.getItem('jwt-token')}`},
					body: JSON.stringify({'title': title, 'start': start, 'end': end}),
				  }
				)
			  
				if (!response.ok){
				  console.log(response.body)
				  const message = `An error has occured: ${response.status}`;
				  throw new Error(message);
				  
				}
			  
				else {
				  alert("Event added!")
				  location.replace('/events')
				}

				localStorage.setItem("title", title)
				localStorage.setItem("start", start)
				localStorage.setItem("end", end)
				
			},

			handleDataSet: async (title, start, end) => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/events")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return title, start, end;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			handleDeleteEvent: async () => {
				const response = await fetch(
					process.env.BACKEND_URL+"/delete_event",
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
					const message = `Event deleted correctly!`;
					location.replace('/calendar');
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

			getPic: async () => {
				try {
					const response = await fetch('https://dog.ceo/api/breeds/image/random')
					const {message} = await response.json();
					return message;
				}

				catch(error){
					console.log("Error loading message from backend", error)
				}

			},

			getFact: async () => {
				try {
					const response = await fetch('https://dogapi.dog/api/v2/facts')
					const data = await response.json();
					const fact = data['data'][0]['attributes'].body
					return fact;
				}

				catch(error){
					console.log("Error loading message from backend", error)
				}

			}
		}
	}
};

export default getState;
