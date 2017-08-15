package ch.grisu118.klogger

class Logger(private val name: String, private val level: Level) : ILogger {
  override val isTrace: Boolean
    get() = level >= Level.TRACE
  override val isDebug: Boolean
    get() = level >= Level.DEBUG
  override val isInfo: Boolean
    get() = level >= Level.INFO
  override val isWarn: Boolean
    get() = level >= Level.WARN
  override val isError: Boolean
    get() = level >= Level.ERROR

  override fun trace(message: Any?) {
    if (isTrace) {
      console.log("$name - ", message)
    }
  }

  override fun debug(message: Any?) {
    if (isDebug) {
      console.log("$name - ", message)
    }
  }

  override fun info(message: Any?) {
    if (isInfo) {
      console.info("$name - ", message)
    }
  }

  override fun warn(message: Any?) {
    if (isWarn) {
      console.warn("$name - ", message)
    }
  }

  override fun error(message: Any?) {
    if (isError) {
      console.error("$name - ", message)
    }
  }

  override fun trace(t: Throwable, message: Any?) {
    if (isTrace) {
      console.log("$name - ", message, t)
    }
  }

  override fun debug(t: Throwable, message: Any?) {
    if (isDebug) {
      console.log("$name - ", message, t)
    }
  }

  override fun info(t: Throwable, message: Any?) {
    if (isInfo) {
      console.info("$name - ", message, t)
    }
  }

  override fun warn(t: Throwable, message: Any?) {
    if (isWarn) {
      console.warn("$name - ", message, t)
    }
  }

  override fun error(t: Throwable, message: Any?) {
    if (isError) {
      console.error("$name - ", message, t)
    }
  }
}