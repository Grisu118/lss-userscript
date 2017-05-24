package ch.grisu118.userscript.leitstellenspiel

import JQuery
import jQuery
import kotlinx.html.*
import kotlinx.html.dom.create
import kotlinx.html.js.tr
import kotlin.browser.document
import kotlin.js.RegExp

class ObjectCounter : Component {

  var isGrouped = false
  var showAvailable = true

  override fun initUI(parent: JQuery) {
    parent.append(BUILDINGS_TABLE).append(VEHICLE_TABLE)
    jQuery("#g118SwitchVehiclesView").change { _ -> groupSwitched() }
    jQuery("#g118SwitchShowAvailable").change { _ -> showAvailableSwitched() }
    jQuery("#$VEHICLE_SEARCH_FIELD").keyup { _ -> searchTable(VEHICLE_TABLE_BODY, VEHICLE_SEARCH_FIELD) }
    jQuery("#$BUILDING_SEARCH_FIELD").keyup { _ -> searchTable(BUILDING_TABLE_BODY, BUILDING_SEARCH_FIELD) }
  }

  override fun update() {
    updateVehicles()
    updateBuildings()
  }

  private fun groupSwitched() {
    isGrouped = jQuery("#g118SwitchVehiclesView").prop("checked") as Boolean
    updateVehicles()
  }

  private fun showAvailableSwitched() {
    showAvailable = jQuery("#g118SwitchShowAvailable").prop("checked") as Boolean
    updateVehicles()
  }

  private fun searchTable(tableId: String, searchField: String) {
    val searchWord = RegExp(jQuery("#$searchField").`val`() as String, "i")
    jQuery("#$tableId").find("tr").each { _, elem ->
      val tr = jQuery(elem)
      if (searchWord.test(tr.find("td:eq(0)").html())) {
        tr.show(0)
      } else {
        tr.hide(0)
      }
    }
  }

  private fun updateBuildings() {
    val count = mutableMapOf<Int, Int>().withDefault { 0 }
    jQuery(".building_list_li").each { _, elem ->
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
    searchTable(BUILDING_TABLE_BODY, BUILDING_SEARCH_FIELD)
  }

  private fun updateVehicles() {
    val count = mutableMapOf<Int, Int>().withDefault { 0 }
    val availableCount = mutableMapOf<Int, Int>().withDefault { 0 }
    jQuery(".building_list_vehicle_element").each { _, elem ->
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
          td { +"${if (showAvailable) "$a/" else ""}$c" }
        })
      }
    }
    keys
      .sortedBy { LSSData.vehicles[it] }
      .forEach {
        vehicleTableObject.append(document.create.tr {
          td { +LSSData.vehicles[it] }
          td { +"${if (showAvailable) "${availableCount.getValue(it)}/" else ""}${count.getValue(it)}" }
        })
      }
    searchTable(VEHICLE_TABLE_BODY, VEHICLE_SEARCH_FIELD)
  }

  private fun isVehicleAvailable(status: Int) = status == 1 || status == 2

  companion object {
    val VEHICLE_TABLE_BODY = "g118VehiclesBody"
    val BUILDING_TABLE_BODY = "g118BuildingsBody"
    val VEHICLE_SEARCH_FIELD = "g118SearchVehicles"
    val BUILDING_SEARCH_FIELD = "g118SearchBuildings"
    val VEHICLE_TABLE = document.create.div {
      id = "g118Vehicles"
      classes = setOf("col-sm-4", "overview_outer")
      div("sidebar-nav") {
        div("panel panel-default") {
          div("panel-heading") {
            +"Fahrzeuge"
            div {
              style = "float: right;"
              label {
                +"Zusammenfassen"
              }
              input(InputType.checkBox) {
                id = "g118SwitchVehiclesView"
              }
              label {
                style = "padding-left: 5px;"
                +"Verfügbar"
              }
              input(InputType.checkBox) {
                id = "g118SwitchShowAvailable"
                checked = true
              }
            }
            input(InputType.search) {
              id = VEHICLE_SEARCH_FIELD
              classes += "form-control"
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
            input(InputType.search) {
              id = BUILDING_SEARCH_FIELD
              classes += "form-control"
            }
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