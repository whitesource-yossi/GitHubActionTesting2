const core = require('@actions/core');
const github = require('@actions/github');
// const cmd = require('node-cmd');
const exec = require('@actions/exec');


try {
  const authToken = core.getInput('myTok');
    console.log('auth token 1' + authToken + '!');
    const octokit = new github.GitHub(authToken);
    console.log('ocktokit: ' + JSON.stringify(octokit));

    let authenticated = octokit.users.getAuthenticated();

  console.log('users: ' + JSON.stringify(authenticated));

  let activity = octokit.activity.listPublicEventsForRepoNetwork({
    owner,
    repo
  });
  console.log('activity: ' + JSON.stringify(activity));

    // console.log(`Hello ${GITHUB_TOKEN}!`);

    exec.exec('docker -v');


  // cmd.get(
  //     'docker -v',
  //     function(err, data, stderr){
  //       console.log('the current working dir is : ',data)
  //     }
  // );


  // // `who-to-greet` input defined in action metadata file
  // const nameToGreet = core.getInput('who-to-greet');
  // console.log(`Hello ${nameToGreet}!`);
  // const time = (new Date()).toTimeString();
  // core.setOutput("time", time);
  // // Get the JSON webhook payload for the event that triggered the workflow
  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}