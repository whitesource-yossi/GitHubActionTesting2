const fs = require('fs');
const https = require('follow-redirects').https;
// const github = require('@actions/github');
const core = require('@actions/core');
const cmd = require('node-cmd');

var download = function (url, dest, cb) {
    var file = fs.createWriteStream(dest);
    var request = https.get(url, function (response) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);  // close() is async, call cb after close completes.
            console.log('Finished downloading file');
        });
    }).on('error', function (err) { // Handle errors
        fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) {
            cb(err.message);
        }
    });
};

var execShellCommand = function (command) {
    return new Promise((resolve, reject) => {
        cmd.get(command, (err, data, stderr) => {
            if (err) {
                reject(stderr);
            } else {
                resolve(data);
            }
        });
    });
};

var logCmdData = function (data) {
    console.log('Cmd data', data)
};

var logCmdError = function (message, error) {
    console.log(message + error)
};

// download('https://github.com/whitesource/unified-agent-distribution/releases/latest/download/wss-unified-agent.jar', "wss-unified-agent.jar", function (err) {
download('https://www.google.com/url?q=https://wss-qa.s3.amazonaws.com/unified-agent/integration/wss-unified-agent-integration-763.jar&sa=D&source=hangouts&ust=1570121956889000&usg=AFQjCNHlRE7HeRApxiFzyM5xh_V2FsnCpg', "wss-unified-agent.jar", function (err) {
    try {
        var dockerVersion = execShellCommand('docker -v');
        dockerVersion.then(
            result => {
                logCmdData(result);
                return execShellCommand('ls -alF');
            }
        ).then(
            result => {
                logCmdData(result);
                return execShellCommand('docker login docker.pkg.github.com -u whitesource-yossi -p ' + process.env.YOS_SEC);
            }
        ).then(
            result => {
                logCmdData(result);
                return execShellCommand('docker pull docker.pkg.github.com/whitesource-yossi/githubactiontesting2/localdjango:1.0');
            }
        ).then(
            result => {
                logCmdData(result);
                return execShellCommand('docker images');
            }
        ).then(
            result => {
                logCmdData(result);
                return execShellCommand('java -jar wss-unified-agent.jar -d . -apiKey ' + process.env.YOS_API_KEY + ' -projectToken ' + process.env.YOS_PROJ + ' -noConfig true -docker.scanImages true -generateScanReport true -userKey ' + process.env.YOS_USER_KEY);
            }
        ).then(
            result => {
                return logCmdData(result);
            }
        )
        .catch(err => {
                logCmdError("Exception ", err)
        });
    } catch (error) {
        core.setFailed(error.message);
    }
});