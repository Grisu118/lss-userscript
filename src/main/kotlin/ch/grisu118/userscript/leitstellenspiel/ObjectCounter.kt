package ch.grisu118.userscript.leitstellenspiel

import JQuery
import jQuery
import kotlinx.html.*
import kotlinx.html.dom.create
import kotlinx.html.js.tr
import kotlin.browser.document

class ObjectCounter : Component {

  init {
    println("init")
  }

  override fun initUI(parent: JQuery) {
    parent.append(BUILDINGS_TABLE).append(VEHICLE_TABLE)
  }

  override fun update() {
    updateVehicles()
    updateBuildings()
  }

  private fun updateBuildings() {
    val count = mutableMapOf<Int, Int>().withDefault { 0 }
    jQuery(".building_list_li").each { index, elem ->
      val bId = jQuery(elem).attr("building_type_id").toInt()
      count[bId] = count.getValue(bId) + 1
      return@each true
    }
    val buildingsTableBody = jQuery("#$BUILDING_TABLE_BODY")
    buildingsTableBody.empty()
    count.keys
      .filter { count.getValue(it) > 0 }
      .sortedBy { LSSData.buildings[it] }
      .forEach {
        buildingsTableBody.append(document.create.tr {
          td { +LSSData.buildings[it] }
          td { +"${count.getValue(it)}" }
        })
      }
  }

  private fun updateVehicles() {
    val count = mutableMapOf<Int, Int>().withDefault { 0 }
    val availableCount = mutableMapOf<Int, Int>().withDefault { 0 }
    jQuery(".building_list_vehicle_element").each { index, elem ->
      val vId = jQuery(elem).find("a").attr("vehicle_type_id").toInt()
      count[vId] = count.getValue(vId) + 1
      if (isVehicleAvailable(jQuery(elem).find("span").html().toInt())) {
        availableCount[vId] = availableCount.getValue(vId) + 1
      }
      return@each true
    }
    val vehicleTableObject = jQuery("#$VEHICLE_TABLE_BODY")
    vehicleTableObject.empty()
    count.keys
      .filter { count.getValue(it) > 0 }
      .sortedBy { LSSData.vehicles[it] }
      .forEach {
        val tr = document.create.tr {
          td { +LSSData.vehicles[it] }
          td {}
          td { +"${count.getValue(it)}" }
          td { +"${availableCount.getValue(it)}" }
        }
        vehicleTableObject.append(tr)
      }
  }

  private fun isVehicleAvailable(status: Int) = status == 1 || status == 2

  companion object {
    val VEHICLE_TABLE_BODY = "g118VehiclesBody"
    val BUILDING_TABLE_BODY = "g118BuildingsBody"
    val VEHICLE_TABLE = document.create.div {
      id = "g118Vehicles"
      classes = setOf("col-sm-4", "overview_outer")
      div("sidebar-nav") {
        div("panel panel-default") {
          div("panel-heading") {
            +"Fahrzeuge"
          }
          div("panel-body") {
            table("table table-bordered table-condensed table-striped table-hover") {
              thead {
                tr {
                  th { +"Fahrzeugtyp" }
                  th { +"Fahrzeuggruppe" }
                  th { +"Anzahl" }
                  th { +"Verfügbar" }
                }
              }
              tbody {
                id = VEHICLE_TABLE_BODY
              }
            }
          }
        }
      }
    }
    val BUILDINGS_TABLE = document.create.div {
      id = "g118Buildings"
      classes = setOf("col-sm-4", "overview_outer")
      div("sidebar-nav") {
        div("panel panel-default") {
          div("panel-heading") {
            +"Gebäude"
          }
          div("panel-body") {
            table("table table-bordered table-condensed table-striped table-hover") {
              thead {
                tr {
                  th { +"Gebäudetyp" }
                  th { +"Anzahl" }
                }
              }
              tbody {
                id = BUILDING_TABLE_BODY
              }
            }
          }
        }
      }
    }
  }
}