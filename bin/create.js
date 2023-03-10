#!/usr/bin/env node

const path = require("path");
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const inquirer = require("inquirer")
const templates = require(`${__dirname}/../template`)

module.exports = async function (projectName, options) {
    console.log();
    console.log(' ðð ', "å½åä»æreactæ¨¡ç");
    console.log();
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'è¯·éæ©æ¡æ¶',
                name: 'frame',
                default: 0,
                choices: [
                    {
                        value: "react",
                        name: 'react',
                    },
                    {
                        value: 'vue',
                        name: 'vue',
                    },
                ],
            },
            {
                type: 'list',
                message: 'è¯·éæ©æåå·¥å·',
                name: 'tool',
                default: 0,
                choices: [
                    {
                        value: "webpack",
                        name: 'webpack',
                    },
                    {
                        value: 'vite',
                        name: 'vite',
                    },
                ],
            },
        ])
        .then((answers) => {
            const url = templates[answers.frame][answers.tool];
            if (!url) {
                console.log();
                console.log('ðð ~ error', "æ­¤æ¨¡çå¾æ´æ°ï¼è¯·æ¢ä¸ç§éè¯ï¼");
                console.log();
                return
            }

            // ä¸è½½
            console.log(chalk.white('\n Start generating... \n'))
            // åºç°å è½½å¾æ 
            const spinner = ora("Downloading...");
            spinner.start();

            // æ§è¡ä¸è½½æ¹æ³å¹¶ä¼ å¥åæ°
            download(
                url,
                projectName,
                err => {
                    if (err) {
                        spinner.fail();
                        console.log(chalk.red(`Generation failed. ${err}`))
                        return
                    }
                    // ç»æå è½½å¾æ 
                    spinner.succeed();
                    console.log(chalk.green('\n Generation completed!'))
                    console.log('\n To get started')
                    console.log(`\n    cd ${projectName} \n`)
                    console.log(`\n    npm install  \n`)
                    console.log(`\n    npm run dev  \n`)
                }
            )
        })
        .catch((error) => {
            console.log('ðð ~ error', error);
        });


};
