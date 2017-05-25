package ch.grisu118.userscript.leitstellenspiel

import JQuery

interface Component {
  /**
   * Called on startup.
   */
  fun initUI(parent: JQuery)

  /**
   * Called if an event from faye is recorded.
   */
  fun update()
}