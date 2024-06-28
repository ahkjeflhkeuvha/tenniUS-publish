let allData = "";

function getData() {
    const fileName = "data.json";
    
    fetch(fileName)
    .then((res) => res.json())
    .then((data) => setData(data))
    .catch((error) => console.error(error));
}

getData();

function setData(data) {
    allData = data;
    const localStorageData = localStorage.getItem('uploadItem');
    console.log(localStorageData)
    if (localStorageData) {
        const parsedLocalStorageData = JSON.parse(localStorageData);
        allData = allData.concat(parsedLocalStorageData);
    }
    showData(allData);
}

function showData(data) {
    let itemContainerString = "";
    let popupContainerString = "";
    
    data.forEach((element, idx) => {
        let articleStr = `<article class="items" id="article-${idx+1}">
        <a href="#pop_info_${idx+1}" class="btn_open"><img src="img/${element.image}" alt=""></a>
        <div class="explain">
        <h2 class="item title">${element.name}</h2>
        <h3 class="item">${element.price}</h3>
        <button class="btn cart-btn item"><a href="shopping.html">장바구니</a></button>
        </div>
        </article>\n`;
        
        let popupStr = `<div id="pop_info_${idx+1}" class="pop_wrap" style="display:none;">
        <div class="pop_inner">
        <img src="img/${element.image}" alt="">
        <h2>${element.name}</h2>
        <h3>${element.price}</h3>
        <p>${element.description}</p>
        <button type="button" class="btn_close">닫기</button>
        </div>
        </div>\n`;
        
        itemContainerString += articleStr;
        popupContainerString += popupStr;
    });
    
    const itemContainer = document.getElementsByClassName('item-container')[0];
    itemContainer.innerHTML = itemContainerString;
    const mainContainer = document.getElementsByClassName('popup-container')[0];
    mainContainer.innerHTML = popupContainerString;
    
    popupSetting();
}

function search(query){
    if(query === "") showData(allData); // 아무것도 입력하지 않을 시 전체 데이터 출력
    else {
        let data = allData.filter((oneData) => oneData.name.includes(query) || oneData.category.includes(query));
        // 전체 데이터에서 하나 꺼내 name에 query가 있는지 확인~~
        showData(data);
    }
}

// toggle-div 클릭 -> toggle 모양, nav-list 내려오기
const toggleDiv = document.getElementsByClassName('nav-toggle')[0];
const toggleI = toggleDiv.getElementsByTagName('i')[0];
const navList = document.getElementsByClassName('nav-list')[0];

toggleDiv.onclick = (event) => {
    navList.classList.toggle('show-menu');
    toggleI.classList.toggle('bi-list');
    toggleI.classList.toggle('bi-x-lg');
}

const searchDiv = document.getElementById('search');
const searchCon = document.getElementsByClassName('search-container')[0];

searchDiv.onclick = (event) => {
    searchCon.classList.toggle('show-search');
}

const footerSearchDiv = document.getElementById('footer-search');

footerSearchDiv.onclick = (event) => {
    searchCon.classList.toggle('show-search');
}

// 팝업
function popupSetting(){
    var target = document.querySelectorAll('.btn_open');
    var btnPopClose = document.querySelectorAll('.btn_close');
    var targetID;
    
    // 팝업 열기
    for (var i = 0; i < target.length; i++) {
        target[i].addEventListener('click', function (event) {
            // event.preventDefault();  // 기본 앵커 동작을 막음
            targetID = this.getAttribute('href');
            document.querySelector(targetID).style.display = 'block';
        });
    }
    
    // 팝업 닫기
    for (var j = 0; j < btnPopClose.length; j++) {
        btnPopClose[j].addEventListener('click', function () {
            this.closest('.pop_wrap').style.display = 'none';
        });
    }
}


