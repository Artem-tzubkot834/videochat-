var conn = peer.connect(peerID); 
peer.on('connection', function(conn) {
    conn.on('data', function(data){
      console.log(data);
    });
  });