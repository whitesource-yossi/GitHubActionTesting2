const fs = require('fs');
const https = require('follow-redirects').https;
// const github = require('@actions/github');
const core = require('@actions/core');
const cmd = require('node-cmd');

var download = function (url, dest, cb) {
    try {
        var file = fs.createWriteStream(dest);
        var request = https.get(url, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close(cb);  // close() is async, call cb after close completes.
                console.log('Finished downloading file');
            });
        });
        //     .on('error', function (err) { // Handle errors
        //     fs.unlink(dest); // Delete the file async. (But we don't check the result)
        //     if (cb) {
        //         cb(err.message);
        //     }
        // });
    } catch (e) {
        // fs.unlink(dest); // Delete the file async. (But we don't check the result)
        if (cb) {
            cb(e.message);
        }
    }
};

var execShellCommand = function(command) {
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

var logCmdData = function(data) {
    console.log('Cmd data', data)
};

var logCmdError = function(message, error) {
    console.log(message + error)
};

// var ls = execShellCommand('ls');
// var dockerVersion = execShellCommand('docker -v');
// var dockerLogin = execShellCommand('docker login docker.pkg.github.com -u whitesource-yossi -p ' + process.env.YOS_SEC);
// var dockerPull = execShellCommand('docker pull docker.pkg.github.com/whitesource-yossi/githubactiontesting2/localdjango:1.0');
// var dockerImages = execShellCommand('docker images');
// var uaDockerScan = execShellCommand('java -jar wss-unified-agent.jar -d . -apiKey ' + process.env.YOS_API_KEY + ' -projectToken ' + process.env.YOS_PROJ + ' -noConfig true -docker.scanImages true -generateScanReport true -userKey ' + process.env.YOS_USER_KEY, 'docker images result ');

download("https://github.com/whitesource/unified-agent-distribution/releases/latest/download/wss-unified-agent.jar", "wss-unified-agent.jar");
// , function (err) {
//     if (err) { console.log("Error downloading file " + err) }
//     else {
//         try {
//             console.log('success');
//             // dockerVersion.then(
//             //     result => {
//             //         logCmdData(result);
//             //     }
//             // ).catch(err => logCmdError('Exception docker version is : ', err));
//             //
//             // ls.then(
//             //     result => {
//             //         logCmdData(result);
//             //         // return dockerLogin;
//             //     }
//             // ).catch(err => {logCmdError("Exception ", err)});
//
//             // ).then(
//             //     result => {
//             //         logCmdData(result);
//             //         return dockerPull;
//             //     }
//             // ).catch(err => logCmdError('Exception docker login response ', err)
//             // ).then(
//             //     result => {
//             //         logCmdData(result);
//             //         return dockerImages;
//             //     }
//             // ).catch(err => logCmdError('Exception docker pull response ', err)
//             // ).then(
//             //     result => {
//             //         logCmdData(result);
//             //         // return uaDockerScan;
//             //     }
//             // ).catch(err => logCmdError('Exception docker images result ', err));
//             // ).then(
//             //     result => {
//             //         logCmdData(result);
//             //         console.log("Yos finish all");
//             //     }
//             // ).catch(err => logCmdError("Exception ua run results ", err));
//
//
//         } catch (error) {
//             core.setFailed('Yos ' + error.message);
//         }
//     }
// });