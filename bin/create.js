#!/usr/bin/env node

const path = require("path");
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const inquirer = require("inquirer")
const templates = require(`${__dirname}/../template`)

module.exports = async function (projectName, options) {
    console.log();
    console.log(' 🚀🚀 ', "当前仅有react模版");
    console.log();
    inquirer
        .prompt([
            {
                type: 'list',
                message: '请选择框架',
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
                message: '请选择打包工具',
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
                console.log('🚀🚀 ~ error', "此模版待更新，请换一种重试！");
                console.log();
                return
            }

            // 下载
            console.log(chalk.white('\n Start generating... \n'))
            // 出现加载图标
            const spinner = ora("Downloading...");
            spinner.start();

            // 执行下载方法并传入参数
            download(
                url,
                projectName,
                err => {
                    if (err) {
                        spinner.fail();
                        console.log(chalk.red(`Generation failed. ${err}`))
                        return
                    }
                    // 结束加载图标
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
            console.log('🚀🚀 ~ error', error);
        });


};
