var myLocalID = -1

//on start do some stuff as init
$(document).ready(function() {
    //do init stuff
    init()
})

function init(){
    //log in to server
    sendToServer({ cmd: 10, id: myLocalID, name: 'Valentin' })
    //display menu on1ly
    menuClick(0)
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
}

//send the selected stuff to the server
function sendToServer(msg){
    Android.showToast(JSON.stringify(msg), 0);
    Android.sendToServer(JSON.stringify(msg))
}

function receiveFromServer(msg){
    Android.showToast(msg, 0);
    var data = JSON.parse(msg)
    switch(data.cmd){
        case 13: //get interval
            showOsData(data)
            break
        case 100: //init id
            myLocalID = data.id
            Android.useID(data.id)
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
            sendToServer({ id: myLocalID, cmd: 12 })
            break
        case 1: //esp
            $(".menuArea").hide()
            $(".espArea").show()
            $(".sensorArea").hide()
            $(".piArea").hide()
            break
        case 2: //sensor
            $(".menuArmyLocalIDea").hide()
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
            sendToServer({ id: myLocalID, cmd: 11 })
            break
    }
}

var osLocker = false
function showOsData(data){
    if(!osLocker){
        $(".piCollector").append($("<div class='piItem item'><p>Cores</p> <p id='piCore'></p></div>"))
        $(".piCollector").append($("<div class='piItem item'><p>Mem (MB)</p> <p id='piMem'></p></div>"))
        $(".piCollector").append($("<div class='piItem item'><p>Mem (%)</p> <p id='piMemPercentage'></p></div>"))
        $(".piCollector").append($("<div class='piItem item'><p>Uptime</p> <p id='piUptime'></p></div>"))
        $(".piCollector").append($("<h3>Network</h3>"))
        for (var n in data.network) {
          $(".piCollector").append($("<div class='piItem item'><p>" + n + "</p> <p id='pi" + n + "'></p></div>"))
        }
        osLocker = true
    }

    $("#piCore").text(data.cores)
    $("#piMem").text(data.mem.free + " / " + data.mem.total)
    $("#piMemPercentage").text(data.mem.percentage)
    $("#piUptime").text(data.uptime)
    for (var n in data.network) {
        $("#pi" + n).text(data.network[n])
    }
}
