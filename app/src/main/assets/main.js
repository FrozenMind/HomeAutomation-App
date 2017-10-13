//on start do some stuff as init
$(document).ready(function() {
    //do init stuff
    init()
})

function init(){
    //display menu only
    menuClick(0)
    //log in to server
    Android.sendToServer(JSON.stringify({ cmd: 10, id: 1, name: "Valentin" }))
}

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
    var data = JSON.parse(msg)
    switch(data.cmd){
        case 12: //get interval
            showOsData(data)
            break
    }
}

function menuClick(id){
    switch(id){
        case 0: //main menu
            $(".menuArea").show()
            $(".espArea").hide()
            $(".sensorArea").hide()
            $(".piArea").hide()
            //tell server to stop intervals
            Android.sendToServer(JSON.stringify({ id: 1, cmd: 12 }))
            break
        case 1: //esp
            $(".menuArea").hide()
            $(".espArea").show()
            $(".sensorArea").hide()
            $(".piArea").hide()
            break
        case 2: //sensor
            $(".menuArea").hide()
            $(".espArea").hide()
            $(".sensorArea").show()
            $(".piArea").hide()
            break
        case 3: //raspberry
            $(".menuArea").hide()
            $(".espArea").hide()
            $(".sensorArea").hide()
            $(".piArea").show()
            //tell server to start os data
            Android.sendToServer(JSON.stringify({ id: 1, cmd: 11 }))
            break
    }
}

function showOsData(data){
    $(".piCollector").append($("<div class='piItem item'>Cores <br />" + data.core + "</div>"))
    $(".piCollector").append($("<div class='piItem item'>Mem (MB) <br />" + data.mem.free + " / " + data.mem.total + "</div>"))
    $(".piCollector").append($("<div class='piItem item'>Mem (%) <br />" + mem.percentage + "</div>"))
    $(".piCollector").append($("<div class='piItem item'>Uptime <br />" + data.uptime + "</div>"))
    $(".piCollector").append($("<h3>Network</h3>"))
    for (var n in data.network) {
      $(".piCollector").append($("<div class='piItem item'>" + n + "<br />" + data.network[n].address + "</div>"))
    }
}
