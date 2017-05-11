package ch.grisu118.userscript.leitstellenspiel

import JQuery

interface Component {
  fun initUI(parent: JQuery)
  fun update()
}