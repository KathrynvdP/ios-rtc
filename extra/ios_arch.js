#!/usr/bin/env node

/*jshint esversion: 6 */
'use strict';

const path = require('path');
const exec = require('child_process').execSync;

const WEBRTC_BIN_PATH = path.join(__dirname, '../lib/WebRTC.framework');
const ARCH_TYPES = ['i386', 'x86_64', 'armv7', 'arm64'];

  ARCH_TYPES.forEach(elm => {
    exec(`lipo -extract ${elm} WebRTC -o WebRTC-${elm}`, {cwd: WEBRTC_BIN_PATH});
  });

  exec('cp WebRTC WebRTC-all', {cwd: WEBRTC_BIN_PATH}); // make a backup

  exec(`lipo -o WebRTC -create WebRTC-armv7 WebRTC-arm64`, {cwd: WEBRTC_BIN_PATH});

  exec(`rm -f WebRTC-*`, {cwd: WEBRTC_BIN_PATH}).toString().trim();
