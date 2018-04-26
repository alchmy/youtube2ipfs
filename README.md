# youtube2ipfs

It's all in the name. ☺ Downloads from youtube and uploads to ipfs.

## Summary

* [Installation](#user-content-installation)
* [Usage](#user-content-usage)
* [Feedback](#user-content-feedback)

### Installation

```bash
npm install --global @alchmy/youtube2ipfs
```

If you need to install a daemon to receive the ipfs files. This will download ipfs, install it, and set it up as a service that automatically restarts on reboot.
```bash
git clone https://github.com/alchmy/librarian.git
cd librarian
chmod +x ipfs-linux-install.sh
./ipfs-linux-install
```


### Usage

#### Basic

By default, it is currently assumed that you have an IPFS daemon listening on localhost:5001, which is the default configuration of an IPFS daemon. If you wish to send to another endpoint, see the Advanced section.

```bash
youtube2ipfs 'https://www.youtube.com/watch?v=8wLCmDtCDAM'
```

Make sure that you put the main parameter in quotes so the shell does not try to expand any of the special characters.

#### Advanced


##### Sending to non-default endpoints.
This is for sending the video to a daemon not on localhost:5001. Just specify the flags --ip, --port, and --protocol.

```bash
youtube2ipfs 'https://www.youtube.com/watch?v=8wLCmDtCDAM' --ip '164.13.543.32' --port '3454' --protocol 'http'
```

##### To come

* Add an option to make persistant endpoint configuration. 
* When no node is detected, offer to install an IPFS daemon for the user and configure appropriately if needed.


### Feedback

Please let me know if you find this package useful and in what way you use it. Also tell me if there are any features you would like me to add in order that you might be able to integrate it into your project. 
