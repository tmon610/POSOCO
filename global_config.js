// global variables start
var substation_objects_g = [
    {
        name: 'Aurangabad',
        pntId: 'WRLDCMP.SCADA1.A0037327',
        base_voltage: 765,
        brIds: [{name: 'Aurangabad_BR1', pntId: 'WRLDCMP.SCADA1.A0037389'}]
    },
    {
        name: 'Akola',
        pntId: 'WRLDCMP.SCADA1.A0036004',
        base_voltage: 765,
        brIds: [{name: 'Akola_BR1', pntId: 'WRLDCMP.SCADA1.A0000577'}]
    },
    {
        name: 'Bina',
        pntId: 'WRLDCMP.SCADA1.A0000743',
        base_voltage: 765,
        brIds: [{name: 'Bina_BR1', pntId: 'WRLDCMP.SCADA1.A0000777'}]
    },
    {
        name: 'Bhopal_BDTCL',
        pntId: 'WRLDCMP.SCADA1.A0037486',
        base_voltage: 765,
        brIds: [{name: 'Bhopal_BDTCL_BR1', pntId: 'WRLDCMP.SCADA1.A0037515'}]
    },
    {
        name: 'Champa',
        pntId: 'WRLDCMP.SCADA1.A0045143',
        base_voltage: 765,
        brIds: [{name: 'Champa_BR1', pntId: 'WRLDCMP.SCADA1.A0041484'}]
    },
    {
        name: 'Dharamjaygarh',
        pntId: 'WRLDCMP.SCADA1.A0038193',
        base_voltage: 765,
        brIds: [{name: 'Dharamjaygarh_BR1', pntId: 'WRLDCMP.SCADA1.A0038248'}, {
            name: 'Dharamjaygarh_BR2',
            pntId: 'WRLDCMP.SCADA1.A0038250'
        }]
    },
    {
        name: 'Dhule_BDTCL',
        pntId: 'WRLDCMP.SCADA1.A0038510',
        base_voltage: 765,
        brIds: [{name: 'Dhule_BDTCL_BR1', pntId: 'WRLDCMP.SCADA1.A0038538'}]
    },
    {
        name: 'Gwalior',
        pntId: 'WRLDCMP.SCADA1.A0001481',
        base_voltage: 765,
        brIds: [{name: 'Gwalior_BR1', pntId: 'WRLDCMP.SCADA1.A0001526'}]
    },
    {
        name: 'Indore_PG',
        pntId: 'WRLDCMP.SCADA1.A0001655',
        base_voltage: 765,
        brIds: [{name: 'Indore_PG_BR1', pntId: 'WRLDCMP.SCADA1.A0001682'}, {
            name: 'Indore_PG_BR2',
            pntId: 'WRLDCMP.SCADA1.A0001684'
        }]
    },
    {
        name: 'Koradi(3)',
        pntId: 'WRLDCMP.SCADA1.A0045802',
        base_voltage: 765,
        brIds: [{name: 'Koradi(3)_BR1', pntId: 'WRLDCMP.SCADA1.A0045828'}]
    },
    {
        name: 'Kotra',
        pntId: 'WRLDCMP.SCADA1.A0037886',
        base_voltage: 765,
        brIds: [{name: 'Kotra_BR1', pntId: 'WRLDCMP.SCADA1.A0037936'}]
    },
    {
        name: 'Pune_GIS',
        pntId: 'WRLDCMP.SCADA1.A0043527',
        base_voltage: 765,
        brIds: [{name: 'Pune_GIS_BR1', pntId: 'WRLDCMP.SCADA1.A0043546'}]
    },
    {
        name: 'Sasan',
        pntId: 'WRLDCMP.SCADA1.A0003668',
        base_voltage: 765,
        brIds: [{name: 'Sasan_BR1', pntId: 'WRLDCMP.SCADA1.A0003705'}, {
            name: 'Sasan_BR2',
            pntId: 'WRLDCMP.SCADA1.A0003938'
        }]
    },
    {
        name: 'Satna',
        pntId: 'WRLDCMP.SCADA1.A0003911',
        base_voltage: 765,
        brIds: [{name: 'Satna_BR1', pntId: 'WRLDCMP.SCADA1.A0043860'}]
    },
    {
        name: 'Seoni',
        pntId: 'WRLDCMP.SCADA1.A0004009',
        base_voltage: 765,
        brIds: [{name: 'Seoni_BR1', pntId: 'WRLDCMP.SCADA1.A0004055'}]
    },
    {
        name: 'Sipat',
        pntId: 'WRLDCMP.SCADA1.A0004142',
        base_voltage: 765,
        brIds: [{name: 'Sipat_BR1', pntId: 'WRLDCMP.SCADA1.A0004207'}]
    },
    {
        name: 'Solapur',
        pntId: 'WRLDCMP.SCADA1.A0004318',
        base_voltage: 765,
        brIds: [{name: 'Solapur_BR1', pntId: 'WRLDCMP.SCADA3.A0106150'}]
    },
    {
        name: 'Tamnar',
        pntId: 'WRLDCMP.SCADA1.A0038086',
        base_voltage: 765,
        brIds: [{name: 'Tamnar_BR1', pntId: 'WRLDCMP.SCADA1.A0038107'}]
    },
    {
        name: 'Tiroda',
        pntId: 'WRLDCMP.SCADA1.A0035916',
        base_voltage: 765,
        brIds: [{name: 'Tiroda_BR1', pntId: 'WRLDCMP.SCADA1.A0035947'}]
    },
    {
        name: 'Vadodara',
        pntId: 'WRLDCMP.SCADA1.A0043471',
        base_voltage: 765,
        brIds: [{name: 'Vadodara_BR1', pntId: 'WRLDCMP.SCADA1.A0043493'}]
    },
    {
        name: 'Vindhyanchal_PS',
        pntId: 'WRLDCMP.SCADA1.A0043415',
        base_voltage: 765,
        brIds: [{name: 'Vindhyanchal_PS_BR1', pntId: 'WRLDCMP.SCADA1.A0045506'}]
    },
    {
        name: 'Wardha',
        pntId: 'WRLDCMP.SCADA1.A0005340',
        base_voltage: 765,
        brIds: [{name: 'Wardha_BR1', pntId: 'WRLDCMP.SCADA1.A0005439'}, {
            name: 'Wardha_BR2',
            pntId: 'WRLDCMP.SCADA1.A0005448'
        }]
    },
    {
        name: 'Durg',
        pntId: 'WRLDCMP.SCADA1.A0037548',
        base_voltage: 765,
        brIds: [{name: 'Durg_BR1', pntId: 'WRLDCMP.SCADA1.A0037581'}]
    },
    {
        name: 'Ektuni',
        pntId: 'WRLDCMP.SCADA3.A0100958',
        base_voltage: 765,
        brIds: [{name: 'Ektuni_BR1', pntId: 'WRLDCMP.SCADA3.A0100986'}]
    },
    {
        name: 'Aurangabad',
        pntId: 'WRLDCMP.SCADA1.A0037317',
        base_voltage: 400,
        brIds: [{name: 'Aurangabad_BR1', pntId: 'WRLDCMP.SCADA1.A0037380'}]
    },
    {
        name: 'Bachau',
        pntId: 'WRLDCMP.SCADA1.A0000077',
        base_voltage: 400,
        brIds: [{name: 'Bachau_BR1', pntId: 'WRLDCMP.SCADA1.A0000121'}, {
            name: 'Bachau_BR2',
            pntId: 'WRLDCMP.SCADA1.A0000126'
        }]
    },
    {
        name: 'Bhadrawati',
        pntId: 'WRLDCMP.SCADA1.A0000279',
        base_voltage: 400,
        brIds: [{name: 'Bhadrawati_BR1', pntId: 'WRLDCMP.SCADA1.A0000326'}]
    },
    {
        name: 'Bhatapara',
        pntId: 'WRLDCMP.SCADA1.A0000449',
        base_voltage: 400,
        brIds: [{name: 'Bhatapara_BR1', pntId: 'WRLDCMP.SCADA1.A0000471'}]
    },
    {
        name: 'Bina',
        pntId: 'WRLDCMP.SCADA1.A0000653',
        base_voltage: 400,
        brIds: [{name: 'Bina_BR1', pntId: 'WRLDCMP.SCADA1.A0000701'}]
    },
    {
        name: 'Damoh',
        pntId: 'WRLDCMP.SCADA1.A0001028',
        base_voltage: 400,
        brIds: [{name: 'Damoh_BR1', pntId: 'WRLDCMP.SCADA1.A0001065'}, {
            name: 'Damoh_BR2',
            pntId: 'WRLDCMP.SCADA1.A0001067'
        }]
    },
    {
        name: 'Dehgam',
        pntId: 'WRLDCMP.SCADA1.A0001154',
        base_voltage: 400,
        brIds: [{name: 'Dehgam_BR1', pntId: 'WRLDCMP.SCADA1.A0001204'}, {
            name: 'Dehgam_BR2',
            pntId: 'WRLDCMP.SCADA1.A0001206'
        }]
    },
    {
        name: 'Gwalior',
        pntId: 'WRLDCMP.SCADA1.A0001475',
        base_voltage: 400,
        brIds: [{name: 'Gwalior_BR1', pntId: 'WRLDCMP.SCADA1.A0001522'}, {
            name: 'Gwalior_BR2',
            pntId: 'WRLDCMP.SCADA1.A0001523'
        }, {name: 'Gwalior_BR3', pntId: 'WRLDCMP.SCADA1.A0001524'}]
    },
    {
        name: 'Indore',
        pntId: 'WRLDCMP.SCADA1.A00001647',
        base_voltage: 400,
        brIds: [{name: 'Indore_BR1', pntId: 'WRLDCMP.SCADA1.A00001678'}, {
            name: 'Indore_BR2',
            pntId: 'WRLDCMP.SCADA1.A00001680'
        }]
    },
    {
        name: 'Itarsi',
        pntId: 'WRLDCMP.SCADA1.A00001727',
        base_voltage: 400,
        brIds: [{name: 'Itarsi_BR1', pntId: 'WRLDCMP.SCADA1.A00001768'}, {
            name: 'Itarsi_BR2',
            pntId: 'WRLDCMP.SCADA1.A00001773'
        }, {name: 'Itarsi_BR3', pntId: 'WRLDCMP.SCADA1.A00001779'}]
    },
    {
        name: 'Jabalpur',
        pntId: 'WRLDCMP.SCADA1.A00001834',
        base_voltage: 400,
        brIds: [{name: 'Jabalpur_BR1', pntId: 'WRLDCMP.SCADA1.A00001866'}, {
            name: 'Jabalpur_BR2',
            pntId: 'WRLDCMP.SCADA1.A00001871'
        }]
    },
    {
        name: 'Jabalpur Pooling',
        pntId: 'WRLDCMP.SCADA1.A0037668',
        base_voltage: 400,
        brIds: [{name: 'Jabalpur Pooling_BR1', pntId: 'WRLDCMP.SCADA1.A0037718'}, {
            name: 'Jabalpur Pooling_BR2',
            pntId: 'WRLDCMP.SCADA1.A0037719'
        }]
    },
    {
        name: 'Kala',
        pntId: 'WRLDCMP.SCADA1.A0038352',
        base_voltage: 400,
        brIds: [{name: 'Kala_BR1', pntId: 'WRLDCMP.SCADA1.A0045105'}]
    },
    {
        name: 'Khandwa',
        pntId: 'WRLDCMP.SCADA1.A0002414',
        base_voltage: 400,
        brIds: [{name: 'Khandwa_BR1', pntId: 'WRLDCMP.SCADA1.A0002453'}, {
            name: 'Khandwa_BR2',
            pntId: 'WRLDCMP.SCADA1.A0002455'
        }]
    },
    {
        name: 'Kolhapur',
        pntId: 'WRLDCMP.SCADA1.A0046560',
        base_voltage: 400,
        brIds: [{name: 'Kolhapur_BR1', pntId: 'WRLDCMP.SCADA1.A0046585'}]
    },
    {
        name: 'Kotra',
        pntId: 'WRLDCMP.SCADA1.A0037878',
        base_voltage: 400,
        brIds: [{name: 'Kotra_BR1', pntId: 'WRLDCMP.SCADA1.A0037933'}]
    },
    {
        name: 'Mapusa',
        pntId: 'WRLDCMP.SCADA1.A0002803',
        base_voltage: 400,
        brIds: [{name: 'Mapusa_BR1', pntId: 'WRLDCMP.SCADA1.A0002831'}]
    },
    {
        name: 'Navsari',
        pntId: 'WRLDCMP.SCADA1.A0002957',
        base_voltage: 400,
        brIds: [{name: 'Navsari_BR1', pntId: 'WRLDCMP.SCADA1.A0002991'}]
    },
    {
        name: 'Pirana',
        pntId: 'WRLDCMP.SCADA1.A0003094',
        base_voltage: 400,
        brIds: [{name: 'Pirana_BR1', pntId: 'WRLDCMP.SCADA1.A0003122'}]
    },
    {
        name: 'Pune',
        pntId: 'WRLDCMP.SCADA1.A0003148',
        base_voltage: 400,
        brIds: [{name: 'Pune_BR1', pntId: 'WRLDCMP.SCADA1.A0003198'}]
    },
    {
        name: 'Betul',
        pntId: 'WRLDCMP.SCADA3.A0104646',
        base_voltage: 400,
        brIds: [{name: 'Betul_BR1', pntId: 'WRLDCMP.SCADA3.A0104684'}]
    },
    {
        name: 'Daman',
        pntId: 'WRLDCMP.SCADA1.A0038757',
        base_voltage: 400,
        brIds: [{name: 'Daman_BR1', pntId: 'WRLDCMP.SCADA1.A0038785'}]
    },
    {
        name: 'Parli',
        pntId: 'WRLDCMP.SCADA1.A0003026',
        base_voltage: 400,
        brIds: [{name: 'Parli_BR1', pntId: 'WRLDCMP.SCADA1.A0003066'}, {
            name: 'Parli_BR2',
            pntId: 'WRLDCMP.SCADA1.A0047579'
        }]
    },
    {
        name: 'Wardha',
        pntId: 'WRLDCMP.SCADA1.A0005331',
        base_voltage: 400,
        brIds: [{name: 'Wardha_BR1', pntId: 'WRLDCMP.SCADA1.A0005432'}]
    },
    {
        name: 'Raigarh',
        pntId: 'WRLDCMP.SCADA1.A0003249',
        base_voltage: 400,
        brIds: [{name: 'Raigarh_BR1', pntId: 'WRLDCMP.SCADA1.A0003295'}, {
            name: 'Raigarh_BR2',
            pntId: 'WRLDCMP.SCADA1.A0003296'
        }]
    },
    {
        name: 'Raipur',
        pntId: 'WRLDCMP.SCADA1.A0003328',
        base_voltage: 400,
        brIds: [{name: 'Raipur_BR1', pntId: 'WRLDCMP.SCADA1.A0003408'}, {
            name: 'Raipur_BR2',
            pntId: 'WRLDCMP.SCADA1.A0003420'
        }]
    },
    {
        name: 'Rajgarh',
        pntId: 'WRLDCMP.SCADA1.A0003501',
        base_voltage: 400,
        brIds: [{name: 'Rajgarh_BR1', pntId: 'WRLDCMP.SCADA1.A0003535'}]
    },
    {
        name: 'Satna',
        pntId: 'WRLDCMP.SCADA1.A0003794',
        base_voltage: 400,
        brIds: [{name: 'Satna_BR1', pntId: 'WRLDCMP.SCADA1.A0003840'}, {
            name: 'Satna_BR2',
            pntId: 'WRLDCMP.SCADA1.A0003851'
        }]
    },
    {
        name: 'Seoni',
        pntId: 'WRLDCMP.SCADA1.A0004003',
        base_voltage: 400,
        brIds: [{name: 'Seoni_BR1', pntId: 'WRLDCMP.SCADA1.A0004051'}, {
            name: 'Seoni_BR2',
            pntId: 'WRLDCMP.SCADA1.A0004053'
        }]
    },
    {
        name: 'Solapur',
        pntId: 'WRLDCMP.SCADA1.A0004312',
        base_voltage: 400,
        brIds: [{name: 'Solapur_BR1', pntId: 'WRLDCMP.SCADA1.A0004362'}]
    },
    {
        name: 'Sujalpur',
        pntId: 'WRLDCMP.SCADA1.A0004553',
        base_voltage: 400,
        brIds: [{name: 'Sujalpur_BR1', pntId: 'WRLDCMP.SCADA1.A0004583'}, {
            name: 'Sujalpur_BR2',
            pntId: 'WRLDCMP.SCADA1.A0047587'
        }]
    },
    {
        name: 'Vindhyanchal Pooling',
        pntId: 'WRLDCMP.SCADA1.A0043409',
        base_voltage: 400,
        brIds: [{name: 'Vindhyanchal Pooling_BR1', pntId: 'WRLDCMP.SCADA1.A0043438'}]
    },
    {
        name: 'Champa',
        pntId: 'WRLDCMP.SCADA1.A0045141',
        base_voltage: 400,
        brIds: [{name: 'Champa_BR1', pntId: 'WRLDCMP.SCADA1.A0048917'}]
    }
];

var payLoadSources_g = [];
var scadaAPIResults_g = [];
var suggestionsArray_g = [];
var suggestionStrikeThroughArray_g = [];
var brFlowThresholdForOn_g = 5;
var mainTimerId_g = null;
var monitoringInterval_g = 10000;
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
