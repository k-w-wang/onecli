#! /usr/bin/env node

const program = require("commander");
program
  .command("create <project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .action((projectName, cmd) => {
    // 处理用户输入create 指令附加的参数
    require("./create.js")(projectName, cmd);
  });

program
  .name("onecli")
  .usage(`<command> [option]`)
  .version(`onecli ${require("../package.json").version}`);

program.parse(process.argv);
