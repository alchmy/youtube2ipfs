var fs = require('fs');
var youtubedl = require('youtube-dl');
var ipfsAPI = require('ipfs-api');

function bytesToSize(bytes) {
    let sizes = ['Bytes', 'KB', 'MB'];
    if (bytes === 0) {
        return 'n/a';
    }
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};
var ipfsServerInfo = { 
    host: 'localhost', 
    port: '5001', 
    protocol: 'http'
}
var ipfs_base_url = "https://ipfs.io/ipfs"

module.exports = function youtube2Ipfs( youtube_url, ipfsServerInfo = ipfsServerInfo){ 
    var ipfs=ipfsAPI( ipfsServerInfo);
    var filename;
    console.log("youtube_url: " + youtube_url);
    console.log("ipfsServerInfo: " + ipfsServerInfo);
    var video = youtubedl(
        youtube_url, 
        ['--format=18'],
        { cwd: __dirname }
    );
    video.on('info', function(info) {
        console.log('Download started');
        console.log('filename: ' + info._filename);
        console.log('size: ' + info.size);
        filename=info._filename;
        video.pipe(
            fs.createWriteStream(filename)
        );
        video.on('end', function(){
            fs.readFile(filename, function (err, data){
                ipfs.files.add( 
                    [{
                        path: filename,
                        content: data
                    }], 
                    function (err, files){
                        console.log( "path: " + files[0].path );
                        console.log( "url: " + ipfs_base_url + "/" + files[0].hash );
                        console.log( "size: " + bytesToSize(files[0].size) );
                    }
                )
            })
        })
    });
};               
