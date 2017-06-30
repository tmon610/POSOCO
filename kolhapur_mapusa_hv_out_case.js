function monitorKolhapurMapusaHVOut(fInpObj, done) {
    /* Get the all scada values from API start */
    var scadaAPIResults_g = [];
    var hvOffVoltThreshold = 419;
    var hvOnVoltThreshold = 405;
    var requiredObjects = [
        {
            name: 'Kolhapur_Mapusa_1',
            pntId: 'WRLDCMP.SCADA1.A0046570',
            base_voltage: 400
        },
        {
            name: 'Kolhapur_Mapusa_2',
            pntId: 'WRLDCMP.SCADA1.A0046573',
            base_voltage: 400
        },
        {
            name: 'Kolhapur_PG',
            pntId: 'WRLDCMP.SCADA1.A0046562',
            base_voltage: 400
        },
        {
            name: 'Mapusa',
            pntId: 'WRLDCMP.SCADA1.A0002805',
            base_voltage: 400
        }
    ];

    async.mapSeries(requiredObjects, fetchScadaValue, function (err, results) {
        if (err) {
            // handle error - do nothing since the all values are not fetched
            // console.log("Kolhapur Mapusa line flow values not fetched via API due to error: " + JSON.stringify(err));
            addAndDisplaySuggestion({
                categoryStr: category_priority_info_g.kolhapur_mapusa_hv_on_off_error.name,
                categoryPriority: category_priority_info_g.kolhapur_mapusa_hv_on_off_error.priority,
                severityPriority: -0.1,
                dataSourceObj: {},
                message: "Kolhapur Mapusa line flow values not fetched via API due to error: " + JSON.stringify(err)
            });
            return done(err);
        }
        //All the values are available in the results Array
        scadaAPIResults_g = results;
        checkKolhapurMapusaForHVOff();
        return done(null, null);
    });
    /* Get the all scada values from API end */

    /* Generate suggestion for Kolhapur Mapusa HV Off start */
    function checkKolhapurMapusaForHVOff() {
        // If voltage of Kolhapur and Mapusa is > 418 kV and if both lines are in service, give suggestion to s/w off one line
        var kolhapurSubstationSourceObj = requiredObjects[2];
        var kolhapurSubstationAPIResultObj = getLocalScadaValueObjById(kolhapurSubstationSourceObj.pntId);
        var mapusaSubstationSourceObj = requiredObjects[3];
        var mapusaSubstationAPIResultObj = getLocalScadaValueObjById(mapusaSubstationSourceObj.pntId);
        var kolMap1SourceObj = requiredObjects[0];
        var kolMap1APIResultObj = getLocalScadaValueObjById(kolMap1SourceObj.pntId);
        var kolMap2SourceObj = requiredObjects[1];
        var kolMap2APIResultObj = getLocalScadaValueObjById(kolMap2SourceObj.pntId);
        var numLinesIn = 0;
        numLinesIn += (kolMap1APIResultObj.dval >= 3) ? 1 : 0;
        numLinesIn += (kolMap2APIResultObj.dval >= 3) ? 1 : 0;
        var categoryStr = category_priority_info_g.kolhapur_mapusa_hv_on_off_info.name, categoryPriority = category_priority_info_g.kolhapur_mapusa_hv_on_off_info.priority, messageStr = "", severityStr = "alert", severityPriority = 1, colorStr = "red";
        if (kolhapurSubstationAPIResultObj.dval >= 423 || (kolhapurSubstationAPIResultObj.dval >= hvOffVoltThreshold && mapusaSubstationAPIResultObj.dval >= hvOffVoltThreshold)) {
            //If voltage > Threshold
            if (numLinesIn == 2) {
                // If both lines are in service
                var kol_map_loading = kolMap1APIResultObj.dval + kolMap2APIResultObj.dval;
                if (kol_map_loading < 250 || (kol_map_loading < 300 && kolhapurSubstationAPIResultObj.dval >= 423 && mapusaSubstationAPIResultObj.dval >= 423)) {
                    categoryStr = category_priority_info_g.kolhapur_mapusa_hv_on_off_action.name;
                    categoryPriority = category_priority_info_g.kolhapur_mapusa_hv_on_off_action.priority;
                    messageStr = "OUT 1 of the " + numLinesIn + " Lines between <span class='name_span'>Kolhapur-Mapusa</span> since the voltages are <span class='name_span'>" + kolhapurSubstationAPIResultObj.dval + ", " + kolhapurSubstationAPIResultObj.dval + "</span>. Also Mahalakshmi-Amona & Tillari-Amona to be in service";
                } else {
                    categoryStr = category_priority_info_g.kolhapur_mapusa_hv_on_off_info.name;
                    categoryPriority = category_priority_info_g.kolhapur_mapusa_hv_on_off_info.priority;
                    messageStr = "Kolhapur-Mapusa Voltages are high(<span class='name_span'>" + kolhapurSubstationAPIResultObj.dval + ", " + kolhapurSubstationAPIResultObj.dval + "</span>) and both lines are IN, but Kolhapur-Mapusa loading is high(<span class='name_span'>" + kol_map_loading + "</span>)";
                }
            } else {
                categoryStr = category_priority_info_g.kolhapur_mapusa_hv_on_off_info.name;
                categoryPriority = category_priority_info_g.kolhapur_mapusa_hv_on_off_info.priority;
                messageStr = "Kolhapur-Mapusa Voltages are high(<span class='name_span'>" + kolhapurSubstationAPIResultObj.dval + ", " + kolhapurSubstationAPIResultObj.dval + "</span>) but already " + (2 - numLinesIn) + " lines are out";
            }
            // Push to global array
            addSuggestion({
                categoryPriority: categoryPriority,
                categoryStr: categoryStr,
                message: messageStr,
                dataSourceObj: kolhapurSubstationSourceObj,
                severity: severityStr,
                severityPriority: severityPriority,
                severityIndex: 1,
                color: colorStr
            });
        } else if (kolhapurSubstationAPIResultObj.dval <= hvOnVoltThreshold || mapusaSubstationAPIResultObj.dval <= hvOnVoltThreshold) {
            if (numLinesIn != 2) {
                categoryStr = category_priority_info_g.kolhapur_mapusa_hv_on_off_action.name;
                categoryPriority = category_priority_info_g.kolhapur_mapusa_hv_on_off_action.priority;
                messageStr = "Take IN 1 of the lines between <span class='name_span'>Kolhapur-Mapusa</span> since the voltages are <span class='name_span'>" + kolhapurSubstationAPIResultObj.dval + ", " + kolhapurSubstationAPIResultObj.dval + "</span>";
            } else {
                categoryStr = category_priority_info_g.kolhapur_mapusa_hv_on_off_info.name;
                categoryPriority = category_priority_info_g.kolhapur_mapusa_hv_on_off_info.priority;
                messageStr = "Kolhapur-Mapusa Voltages are low(<span class='name_span'>" + kolhapurSubstationAPIResultObj.dval + ", " + kolhapurSubstationAPIResultObj.dval + "</span>) but already both lines are IN";
            }
            // Push to global array
            addSuggestion({
                categoryPriority: categoryPriority,
                categoryStr: categoryStr,
                message: messageStr,
                dataSourceObj: kolhapurSubstationSourceObj,
                severity: severityStr,
                severityPriority: severityPriority,
                severityIndex: 1,
                color: colorStr
            });
        }
    }

    /* Generate suggestion for Kolhapur Mapusa HV Off end */

    function getLocalScadaValueObjById(idStr, isNumeric) {
        var valObj = null;
        for (var i = 0; i < scadaAPIResults_g.length; i++) {
            if (scadaAPIResults_g[i]["pntId"] == idStr) {
                valObj = scadaAPIResults_g[i];
            }
        }
        if (typeof valObj == 'undefined' && !valObj && !valObj.dval) {
            return null;
        }
        var val = valObj.dval;
        if (typeof val != 'undefined' && val != null) {
            if (isNumeric) {
                if (!isNaN(val)) {
                    return valObj;
                }
                return null;
            }
            return valObj;
        }
        return null;
    }
}

/*
 * Algorithm
 * *********
 * If voltage at both ends >= 419 or voltage at mapusa >= 423 (Problem)
 * and
 * both lines are in service and Mahalakshmi-Amona, Tillari-Amona 220 kV lines are in service (constraints to take action)
 * and
 * If Kolhapur-Mapusa loading < 250 or Kolhapur-Mapusa loading < 300 and any one voltage > 423, (constraints to take action)
 * generate the suggestion to trip one of the Kolhapur Mapusa line (action)
 * else the give the constraints list for non feasibility of action (excuse)
 * */