function backToIndex(){
    const btnRegister = document.querySelector(".register__back")  
    btnRegister.addEventListener('click', (e)=>{
        e.preventDefault()
        window.location.replace('../../index.html')
    })
}


backToIndex()