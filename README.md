![Platform Node-RED](https://img.shields.io/badge/Platform-Node--RED-red.png)
![Contribution WAGO-CC100](https://img.shields.io/badge/Contribution-WAGO--CC100-green.png)
![License](https://img.shields.io/badge/License-MIT-blue.png)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![NPM download](https://img.shields.io/badge/@plus4nodered-WAGO--CC100-green.png)](https://npm-stat.com/charts.html?package=@plus4nodered/node-red-contrib-wago-cc100)
[![Repository GitHub](https://img.shields.io/badge/Repository-GitHub-orange.png)](https://github.com/Iniationware/CC100-Node-Red)
[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/Iniationware/CC100-Node-Red)

# WAGO CC100 Node-RED Contribution Package

## International IIoT Website PLUS for Node-RED

For an international area, [Iniationware][1] has provided the [PLUS for Node-RED International][2] website.

## IIoT Webseite Deutschland PLUS für Node-RED

Für einen deutschsprachigen Bereich hat [Iniationware][1] die Webseite [PLUS für Node-RED Deutschland][3] bereitgestellt.

## node-red-contrib-wago-cc100

A Node-RED library to control the IO's on your WAGO CC100.
It enables to use Node-RED for a directly read and write 
of the digital Ins and Outs and also the analog Ins and Outs.

### Async Hint

Note: This contribution package works asynchronously!

### Examples

Here some examples how to control the digital and analog signals of the WAGO CC100:

| Digital                                                                                                                                  | Analog |
|------------------------------------------------------------------------------------------------------------------------------------------| --- |
| <img src="https://github.com/Helmut-Saal/CC100-Node-Red/blob/master/Digital.png?raw=true" alt="Digital EA" height="250px" width="450px"> | <img src="https://github.com/Helmut-Saal/CC100-Node-Red/blob/master/Analog.png?raw=true" alt="Analog EA" height="250px" width="450px"> |


Download our examples flow from the [GitHub Demo](https://github.com/Helmut-Saal/CC100-Node-Red/blob/master/examples/)

You can find the examples also via the "Hamburger-Menu" inside Node-RED. 
Goto Import and then examples and see our CC100 entries.


### CC100 Provisioning-Tool

Watch the video from Kurt Braun about the [CC100 and Node-RED](https://www.youtube.com/watch?v=5s5g0veA5kA)

Access the CC100 via SSH and start with the provisioning tool.

	wget -O menu.sh https://raw.githubusercontent.com/braunku/pfc-provisioning-tool/main/menu.sh && sh menu.sh

### Docker

Docker list of running containers:
    
    docker ps

Docker list of available image on the CC100 device for now:

    docker images

*Note:* You have to run the Node-RED Container 
with privileged mode if you do not use the provisioning-tool

    docker run -d --name wago-node-red \
    -d --privileged=true --user=root \
    --network=host \
    -v node_red_user_data:/data \
    nodered/node-red

### Portainer CE

Portainer is possible but needs more than 200 MB of space.

*Note:* Without extra memory use the command line 
if you want to use that space for other containers.

	docker run -d --name=portainer \
	--network=host \
	--restart=always \
	--pull=always \
	-v /var/run/docker.sock:/var/run/docker.sock \
	-v portainer_data:/data \
	portainer/portainer-ce

## Contributors

This project exists thanks to all the people who contribute. 

[Contributing Information](./.github/CONTRIBUTING.md)

<a href="https://github.com/Helmut-Saal/CC100-Node-Red/graphs/contributors">Contributors Graph</a>

## For Developers

See the prepared scripts of the package and the additional Shell scripts 
to clean, update, or upgrade this NPM package.

* dev-link, dev-unlink (with local Node-RED)
* unit testing
* coverage
* docs generation
* standard-version
* Change-Log
* Gulp build and compression via npm scripts

# License

MIT


[1]:https://iniationware.com/
[2]:https://www.noderedplus.de/
[3]:https://www.noderedplus.de/de/