package ch.grisu118.userscript.leitstellenspiel

import JQuery
import jQuery
import kotlinx.html.*
import kotlinx.html.dom.create
import kotlinx.html.js.tr
import kotlin.browser.document

class ObjectCounter : Component {

  var isGrouped = false

  init {
    println("init")
  }

  override fun initUI(parent: JQuery) {
    parent.append(BUILDINGS_TABLE).append(VEHICLE_TABLE)
    jQuery("#g118SwitchVehiclesView").change { _ -> groupSwitched() }
  }

  override fun update() {
    updateVehicles()
    updateBuildings()
  }

  private fun groupSwitched() {
    isGrouped = jQuery("#g118SwitchVehiclesView").prop("checked") as Boolean
    updateVehicles()
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
    val keys = count.keys.filter { count.getValue(it) > 0 }.toMutableSet()
    if (isGrouped) {
      for ((name, member) in LSSData.vehicleGroups) {
        val c = member.map { count.getValue(it) }.sum()
        val a = member.map { availableCount.getValue(it) }.sum()
        keys.removeAll(member)
        vehicleTableObject.append(document.create.tr {
          td { +name }
          td { +"$a/$c" }
        })
      }
    }
    keys
      .sortedBy { LSSData.vehicles[it] }
      .forEach {
        vehicleTableObject.append(document.create.tr {
          td { +LSSData.vehicles[it] }
          td { +"${availableCount.getValue(it)}/${count.getValue(it)}" }
        })
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
            div {
              style = "float: right;"
              +"Zusammenfassen"
              input(InputType.checkBox) {
                id = "g118SwitchVehiclesView"
              }
            }
          }
          div("panel-body") {
            table("table table-bordered table-condensed table-striped table-hover") {
              thead {
                tr {
                  th { +"Typ" }
                  th { +"Anzahl" }
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