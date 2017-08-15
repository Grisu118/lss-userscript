package ch.grisu118.userscript.leitstellenspiel

import ch.grisu118.klogger.LogFactory
import faye
import jQuery
import kotlin.browser.window

@JsName("user_id")
external val user_id: Number = definedExternally

@JsName("alliance_id")
external val alliance_id: Number = definedExternally

class LSS {
  val logger = LogFactory.logger(this)

  val objectCounter = ObjectCounter()
  val aaoHandler = MissionWindowHandler()
  val vehicleHandler = VehicleWindowHandler()

  init {
    if (window.location.pathname == "/") {
      logger.trace { "Main Window" }
      initializeUI()
      fayeEvent()

      faye.subscribe("/private-user" + user_id + "de", { fayeEvent() })
      if (alliance_id != undefined) {
        faye.subscribe("/private-alliance-" + alliance_id + "de", { fayeEvent() })
      }
    } else if (window.location.pathname.startsWith("/missions")) {
      logger.trace { "Mission Window" }
      aaoHandler.initUI(jQuery("body"))
    } else if (window.location.pathname.startsWith("/vehicles")) {
      logger.trace { "Vehicles Window" }
      vehicleHandler.initUI(jQuery("body"))
    }
  }

  fun initializeUI() {
    var row = jQuery("#$GRISU118_ROW")
    if (row.length == 0) {
      jQuery(".container-fluid:eq(1) > .row:eq(0)").after("<div class='row' id='$GRISU118_ROW'>")
      row = jQuery("#$GRISU118_ROW")
    }
    objectCounter.initUI(row)
  }

  fun fayeEvent() {
    objectCounter.update()
  }

  companion object {
    val GRISU118_ROW = "g118Row"
  }
}