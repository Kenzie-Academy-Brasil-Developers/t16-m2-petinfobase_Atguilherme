import { loginRequest, red } from "./requests.js"
import { toast } from "./toast.js"


function authentication() {
  const token = localStorage.getItem('@petinfo:token')

  if(token) {
    window.location.replace('./src/pages/home.html')
  }
}

function goToRegister(){
    const btnRegister = document.querySelector(".register__back")  
    btnRegister.addEventListener('click', (e)=>{
        e.preventDefault()
        window.location.replace('/src/pages/register.html')
    })
}

function handleLogin() {

  const inputs = document.querySelectorAll(".form__input")
  const button = document.querySelector(".register__btn")
  const loginBody = {}
  let count = 0

  button.addEventListener("click", async (event) => {
    event.preventDefault()

    inputs.forEach(({ name, value }) => {
      if (value === "") {

        count++

      }

      loginBody[name] = value

    })

    if (count !== 0) {

      toast('por favor preencha os campos e tente novamente', red)
      return 

    } else {

      const token = await loginRequest(loginBody)
      
      return token

    }
  })
}

goToRegister()
handleLogin()
authentication()
