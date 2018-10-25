/*let pokemon;

let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = () => {
  if (httpRequest.readyState == XMLHttpRequest.DONE){
      let response = JSON.parse(httpRequest.response);
      pokemon = response.results;
      console.log(pokemon);
  }
};

httpRequest.open('GET', 'https://pokeapi.co/api/v2/pokemon/');
httpRequest.send();*/


/*let deckID;
let hitID = 0;
let hitID2 = 0;

let httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState == XMLHttpRequest.DONE) {
        let response = JSON.parse(httpRequest.response);
        if (response.success) {
            deckID = response.deck_id;
        }
    }
};

httpRequest.open('GET', 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');
httpRequest.send();

function getTwoCards(deckID) {
    let cardHttpRequest = new XMLHttpRequest();
    cardHttpRequest.onreadystatechange = () => {
        if (cardHttpRequest.readyState == XMLHttpRequest.DONE) {
            let response = JSON.parse(cardHttpRequest.response);
            if (response.success) {
                document.getElementById('card1').src = response.cards[0].image;
                document.getElementById('card2').src = response.cards[1].image;
                console.log(response);
            }
        }
    };

    cardHttpRequest.open('GET', 'https://deckofcardsapi.com/api/deck/'+ deckID +'/draw/?count=2');
    cardHttpRequest.send();
}

function drawOneCard(deckID) {
    hitID++;
    let hitHttpRequest = new XMLHttpRequest();
    hitHttpRequest.onreadystatechange = () => {
        if (hitHttpRequest.readyState == XMLHttpRequest.DONE) {
            let response = JSON.parse(hitHttpRequest.response);
            if (response.success) {
                if(hitID === 1) {
                    document.getElementById('card3').src = response.cards[0].image;
                    console.log(response);
                } else if(hitID === 2){
                    document.getElementById('card4').src = response.cards[0].image;
                    console.log(response);
                } else if (hitID === 3){
                    document.getElementById('card5').src = response.cards[0].image;
                    console.log(response);
                }
            }
        }
    };

    hitHttpRequest.open('GET', 'https://deckofcardsapi.com/api/deck/'+ deckID +'/draw/?count=1');
    hitHttpRequest.send();
}

function getTwoCards2(deckID) {
    let cardHttpRequest = new XMLHttpRequest();
    cardHttpRequest.onreadystatechange = () => {
        if (cardHttpRequest.readyState == XMLHttpRequest.DONE) {
            let response = JSON.parse(cardHttpRequest.response);
            if (response.success) {
                document.getElementById('p2card1').src = response.cards[0].image;
                document.getElementById('p2card2').src = response.cards[1].image;
                console.log(response);
            }
        }
    };

    cardHttpRequest.open('GET', 'https://deckofcardsapi.com/api/deck/'+ deckID +'/draw/?count=2');
    cardHttpRequest.send();
}

function drawOneCard2(deckID) {
    hitID2++;
    let hitHttpRequest = new XMLHttpRequest();
    hitHttpRequest.onreadystatechange = () => {
        if (hitHttpRequest.readyState == XMLHttpRequest.DONE) {
            let response = JSON.parse(hitHttpRequest.response);
            if (response.success) {
                if(hitID2 === 1) {
                    document.getElementById('p2card3').src = response.cards[0].image;
                    console.log(response);
                } else if(hitID2 === 2){
                    document.getElementById('p2card4').src = response.cards[0].image;
                    console.log(response);
                } else if (hitID2 === 3){
                    document.getElementById('p2card5').src = response.cards[0].image;
                    console.log(response);
                }
            }
        }
    };

    hitHttpRequest.open('GET', 'https://deckofcardsapi.com/api/deck/'+ deckID +'/draw/?count=1');
    hitHttpRequest.send();
}*/
/*login(username, password, (userData) =>{
    requestToDoLists(userData.userID, (listsArray) => {
        requestFriendsInfo(listsArray, (friendsInfo) => {

        })
    })
});*/

/*
let promise = new Promise((resolve, reject) => {
    $.ajax({
        url:"http://api.openweathermap.org/data/2.5/weather?zip=84004&appid=cc8ef8e5c209d938ab3801daa42b5e31&units=imperial",
        type:"GET",
        success: function(data, status){
            console.log(data);
            let obj = data;
            let desc = obj.main.temp;
            let icon = obj.weather[0].icon;
            let img = "//openweathermap.org/img/w/" + icon +".png";
            $('#outputFahrenheit').html(desc);
            $('.wimage').attr('src', img);
            resolve(data);
        },
        error: (error) => {
            reject(error);
        }
    });
});

promise.then((theResponse) => {
    console.log('.then', theResponse);
});

promise.catch((someError) => {
    console.log('.catch', someError);
});*/

function getDeck() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck+count=1',
            type: 'GET',
            success: (response) => {
                resolve(response);
            },
            error: (error) => {
                reject (error);
            }
        })
    })
}

function getCards(deckID, cardAmount) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=${cardAmount}`,
            type: 'Get',
            success: (response) => {
                resolve(response);
            },
            error: (error) => {
                reject (error);
            }
        })
    })
}

let deckPromise = getDeck();

deckPromise.then((data) =>{
   getCards(data.deck_id, 4.).then((cardData) =>{
       document.getElementById('card1').src = cardData.cards[0].image;
       document.getElementById('card2').src = cardData.cards[1].image;
       document.getElementById('p2card1').src = cardData.cards[2].image;
       document.getElementById('p2card2').src = cardData.cards[3].image;
   })
});

function hit() {
    deckPromise.then((data) =>{
        getCards(data.deck_id, 1).then((cardData) => {
            $('#cards').append(`<img src=${cardData.cards[0].image}>`)
        })
    })
}

function hit2() {
    deckPromise.then((data) =>{
        getCards(data.deck_id, 1).then((cardData) => {
            $('#cards2').append(`<img src=${cardData.cards[0].image}>`)
        })
    })
}