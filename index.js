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

var fetchScadaValue = function (scadaSourceObj, callback) {
    // check if  scadaSourceObj.pntId is present
    if (!scadaSourceObj.pntId) {
        return callback(new Error("The Scada Source Object has no `pntId` attribute"));
    }
    $.ajax({
        url: apiServerBaseAddress_g + "/api/values/real?pnt=" + scadaSourceObj.pntId,
        type: 'GET',
        success: function (result) {
            if (!result) {
                //console.log("Null result obtained for ", scadaSourceObj);
                result = {dval: null, pntId: scadaSourceObj.pntId};
                return callback(null, result);
            }
            //console.log(result);
            //toastr["info"]("Data received from server");
            result.pntId = scadaSourceObj.pntId;
            var val = result.dval;
            // Convert Numeric value to string if present
            if (typeof val != 'undefined' && val != null && !isNaN(val)) {
                result.dval = Number(val);
            }
            callback(null, result);
        },
        error: function (textStatus, errorThrown) {
            //console.log(textStatus);
            //console.log(errorThrown);
            callback(textStatus);
        }
    });
};

function monitorBusReactors(fInpObj, done) {
    /* Get the all scada values from API start */
    async.mapSeries(payLoadSources_g, fetchScadaValue, function (err, results) {
        if (err) {
            // handle error - do nothing since the all values are not fetched
            // console.log("All values not fetched via API due to error: " + JSON.stringify(err));
            addAndDisplaySuggestion({
                categoryStr: category_priority_info_g.br_on_off_error.name,
                categoryPriority: category_priority_info_g.br_on_off_error.priority,
                severityPriority: -0.1,
                dataSourceObj: {},
                message: "All Bus Reactor values not fetched via API due to error: " + JSON.stringify(err)
            });
            return done(err);
        }
        //All the values are available in the results Array
        scadaAPIResults_g = results;
        checkAllVoltagesForSuggestions();
        return done(null, null);
    });
    /* Get the all scada values from API end */

    /* Generate suggestion for substation bus reactors start */
    function checkAllVoltagesForSuggestions() {
        for (var i = 0; i < substation_objects_g.length; i++) {
            // Create Bus Reactor suggestion for a substation and append to global suggestions array
            var substationSourceObj = substation_objects_g[i];
            var substationAPIResultObj = getLocalScadaValueObjById(substationSourceObj.pntId);
            var substationBRsStatusObj = createBRStatusObj(substationSourceObj['brIds']);
            var categoryStr = "info", categoryPriority = 0, messageStr = "", numBrsOut, numBrsIn, severityStr = "info", severityPriority = 0, colorStr = "blue";
            if (!substationAPIResultObj) {

                // Log an error suggestion
                addSuggestion({
                    categoryStr: category_priority_info_g.br_on_off_error.name,
                    categoryPriority: category_priority_info_g.br_on_off_error.priority,
                    severityPriority: -0.1,
                    dataSourceObj: substationSourceObj,
                    severity: "alert",
                    severityPriority: 0,
                    severityIndex: 0,
                    message: "Null API result obtained for " + substationSourceObj.name + " " + substationSourceObj.base_voltage + " KV"
                });
                continue;
            }
            if (substationAPIResultObj.dval < substationSourceObj.low_alert_limit || substationAPIResultObj.dval < substationSourceObj.low_warning_limit) {
                // If Substation voltage < low_alert_limit or low_warning_limit - switch off BRs if IN

                // Decide severity
                if (substationAPIResultObj.dval < substationSourceObj.low_alert_limit) {
                    severityStr = "alert";
                    severityPriority = 1;
                    colorStr = "red";
                } else {
                    severityStr = "warning";
                    severityPriority = 0;
                    colorStr = "yellow";
                }

                // Create Suggestion
                numBrsOut = substationBRsStatusObj.off.length;
                numBrsIn = substationBRsStatusObj.on.length;
                if (numBrsOut == substationSourceObj.brIds.length) {
                    categoryStr = category_priority_info_g.br_on_off_info.name;
                    categoryPriority = category_priority_info_g.br_on_off_info.priority;
                    messageStr = substationSourceObj.name + " voltage(" + substationAPIResultObj.dval + ") is low but all(" + substationSourceObj.brIds.length + ") Bus Reactors are OUT";
                } else {
                    categoryStr = category_priority_info_g.br_on_off_action.name;
                    categoryPriority = category_priority_info_g.br_on_off_action.priority;
                    messageStr = "OUT " + numBrsIn + " Bus Reactors of <span class='name_span'>" + substationSourceObj.name + "</span> since voltage is <span class='name_span'>" + substationAPIResultObj.dval + "</span>";
                }
                messageStr += "[num_IN = " + numBrsIn + ", num_OUT = " + numBrsOut + "]";

                // Push to global array
                addSuggestion({
                    categoryPriority: categoryPriority,
                    categoryStr: categoryStr,
                    message: messageStr,
                    brIds: substationBRsStatusObj["off"],
                    dataSourceObj: substationSourceObj,
                    severity: severityStr,
                    severityPriority: severityPriority,
                    severityIndex: Math.abs((substationAPIResultObj.dval - substationSourceObj.base_voltage) / substationSourceObj.base_voltage),
                    color: colorStr
                });
            }
            else if (substationAPIResultObj.dval > substationSourceObj.high_alert_limit || substationAPIResultObj.dval > substationSourceObj.high_warning_limit) {
                // If Substation voltage > high_alert_limit - switch on bus reactors if out

                // Decide severity
                if (substationAPIResultObj.dval > substationSourceObj.high_alert_limit) {
                    severityStr = "alert";
                    severityPriority = 1;
                    colorStr = "red";
                } else {
                    severityStr = "warning";
                    severityPriority = 0;
                    colorStr = "yellow";
                }

                // Create Suggestion
                numBrsOut = substationBRsStatusObj.off.length;
                numBrsIn = substationBRsStatusObj.on.length;
                if (numBrsIn == substationSourceObj.brIds.length) {
                    categoryPriority = category_priority_info_g.br_on_off_info.priority;
                    categoryStr = category_priority_info_g.br_on_off_info.name;
                    messageStr = substationSourceObj.name + " voltage(" + substationAPIResultObj.dval + ") is high but all(" + substationSourceObj.brIds.length + ") Bus Reactors are IN";
                } else {
                    categoryPriority = category_priority_info_g.br_on_off_action.priority;
                    categoryStr = category_priority_info_g.br_on_off_action.name;
                    messageStr = "TAKE " + numBrsOut + " Bus Reactors of <span class='name_span'>" + substationSourceObj.name + "</span> into service since voltage is <span class='name_span'>" + substationAPIResultObj.dval + "</span>";
                }
                messageStr += "[num_IN = " + numBrsIn + ", num_OUT = " + numBrsOut + "]";

                // Push to global array
                addSuggestion({
                        categoryPriority: categoryPriority,
                        categoryStr: categoryStr,
                        message: messageStr,
                        brIds: substationBRsStatusObj["on"],
                        dataSourceObj: substationSourceObj,
                        severity: severityStr,
                        severityPriority: severityPriority,
                        severityIndex: Math.abs((substationAPIResultObj.dval - substationSourceObj.base_voltage) / substationSourceObj.base_voltage),
                        color: colorStr
                    }
                );
            }
        }
        refreshVoltageTableData();
    }

    /* Generate suggestion for substation bus reactors end */
}

// Return the status of a Bus Reactors Array as an object with `on` and `off` lists
function createBRStatusObj(brIdObjectsArray) {
    var i = 0;
    var busReactorsStatusObj = {"on": [], "off": []};
    for (i = 0; i < brIdObjectsArray.length; i++) {
        // stub
        var valObj = getLocalScadaValueObjById(brIdObjectsArray[i]["pntId"], true);
        if (valObj == null) {
            continue;
        }

        if (valObj.dval > brFlowThresholdForOn_g) {
            busReactorsStatusObj["on"].push(brIdObjectsArray[i]["pntId"]);
        } else {
            busReactorsStatusObj["off"].push(brIdObjectsArray[i]["pntId"]);
        }
    }
    return busReactorsStatusObj;
}

function startMonitoring() {
    stopMonitoring();
    doMonitoring();
    mainTimerId_g = setInterval(doMonitoring, monitoringInterval_g);
}

function stopMonitoring() {
    clearInterval(mainTimerId_g);
}

window.onload = function () {
    setUpVoltageSortTable();
    startMonitoring();
};

function doMonitoring() {
    var processStartTime = new Date();
    var doBRMonitoring = function (callback) {
        monitorBusReactors(null, function (err, result) {
            callback(null, null);
        });
    };
    var doKolhapurMapusaHVOffMonitoring = function (prevRes, callback) {
        monitorKolhapurMapusaHVOut(null, function (err, result) {
            callback(null, null);
        });
    };
    var functionsArray = [doBRMonitoring, doKolhapurMapusaHVOffMonitoring];
    clearSuggestionsArray();
    async.waterfall(functionsArray, function (err, result) {
        displaySuggestions();
        var processEndTime = new Date();
        document.getElementById("lastUpdatedText").innerHTML = processEndTime.getDate() + "/" + (processEndTime.getMonth() + 1) + "/" + processEndTime.getFullYear() + " " + processEndTime.getHours() + ":" + processEndTime.getMinutes() + ":" + processEndTime.getSeconds();
        document.getElementById("processTimeText").innerHTML = "" + (processEndTime.getTime() - processStartTime.getTime()) / 1000;
    });
}

/*
 * Algorithm
 * *********
 * If voltage at substation >= high_warning_limit or high_alert_limit (Problem)
 * and
 * all bus reactors are not in service (constraints to take action),
 * generate the suggestion to take in the remaining bus reactors that are out of service (action)
 * else the give the constraints list for non feasibility of action (excuse)
 *
 * If voltage at substation <= low_warning_limit or low_alert_limit (Problem)
 * and
 * any bus reactor is in service (constraints to take action),
 * generate the suggestion to take out the remaining bus reactors that are in service (action)
 * else the give the constraints list for non feasibility of action (excuse)
 * */