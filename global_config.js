// global variables start
var substation_objects_g = [
    {
        name: "PUNE GIS SHIKHRAPUR 765kV SUBSTATION",
        pntId: "WRLDCMP.SCADA1.A0043525",
        brIds: [{pntId: "WRLDCMP.SCADA1.A0043555", name: "Substation_1_BR_1"}, {
            pntId: "WRLDCMP.SCADA1.A0043556",
            name: "Substation_1_BR_2"
        }],
        base_voltage: 765,
        high_alert_limit: 795,
        high_warning_limit: 785,
        low_warning_limit: 755,
        low_alert_limit: 745
    },
    {
        name: "SHOLAPUR-PG 765kV SUBSTATION",
        pntId: "WRLDCMP.SCADA1.A0004316",
        brIds: [{pntId: "WRLDCMP.SCADA1.A0043558", name: "Substation_2_BR_1"}, {
            pntId: "WRLDCMP.SCADA1.A0043560",
            name: "Substation_2_BR_2"
        }],
        base_voltage: 765,
        high_alert_limit: 795,
        high_warning_limit: 785,
        low_warning_limit: 755,
        low_alert_limit: 745
    }
];

var payLoadSources_g = [];
var scadaAPIResults_g = {};
var suggestionsArray_g = [];
var brFlowThresholdForOn_g = 5;
var mainTimerId_g = null;
var monitoringInterval_g = 5000;
var apiServerBaseAddress_g = "http://localhost:62448";
// global variables end

// Create the payLoadSources_g array
for (var i = 0; i < substation_objects_g.length; i++) {
    payLoadSources_g.push(substation_objects_g[i]);
    for (var k = 0; k < substation_objects_g[i]["brIds"].length; k++) {
        payLoadSources_g.push(substation_objects_g[i]["brIds"][k]);
    }
}

for (var i = 0; i < substation_objects_g.length; i++) {
    defineSubstationVoltageLimitsIfAbsent(substation_objects_g[i]);
}

// Set the limits according to base voltage if limits are absent
function defineSubstationVoltageLimitsIfAbsent(substationSourceObj) {
    // base_voltage attribute is not defined return
    if (!substationSourceObj.base_voltage) {
        return;
    }

    //  If low alert limit attribute is not present
    if (!substationSourceObj.low_alert_limit) {
        if (substationSourceObj.base_voltage == 765) {
            substationSourceObj.low_alert_limit = 750;
        } else if (substationSourceObj.base_voltage == 400) {
            substationSourceObj.low_alert_limit = 380;
        } else {
            substationSourceObj.low_alert_limit = substationSourceObj.base_voltage - 0.05 * substationSourceObj.base_voltage;
        }
    }
    //  If high alert limit attribute is not present
    if (!substationSourceObj.high_alert_limit) {
        if (substationSourceObj.base_voltage == 765) {
            substationSourceObj.high_alert_limit = 795;
        } else if (substationSourceObj.base_voltage == 400) {
            substationSourceObj.high_alert_limit = 420;
        } else {
            substationSourceObj.high_alert_limit = substationSourceObj.base_voltage + 0.05 * substationSourceObj.base_voltage;
        }
    }
    //  If low warning limit attribute is not present
    if (!substationSourceObj.low_warning_limit) {
        if (substationSourceObj.base_voltage == 765) {
            substationSourceObj.low_warning_limit = 755;
        } else if (substationSourceObj.base_voltage == 400) {
            substationSourceObj.low_warning_limit = 390;
        } else {
            substationSourceObj.low_warning_limit = substationSourceObj.base_voltage - 0.025 * substationSourceObj.base_voltage;
        }
    }
    //  If high warning limit attribute is not present
    if (!substationSourceObj.high_warning_limit) {
        if (substationSourceObj.base_voltage == 765) {
            substationSourceObj.high_warning_limit = 780;
        } else if (substationSourceObj.base_voltage == 400) {
            substationSourceObj.high_warning_limit = 410;
        } else {
            substationSourceObj.high_warning_limit = substationSourceObj.base_voltage + 0.025 * substationSourceObj.base_voltage;
        }
    }
}