import { getAllPosts, getUserProfile, newPostRequest, updatePost, deletePost } from './requests.js'
import { toastLogout } from './toast.js'
import { renderModal, renderModalPost } from './modal.js'
let userId = ''
function authentication() {
    const token = localStorage.getItem('@petinfo:token')
  
    if(!token) {
      window.location.replace('../../index.html')
    }
}
  

function createPost(){
    const btnNewPost = document.querySelector('.create__post')

    btnNewPost.addEventListener('click', () =>{

        const newPost = true
        renderModal(newPost)
        handleNewPost()

    })
}

function logout({username}){

    const headerImg = document.querySelector(".header__img")  
    
    headerImg.addEventListener('mouseover', ()=>{

        toastLogout(username)
        const btnLogout = document.querySelector(".btn__logout")  

        btnLogout.addEventListener('click', ()=>{
            
            localStorage.clear()
            window.location.replace('../../index.html')

        })

    })
}

function renderHomeHeader(user){
    
    const generalHeaderContainer = document.querySelector('.generalHeader__container')
    generalHeaderContainer.innerHTML = ''
    userId = user.id
    generalHeaderContainer.appendChild(createHomeHeader(user)) 

}

function createHomeHeader({avatar}){

    const headerContainer = document.createElement('header')
    const logoTitle = document.createElement('div')
    const userData = document.createElement('div')
    const createPost = document.createElement('button')
    const headerImg = document.createElement('img')

    headerContainer.classList.add('header__container')
    logoTitle.classList.add('logo__title')
    userData.classList.add('user__data')
    createPost.classList.add('create__post')
    headerImg.classList.add('header__img')

    logoTitle.innerText = 'Petinfo'
    createPost.innerText = 'Criar publicação'
    headerImg.src = avatar
    headerImg.alt = "imagem do usuario"

    userData.append(createPost, headerImg)

    headerContainer.append(logoTitle, userData)

    return headerContainer

}

async function renderCards(){

    const sectionContainer = document.querySelector('.section__container')
    sectionContainer.innerHTML = ''
    const posts = await getAllPosts()

    posts.forEach(post => {

        sectionContainer.append(createCards(post))

    })

    handlePostEdit()
    handlePostDelete()
    handleOpenPost()
}

function createCards({id, title, content, createdAt, user}){
    
    const publicationCard = document.createElement('div')
    const cardHeader = document.createElement('div')
    const cardUser = document.createElement('div')
    const userImg = document.createElement('img')
    const userName = document.createElement('h2')
    const spanBar = document.createElement('span')
    const cardData = document.createElement('div')
    const cardButtons = document.createElement('div')
    const editBtn = document.createElement('button')
    const deleteBtn = document.createElement('button')
    const cardBody = document.createElement('div')
    const cardBodyTitle = document.createElement('h1')
    const cardParagraph = document.createElement('p')
    const publicationLink = document.createElement('a')

    publicationCard.classList.add('publication__card')
    cardHeader.classList.add('card__header')
    cardUser.classList.add('card__user')
    userImg.classList.add('user__img')
    userName.classList.add('user__name')
    spanBar.classList.add('span__bar')
    cardData.classList.add('card__data')
    publicationLink.classList.add('open__publication')
    if (userId == user.id){

        editBtn.classList.add('edit__btn')
        deleteBtn.classList.add('delete__btn')

    }else{

        editBtn.classList.add('hide__buttons')
        deleteBtn.classList.add('hide__buttons')

    }
    cardBody.classList.add('card__body')
    cardBodyTitle.classList.add('cardBody__title')
    cardParagraph.classList.add('card_paragraph')
    
    userImg.src = user.avatar
    userName.innerText = user.username
    spanBar.innerText = '|'
    cardData.innerText = new Date(createdAt).toLocaleDateString('pt-BR', {
        month : 'long',
        year : 'numeric'
    }).split(' ').join(' ')
    editBtn.innerText = 'Editar'
    editBtn.dataset.postId = id
    deleteBtn.innerText = 'Excluir'
    deleteBtn.dataset.postId = id
    cardBodyTitle.innerText = title
    cardParagraph.innerText = `${content.substring(0,142)}...`
    publicationLink.innerText = 'Acessar publicação'
    publicationLink.dataset.postId = id

    cardUser.append(userImg, userName, spanBar)
    cardButtons.append(editBtn, deleteBtn)
    cardHeader.append(cardUser, cardData, cardButtons)
    cardBody.append(cardBodyTitle, cardParagraph, publicationLink)
    publicationCard.append(cardHeader, cardBody)

    return publicationCard

}

function handleNewPost() {
    const inputs = document.querySelectorAll(".post__input")
    const button = document.querySelector(".btn__publish")
    const modalController = document.querySelector(".newPost__dialog")
    const postBody = {}
    let count = 0
    
    button.addEventListener("click", async (event) => {
        event.preventDefault()

        inputs.forEach(({ name, value }) => {
        if (value === "") {
            count++
        }

        postBody[name] = value
        })

        if (count !== 0) {

            toast("Por favor preencha os campos necessários", red)
            return 

        } else {

            await newPostRequest(postBody)
            modalController.close()

            renderCards()

            inputs.forEach((input) => {
                input.value = ""
            })

        }
    })
}

export function handlePostEdit(){
    const editButtons = document.querySelectorAll('.edit__btn')
    
    editButtons.forEach(editButton => {
        editButton.addEventListener('click', async (event) => {
            event.preventDefault()
            const posts = await getAllPosts()
            
            posts.forEach(post => {
                if (post.id == event.target.dataset.postId){

                    const postEdit = post
                    
                    renderModal(false, postEdit)
                    const btnSave = document.querySelector('.btn__save')
                    const inputs = document.querySelectorAll(".post__input")
                    const modalController = document.querySelector(".newPost__dialog")
                    const postBody = {}
                    let count = 0

                    btnSave.addEventListener('click', async () => {
                    
                        inputs.forEach(({ name, value }) => {
                            if (value === "") {
                                count++
                            }
                    
                            postBody[name] = value
                            })
                    
                            if (count !== 0) {
                    
                                return alert("Por favor preencha os campos necessários")
                    
                            } else {
                    
                                const editPost =  await updatePost(event.target.dataset.postId, postBody)
                                modalController.close()
                    
                                renderCards()
                            }


                    })
                }
            })

        })
    })

}

export function handlePostDelete(){

    const deleteButtons = document.querySelectorAll('.delete__btn')
    const modalController = document.querySelector(".newPost__dialog")
    
    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', async (event) => {

            event.preventDefault()
            const postDeleted =  await deletePost(event.target.dataset.postId)
            renderCards()

        })
    })

}

export function handleOpenPost(){
    const openButtons = document.querySelectorAll('.open__publication')
    
    openButtons.forEach(openButton => {
        openButton.addEventListener('click', async (event) => {
            event.preventDefault()
            
            const posts = await getAllPosts()
            
            posts.forEach(post => {
                if (post.id == event.target.dataset.postId){

                    const postToOpen = post
                    
                    renderModalPost(postToOpen)

                }
            })

        })
    })

}



authentication()
renderHomeHeader(await getUserProfile())
createPost()
renderCards()
logout(await getUserProfile())