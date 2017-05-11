if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'output'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'output'.");
}
if (typeof this['kotlinx-html-js'] === 'undefined') {
  throw new Error("Error loading module 'output'. Its dependency 'kotlinx-html-js' was not found. Please, check whether 'kotlinx-html-js' is loaded prior to 'output'.");
}
var output = function (_, Kotlin, $module$kotlinx_html_js) {
  'use strict';
  var withDefault = Kotlin.kotlin.collections.withDefault_btzz9u$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var getValue = Kotlin.kotlin.collections.getValue_t9ocha$;
  var get_create = $module$kotlinx_html_js.kotlinx.html.dom.get_create_4wc2mh$;
  var td = $module$kotlinx_html_js.kotlinx.html.td_vlzo05$;
  var tr = $module$kotlinx_html_js.kotlinx.html.js.tr_9pz0lc$;
  var set_id = $module$kotlinx_html_js.kotlinx.html.set_id_ueiko3$;
  var setOf = Kotlin.kotlin.collections.setOf_i5x0yv$;
  var set_classes = $module$kotlinx_html_js.kotlinx.html.set_classes_njy09m$;
  var div = $module$kotlinx_html_js.kotlinx.html.div_ri36nr$;
  var th = $module$kotlinx_html_js.kotlinx.html.th_bncpyi$;
  var tr_0 = $module$kotlinx_html_js.kotlinx.html.tr_lut1f9$;
  var thead = $module$kotlinx_html_js.kotlinx.html.thead_j1nulr$;
  var tbody = $module$kotlinx_html_js.kotlinx.html.tbody_cbte6n$;
  var table = $module$kotlinx_html_js.kotlinx.html.table_dmqmme$;
  var div_0 = $module$kotlinx_html_js.kotlinx.html.div_59el9d$;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  function Component() {
  }
  Component.$metadata$ = {
    kind: Kotlin.Kind.INTERFACE,
    simpleName: 'Component',
    interfaces: []
  };
  function LSS() {
    LSS$Companion_getInstance();
    this.objectCounter = new ObjectCounter();
    if (Kotlin.equals(window.location.pathname, '/')) {
      this.initializeUI();
      this.fayeEvent();
      faye.subscribe('/private-user' + Kotlin.toString(user_id) + 'de', LSS_init$lambda(this));
      if (!Kotlin.equals(alliance_id, undefined)) {
        faye.subscribe('/private-alliance-' + Kotlin.toString(alliance_id) + 'de', LSS_init$lambda_0(this));
      }
    }
  }
  LSS.prototype.initializeUI = function () {
    var row = jQuery('#g118Row');
    if (Kotlin.equals(row.length, 0)) {
      jQuery('.container-fluid:eq(1) > .row:eq(0)').after("<div class='row' id='g118Row'>");
      row = jQuery('#g118Row');
    }
    this.objectCounter.initUI_yp3tk2$(row);
  };
  LSS.prototype.fayeEvent = function () {
    this.objectCounter.update();
  };
  function LSS$Companion() {
    LSS$Companion_instance = this;
    this.GRISU118_ROW = 'g118Row';
  }
  LSS$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var LSS$Companion_instance = null;
  function LSS$Companion_getInstance() {
    if (LSS$Companion_instance === null) {
      new LSS$Companion();
    }
    return LSS$Companion_instance;
  }
  function LSS_init$lambda(this$LSS) {
    return function () {
      this$LSS.fayeEvent();
    };
  }
  function LSS_init$lambda_0(this$LSS) {
    return function () {
      this$LSS.fayeEvent();
    };
  }
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
  function ObjectCounter() {
    ObjectCounter$Companion_getInstance();
    println('init');
  }
  ObjectCounter.prototype.initUI_yp3tk2$ = function (parent) {
    parent.append(ObjectCounter$Companion_getInstance().BUILDINGS_TABLE).append(ObjectCounter$Companion_getInstance().VEHICLE_TABLE);
  };
  ObjectCounter.prototype.update = function () {
    this.updateVehicles_0();
    this.updateBuildings_0();
  };
  function ObjectCounter$updateBuildings$lambda(it) {
    return 0;
  }
  function ObjectCounter$updateBuildings$lambda_0(closure$count) {
    return function (index, elem) {
      var bId = toInt(jQuery(elem).attr('building_type_id'));
      var $receiver = closure$count;
      var value = getValue(closure$count, bId) + 1 | 0;
      $receiver.put_xwzc9p$(bId, value);
      return true;
    };
  }
  function ObjectCounter$updateBuildings$lambda_1(it) {
    return LSSData_getInstance().buildings[it];
  }
  function ObjectCounter$updateBuildings$lambda$lambda$lambda(closure$it) {
    return function ($receiver) {
      $receiver.unaryPlus_pdl1vz$(LSSData_getInstance().buildings[closure$it]);
    };
  }
  function ObjectCounter$updateBuildings$lambda$lambda$lambda_0(closure$count, closure$it) {
    return function ($receiver) {
      $receiver.unaryPlus_pdl1vz$(getValue(closure$count, closure$it).toString());
    };
  }
  function ObjectCounter$updateBuildings$lambda$lambda(closure$it, closure$count) {
    return function ($receiver) {
      td($receiver, void 0, ObjectCounter$updateBuildings$lambda$lambda$lambda(closure$it));
      td($receiver, void 0, ObjectCounter$updateBuildings$lambda$lambda$lambda_0(closure$count, closure$it));
    };
  }
  ObjectCounter.prototype.updateBuildings_0 = function () {
    var count = withDefault(Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$(), ObjectCounter$updateBuildings$lambda);
    jQuery('.building_list_li').each(ObjectCounter$updateBuildings$lambda_0(count));
    var buildingsTableBody = jQuery('#g118BuildingsBody');
    buildingsTableBody.empty();
    var $receiver = count.keys;
    var destination = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (getValue(count, element) > 0) {
        destination.add_11rb$(element);
      }
    }
    var tmp$_0;
    tmp$_0 = Kotlin.kotlin.collections.sortedWith_eknfly$(destination, new Kotlin.kotlin.comparisons.compareBy$f(ObjectCounter$updateBuildings$lambda_1)).iterator();
    while (tmp$_0.hasNext()) {
      var element_0 = tmp$_0.next();
      buildingsTableBody.append(tr(get_create(document), void 0, ObjectCounter$updateBuildings$lambda$lambda(element_0, count)));
    }
  };
  function ObjectCounter$updateVehicles$lambda(it) {
    return 0;
  }
  function ObjectCounter$updateVehicles$lambda_0(it) {
    return 0;
  }
  function ObjectCounter$updateVehicles$lambda_1(closure$count, this$ObjectCounter, closure$availableCount) {
    return function (index, elem) {
      var vId = toInt(jQuery(elem).find('a').attr('vehicle_type_id'));
      var $receiver = closure$count;
      var value = getValue(closure$count, vId) + 1 | 0;
      $receiver.put_xwzc9p$(vId, value);
      if (this$ObjectCounter.isVehicleAvailable_0(toInt(jQuery(elem).find('span').html()))) {
        var $receiver_0 = closure$availableCount;
        var value_0 = getValue(closure$availableCount, vId) + 1 | 0;
        $receiver_0.put_xwzc9p$(vId, value_0);
      }
      return true;
    };
  }
  function ObjectCounter$updateVehicles$lambda_2(it) {
    return LSSData_getInstance().vehicles[it];
  }
  function ObjectCounter$updateVehicles$lambda$lambda$lambda(closure$it) {
    return function ($receiver) {
      $receiver.unaryPlus_pdl1vz$(LSSData_getInstance().vehicles[closure$it]);
    };
  }
  function ObjectCounter$updateVehicles$lambda$lambda$lambda_0($receiver) {
  }
  function ObjectCounter$updateVehicles$lambda$lambda$lambda_1(closure$count, closure$it) {
    return function ($receiver) {
      $receiver.unaryPlus_pdl1vz$(getValue(closure$count, closure$it).toString());
    };
  }
  function ObjectCounter$updateVehicles$lambda$lambda$lambda_2(closure$availableCount, closure$it) {
    return function ($receiver) {
      $receiver.unaryPlus_pdl1vz$(getValue(closure$availableCount, closure$it).toString());
    };
  }
  function ObjectCounter$updateVehicles$lambda$lambda(closure$it, closure$count, closure$availableCount) {
    return function ($receiver) {
      td($receiver, void 0, ObjectCounter$updateVehicles$lambda$lambda$lambda(closure$it));
      td($receiver, void 0, ObjectCounter$updateVehicles$lambda$lambda$lambda_0);
      td($receiver, void 0, ObjectCounter$updateVehicles$lambda$lambda$lambda_1(closure$count, closure$it));
      td($receiver, void 0, ObjectCounter$updateVehicles$lambda$lambda$lambda_2(closure$availableCount, closure$it));
    };
  }
  ObjectCounter.prototype.updateVehicles_0 = function () {
    var count = withDefault(Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$(), ObjectCounter$updateVehicles$lambda);
    var availableCount = withDefault(Kotlin.kotlin.collections.LinkedHashMap_init_q3lmfv$(), ObjectCounter$updateVehicles$lambda_0);
    jQuery('.building_list_vehicle_element').each(ObjectCounter$updateVehicles$lambda_1(count, this, availableCount));
    var vehicleTableObject = jQuery('#g118VehiclesBody');
    vehicleTableObject.empty();
    var $receiver = count.keys;
    var destination = Kotlin.kotlin.collections.ArrayList_init_ww73n8$();
    var tmp$;
    tmp$ = $receiver.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      if (getValue(count, element) > 0) {
        destination.add_11rb$(element);
      }
    }
    var tmp$_0;
    tmp$_0 = Kotlin.kotlin.collections.sortedWith_eknfly$(destination, new Kotlin.kotlin.comparisons.compareBy$f(ObjectCounter$updateVehicles$lambda_2)).iterator();
    while (tmp$_0.hasNext()) {
      var element_0 = tmp$_0.next();
      var tr_1 = tr(get_create(document), void 0, ObjectCounter$updateVehicles$lambda$lambda(element_0, count, availableCount));
      vehicleTableObject.append(tr_1);
    }
  };
  ObjectCounter.prototype.isVehicleAvailable_0 = function (status) {
    return status === 1 || status === 2;
  };
  function ObjectCounter$Companion() {
    ObjectCounter$Companion_instance = this;
    this.VEHICLE_TABLE_BODY = 'g118VehiclesBody';
    this.BUILDING_TABLE_BODY = 'g118BuildingsBody';
    this.VEHICLE_TABLE = div_0(get_create(document), void 0, ObjectCounter$Companion$VEHICLE_TABLE$lambda(this));
    this.BUILDINGS_TABLE = div_0(get_create(document), void 0, ObjectCounter$Companion$BUILDINGS_TABLE$lambda(this));
  }
  function ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda($receiver) {
    $receiver.unaryPlus_pdl1vz$('Fahrzeuge');
  }
  function ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda($receiver) {
    $receiver.unaryPlus_pdl1vz$('Fahrzeugtyp');
  }
  function ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda_0($receiver) {
    $receiver.unaryPlus_pdl1vz$('Fahrzeuggruppe');
  }
  function ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda_1($receiver) {
    $receiver.unaryPlus_pdl1vz$('Anzahl');
  }
  function ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda_2($receiver) {
    $receiver.unaryPlus_pdl1vz$('Verf\xFCgbar');
  }
  function ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda($receiver) {
    th($receiver, void 0, void 0, ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda);
    th($receiver, void 0, void 0, ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda_0);
    th($receiver, void 0, void 0, ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda_1);
    th($receiver, void 0, void 0, ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda_2);
  }
  function ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda($receiver) {
    tr_0($receiver, void 0, ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda);
  }
  function ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda_0(this$ObjectCounter$) {
    return function ($receiver) {
      set_id($receiver, this$ObjectCounter$.VEHICLE_TABLE_BODY);
    };
  }
  function ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda(this$ObjectCounter$) {
    return function ($receiver) {
      thead($receiver, void 0, ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda);
      tbody($receiver, void 0, ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda$lambda_0(this$ObjectCounter$));
    };
  }
  function ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda_0(this$ObjectCounter$) {
    return function ($receiver) {
      table($receiver, 'table table-bordered table-condensed table-striped table-hover', ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda$lambda(this$ObjectCounter$));
    };
  }
  function ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda(this$ObjectCounter$) {
    return function ($receiver) {
      div($receiver, 'panel-heading', ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda);
      div($receiver, 'panel-body', ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda$lambda_0(this$ObjectCounter$));
    };
  }
  function ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda(this$ObjectCounter$) {
    return function ($receiver) {
      div($receiver, 'panel panel-default', ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda$lambda(this$ObjectCounter$));
    };
  }
  function ObjectCounter$Companion$VEHICLE_TABLE$lambda(this$ObjectCounter$) {
    return function ($receiver) {
      set_id($receiver, 'g118Vehicles');
      set_classes($receiver, setOf(['col-sm-4', 'overview_outer']));
      div($receiver, 'sidebar-nav', ObjectCounter$Companion$VEHICLE_TABLE$lambda$lambda(this$ObjectCounter$));
    };
  }
  function ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda($receiver) {
    $receiver.unaryPlus_pdl1vz$('Geb\xE4ude');
  }
  function ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda($receiver) {
    $receiver.unaryPlus_pdl1vz$('Geb\xE4udetyp');
  }
  function ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda_0($receiver) {
    $receiver.unaryPlus_pdl1vz$('Anzahl');
  }
  function ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda($receiver) {
    th($receiver, void 0, void 0, ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda);
    th($receiver, void 0, void 0, ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda_0);
  }
  function ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda$lambda$lambda($receiver) {
    tr_0($receiver, void 0, ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda$lambda$lambda$lambda);
  }
  function ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda$lambda$lambda_0(this$ObjectCounter$) {
    return function ($receiver) {
      set_id($receiver, this$ObjectCounter$.BUILDING_TABLE_BODY);
    };
  }
  function ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda$lambda(this$ObjectCounter$) {
    return function ($receiver) {
      thead($receiver, void 0, ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda$lambda$lambda);
      tbody($receiver, void 0, ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda$lambda$lambda_0(this$ObjectCounter$));
    };
  }
  function ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda_0(this$ObjectCounter$) {
    return function ($receiver) {
      table($receiver, 'table table-bordered table-condensed table-striped table-hover', ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda$lambda(this$ObjectCounter$));
    };
  }
  function ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda(this$ObjectCounter$) {
    return function ($receiver) {
      div($receiver, 'panel-heading', ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda);
      div($receiver, 'panel-body', ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda$lambda_0(this$ObjectCounter$));
    };
  }
  function ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda(this$ObjectCounter$) {
    return function ($receiver) {
      div($receiver, 'panel panel-default', ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda$lambda(this$ObjectCounter$));
    };
  }
  function ObjectCounter$Companion$BUILDINGS_TABLE$lambda(this$ObjectCounter$) {
    return function ($receiver) {
      set_id($receiver, 'g118Buildings');
      set_classes($receiver, setOf(['col-sm-4', 'overview_outer']));
      div($receiver, 'sidebar-nav', ObjectCounter$Companion$BUILDINGS_TABLE$lambda$lambda(this$ObjectCounter$));
    };
  }
  ObjectCounter$Companion.$metadata$ = {
    kind: Kotlin.Kind.OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var ObjectCounter$Companion_instance = null;
  function ObjectCounter$Companion_getInstance() {
    if (ObjectCounter$Companion_instance === null) {
      new ObjectCounter$Companion();
    }
    return ObjectCounter$Companion_instance;
  }
  ObjectCounter.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'ObjectCounter',
    interfaces: [Component]
  };
  var lss;
  function main(args) {
    println('Hello Kotlin');
    lss = new LSS();
  }
  var package$ch = _.ch || (_.ch = {});
  var package$grisu118 = package$ch.grisu118 || (package$ch.grisu118 = {});
  var package$userscript = package$grisu118.userscript || (package$grisu118.userscript = {});
  var package$leitstellenspiel = package$userscript.leitstellenspiel || (package$userscript.leitstellenspiel = {});
  package$leitstellenspiel.Component = Component;
  Object.defineProperty(LSS, 'Companion', {
    get: LSS$Companion_getInstance
  });
  package$leitstellenspiel.LSS = LSS;
  Object.defineProperty(package$leitstellenspiel, 'LSSData', {
    get: LSSData_getInstance
  });
  Object.defineProperty(ObjectCounter, 'Companion', {
    get: ObjectCounter$Companion_getInstance
  });
  package$leitstellenspiel.ObjectCounter = ObjectCounter;
  Object.defineProperty(package$userscript, 'lss', {
    get: function () {
      return lss;
    },
    set: function (value) {
      lss = value;
    }
  });
  package$userscript.main_kand9s$ = main;
  lss = null;
  Kotlin.defineModule('output', _);
  main([]);
  return _;
}(typeof output === 'undefined' ? {} : output, kotlin, this['kotlinx-html-js']);
