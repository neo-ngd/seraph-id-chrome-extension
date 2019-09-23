<p align="center">
<img
    src="http://www.seraphid.io/assets/img/logo-dark.png"
    width="450px">
</p>
<h1></h1>
<p align="center">
  Seraph ID demo.
</p>

<p align="center">      
  <a href="https://github.com/swisscom-blockchain/seraph-id-sdk/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?color=green">
  </a>
</p>

# Description

This is the chrome extention to interact with Seraph ID on the NEO blockchain

Visit the [Seraph ID](http://www.seraphid.io/) official web page to learn more about self-sovereign identity!

# How to run this project

## Install the dependency

```
npm i
```

# How to import the extention to chrome

## Build the project

```
npm start
```

## Import it in Chrome

Go to chrome://extensions/ on Chrome. Press "Load unpacked" and load the build folder. (Note: You need to enable developers mode first)

# Project Overview

## Architecture

The background script contains the redux store (based on webext-redux), that provides the single source of truth for the whole application. The content script injects an object in the current web page (SeraphID) and a React page (a Dialog to alter the state dispatching actions to the background script), the page that wants to communicate with the extention needs to access to the SeraphID object. The pop up page is always in sync with the storage and updates the UI if the storage is updated.

## Hot Reload

Hot reloading is configured, you dont need to re-load the chrome extention. For some files doesnt work tho, ex. manifest.json

## Redux dev tools

Since was not possible to use Redux dev tool in the background script a remote instance is configured to run in localhost:8000
