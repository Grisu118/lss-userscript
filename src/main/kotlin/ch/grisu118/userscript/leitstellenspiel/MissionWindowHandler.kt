package ch.grisu118.userscript.leitstellenspiel

import JQuery
import ch.grisu118.js.logger.LoggerFactory
import jQuery
import kotlinx.html.classes
import kotlinx.html.dom.create
import kotlinx.html.js.a
import kotlinx.html.js.div
import kotlinx.html.js.style
import kotlinx.html.span
import kotlinx.html.style
import kotlin.browser.document
import kotlin.browser.localStorage

class MissionWindowHandler : Component {

  private val logger = LoggerFactory.logger(this)
  private var filterVehicles = false

  init {
    val storageItem = localStorage.getItem("g118FilterVehicles")
    if (storageItem != null) {
      filterVehicles = storageItem == "true"
    }
  }

  override fun initUI(parent: JQuery) {
    if (user_id == LSSData.grisu118) {
      logger.info { "Activating Special Features for Grisu118!" }
      initRelaABDHandler(parent)
    }
    initVehicleFilter()
    initAAOClickHandler(parent)
  }

  private fun initVehicleFilter() {
    jQuery("#h2_free_vehicles").append(document.create.a {
      classes += "g118FilterVehicleList"
      style = "color: ${if (filterVehicles) "red" else "black"};"
      href = "#"
      span {
        classes = setOf("glyphicon", "glyphicon-filter")
      }
    })
    jQuery(".g118FilterVehicleList").click { event ->
      val elem = jQuery(event.currentTarget)
      if (filterVehicles) {
        filterVehicles = false
        elem.css("color", "black")
      } else {
        filterVehicles = true
        elem.css("color", "red")
      }
      localStorage.setItem("g118FilterVehicles", filterVehicles.toString())
      filterVehiclesList()
      return@click true
    }

    jQuery("#tabs").each { _, e ->
      jQuery(e).click { _ -> filterVehiclesList() }
    }
    filterVehiclesList()
  }

  private fun filterVehiclesList() {
    jQuery(".tab-pane.active table tbody").find("tr").each { _, elem ->
      val element = jQuery(elem)
      if (filterVehicles) {
        if (element.find(".vehicle_checkbox").prop("checked") as Boolean) {
          element.show(0)
        } else {
          element.hide(0)
        }
      } else {
        element.show(0)
      }
    }
  }

  private fun initAAOClickHandler(parent: JQuery) {
    parent.append(document.create.style {
      +".g118-aao-badge { border-radius: 8px; position: relative; top: -20px;z-index: 1000;background: red;color: white;width: 16px;height: 16px;left: -8px; } .aao { height: 22px }"
    })

    jQuery(".btn.aao").click { eventObject ->
      val badge = jQuery(eventObject.currentTarget).find(".g118-aao-badge")
      val length = badge.length as Int
      if (length > 0) {
        val currentValue = badge.html().toInt()
        badge.html((currentValue + 1).toString())
      } else {
        jQuery(eventObject.currentTarget).append(document.create.div {
          classes += "g118-aao-badge"
          +"1"
        })
      }
      filterVehiclesList()
      return@click true
    }
  }

  private fun initRelaABDHandler(parent: JQuery) {
    val abdId = 7647412
    val tlfId = 25079
    jQuery("input[value='$abdId']").change { eventObject ->
      val target = jQuery(eventObject.target)
      val selector = jQuery("input[value='$tlfId']")
      if (target.prop("checked") as Boolean) {
        logger.trace { "Add Dekon TLF to selection" }
        selector.prop("checked", true)
      } else {
        logger.trace { "Remove Dekon TLF from selection" }
        selector.prop("checked", false)
      }
    }
  }

  override fun update() {
    // Do nothing
  }
}