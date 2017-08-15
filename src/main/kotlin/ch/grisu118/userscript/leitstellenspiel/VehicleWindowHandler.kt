package ch.grisu118.userscript.leitstellenspiel

import JQuery
import jQuery

class VehicleWindowHandler : Component {

  val logger = LoggerFactory.logger(this)

  override fun initUI(parent: JQuery) {
    val vehicleId = parent.find("img.vehicle_image_reload").attr("vehicle_type_id").toInt()
    logger.debug { "VehicleId is $vehicleId, this is a ${LSSData.vehicles[vehicleId]}" }
    when (vehicleId) {
      38 -> handleKTW(parent)
    }
  }

  private fun handleKTW(parent: JQuery) {
    parent.find("#mission_own table tbody tr").each { _, elem ->
      val element = jQuery(elem)
      if (element.find("td:nth-child(2) > a").text() != "Krankentransport") {
        element.hide(0)
      }
    }
  }

  override fun update() {
    // Do nothing
  }
}