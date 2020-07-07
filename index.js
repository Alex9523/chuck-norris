function showCategories() {
    $(".categorie").css("display", "block");
    $("#search_text").css("display", "none");
    xhrListOfCategories();
}

function searchTextField() {
    $(".categorie").css("display", "none")
    $("#search_text").css("display", "block")
}

function rudiobuttonRandom() {
    $("#search_text").css("display", "none");
    $(".categorie").css("display", "none");
}

function cardOfJoke(url, id, value, categories) {
    const jokeBlock = `<div class="joke" id="${id}">
                        <div class="id">
                            <small><p>ID: <a href="${url}">${id}</a> </p></small>
                            <p>${value}</p>                       					 
                            <div class="row">
                                <div class="col-sm-6">
                                    <small><p>Last update : 132hour ago</p></small>
                                </div>
                                <div class="col-sm-6">
                                    <small>Categorie:  ${categories}</small>
                                </div>
                            </div>
                        </div>
                        <div class="heart">
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-suit-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onclick="like('${id}')">
                                <path fill-rule="evenodd" d="M8 6.236l.894-1.789c.222-.443.607-1.08 1.152-1.595C10.582 2.345 11.224 2 12 2c1.676 0 3 1.326 3 2.92 0 1.211-.554 2.066-1.868 3.37-.337.334-.721.695-1.146 1.093C10.878 10.423 9.5 11.717 8 13.447c-1.5-1.73-2.878-3.024-3.986-4.064-.425-.398-.81-.76-1.146-1.093C1.554 6.986 1 6.131 1 4.92 1 3.326 2.324 2 4 2c.776 0 1.418.345 1.954.852.545.515.93 1.152 1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                            </svg>
                            
                        </div>
                    </div>`
    return jokeBlock;
}

function selectCategory(i) {
    var elem = document.getElementById('q')
    elem.setAttribute('name', `${i}`)
}


function button() {
    const a = $('input[name="chise"]:checked').val();
    if (a == "random")
        xhrRandom()
    else if (a == "categories") {
        const categ = ($('#q').attr('name'))
        xhrCategories(categ)
    }
    else if (a == "search"){
        const text = ($('#search_text').val())
        xhrTextField(text)
    }
}

function xhrRandom() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.chucknorris.io/jokes/random', true);
    xhr.addEventListener('readystatechange', function () {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            const data = xhr.responseText;
            const jsonResponse = JSON.parse(data);
            var value = jsonResponse["value"];
            const joke = $('.jokes')
            joke.append(cardOfJoke(jsonResponse["url"], jsonResponse["id"], jsonResponse["value"], jsonResponse["categories"]))
        }
    })
    xhr.send();
}

function xhrCategories(categ) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.chucknorris.io/jokes/random?category=${categ}`, true);
    xhr.addEventListener('readystatechange', function () {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            const data = xhr.responseText;
            const jsonResponse = JSON.parse(data);
            var value = jsonResponse["value"];
            const joke = $('.jokes')
            joke.append(cardOfJoke(jsonResponse["url"], jsonResponse["id"], jsonResponse["value"], jsonResponse["categories"]))
        }
    })
    xhr.send();
}

function xhrTextField(text) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.chucknorris.io/jokes/search?query=${text}`, true)
    xhr.addEventListener('readystatechange', function(){
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            const data = xhr.responseText;
            const jsonResponse = JSON.parse(data);
            var value = jsonResponse["value"];
            const joke = $('.jokes')
            joke.append(cardOfJoke(jsonResponse["url"], jsonResponse["id"], jsonResponse["value"], jsonResponse["categories"]))
        }
    })
    xhr.send();
}

function xhrListOfCategories() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.chucknorris.io/jokes/categories', true);
    xhr.addEventListener('readystatechange', function () {
        if ((xhr.readyState == 4) && (xhr.status == 200)) {
            const data = xhr.responseText;
            const jsonResponse = JSON.parse(data);
            const listOfCategories = $('.categorie');
            listOfCategories.html('')
            for (let i = 0; i < 16; i++) {
                listOfCategories.append(`<button type="button" class="btn btn-light" onclick="selectCategory('${jsonResponse[i]}')">${jsonResponse[i]}</button>`)
            }
        }
    })
    xhr.send();
}


function like(idOfJoke) {
    const url = $(`#${idOfJoke} > .id a`).attr('href')
    const id = $(`#${idOfJoke} > .id a`).html()
    const value = $(`#${idOfJoke} > .id > p`).html()
    const categories = $(`#${idOfJoke} .col-sm-6 span`).html()
    const favorite = $('.favorite')
    favorite.append(cardOfJoke(url, id, value, categories))
    const fullHeart = `
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-suit-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onclick="unlike('${idOfJoke}')">
        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
    </svg>`
    $(`#${idOfJoke} > .heart`).html(fullHeart)
    $(`.favorite > #${idOfJoke} > .heart`).html(fullHeart)
    console.log("like")
}

function unlike(idOfJoke){
    $(`.favorite > #${idOfJoke}`).remove()
    $(`#${idOfJoke} > .heart`).html(`
    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-suit-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg" onclick="like('${idOfJoke}')">
        <path fill-rule="evenodd" d="M8 6.236l.894-1.789c.222-.443.607-1.08 1.152-1.595C10.582 2.345 11.224 2 12 2c1.676 0 3 1.326 3 2.92 0 1.211-.554 2.066-1.868 3.37-.337.334-.721.695-1.146 1.093C10.878 10.423 9.5 11.717 8 13.447c-1.5-1.73-2.878-3.024-3.986-4.064-.425-.398-.81-.76-1.146-1.093C1.554 6.986 1 6.131 1 4.92 1 3.326 2.324 2 4 2c.776 0 1.418.345 1.954.852.545.515.93 1.152 1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
    </svg>`)
    console.log("unlike")
}
