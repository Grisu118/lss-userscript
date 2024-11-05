# AAO Marker

Hebt die AAO für den Einsatz hervor

## Funktionen

* Finden der korrekten AAO anhand des Einsatznamen (exakter Match)
    * Entfernt for dem Suchen gewisse Schlüsselwörter wie zum Beispiel `(Brandmeldeanlage)` oder `(Event)`
* Leichtes ausgrauen der der nicht passenden AAO und hervorheben der passenden
    * Erster Tab wird dabei ignoriert, da für generelle Nach & Einzelalarmierung vorgesehen
    * Hebt den Tab in dem sich die AAO befindet hervor
* Fügt über den AAO Tabs einen neuen Button ein mit dem die gefundene AAO direkt ausgelöst werden kann
    * Auch via Tastendruck der Taste ``v``
    * Status der AAO wird abgefragt, somit kompatibel
      mit [Schnellere AAO-Verfügbarkeitsprüfung](https://forum.leitstellenspiel.de/index.php?thread/22896-aaos-nur-pro-kategorie-laden/&postID=526698#post526698)
    * Zeigt 🚑 wenn der Rettungsdienst Teil der AAO ist

## Bekannte Fehler

* AAO Status im neuen Button wird nur aktualisiert, falls man die Fahrzeuge über die Taste ``n`` nachlädt. Beim klick
  auf den Button wird nicht neu abgefragt.