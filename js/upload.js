// toggle-div 클릭 -> toggle 모양, nav-list 내려오기
const toggleDiv = document.getElementsByClassName('nav-toggle')[0]
const toggleI = toggleDiv.getElementsByTagName('i')[0]
const navList = document.getElementsByClassName('nav-list')[0]

toggleDiv.onclick = (event) => {
    navList.classList.toggle('show-menu')

    toggleI.classList.toggle('bi-list')
    toggleI.classList.toggle('bi-x-lg')
}

const inputButton = document.getElementsByClassName('product-class')
let clickedCartegory = 0

function clickInputButton(n){  
    for(var i = 0; i<inputButton.length; i++){
        inputButton[i].style.backgroundColor = '#FAFAFC'
    }
    
    inputButton[n].style.backgroundColor = '#CCFF00'
    clickedCartegory = n
}

function uploadJson(){
    const uploadTitle = document.getElementById('product-name')
    const uploadCartegory = document.getElementsByClassName('product-class')[clickedCartegory]
    const uploadExplain = document.getElementById('product-explain')
    const uploadImage = document.getElementById('file')

    let uploadCartegoryEng = ""
    let totalExplain  = ""

    if(uploadCartegory.value == "라켓") uploadCartegoryEng = "rocket"
    else if(uploadCartegory.value == "볼") uploadCartegoryEng = "ball"
    else if(uploadCartegory.value = "의류") uploadCartegoryEng = "clothes"
    else uploadCartegoryEng = "shoes"

    let sliceUploadTitle = uploadTitle.value.padEnd(10, '     ').slice(0, 25)

    let jsonData = {
        "name" : sliceUploadTitle,
        "category" : uploadCartegoryEng,
        "price" : "미정",
        "image" : uploadImage.value.split('\\')[2],
        "description" : uploadExplain.value
    }

    localStorage.setItem('uploadItem', JSON.stringify(jsonData))
    window.location.href = "./main.html"

}