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

 function getStream(callback) {
    if (navigator.getDisplayMedia) {
        navigator.getDisplayMedia({
            video: true
        }).then(screenStream => {
            callback(screenStream);
        });
    } 
}
getStream(video);