const {rootPath, repoPaths} = require('./config')
const {runGitCommand, getResultGitCommand} = require('./utils')

async function main() {
    for (let i = 0; i < repoPaths.length; i++) {
        const item = repoPaths[i];
        const pathCommand = `cd ${rootPath + item.path}`

        console.log(`\n\n######## ${i + 1}.${item.name} #########\n `)
        if (!item.active) {
            console.log(`\n\n --- This repo is deactivated --- \n\n `)
            continue
        }
        const activeBranch = await getResultGitCommand(`${pathCommand} && git rev-parse --abbrev-ref HEAD`)
        console.log(`Active Branch: ${activeBranch}`)

        console.log(`       --- PULLING ---\n`)
        await runGitCommand(`${pathCommand} && git reset && git checkout ${item.base}`)
        await runGitCommand(`${pathCommand} && git pull origin ${item.base} --no-rebase`)
        console.log(`       --- PUSHING ---\n`)
        await runGitCommand(`${pathCommand} && git push dev-origin ${item.base} `)
        await runGitCommand(`${pathCommand} && git checkout ${activeBranch}`)
    }
}

main();

