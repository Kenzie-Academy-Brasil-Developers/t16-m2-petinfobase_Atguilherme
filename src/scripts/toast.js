export const toast = (message, color) => {
    const sectionOpening = document.querySelector('.section__container')
    const container = document.createElement('div')
    const text = document.createElement('p')
  
    container.classList.add('toast__container', 'toast__add')
    container.style.backgroundColor = color
  
    text.innerText = message
  
    container.appendChild(text)
  
    sectionOpening.appendChild(container)
  
    setTimeout(() => {
    container.classList.add('toast__remove')
  }, 30000)

  
    setTimeout(() => {
    sectionOpening.removeChild(container)
  }, 49900)

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

