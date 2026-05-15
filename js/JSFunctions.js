"use strict";




//Testutskrifter
/*
console.log( oGameData );
oGameData.initGlobalObject();
console.log( oGameData.gameField );
console.log( oGameData.checkForGameOver() );
*/

/*
console.log( oGameData.checkHorizontal() );
console.log( oGameData.checkVertical() );
console.log( oGameData.checkDiagonalLeftToRight() );
console.log( oGameData.checkDiagonalRightToLeft() );
console.log( oGameData.checkForDraw() );
*/



/**
 * Globalt objekt som innehåller de attribut som ni skall använda.
 * Initieras genom anrop till funktionen initGlobalObject().
 */
let oGameData = {};

/**
 * Initierar det globala objektet med de attribut som ni skall använda er av.
 * Funktionen tar inte emot några värden.
 * Funktionen returnerar inte något värde.
 */
oGameData.initGlobalObject = function() {

    //Datastruktur för vilka platser som är lediga respektive har brickor
    oGameData.gameField = Array('', '', '', '', '', '', '', '', ''); // 0
    
    /* Testdata för att testa rättningslösning */
    //oGameData.gameField = Array('X', 'X', 'X', '', '', '', '', '', ''); // 1
    //oGameData.gameField = Array('X', '', '', 'X', '', '', 'X', '', ''); // 1
    //oGameData.gameField = Array('X', '', '', '', 'X', '', '', '', 'X'); // 1
    //oGameData.gameField = Array('', '', 'X', '', 'X', '', 'X', '', ''); // 1
    //oGameData.gameField = Array('X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'); // 3

    //Indikerar tecknet som skall användas för spelare ett.
    oGameData.playerOne = "X";

    //Indikerar tecknet som skall användas för spelare två.
    oGameData.playerTwo = "O";

    //Kan anta värdet X eller O och indikerar vilken spelare som för tillfället skall lägga sin "bricka".
    oGameData.currentPlayer = "";

    //Nickname för spelare ett som tilldelas från ett formulärelement,
    oGameData.nickNamePlayerOne = "";

    //Nickname för spelare två som tilldelas från ett formulärelement.
    oGameData.nickNamePlayerTwo = "";

    //Färg för spelare ett som tilldelas från ett formulärelement.
    oGameData.colorPlayerOne = "";

    //Färg för spelare två som tilldelas från ett formulärelement.
    oGameData.colorPlayerTwo = "";

    //"Flagga" som indikerar om användaren klickat för checkboken.
    oGameData.timerEnabled = false;

    //timerId om användaren har klickat för checkboxen.
    oGameData.timerId = null;

}

/**
 * Kontrollerar för tre i rad.
 * Returnerar 0 om det inte är någon vinnare, 
 * returnerar 1 om spelaren med ett kryss (X) är vinnare,
 * returnerar 2 om spelaren med en cirkel (O) är vinnare eller
 * returnerar 3 om det är oavgjort.
 * Funktionen tar inte emot några värden.
 */
oGameData.checkForGameOver = function() {

    // Funktion som kollar om tre positioner av brädan är likadana
    let check3Equal = (arr1, arr2, arr3) => {

        // Här returnerar falks om första argumentet är tom sträng
        // annars funktionen hade returneras sant för tre tomma strängar
        // Om den första strängen är tomt returnera falsk för att vi vill bara returnera sant om alla är "X" eller om alla är "O"
        if(this.gameField[arr1] === '') return false;
        return this.gameField[arr1] === this.gameField[arr2] && this.gameField[arr2] === this.gameField[arr3];
    }


    // loopar över 0,1,2
    // Med bara dessa siffror kan det räknas ut 0 till 9 siffror
    // sedan matas dessa siffror till check3Equal funktioner om alla är "X" eller alla "O"
    /*
    * första loopen: 0
    * vinnare första raden?
    * check3Equal(i*3, i*3+1, i*3+2) => check3Equal(0*3, 0*3+1, 0*3+2) => check3Equal(0, 1, 2);
    *
    * vinnare i första kolumnen?
    * check3Equal(i, i+3, i+6) => check3Equal(0, 0+3, 0+6) => check3Equal(0, 3, 6)
    *
    * */
    /*
    * andra loopen: 1
    *
    * vinnare andra raden?
    * check3Equal(i*3, i*3+1, i*3+2) => check3Equal(1*3, 1*3+1, 1*3+2) => check3Equal(3, 4, 5);
    *
    * vinnare i första kolumnen?
    * check3Equal(i, i+3, i+6) => check3Equal(1, 1+3, 1+6) => check3Equal(1, 4, 7)
    *
    * */
    /*
    * andra loopen: 2
    *
    * vinnare andra raden?
    * check3Equal(i*3, i*3+1, i*3+2) => check3Equal(2*3, 2*3+1, 2*3+2) => check3Equal(6, 7, 8);
    *
    * vinnare i första kolumnen?
    * check3Equal(i, i+3, i+6) => check3Equal(2, 2+3, 2+6) => check3Equal(2, 5, 8)
    *
    * */
    for(let i = 0; i < 3; ++i) {
        if(check3Equal(i*3, i*3+1, i*3+2) || check3Equal(i, i+3, i+6)) {
            let winner;
            switch (i) {
                case 0:
                    winner = this.gameField[0];
                    break;
                case 1:
                    winner = this.gameField[4];
                    break;
                case 2:
                    winner = this.gameField[8];
                    break;
            }
            return winner === this.playerOne? 1: 2;
        }
    }

    // kollar värden på diagonal positionerna är densamma, i så fall returnera vinnaren
    if(check3Equal(0, 4, 8) || check3Equal(2, 4, 6)) {
        return this.gameField[4] === this.playerOne? 1: 2;
    }

    // om det är inga plats på brädan, då är matchen oavgjort för det finns drag att göra.
    if(this.gameField.every(x => x !== "")) {
        return 3;
    }

    // ingen vinner
    return 0;
}

function initiateGame() {
    // Göm formuläret genom att lägga till klassen ”d-none” på formulärelementet
    let form = document.querySelector("form");
    form.classList.add("d-none");

    // Visa spelplanen genom att ta bort klassen ”d-none” på elementet med id ”game-area”
    let gameArea = document.getElementById("game-area");
    gameArea.classList.remove("d-none");

    // Ta bort textinnehållet i elementet med id ”errorMsg”.
    let errorMsg = document.getElementById("errorMsg");
    errorMsg.innerHTML = "";

    // Spara Spelare 1’s namn i objektet oGameData (oGameData.nickNamePlayerOne)
    let nick1 = document.getElementById("nick1");
    oGameData.nickNamePlayerOne = nick1.value;

    // Spara Spelare 2’s namn i objektet oGameData (oGameData.nickNamePlayerTwo)
    let nick2 = document.getElementById("nick2");
    oGameData.nickNamePlayerTwo = nick2.value;

    // Spara Spelare 1’s färg i objektet oGameData (oGameData. colorPlayerOne)
    let color1 = document.getElementById("color1");
    oGameData.colorPlayerOne = color1.value;

    // Spara Spelare 2’s färg i objektet oGameData (oGameData. colorPlayerTwo)
    let color2 = document.getElementById("color2");
    oGameData.colorPlayerTwo = color2.value;

    // Här hämtas checkboxen om användaren valde att tiden per drag. Sen sätter värdet på den till oGameData.timerEnabled
    let timerEnabled = document.getElementById("timerEnabled");
    oGameData.timerEnabled = timerEnabled.checked;

    // Töm spelplanen genom att använda querySelector för att hämta ut alla td-element på
    // planen och sedan loop igenom dem och sätta textContent=’’ samt bakgrundsfärg till
    // vit
    let td_elements = document.getElementsByTagName("td");
    for(let i = 0; i < td_elements.length; i++) {
        let td_element = td_elements[i];
        td_element.textContent = '';
        td_element.style.backgroundColor = '#ffffff';
    }

    // Deklarera de lokala variablerna ”playerChar” och ”playerName”
    let playerChar, playerName;

    // Slumpa fram vilken spelare som skall göra första draget
    let rand = Math.random();
    if(rand < 0.5) {
        playerChar = oGameData.playerOne;
        playerName = oGameData.nickNamePlayerOne;
        oGameData.currentPlayer = oGameData.playerOne;
    } else if(rand >= 0.5) {
        playerChar = oGameData.playerTwo;
        playerName = oGameData.nickNamePlayerTwo;
        oGameData.currentPlayer = oGameData.playerTwo;
    }

    // Ändra texten i h1-elementet som ligger i div-elementet med klassen ”jumbotron”
    let h1_element = document.querySelector("h1");
    h1_element.textContent = `Aktuell spelare är ${playerName} (${playerChar})`;

    // om timer checkboxen är checkad, skapas ett element som visar tiden och ett element som visar animerad indikator
    if(oGameData.timerEnabled) {
        // här skapas "p" elementet med texten som visar tiden och attribute id till timer.
        let timer_element = document.createElement("p");
        timer_element.setAttribute("id", "timer");
        let timer_txt = document.createTextNode("5:0");
        timer_element.appendChild(timer_txt);

        // här skapar en animerad indikator med id "bar" och har
        let bar = document.createElement("div");
        bar.setAttribute("id", "bar");
        bar.style.animationDuration = "5s";
        bar.classList.add("timer-bar")


        // sen tiden och indikatorn ska visas efter huvud rubriken
        let parent = h1_element.parentElement;
        parent.appendChild(bar);
        parent.appendChild(timer_element);

    }

    gameTimer();

    // Lägg en lyssnare på tabellen innehållande spelplanen som lyssnar efter händelsen
    // ”klick”. Vid klick skall funktionen/metoden executeMove anropas.
    let table = document.querySelector("table");


    table.addEventListener("click", executeMove);
}

function executeMove(e) {
    let td = e.target;

    // Kontrollera att den klickade cellen är ledig
    if(oGameData.gameField[td.dataset.id] === '') {
        let h1_element = document.querySelector("h1");

        oGameData.gameField[td.dataset.id] = oGameData.currentPlayer;

        if(oGameData.currentPlayer === oGameData.playerOne) {
            td.style.backgroundColor = oGameData.colorPlayerOne;
            td.textContent = oGameData.playerOne;

            oGameData.currentPlayer = oGameData.playerTwo;
            h1_element.textContent = `Aktuell spelare är ${oGameData.nickNamePlayerTwo} (${oGameData.playerTwo})`;

        } else {
            td.style.backgroundColor = oGameData.colorPlayerTwo;
            td.textContent = oGameData.playerTwo;

            oGameData.currentPlayer = oGameData.playerOne;
            h1_element.textContent = `Aktuell spelare är ${oGameData.nickNamePlayerOne} (${oGameData.playerOne})`;
        }


        // kontrollera om det är någon vinnare eller oavgjort annars fortsätt spelet
        let gameOverCheck = oGameData.checkForGameOver();
        if(gameOverCheck > 0) {
            // Ta bort lyssnaren (klick) på tabellen
            let table = document.querySelector("table");
            table.removeEventListener("click", executeMove);

            // Ta bort klassen ”d-none” på formuläret
            let form = document.querySelector("form");
            form.classList.remove("d-none");

            // ta bort setInterval, tid element och indikator elementet
            if(oGameData.timerEnabled) {
                // Här ser till att ta bort timer
                clearInterval(oGameData.timerId);
                oGameData.timerId = null;
                // tar bort elementet som visar tider
                let timer_element = document.getElementById("timer");
                timer_element.remove();
                // tar bort animerade indikatorn
                let bar = document.getElementById("bar");
                bar.classList.remove("timer-bar-animation");
                bar.remove();
            }

            // skriver ut vinnarmeddelande eller oavgjort baserat på rättningsmetoden
            switch (gameOverCheck) {
                case 1:
                    h1_element.textContent = `Vinnare är ${oGameData.nickNamePlayerOne} (${oGameData.playerOne})! Spela igen?`;
                    break;
                case 2:
                    h1_element.textContent = `Vinnare är ${oGameData.nickNamePlayerTwo} (${oGameData.playerTwo})! Spela igen?`;
                    break;
                case 3:
                    h1_element.textContent = `Det blev oavgjort! Spela igen?`;
                    break;
            }

            // Lägg till klassen ”d-none” på elementet med id=game-area
            let gameArea = document.getElementById("game-area");
            gameArea.classList.remove("d-none");

            // Anropa metoden ” initGlobalObject” i oGameData
            oGameData.initGlobalObject();

        } else {
            // varje drag, tiden måste börja om
            gameTimer();
        }
    }
}

function switchTurn() {
    let h1_element = document.querySelector("h1");
    if(oGameData.currentPlayer === oGameData.playerOne) {
        oGameData.currentPlayer = oGameData.playerTwo;
        h1_element.textContent = `Aktuell spelare är ${oGameData.nickNamePlayerTwo} (${oGameData.playerTwo})`;
    } else {
        oGameData.currentPlayer = oGameData.playerOne;
        h1_element.textContent = `Aktuell spelare är ${oGameData.nickNamePlayerOne} (${oGameData.playerOne})`;
    }
}

function gameTimer() {
    if(oGameData.timerEnabled) {
        // spelaren gjorde sitt drag, tiden måste börja om från noll för andra spelaren
        clearInterval(oGameData.timerId);
        // här börja tiden 5000ms (5s), i intervall funktionen minskas värdet med 100ms.
        let timeCounter = 5000; //ms (5 sekunder)
        let s, ms;
        let timer_element = document.getElementById("timer");
        let bar = document.getElementById("bar");
        // animering måste börja om från noll för varje drag.
        bar.classList.remove("timer-bar-animation");
        oGameData.timerId = setInterval(() => {
            // animering startas
            bar.classList.add("timer-bar-animation");
            // om tiden har gått ut
            if(timeCounter <= 0) {
                // animering avslutas
                bar.classList.remove("timer-bar-animation");
                // växla turen
                switchTurn();
                // börjar tiden på nytt
                timeCounter = 5000;
            }
            // räknar ut sekunder och millisekunder för att visa till spelaren
            s = ~~(timeCounter / 1000); //
            ms = (timeCounter % 1000) / 100;
            //console.log(`${s}:${ms}`);
            // här visas tiden under huvud rubriken
            timer_element.innerText = `${s}:${ms}`;
            // tiden går ner 100ms
            timeCounter -= 100;
        }, 100);
    }
}

function validateForm() {
    let errorMsg = document.getElementById("errorMsg");


    try {
        let nick1 = document.getElementById("nick1");
        let nick2 = document.getElementById("nick2");
        let color1 = document.getElementById("color1");
        let color2 = document.getElementById("color2");


        if(nick1.value.length < 5 || nick2.value.length < 5) {
            throw {
                errorMessage: "Nickname (för båda spelarna) måste vara minst 5 tecken långt"
            }
        }

        if(nick1.value === nick2.value) {
            throw {
                errorMessage: "Nickname för spelare 1 och spelare 2 får inte vara lika"
            }
        }

        if(color1.value === color2.value
        || color1.value === "#ffffff"
        || color2.value === "#ffffff"
        || color1.value === "#000000"
        || color2.value === "#000000") {
            throw {
                errorMessage: "Valda färger får inte vara vit, svart eller lika för båda spelarna."
            }
        }

        initiateGame();
    } catch (oError) {
        if(errorMsg !== null){
            errorMsg.innerHTML = oError.errorMessage;
        }
    }
}

window.addEventListener("load", () => {
    oGameData.initGlobalObject();

    let gameArea = document.getElementById("game-area");
    if(gameArea != null) {
        gameArea.setAttribute("class", "d-none");
    }


    let startBtn = document.getElementById("newGame");
    if(startBtn != null) {
        // varje gång den här start knappen är pressad utlöses validateForm funktionen
        startBtn.addEventListener("click", validateForm);
        // här skapad en div element
        let div = document.createElement("div");
        // här skapas en label element och den ska ha en attribute "for" med värdet "timerEnabled"
        let label = document.createElement("label");
        label.setAttribute("for", "timerEnabled");
        // input element skapas, har tre attributes, name, type och id.
        let input = document.createElement("input");
        input.setAttribute("name", "timerEnabled");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", "timerEnabled");
        // label elementet får visa en text
        let labelText = document.createTextNode("Vill du begränsa tiden till 5 sekunder per drag?");
        label.appendChild(labelText);

        // div elementet lägger till både label och input
        div.appendChild(input);
        div.appendChild(label);

        // sedan start knappen förälder får bli en flex layout och lägga till div elementet före start knoppen
        startBtn.parentElement.style.display = "flex";
        startBtn.parentElement.style.justifyContent = "space-between";
        startBtn.parentElement.style.alignItems = "center";
        startBtn.parentElement.insertBefore(div, startBtn);
    }
})