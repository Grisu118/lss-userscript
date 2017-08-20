package ch.grisu118.userscript.leitstellenspiel

import JQuery
import ch.grisu118.js.logger.LoggerFactory
import jQuery
import kotlinx.html.classes
import kotlinx.html.dom.create
import kotlinx.html.id
import kotlinx.html.js.a
import kotlinx.html.span
import kotlinx.html.style
import kotlin.browser.document
import kotlin.browser.localStorage

class VehicleWindowHandler : Component {

  private val logger = LoggerFactory.logger(this)
  private var filterKTP = false

  init {
    val storageItem = localStorage.getItem("g118FilterKTP")
    if (storageItem != null) {
      filterKTP = storageItem == "true"
    }
  }

  override fun initUI(parent: JQuery) {
    val vehicleId = parent.find("img.vehicle_image_reload").attr("vehicle_type_id").toInt()
    logger.debug { "VehicleId is $vehicleId, this is a ${LSSData.vehicles[vehicleId]}" }
    when (vehicleId) {
      38 -> handleKTW(parent)
    }
  }

  private fun handleKTW(parent: JQuery) {
    val header = jQuery("#iframe-inside-container > div > div.col-md-9 > h3")
    header.append(document.create.a {
      id = "g118FilterTaskList"
      style = "color: ${if (filterKTP) "red" else "black"};"
      href = "#"
      span {
        classes = setOf("glyphicon", "glyphicon-filter")
      }
    })
    jQuery("#g118FilterTaskList").click { event ->
      val elem = jQuery(event.currentTarget)
      if (filterKTP) {
        filterKTP = false
        elem.css("color", "black")
      } else {
        filterKTP = true
        elem.css("color", "red")
      }
      localStorage.setItem("g118FilterKTP", filterKTP.toString())
      filterTaskList()
      return@click true
    }
    filterTaskList()
  }

  private fun filterTaskList() {
    jQuery("#mission_own table tbody tr").each { _, elem ->
      val element = jQuery(elem)
      if (filterKTP && element.find("td:nth-child(2) > a").text() != "Krankentransport") {
        element.hide(0)
      } else {
        element.show(0)
      }
    }
  }

  override fun update() {
    // Do nothing
  }
}