const fs = require('fs');
const https = require('follow-redirects').https;
const github = require('@actions/github');
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
        if (cb) cb(err.message);
    });
};

function execShellCommand(command) {
    return new Promise((resolve, reject) => {
        cmd.get(command, (err, data, stderr) => {
            if (err) {
                reject(stderr);
            } else {
                resolve(data);
            }
        });
    });
}

function logCmdData(data) {
    console.log('Cmd data', data)
}

function logCmdError(message, error) {
    console.log(message + error)
}

var dockerVersion = execShellCommand('docker -v');
var dockerLogin = execShellCommand('docker login docker.pkg.github.com -u whitesource-yossi -p ' + process.env.YOS_SEC);
var dockerPull = execShellCommand('docker pull docker.pkg.github.com/whitesource-yossi/githubactiontesting2/localdjango:1.0');
var dockerImages = execShellCommand('docker images');
var uaDockerScan = execShellCommand('java -jar wss-unified-agent.jar -d . -apiKey ' + process.env.YOS_API_KEY + ' -projectToken ' + process.env.YOS_PROJ + ' -noConfig true -docker.scanImages true -generateScanReport true -userKey ' + process.env.YOS_USER_KEY, 'docker images result ');

download("https://github.com/whitesource/unified-agent-distribution/releases/latest/download/wss-unified-agent.jar", "wss-unified-agent.jar", function () {
    try {
        // const greet = core.getInput('who-to-greet');
        // console.log(`greeting: ${greet}`);


        // cmd.get(
        //     'docker -v',
        //     function (err, data, stderr) {
        //         console.log('docker version is : ', data)
        //     }
        // );

        dockerVersion.then(
            result => {
                logCmdData(result);
            },
            err => {
                logCmdError('docker version is : ', err)
            }
        );

        dockerLogin.then(
            result => {
                logCmdData(result);
                return dockerPull;
            }
        ).catch(err => logCmdError('Exception docker login response ', err)
        ).then(
            result => {
                logCmdData(result);
                return dockerImages;
            }
        ).catch(err => logCmdError('Exception docker pull response ', err)
        ).then(
            result => {
                logCmdData(result);
                return uaDockerScan;
            }
        ).catch(err => logCmdError('Exception docker images result ', err)
        ).then(
            result => {
                logCmdData(result);
                console.log("Yos finish all");
            }
        ).catch(err => logCmdError("Exception ua run results ", err));

        // cmd.get(
        //     'docker login docker.pkg.github.com -u whitesource-yossi -p ' + process.env.YOS_SEC,
        //     function (err, data, stderr) {
        //         if (data) {
        //             console.log('docker login response ', data);
        //
        //             cmd.get(
        //                 'docker pull docker.pkg.github.com/whitesource-yossi/githubactiontesting2/localdjango:1.0',
        //                 function (err, data, stderr) {
        //                     if (data) {
        //                         console.log('docker pull result ', data);
        //                         let uaCommand = 'java -jar wss-unified-agent.jar -d . -apiKey ' + process.env.YOS_API_KEY + ' -projectToken ' + process.env.YOS_PROJ + ' -noConfig true -docker.scanImages true -generateScanReport true -userKey ' + process.env.YOS_USER_KEY;
        //                         console.log('ua run command is: ', uaCommand);
        //
        //                         cmd.get(
        //                             'docker images',
        //                             function (err, data, stderr) {
        //                                 if (data) {
        //                                     console.log('docker images: ', data);
        //
        //                                     cmd.get(uaCommand,
        //                                         // cmd.get("ls ",
        //                                         function (err, data, stderr) {
        //                                             if (data) {
        //                                                 console.log('ua run result: ', data);
        //                                             } else {
        //                                                 console.log('ua error: ', stderr);
        //                                             }
        //                                         }
        //                                     );
        //                                     // cmd.get(
        //                                     //     'docker logout',
        //                                     //     function(err, data, stderr){
        //                                     //         if (data) {
        //                                     //             console.log('docker logout : ', data);
        //                                     //
        //                                     //             cmd.get(
        //                                     //                 'docker login docker.pkg.github.com -u whitesource-yossi -p ' + process.env.GITHUB_TOKEN,
        //                                     //                 function(err, data, stderr){
        //                                     //                     if (data) {
        //                                     //                         console.log('docker login with GitHub token is : ',data);
        //                                     //                     }
        //                                     //
        //                                     //                     if (stderr){
        //                                     //                         console.log('docker login with GitHub token error is : ',stderr);
        //                                     //                     }
        //                                     //                 }
        //                                     //             );
        //                                     //         } else {
        //                                     //             console.log('docker logout error: ', stderr);
        //                                     //         }
        //                                     //     }
        //                                     // );
        //                                 } else {
        //                                     console.log('docker images error: ', stderr);
        //                                 }
        //                             }
        //                         );
        //                     } else {
        //                         console.log('docker pull error ', stderr)
        //                     }
        //                 }
        //             );
        //         } else {
        //             console.log('docker login error ', stderr)
        //         }
        //     }
        // );


    } catch (error) {
        core.setFailed(error.message);
    }
});