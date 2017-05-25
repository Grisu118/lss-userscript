package ch.grisu118.userscript.leitstellenspiel

import JQuery
import jQuery
import kotlinx.html.classes
import kotlinx.html.dom.create
import kotlinx.html.js.div
import kotlinx.html.js.style
import kotlin.browser.document

class AAOHandler : Component {
  override fun initUI(parent: JQuery) {
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
      return@click true
    }
  }

  override fun update() {
    // Do nothing
  }
}