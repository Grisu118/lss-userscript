external interface Faye {
  fun subscribe(channel: String, callback: () -> Unit)
}

@JsName("faye")
external val faye: Faye = definedExternally