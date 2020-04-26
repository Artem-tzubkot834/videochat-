var callOptions={'iceServers': [
    {url: 'stun:95.xxx.xx.x9:3479',		
    username: "user",
    credential: "xxxxxxxxxx"},
    { url: "turn:95.xxx.xx.x9:3478",		
    username: "user",
    credential: "xxxxxxxx"}]
}; 
audioBin = true;
vidioBin = true;
peer= new Peer({config: callOptions}); 
peer.on('open', function(peerID) {
        document.getElementById('myid').innerHTML=peerID;			
    });
var peercall;
peer.on('call', function(call) {
      // Answer the call, providing our mediaStream
        peercall=call;
        document.getElementById('callinfo').innerHTML="Входящий звонок <button onclick='callanswer()' id='callanswer'>Принять</button><button onclick='callcancel()' id='callcancel'>Отклонить</button>";
    });
function callanswer() {
        navigator.mediaDevices.getUserMedia ({ audio: true, video: true }).then(function(mediaStream) {
        var video = document.getElementById('myVideo');		    				  
      peercall.answer(mediaStream); 
      video.srcObject = mediaStream; 
      document.getElementById('callinfo').innerHTML="Звонок начат... <button onclick='onCallClose()' id='callClose' >Завершить звонок</button>"; //информируем, что звонок начат, и выводим кнопку Завершить
      video.onloadedmetadata = function(e) {
        video.play();
      };
                  setTimeout(function() {          
                      document.getElementById('remVideo').srcObject = peercall.remoteStream; 
                      document.getElementById('remVideo').onloadedmetadata= function(e) {
                      document.getElementById('remVideo').play();
                    };
                  },1500);			  
        }).catch(function(err) { alert(err.name + ": " + err.message); });
    }
function callToNode(peerId) { // вызов
      navigator.mediaDevices.getUserMedia ({ audio: true, video: true }).then(function(mediaStream) {
      var video = document.getElementById('myVideo');				  
      peercall = peer.call(peerId,mediaStream); 
      peercall.on('stream', function (stream) { 
              setTimeout(function() {
              document.getElementById('remVideo').srcObject = peercall.remoteStream;
                  document.getElementById('remVideo').onloadedmetadata= function(e) {
                    document.getElementById('remVideo').play();
                  };
                  },1500);	
              });
              peercall.on('close', onCallClose);				  
              video.srcObject = mediaStream;
              video.onloadedmetadata = function(e) {
                video.play();
              };
        }).catch(function(err) { console.log(err.name + ": " + err.message); });
    }
    function onCallClose(peerId, stream){
      navigator.mediaDevices.getUserMedia ({ audio: true, video: true }).then(function(mediaStream){
        var video = document.getElementById('myVideo');		    				  
        video.srcObject = null;
        mediaStream = null;
        stream = null;
        peercall.answer(mediaStream); 
        video.srcObject = mediaStream; 
        document.getElementById('remVideo').srcObject = null;
        document.getElementById('remVideo').innerHTML = null;
        document.getElementById('callinfo').innerHTML="Звонок завершён";
        document.getElementById('otherPeerId').value = "";
        setTimeout(function(){
          document.getElementById('callinfo').innerHTML = " ";
        }, 3000)
      }).catch(function(err) { alert(err.name + ": " + err.message); });
    }
    function callcancel(stream){
      navigator.mediaDevices.getUserMedia ({ audio: true, video: true }).then(function(mediaStream){
        var video = document.getElementById('myVideo');		    				  
        video.srcObject = null;
        mediaStream = null;
        stream = null;
        peercall.answer(mediaStream); 
        video.srcObject = mediaStream; 
        peercall.remoteStream = null;
        document.getElementById('callinfo').innerHTML="Вы отклонили звонок";
        document.getElementById('otherPeerId').value = "";
        setTimeout(function(){
          document.getElementById('callinfo').innerHTML = " ";
        }, 3000)
      }).catch(function(err) { alert(err.name + ": " + err.message); });
    }
  