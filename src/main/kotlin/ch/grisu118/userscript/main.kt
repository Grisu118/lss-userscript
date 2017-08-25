package ch.grisu118.userscript

import ch.grisu118.js.logger.Level
import ch.grisu118.js.logger.LoggerConfig
import ch.grisu118.js.logger.LoggerFactory
import ch.grisu118.userscript.leitstellenspiel.LSS
import org.w3c.dom.get
import org.w3c.dom.set
import kotlin.browser.localStorage
import kotlin.browser.window

var lss: LSS? = null

/**
 * Created by Benjamin Leber on 11.05.17.
 * @author Benjamin Leber
 */
fun main(args: Array<String>) {
  LoggerConfig.messageTemplate = "%dt %l [%n]: %m"
  val level = localStorage["g118LogLevel"]
  LoggerFactory.loglevel(Regex(".*"), if (level != null) Level.valueOf(level) else Level.INFO)
  LoggerFactory.loglevel(Regex("MissionListHandler"), Level.TRACE)
  LoggerFactory.logger("LSS UserScript").info { "*** v0.5 by Grisu118 loaded ***" }
  lss = LSS()

  window.asDynamic().g118UpdateLogLevel = { lvl: String ->
    LoggerFactory.updateLevel(Regex(".*"), Level.valueOf(lvl))
    localStorage["g118LogLevel"] = lvl
  }
}

