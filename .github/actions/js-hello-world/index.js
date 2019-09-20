const github = require('@actions/github');
const core = require('@actions/core');

// const exec = require('@actions/exec');
// const cmd = require('node-cmd');


try {
  const greet = core.getInput('who-to-greet');
  console.log(`greeting: ${greet}`);

  const firstName = core.getInput('FIRST_NAME');
  console.log(`first name: ${firstName}`);


  const myToken = core.getInput('myToken');
  const octokit = new github.GitHub(myToken);


  // const context = github.context;
  // console.log('context' + JSON.stringify(context));

  async function f1() {
    try {
      const newIssue = await octokit.issues.create({
        owner: 'whitesource-yossi',
        repo : 'GitHubActionTesting2',
        title: 'New issue!',
        body: 'Hello Universe!'
      });

      console.log('issue : ' + JSON.stringify(newIssue));
    } catch (e) {
      console.error("error" + e);
    }

  }

  let promise = f1();
  console.log('promise: ' + JSON.stringify(promise));

    // console.log(`Hello ${GITHUB_TOKEN}!`);

    // exec.exec('docker -v');
    // exec.exec('docker login docker.pkg.github.com -u whitesource-yossi -p ' + myToken);


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