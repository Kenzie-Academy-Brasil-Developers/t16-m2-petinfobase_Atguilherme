export function renderModal(newPost, array = []){

    const modalController = document.querySelector('.newPost__dialog')
    modalController.innerHTML = ''
    modalController.appendChild(createModal(newPost, array))
    modalController.showModal()
    const btnCancel = document.querySelector(".btn__postCancel")

    btnCancel.addEventListener('click', (e) => {

        e.preventDefault()
        
        modalController.close()

    })
    
    closeModal()

}

function closeModal() {

    const btnClose = document.querySelector(".modalClose__btn")
    const btnCancel = document.querySelector(".btn__cancel")
    const modalController = document.querySelector(".newPost__dialog")

    btnClose.addEventListener("click", () => {

        modalController.close()

    })

    btnCancel.addEventListener("click", () => {
        
        modalController.close()

    })


}

function createModal(newPost, array){
    
    const modalContainer = document.createElement('div')
    const modalHeader = document.createElement('div')
    const modalHeaderTitle = document.createElement('h1')
    const modalCloseBtn = document.createElement('span')
    const labelTitle = document.createElement('h2')
    const postTitle = document.createElement('input')
    const labelContent = document.createElement('h2')
    const postContent = document.createElement('textarea')
    const containerButtons =document.createElement('div')
    const btnCancel = document.createElement('button')
    const btnSave = document.createElement('button')

    modalContainer.classList.add('modal__container')
    modalHeader.classList.add('modal__header')
    modalHeaderTitle.classList.add('modalHeader__title')
    modalCloseBtn.classList.add('modalClose__btn')
    labelTitle.classList.add('label__title')
    postTitle.classList.add('post__title', 'post__input')
    postTitle.name = 'title'
    labelContent.classList.add('label__content')
    postContent.classList.add('post__content', 'post__input')
    postContent.name = 'content'
    containerButtons.classList.add('container__buttons')

    if (newPost){

        modalHeaderTitle.innerText = 'Criando novo post'
        btnSave.classList.add('btn__publish')
        btnSave.innerText = 'Publicar'

    }else{

        modalHeaderTitle.innerText = 'Edição'
        btnSave.classList.add('btn__save')
        btnSave.innerText = 'Salvar alterações'
        
    }
    
    btnCancel.classList.add('btn__postCancel')
    modalCloseBtn.innerText = 'X'
    labelTitle.innerText = 'Título do post'
    postTitle.placeholder = 'Digite o título do post'
    labelContent.innerText = 'Conteúdo do post'
    postContent.placeholder = 'Digite o conteúdo do post'
    btnCancel.innerText = 'Cancelar'
    if (array.length != 0){
        postTitle.value = array.title
        postContent.value = array.content
    }

    modalHeader.append(modalHeaderTitle, modalCloseBtn)
    containerButtons.append(btnCancel, btnSave)
    modalContainer.append(modalHeader, labelTitle, postTitle, labelContent, postContent, containerButtons)

    return modalContainer

}

export function renderModalPost(postToOpen){

    const modalController = document.querySelector('.newPost__dialog')
    modalController.innerHTML = ''
    modalController.appendChild(createModalPost(postToOpen))
    modalController.showModal()
    closeModal()

}

function createModalPost(postToOpen){

    const modalContainer = document.createElement('div')
    const publicationCard = document.createElement('div')
    const cardHeader = document.createElement('div')
    const cardUser = document.createElement('div')
    const userImg = document.createElement('img')
    const userName = document.createElement('h2')
    const spanBar = document.createElement('span')
    const cardData = document.createElement('div')
    const modalCloseBtn = document.createElement('span')

    const labelTitle = document.createElement('h2')
    const labelContent = document.createElement('p')

    modalContainer.classList.add('modal__container')
    publicationCard.classList.add('publication__card')
    cardHeader.classList.add('card__header')
    cardUser.classList.add('card__user')
    userImg.classList.add('user__img')
    userName.classList.add('user__name')
    spanBar.classList.add('span__bar')
    cardData.classList.add('card__data')
    modalCloseBtn.classList.add('modalClose__btn')

    labelTitle.classList.add('post__title')
    labelContent.classList.add('post__content')

    userImg.src = postToOpen.user.avatar
    userName.innerText = postToOpen.user.username
    spanBar.innerText = '|'
    cardData.innerText = new Date(postToOpen.createdAt).toLocaleDateString('pt-BR', {
        month : 'long',
        year : 'numeric'
    }).split(' ').join(' ')
    modalCloseBtn.innerText = 'X'

    labelTitle.innerText = postToOpen.title
    labelContent.innerText = postToOpen.content

    cardUser.append(userImg, userName, spanBar)
    cardHeader.append(cardUser, cardData, modalCloseBtn)

    modalContainer.append(cardUser, cardHeader, labelTitle, labelContent)

    return modalContainer

}
