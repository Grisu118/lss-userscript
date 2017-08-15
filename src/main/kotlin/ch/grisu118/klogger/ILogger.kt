package ch.grisu118.klogger

interface ILogger {
  val isTrace: Boolean
  val isDebug: Boolean
  val isInfo: Boolean
  val isWarn: Boolean
  val isError: Boolean

  fun trace(message: Any?)
  fun debug(message: Any?)
  fun info(message: Any?)
  fun warn(message: Any?)
  fun error(message: Any?)

  fun trace(t: Throwable, message: Any? = "")
  fun debug(t: Throwable, message: Any? = "")
  fun info(t: Throwable, message: Any? = "")
  fun warn(t: Throwable, message: Any? = "")
  fun error(t: Throwable, message: Any? = "")

  fun trace(msg: () -> Any?) {
    if (isTrace) trace(msg())
  }

  fun debug(msg: () -> Any?) {
    if (isDebug) debug(msg())
  }

  fun info(msg: () -> Any?) {
    if (isInfo) info(msg())
  }

  fun warn(msg: () -> Any?) {
    if (isWarn) warn(msg())
  }

  fun error(msg: () -> Any?) {
    if (isError) error(msg())
  }

  fun trace(t: Throwable, msg: () -> Any?) {
    if (isTrace) trace(t, msg())
  }

  fun debug(t: Throwable, msg: () -> Any?) {
    if (isDebug) debug(t, msg())
  }

  fun info(t: Throwable, msg: () -> Any?) {
    if (isInfo) info(t, msg())
  }

  fun warn(t: Throwable, msg: () -> Any?) {
    if (isWarn) warn(t, msg())
  }

  fun error(t: Throwable, msg: () -> Any?) {
    if (isError) error(t, msg())
  }
}