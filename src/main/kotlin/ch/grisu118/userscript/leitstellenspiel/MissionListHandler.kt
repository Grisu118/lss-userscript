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

class MissionListHandler : Component {
  val logger = LoggerFactory.logger(this)

  var filterMissions = false

  init {
    val storageItem = localStorage.getItem(MISSION_FILTER_ID)
    if (storageItem != null) {
      filterMissions = storageItem == "true"
    }
  }

  override fun initUI(parent: JQuery) {
    logger.debug { "Started Handler" }
    addFilter()
  }

  override fun update() {
    filterMissionList()
  }

  private fun addFilter() {
    jQuery("#$MISSION_ID > div:nth-child(1) > strong").append(document.create.a {
      id = MISSION_FILTER_ID
      style = "color: ${if (filterMissions) "red" else "black"};"
      href = "#"
      span {
        classes = setOf("glyphicon", "glyphicon-filter")
      }
    })
    jQuery("#$MISSION_FILTER_ID").click { event ->
      logger.trace { "Clicked on Filter" }
      val elem = jQuery(event.currentTarget)
      if (filterMissions) {
        filterMissions = false
        elem.css("color", "black")
      } else {
        filterMissions = true
        elem.css("color", "red")
      }
      localStorage.setItem("g118FilterMissionList", filterMissions.toString())
      filterMissionList()
      return@click true
    }
  }

  private fun filterMissionList() {
    jQuery("#$MISSION_LIST_ID .missionSideBarEntry").each { _, elem ->
      val element = jQuery(elem)
      if (filterMissions) {
        val userIcon = element.find(".glyphicon.glyphicon-user")
        if (userIcon.hasClass("hidden")) {
          element.hide(0)
        } else {
          element.show(0)
        }
      } else {
        element.show(0)
      }
    }
  }


  companion object {
    val MISSION_LIST_ID = "mission_list_alliance_event"
    val MISSION_ID = "missions"
    val MISSION_FILTER_ID = "g118FilterMissions"
  }
}