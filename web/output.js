if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'output'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'output'.");
}
var output = function (_, Kotlin) {
  'use strict';
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  function LSS() {
  }
  LSS.prototype.fayeEvent = function () {
  };
  LSS.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'LSS',
    interfaces: []
  };
  function LSSData() {
    LSSData_instance = this;
    this.buildings = ['Feuerwache', 'Feuerwehrschule', 'Rettungswache', 'Rettungsschule', 'Krankenhaus', 'Rettungshubschrauber-Station', 'Polizeiwache', 'Leitstelle', 'Polizeischule', 'THW', 'THW Schule', 'Bereitschaftspolizei', 'Schnelleinsatzgruppe (SEG)', 'Polizeihubschrauber-Station', 'Bereitstellungsraum', 'Wasserrettung'];
    this.vehicles = ['LF 20', 'LF 10', 'DLK 23', 'ELW 1', 'RW', 'GW-A', 'LF 8/6', 'LF 20/16', 'LF 10/6', 'LF 16-TS', 'GW-\xD6l', 'GW-L2-Wasser', 'GW-Messtechnik', 'SW 1000', 'SW 2000', 'SW 2000-Tr', 'SW KatS', 'TLF 2000', 'TLF 3000', 'TLF 8/8', 'TLF 8/18', 'TLF 16/24-Tr', 'TLF 16/25', 'TLF 16/45', 'TLF 20/40', 'TLF 20/40-SL', 'TLF 16', 'GW-Gefahrgut', 'RTW', 'NEF', 'HLF 20', 'RTH', 'FuStW', 'GW-H\xF6henrettung', 'ELW 2', 'leBefKw', 'MTW', 'TSF-W', 'KTW', 'GKW', 'MTW-TZ', 'MzKW', 'LKW K9', 'BRmG R', 'Anh. DLE', 'MLW 5', 'WLF', 'AB-R\xFCst', 'AB-Atemschutz', 'AB-\xD6l', 'GruKw', 'F\xFCKw', 'GefKw', 'GW Dekon-P', 'AB-Dekon-P', 'KdoW-LNA', 'KdoW-OrgL', 'Kran', 'KTW Typ B', 'ELW 1 (SEG)', 'GW-SAN', 'Polizeihubschrauber', 'AB-Schlauch', 'GW-Taucher', 'GW-Wasserrettung', 'LKW 7 Lkr 19 tm', 'Anh MzB', 'Anh SchlB', 'Anh MzAB', 'Tauchkraftwagen', 'MZB', 'AB-MZB'];
  }
  LSSData.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'LSSData',
    interfaces: []
  };
  var LSSData_instance = null;
  function LSSData_getInstance() {
    if (LSSData_instance === null) {
      new LSSData();
    }
    return LSSData_instance;
  }
  var lss;
  function main(args) {
    println('Hello Kotlin');
    lss = new LSS();
  }
  function fayeEvent() {
    println('Faye here');
    lss != null ? lss.fayeEvent() : null;
  }
  var package$ch = _.ch || (_.ch = {});
  var package$grisu118 = package$ch.grisu118 || (package$ch.grisu118 = {});
  var package$userscript = package$grisu118.userscript || (package$grisu118.userscript = {});
  var package$leitstellenspiel = package$userscript.leitstellenspiel || (package$userscript.leitstellenspiel = {});
  package$leitstellenspiel.LSS = LSS;
  Object.defineProperty(package$leitstellenspiel, 'LSSData', {
    get: LSSData_getInstance
  });
  Object.defineProperty(package$userscript, 'lss', {
    get: function () {
      return lss;
    },
    set: function (value) {
      lss = value;
    }
  });
  package$userscript.main_kand9s$ = main;
  package$userscript.fayeEvent = fayeEvent;
  lss = null;
  Kotlin.defineModule('output', _);
  main([]);
  return _;
}(typeof output === 'undefined' ? {} : output, kotlin);
