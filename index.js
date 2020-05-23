#!/usr/bin/env node

require('dotenv').config();
const program = require('commander');
const { setup } = require('./src/setup');
const { occEnv } = require('./src/occEnv');
const { dcu } = require('./src/dcu');
const { ccw } = require('./src/ccw');

program
  .version('1.0.0')
  .description('An application to help you with your daily OCC development.')
  .option('-s, --start', 'start the environment setup')
  .option('-d, --dev', 'start watcher + Browsersync')
  .option('-c, --create <type>', 'create widget or element [widget|element]')
  .option('-r, --refresh <path>', 'refresh path')
  .option('-p, --putAll <path>', 'upload the entire path')
  .option('-e, --env <operation>', 'start the environment manager [change|config|current]')
  .option('-t, --transfer <path>', 'transfer widgets between current and target environment')
  .parse(process.argv);

if (program.start) {
  setup.start();
}

if (program.refresh) {
  dcu.refresh(program.refresh);
}

if (program.putAll) {
  dcu.putAll(program.putAll);
}

if (program.transfer) {
  dcu.transfer(program.transfer);
}

if (program.create) {
  switch (program.create) {
    case 'widget':
      ccw.createWidget();
      break;
    case 'element':
      ccw.createElement();
      break;
  }
}

if (program.env) {
  switch (program.env) {
    case 'config':
      occEnv.config();
      break;
    case 'change':
      occEnv.change();
      break;
    case 'current':
      const {
        env, url, appKey
      } = occEnv.get();
      console.log(`Environment: ${env}\nURL: ${url}\nKEY: ${appKey}`);
      break;
  }
}