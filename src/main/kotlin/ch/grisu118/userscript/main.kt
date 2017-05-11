package ch.grisu118.userscript

import ch.grisu118.userscript.leitstellenspiel.LSS

var lss: LSS? = null

/**
 * Created by Benjamin Leber on 11.05.17.
 * @author Benjamin Leber
 */
fun main(args: Array<String>) {
  println("Hello Kotlin")
  lss = LSS()
}

fun fayeEvent() {
  println("Faye here")
  lss?.fayeEvent()
}

