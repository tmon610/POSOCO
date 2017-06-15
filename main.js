// global variables start
var sources_g = [
{
    pntId: "123",
    brIds: [101, 102, 103],
    base_voltage: 400,
    high_alert_limit: 420,
    high_warning_limit: 410,
    low_warning_limit: 390,
    low_alert_limit: 380
},
{
    pntId: "456",
    brIds: [104, 105, 106],
    base_voltage: 765,
    high_alert_limit: 795,
    high_warning_limit: 785,
    low_warning_limit: 755,
    low_alert_limit: 745
},
{
    pntId: "789",
    brIds: [107, 108, 109],
    base_voltage: 200,
    high_alert_limit: 210,
    high_warning_limit: 205,
    low_warning_limit: 195,
    low_alert_limit: 190
}
];

var payLoadSources_g = [];
var results_g = {};
var suggestionsArray = [];

// global variables end

for (var i = sources_g.length - 1; i >= 0; i--) {
    payLoadSources_g.push(sources_g[i]);
    for (var k = sources_g[i]["brIds"].length - 1; k >= 0; k--) {
        payLoadSources_g.push(sources_g[i]["brIds"][k]);
    }
}
// Set the value according to base voltage.
function defineSubstationThresholdValues(substationSourceObj) {
        //if all the attributes are defined for substationSourceObj ???
        if (substationSourceObj.low_warning_limit && substationSourceObj.high_warning_limit && substationSourceObj.low_alert_limit && substationSourceObj.high_alert_limit)
            return;
        else 
        {
                if (substationSourceObj.base_voltage == 400) {
                    substationSourceObj.low_alert_limit = 380;
                    substationSourceObj.high_alert_limit = 420;
                }
                else if (substationSourceObj.base_voltage == 765) {
                    substationSourceObj.low_alert_limit = 745;
                    substationSourceObj.high_alert_limit = 795;
                }
                else {
                    substationSourceObj.low_alert_limit = substationSourceObj.base_voltage - 0.05 * base_voltage;
                    substationSourceObj.high_alert_limit = substationSourceObj.base_voltage + 0.05 * base_voltage;
                }
        }
}

for (var i = sources_g.length - 1; i >= 0; i--) {
    defineSubstationThresholdValues(sources_g[i]);
}


function getLocalScadaValue(idStr, isNumeric)
 {
    var idStr1 = "" + idStr;
    var val = results_g[idStr1];
        if (typeof val != 'undefined' || val != null) 
        {
            if (isNumeric) 
            {
                if(!isNaN(val))
                {
                    return val;
                } 
                else
                {
                    return null;
                }
            }
            return val;
        }
        else 
        {
            return null;
        }
}


function startScript() 
{
    //var suggestions = "<h2  style='color:white'>Suggestions</h2>" + "  \n";


    /*function checkBRStatus(brId) {
        var val = getLocalScadaValue(brId, true);
        if (val == null) {
            return null;
        }
        if (val > 5)
            return 0;
        else
            return 1;
    }*/

    function checkBRStatus(brIds)
    {
        var i=0;
        var BRStatusArray{};
        for(i=0;i<brIds.length;i++)
        {
            var val = getLocalScadaValue(brIds[i],true);
            if (val == null) 
            {
                //return null;
                continue;
            }

            if (val > 5)
                    BRStatusArray["on"].push(brIds[i]);
            else
                    BRStatusArray["off"].push(brIds[i]);
        }

            return BRStatusArray;
    }
        /*var val = getLocalScadaValue(brId, true);
        if (val == null) {
            return null;
        }
        if (val > 5)
            return 0;
        else
            return 1;
    
    }*/


    // Create an alert over condition
    function generateSuggestionsArray(substationAPIResultObj, substationSourceObj) 
    {
        var i = 0;
        var BRStatusArray{} = checkBRStatus(substationSourceObj[brIds];
        if (substationAPIResultObj.dval > substationSourceObj.high_warning_limit) 
        {
            suggestionsArray.push({message:"Switch off "+substationSourceObj["brIds"].length+" bus reactor(s)", brIds:BRStatusArray["on"], pntId:substationSourceObj.pntId, color:"yellow"});
        }
        else if (substationAPIResultObj.dval < substationSourceObj.low_warning_limit) 
        {
                    //alert("Switch Off the bus reactor having id:"+substationSourceObj["brIds"][i]+" of point id:"+substationSourceObj.pntId);
                    //suggestions += "<p style='color:yellow'>Switch Off the bus reactor having id:" + substationSourceObj["brIds"][i] + " of point id:" + substationSourceObj.pntId + "</p>" + "  \n";
                    suggestionsArray.push({message:"Switch On "+substationSourceObj["brIds"].length+" bus reactor(s)", brIds:BRStatusArray["off"], pntId:substationSourceObj.pntId, color:"yellow"});
        }
        else if (substationAPIResultObj.dval < substationSourceObj.low_alert_limit) 
        {
            //suggestions += "<p style='color:red'>Your base voltage has dropped below low_alert_limit</p>";
            suggestionsArray.push({message:"Switch On "+substationSourceObj["brIds"].length+" bus reactor(s)", brIds:BRStatusArray["off"], pntId:substationSourceObj.pntId, color:"red"});
        }
        else if (substationAPIResultObj.dval > substationSourceObj.high_alert_limit) 
        {

            //suggestions += "<p style='color:red'>Your base voltage has climbed above high_alert_limit</p>";
            suggestionsArray.push({message:"Switch off "+substationSourceObj["brIds"].length+" bus reactor(s)", brIds:BRStatusArray["on"], pntId:substationSourceObj.pntId, color:"red"});
        }
    }




    var getScadaValue = function (sourceObj, callback) {
        $.ajax({
            //check if  sourceObj.pntId is present
            url: "http://localhost:62448/api/values/real?pnt=" + sourceObj.pntId,
            type: 'GET',
            success: function (result) {
                //toastr["info"]("Data received from server");
                console.log(result);
                result.pntId = sourceObj.pntId;

                /*
                 defineSubstationThresholdValues(result.dval);
                 generateSuggestionsArray(result.dval,sourceObj.brIds,sourceObj.pntId);
                 */

                 callback(null, result);
             },
             error: function (textStatus, errorThrown) {
                console.log(textStatus);
                console.log(errorThrown);
                callback(errorThrown);
            }
        });
    };

    //finding each owner Id
    async.mapSeries(payLoadSources_g, getScadaValue, function (err, results) {
        if (err) {
            // handle the error
        }

        //All the values are available in the results Array
        results_g = results;
        doLimitChecks();

    });

    function doLimitChecks() {
        for (var i = sources_g.length - 1; i >= 0; i--) {
            //defineSubstationThresholdValues(sources_g[i]);
            generateSuggestionsArray(results_g[i], sources_g[i]);

        }
    }

    //document.getElementById("divsuggestion").innerHTML = suggestions;
    displaySuggestions();
}

function displaySuggestions(){
    var i=0,k=0;
    var suggestions = [];
    var suggestions.push("<h2  style='color:white'>Suggestions</h2>" + "  \n");
    for(i=0;i<suggestionsArray.length;i++)
    {
        //var n = person[2]["firstName"].localeCompare("shubhu");
        var yellowWarn = suggestionsArray[i]["color"].localeCompare("yellow");
        var tempString="";
            for(k=0;k<suggestionsArray[i]["brIds"].length;k++)
            {
                tempString += ""+suggestionsArray[i]["message"]+ " with brId:"+suggestionsArray[i]["brId"][k]+" ";
            }
        if(yellowWarn==0)
        {
           
            suggestions.push("<p style='color:yellow'>"+tempString+"and pntId:"+suggestionsArray[i]["pntId"]+"</p>");
        }
        else
        {
            suggestions.push("<p style='color:red'>"+tempString+"at pntId:"+suggestionsArray[i]["pntId"]+"</p>");
        }
    }
    document.getElementById("divsuggestion").innerHTML = suggestions.join("\n");
}

function start() {
    startScript();
    myVar = setInterval(startScript, 5000);
}

function stop() {
    clearInterval(myVar);
}
