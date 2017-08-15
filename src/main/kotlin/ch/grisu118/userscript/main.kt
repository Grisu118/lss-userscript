package ch.grisu118.userscript

import ch.grisu118.klogger.Level
import ch.grisu118.klogger.LogFactory
import ch.grisu118.userscript.leitstellenspiel.LSS

var lss: LSS? = null

/**
 * Created by Benjamin Leber on 11.05.17.
 * @author Benjamin Leber
 */
fun main(args: Array<String>) {
  LogFactory.loglevel(Regex(".*"), Level.DEBUG)
  LogFactory.logger("*** LSS UserScript").info { "v0.3 by Grisu118 loaded ***" }
  lss = LSS()
}

