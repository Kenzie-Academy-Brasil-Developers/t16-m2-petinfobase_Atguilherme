export const toast = (message, color) => {
    const body = document.querySelector('body')
    const container = document.createElement('div')
    const text = document.createElement('p')
  
    container.classList.add('toast__container', 'toast__add')
    container.style.backgroundColor = color
  
    text.innerText = message
  
    container.appendChild(text)
  
    body.appendChild(container)
  
    setTimeout(() => {
      container.classList.add('toast__remove')
    }, 2000)

  
    setTimeout(() => {
      body.removeChild(container)
    }, 3990)

  }


export const toastLogout = (username, color) => {

  const body = document.querySelector('body')
  const container = document.createElement('div')
  const textLogout = document.createElement('p')
  textLogout.classList.add('toastLogout__text')
  const btnLogout = document.createElement('a')
  btnLogout.classList.add('btn__logout')
  
  container.classList.add('toastLogout__container', 'toast__add')
  container.style.backgroundColor = color

  textLogout.innerText = `@${username}`
  btnLogout.innerText = 'Sair'

  container.appendChild(textLogout)
  container.appendChild(btnLogout)

  body.appendChild(container)

  setTimeout(() => {
    container.classList.add('toast__remove')
  }, 3000)

  setTimeout(() => {
    body.removeChild(container)
  }, 2990);

}

export const toastAccountSucess = () => {

  const body = document.querySelector('body')
  const container = document.createElement('div')
  const img = document.createElement('img')
  const text = document.createElement('p')
  const link = document.createElement('a')

  container.classList.add('toastAccount__container')
  container.style.backgroundColor = '#FCFEFF'

  img.src = '../assets/create-account-sucess.svg'

  text.innerText = 'Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login:'

  link.innerText = 'Acessar página de login'
  link.

  container.appendChild(img)
  container.appendChild(text)
  text.appendChild(link)

  body.appendChild(container)

  setTimeout(() => {
    container.classList.add('toast__remove')
  }, 3000)

  setTimeout(() => {
    body.removeChild(container)
  }, 4990)

}
