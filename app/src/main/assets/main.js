//on start do some stuff as init
$(document).ready(function() {
    $(".espControl").hide()
})


var currentESP = {}
    , currentMode = {}

function selectESP(id){
    switch(id){
        case 0:
            currentESP.name = "Schreibtisch Valentin"
            break;
        case 1:
            currentESP.name = "Vitrine"
            break;
    }
    currentESP.id = id
    Android.showToast("ESP " + currentESP.name + " selected", 0)
}

function selectMode(id){
    switch(id){
            case 0:
                currentMode.name = "Color"
                break;
            case 1:
                currentMode.name = "RandomBlink"
                break;
            case 2:
                currentMode.name = "PingPongClassic"
                break;
            case 3:
                currentMode.name = "PingPongRGB"
                break;
            case 4:
                currentMode.name = "PingPongDouble"
                break;
            case 5:
                currentMode.name = "RainbowClassic"
                break;
            case 6:
                currentMode.name = "Turn LED OFF"
                break;
        }
        currentMode.id = id
    Android.showToast("Mode " + currentMode.name + " selected", 0)
}

//send the selected stuff to the server
function sendToServer(){
    Android.showToast("Send to Server: ESP " + currentESP.name + " Mode " + currentMode.name, 1);
    Android.sendToServer(JSON.stringify({ cmd: 1, esp: currentESP, mode: currentMode }))
}

function receiveFromServer(msg){
    Android.showToast(msg, 0);
}

function menuClick(id){
    switch(id){
        case 0: //main menu
            $(".mainMenu").show()
            $(".espControl").hide()
            $(".sensor").hide()
            $(".raspberry").hide()
            break
        case 1: //esp
            $(".mainMenu").hide()
            $(".espControl").show()
            $(".sensor").hide()
            $(".raspberry").hide()
            break
        case 2: //sensor
            $(".mainMenu").hide()
            $(".espControl").hide()
            $(".sensor").show()
            $(".raspberry").hide()
            break
        case 3: //raspberry
            $(".mainMenu").hide()
            $(".espControl").hide()
            $(".sensor").hide()
            $(".raspberry").show()
            break
    }
}
