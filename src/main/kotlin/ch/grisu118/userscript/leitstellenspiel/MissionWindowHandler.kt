package ch.grisu118.userscript.leitstellenspiel

import JQuery
import jQuery
import kotlinx.html.classes
import kotlinx.html.dom.create
import kotlinx.html.js.a
import kotlinx.html.js.div
import kotlinx.html.js.style
import kotlinx.html.span
import kotlinx.html.style
import kotlin.browser.document

class MissionWindowHandler : Component {

  var filterVehicles = true

  override fun initUI(parent: JQuery) {
    initAAOClickHandler(parent)
    initVehicleFilter()
  }

  private fun initVehicleFilter() {
    jQuery("#h2_free_vehicles").append(document.create.a {
      classes += "g118FilterVehicleList"
      style = "color: red;"
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

  override fun update() {
    // Do nothing
  }
}