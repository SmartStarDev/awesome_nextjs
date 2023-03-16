const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function runGitCommand(command) {
    try {
        const {stdout, stderr} = await exec(command);
        // console.log('stdout:', stdout);
        console.error('stderr:', stderr);
    } catch (error) {
        console.error(error);
    }
}

async function getResultGitCommand(command) {
    try {
        const {stdout, stderr} = await exec(command);
        if (stdout) {
            return stdout;
        }
        if (stderr) {
            // console.error('stderr:', stderr);
        }
    } catch (error) {
        // console.error(error);
    }
}


module.exports = { runGitCommand, getResultGitCommand };