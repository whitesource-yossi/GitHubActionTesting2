const core = require('@actions/core');
const github = require('@actions/github');
// const cmd = require('node-cmd');
const exec = require('@actions/exec');


try {
  // const authToken = core.getInput('myTok');
  const myToken = core.getInput('myToken');
  const octokit = new github.GitHub(myToken);


  const context = github.context;
  console.log('context' + JSON.stringify(context));

  const newIssue = octokit.issues.create({
    title: 'New issue!',
    body: 'Hello Universe!'
  });

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