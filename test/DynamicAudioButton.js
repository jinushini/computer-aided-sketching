
function DynamicAudioLink(){ 
    open("http://www.pcedu.com.cn") 
} 

function AudioOver() { 
    document.Audio.button.style.background="#999999" 
    document.Audio.button.style.color="white" 
} 


function AudioDown() { 
    document.Audio.button.style.color="#cccccc" 
} 


function AudioOut() { 
    document.Audio.button.style.background="#666666" 
    document.Audio.button.style.color="#ffffff" 
} 


function playHome()  
{ 
    document.all.sound.src = "Button3.wav"; 
} 

document.write('<bgsound id="sound">') 

document.write('<style type="text/css">'+'<!--') 
document.write('.select{background:#666666;border-color:"#999999";color:"#ffffff";font-family:Arial,Helvetica,Verdana;font-size:10pt;font-weight: bold;}'+'-->'+'</STYLE>') 

document.write('<center><form name=Audio><input class="select" name=button type="button" value="Dynamic Audio" onclick="DynamicAudioLink()" onMouseOver="AudioOver();playHome()" onMouseDown="AudioDown()" onMouseOut="AudioOut()"></form></center>')