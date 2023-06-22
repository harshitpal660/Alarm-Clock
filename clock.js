// step 1 - Define some basic variables

    // used to display digital clock
    let Display = document.getElementById("clock");

    // 
    let Display2 = document.getElementsByClassName("date")[0];
    let Display3 = document.getElementsByClassName("day")[0];
    // audio file for alarm
    const audio = new Audio("audio.mp3");
    audio.loop = true;

    
    // variable to store alarm time so that whenever curr time reaches this time bell rang
    let alarmTime = [];
// --------------------------------------------------------------------------------------------------

// step 2 - Display the Clock

    function updateTime(){

        Display.innerText = getCurrTime();
        Display2.innerText = getCurrDate();
        Display3.innerText = getCurrDay();

        // condition to play audio
        for(let t of alarmTime){
            if(Display.innerText == t){
                audio.play();
            }
        }
        

    }
    // function to format time so that it will be in general format of hh:mm:ss
    function formateTime(time){
        if(time<10) {
            return '0'+time;
        }
        return time;
    }

    // setting inteval of 1 sec so that our digital clock displayed in real time 
    setInterval(updateTime,1000);
// -------------------------------------------------------------------------------------------------------------------

// step 3 - Set the Alarm
    function setAlarm(){
        // input variable store the string/time given by user 
        let input = document.getElementsByTagName("input")[0];
        // if the user try to set time without providing input value it will create a alert
        if(input.value == ""){
            window.alert("Provide Time");
        }else{
            let currTime = getCurrTime();
            // if user try to set alarm for past time then it will show an alert
            if(currTime>input.value.slice(-5)+": 00"){
                window.alert("can't set alarm for past");
                return;
            }
            alarmTime.push(input.value.slice(-5)+": 00");

                
            // createElement() is used for
            // creating a new element
            let type = document.createElement('li');

            // providing text to created element
            type.appendChild(document.createTextNode(input.value.slice(-5)+":00"));
            
            // apending cihld to alarm list
            document.getElementsByTagName("ul")[0].appendChild(type);
            window.alert("Alarm set for : "+input.value.slice(-5)+": 00");
        }
    }

    // function to get the curr time at the moment
    function getCurrTime(){
        const date = new Date();
        const hour = formateTime(date.getHours());
        const min = formateTime(date.getMinutes());
        const sec = formateTime(date.getSeconds());

        return hour+":"+min+":"+sec;
    }
    function getCurrDate(){   
        const date = new Date();
        const yy = formateTime(date.getFullYear());
        const mm = formateTime(date.getMonth());
        const dd = formateTime(date.getDate());

        return dd+"-"+mm+"-"+yy;
    }
    function getCurrDay(){
        const day = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        const date = new Date();
        const d = formateTime(date.getDay());
        return day[d-1];
    }
// ----------------------------------------------------------------------------------------------------------------------------

// step 4 - Clear the Alarm
    function clearAlarm(){
        audio.pause(); 
    }
// ----------------------------------------------------------------------------------------------------------------------------
// step 5 - show all Alarms
    function showAlarms(){
        let show = document.getElementById("list");
        let allAlarms = document.getElementsByClassName("all-alarm")[0];
        if(show.style.display == "block"){
            allAlarms.innerText = "All Alarms";
            show.style.display = "none";
        }else{
            show.style.display = "block";
            allAlarms.innerText = "Hide";
        }
        
    }