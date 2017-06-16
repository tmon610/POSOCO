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
            //toastr["info"]("Data received from server");
            console.log(result);
            result.pntId = scadaSourceObj.pntId;
            callback(null, result);
        },
        error: function (textStatus, errorThrown) {
            console.log(textStatus);
            //console.log(errorThrown);
            callback(textStatus);
        }
    });
};

function monitorBusReactors() {
    /* Get the all scada values from API start */
    async.mapSeries(payLoadSources_g, fetchScadaValue, function (err, results) {
        if (err) {
            // handle error - do nothing since the all values are not fetched
            console.log("All values not fetched via API due to error: " + JSON.stringify(err));
            addAndDisplaySuggestion({
                categoryPriority: 0,
                severityPriority: -0.1,
                dataSourceObj: {},
                message: "All values not fetched via API due to error: " + JSON.stringify(err)
            });
            return;
        }
        //All the values are available in the results Array
        scadaAPIResults_g = results;
        clearSuggestions();
        checkAllVoltagesForSuggestions();
        displaySuggestions();
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
                numBrsIn = substationBRsStatusObj.on.length;
                if (numBrsIn) {
                    categoryStr = "info";
                    categoryPriority = 0;
                    messageStr = substationSourceObj.name + " voltage is low but all Bus Reactors are OUT";
                } else {
                    categoryStr = "action";
                    categoryPriority = 1;
                    messageStr = "Take " + numBrsIn + " Bus Reactors of " + substationSourceObj.name + " out since the voltage is " + substationAPIResultObj.dval;
                }

                // Push to global array
                addSuggestion({
                    categoryPriority: categoryPriority,
                    categoryStr: categoryStr,
                    message: messageStr,
                    brIds: substationBRsStatusObj["off"],
                    dataSourceObj: substationSourceObj,
                    severity: severityStr,
                    severityPriority: severityPriority,
                    color: colorStr
                });
            }
            else if (substationAPIResultObj.dval > substationSourceObj.high_alert_limit || substationAPIResultObj.dval > substationSourceObj.high_warning_limit) {
                // If Substation voltage > high_alert_limit - switch on bus reactors if out

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
                if (numBrsOut) {
                    categoryPriority = 0;
                    categoryStr = "info";
                    messageStr = substationSourceObj.name + " voltage is high but all Bus Reactors are IN";
                } else {
                    categoryPriority = 1;
                    categoryStr = "action";
                    messageStr = "Take " + numBrsOut + " Bus Reactors of " + substationSourceObj.name + " into service since the voltage is " + substationAPIResultObj.dval;
                }

                // Push to global array
                addSuggestion({
                    categoryPriority: categoryPriority,
                    categoryStr: categoryStr,
                    message: messageStr,
                    brIds: substationBRsStatusObj["on"],
                    dataSourceObj: substationSourceObj,
                    severity: severityStr,
                    severityPriority: severityPriority,
                    color: colorStr
                });
            }
        }
    }

    /* Generate suggestion for substation bus reactors end */

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
}

function displaySuggestions() {
    var suggestions = [];
    // sort suggestions array by category first and severity next - most important will be at the last
    suggestionsArray_g.sort(dynamicSortMultiple("categoryPriority", "severityPriority"));
    suggestions.push("<h3  style='color:white'>Suggestions</h3>" + "  \n");
    for (var i = suggestionsArray_g.length - 1; i >= 0; i--) {
        var colorStr = suggestionsArray_g[i]["color"];
        if (!colorStr) {
            colorStr = "white";
        }
        var tempString = suggestionsArray_g[i]["message"] + " [pointId = " + suggestionsArray_g[i]["dataSourceObj"]["pntId"] + "]";
        suggestions.push("<p style='color:" + colorStr + "'>" + tempString + "</p>");
    }
    document.getElementById("div_suggestion").innerHTML = suggestions.join("\n");
}

function addSuggestion(newSuggestion) {
    suggestionsArray_g.push(newSuggestion);
}

function addAndDisplaySuggestion(newSuggestion) {
    addSuggestion(newSuggestion);
    displaySuggestions();
}

function clearSuggestions() {
    suggestionsArray_g = [];
    document.getElementById("div_suggestion").innerHTML = "<h3  style='color:white'>Suggestions</h3>" + "\n";
}

function startMonitoring() {
    stopMonitoring();
    monitorBusReactors();
    mainTimerId_g = setInterval(monitorBusReactors, monitoringInterval_g);
}

function stopMonitoring() {
    clearInterval(mainTimerId_g);
}