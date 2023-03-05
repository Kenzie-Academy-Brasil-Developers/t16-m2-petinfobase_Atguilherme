import { toast, toastAccountSucess } from './toast.js'

export const green = '#087F5B'
export const red = '#DB3C58'

const token = JSON.parse(localStorage.getItem("@petinfo:token")) || ""

const baseUrl = "http://localhost:3333"
const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
}

export async function loginRequest(loginBody) {
  const token = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(loginBody),
  }).then((response) => {
    if (response.ok) {

      const responseJson = response.json().then(({ token }) => {
        localStorage.setItem("@petinfo:token", JSON.stringify(token))
        
        window.location.replace('/src/pages/home.html')
        return token

      })

      return responseJson

    } else {

      response.json().then((resError) => {
      
      if(resError.message == 'A senha está incorreta'){

        const passwordText = document.querySelector('.password__text')
        const passwordInput = document.querySelector('#password__input')
        passwordText.style.color = '#C73650';
        passwordInput.classList.add('redBorder')
        
      }
      
      })

    }
  })

  return token

}

export async function registerRequest(registerBody) {
  
  const newUser = await fetch(`${baseUrl}/users/create`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(registerBody),
  }).then((response) => {

    if (response.ok) {

      response.json().then((resJson) => {
        
        toastAccountSucess()
        setTimeout(() => {
          console.log('ok')
        }, 30000)

        return resJson

      })

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

        })

    }

  })

  return newUser

}

export async function getAllPosts() {
  
  const posts = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: requestHeaders,
  }).then((response) => {

    if (response.ok) {


      const responseJson =  response.json().then( (resJson) => {
        
        return resJson

      })
      
      return responseJson
      
    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

        })

    }
    
  })
  
  return posts

}

export async function newPostRequest(postBody) {
  
  const newPost = await fetch(`${baseUrl}/posts/create`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(postBody),
  }).then((response) => {

    if (response.ok) {

      toast('Post cadastrado com sucesso', green)

      return response.json()

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }

  })

  return newPost

}

export async function getUserProfile() {
  
  const user = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  }).then((response) => {

    if (response.ok) {

      const responseJson =  response.json().then( (resJson) => {
        
        return resJson

      })
      
      return responseJson

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }

  })

  return user

}

export async function updatePost(postId, postBody) {

  const post = await fetch(`${baseUrl}/posts/${postId}`, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify(postBody),
  }).then((response) => {

    if (response.ok) {

      toast("post atualizado com sucesso", green)

      return response.json()

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }
    
  })

  return post

}

export async function deletePost(postId) {

  const post = await fetch(`${baseUrl}/posts/${postId}`, {
    method: "DELETE",
    headers: requestHeaders,
  }).then((response) => {

    if (response.ok) {
  
      toast('Post deletado com sucesso', green)

      return response.json()

    } else {

      response.json().then((resError) => {

        toast(resError.message, red)

      })

    }

  })

  return post

}