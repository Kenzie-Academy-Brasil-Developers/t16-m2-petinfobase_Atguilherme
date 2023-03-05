export const toastAccountSucess = () => {
    const body = document.querySelector('body')
    const container = document.createElement('div')
    const text = document.createElement('p')
    const link = document.createElement('a')
  
    container.classList.add('toast__container', 'toast__add')
    container.style.backgroundColor = color
  
    text.innerText = 'Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login'
  
    link.innerText = 'Acessar página de login'

    container.appendChild(text)
    container.appendChild(link)
  
    body.appendChild(container)
  
    setTimeout(() => {
      container.classList.add('toast__remove')
    }, 3000)
  
    setTimeout(() => {
      body.removeChild(container)
    }, 4990)

}
