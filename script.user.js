// ==UserScript==
// @name        Script für Leitstellenspiel
// @namespace   Leitstellenspiel
// @include     http*://www.leitstellenspiel.de/*
// @version     0.1
// @author      Grisu118
// @grant       none
// ==/UserScript==

var scriptElement = document.createElement("script");
scriptElement.type = "text/javascript";
scriptElement.src = "https://download.grisu118.ch/userscripts/lssScript.min.js";
document.body.appendChild(scriptElement);