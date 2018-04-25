const program = require('commander');
const youtube2ipfs = require('../index.js');

program
  .version('0.0.14')
  .option('-u, --url <url>', 'youtube url')
  .option('-i, --ip or host name <ip>', 'ip or host name')
  .option('-p, --port <port> ', 'port on host')
  .option('-n, --protocol <protocol> ', 'network protocol')
  .parse(process.argv);

program.parse(process.argv);

var ipfsServerInfo = {
    host: 'localhost',
    port: '5001',
    protocol: 'http'
};

if ( typeof program.url !== 'undefined' ){
    youtube_url=program.url;
} else if ( typeof program.args[0] !== 'undefined'){
    youtube_url=program.args[0];
} else {
}

if (program.host){
    ipfsServerInfo.host=program.host;
}
if (program.port){
    ipfsServerInfo.port=program.port;
}
if (program.protocol){
    ipfsServerInfo.protocol=program.protocol;
}

youtube2ipfs(youtube_url, ipfsServerInfo)
