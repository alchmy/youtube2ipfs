const fs = require('fs');
const youtubedl = require('youtube-dl');
const ipfsAPI = require('ipfs-api');
const chalk = require('chalk');

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
    console.log(chalk.yellow("looking up file..."));

    var ipfs=ipfsAPI( ipfsServerInfo);
    var filename;

    var video = youtubedl(
        youtube_url, 
        ['--format=18'],
        { cwd: __dirname }
    );
    video.on('info', function(info) {
        console.log(chalk.green('❰❰--Download started--❱❱'));
        console.log(chalk.green("src:        ") + youtube_url);
        console.log(chalk.green("local:      ") + info._filename);
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
                        console.log( chalk.green("dest:       ") + ipfs_base_url + "/" + files[0].hash );
                        console.log( chalk.green("size:       ") + bytesToSize(files[0].size) );
                    }
                )
            })
        })
    });
};               
