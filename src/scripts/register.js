import { registerRequest } from "./requests.js" 
import { toast } from './toast.js'

function authentication() {
    const token = localStorage.getItem('@petinfo:token')

    if(token) {
        window.location.replace('./dashboard.html')
    }
}

function backToIndex(){
    const btnRegister = document.querySelector(".register__back")  
    btnRegister.addEventListener('click', (e)=>{
        e.preventDefault()
        window.location.replace('../../index.html')
    })
}

function handleRegister() {
    const inputs = document.querySelectorAll('.form__input')
    const button = document.querySelector('.register__btn')
    const registerBody = {}
    let count = 0
  
    button.addEventListener('click', async (event) => {
      event.preventDefault()
  
      inputs.forEach(({name, value}) => {
        if(value === '') {
          count++
        }
  
        registerBody[name] = value
      })
  
      if(count !== 0) {
      return alert('por favor preencha todos os campos necessários para realizar o cadastro')
      } else {
        const newUser = await registerRequest(registerBody)
  
        setTimeout(() => {
        //     window.location.replace('../../index.html')
        // }, 2000)
            window.location.replace('../../index.html')
        }, 200000)

        
      }
    })
}
  

authentication()
backToIndex()
handleRegister()
