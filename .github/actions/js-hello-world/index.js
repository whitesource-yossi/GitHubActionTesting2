const core = require('@actions/core');
const github = require('@actions/github');
const cmd = require('node-cmd');

try {
  const authToken = core.getInput('github_token');
  console.log(`auth token ${authToken}!`);
  // console.log(`Hello ${GITHUB_TOKEN}!`);

  cmd.get(
      'docker -v',
      function(err, data, stderr){
        console.log('the current working dir is : ',data)
      }
  );
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