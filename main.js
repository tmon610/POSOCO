function startScript()
{

    var sources_g = [
    {pntId:"123", brIds:[101,102,103],base_voltage:400,high_alert_limit:420, high_warning_limit:410, low_warning_limit:390, low_alert_limit:380},
    {pntId:"456",brIds:[104,105,106],base_voltage:765, high_alert_limit:795, high_warning_limit:785, low_warning_limit:755, low_alert_limit:745},
    {pntId:"789",brIds:[107,108,109],base_voltage:200, high_alert_limit:210, high_warning_limit:205, low_warning_limit:195, low_alert_limit:190},
    ];

    var payLoadSources_g = [];

    for (var i = sources_g.length - 1; i >= 0; i--) {
        payLoadSources.push(sources_g[i]);
        for (var k = sources_g[i]["brIds"].length - 1; k >= 0; k--) {
            payLoadSources.push(sources_g[i]["brIds"][k]);
        }
    }

    var results_g = {};
    var suggestions="<h2>Suggestions</h2>" + "  \n";


    function BRstatus(brId)
    {
        if(brId.bus_reactor_flow>5)
            return 0;
        else 
            return 1;
    }



    function generateSuggestions(substationAPIResultObj,substationSourceObj)//Create an alert over condition
    {
        var i=0;
        if(substationAPIResultObj.dval>substationSourceObj.high_warning_limit)
        {
            for(i=0;i<substationSourceObj["brIds"].length;i++)
            {
                if(BRstatus(substationSourceObj["brIds"][i])==0)
                {

                    //alert("Switch On the bus reactor having id:"+substationSourceObj["brIds"][i]+" of point id:"+substationSourceObj.pntId);
                    suggestions += "<p style='color:yellow'>Switch On the bus reactor having id:"+substationSourceObj["brIds"][i]+" of point id:"+substationSourceObj.pntId+"</p>"+"  \n";

                }
            }
        }
        else if(substationAPIResultObj.dval<substationSourceObj.low_warning_limit)
        {
            for(i=0;i<substationSourceObj["brIds"].length;i++)
            {
                if(BRstatus(substationSourceObj["brIds"][i])==1)
                {

                    //alert("Switch Off the bus reactor having id:"+substationSourceObj["brIds"][i]+" of point id:"+substationSourceObj.pntId);
                    suggestions += "<p style='color:yellow'>Switch Off the bus reactor having id:"+substationSourceObj["brIds"][i]+" of point id:"+substationSourceObj.pntId+"</p>"+"  \n";

                }
            }
        }

        else if(substationAPIResultObj.dval<substationSourceObj.low_alert_limit)
        {

            suggestions += "<p style='color:red'>Your base voltage has dropped below low_alert_limit</p>";

        }

        else if(substationAPIResultObj.dval>substationSourceObj.high_alert_limit)
        {

            suggestions += "<p style='color:red'>Your base voltage has climbed above high_alert_limit</p>";

        }
    }



    function substation(substationSourceObj)//Set the value according to base voltage.
    {
        if(substationSourceObj.low_warning_limit && substationSourceObj.high_warning_limit && substationSourceObj.low_alert_limit && substationSourceObj.high_alert_limit)
            return;
        else
        {
            if(substationSourceObj.base_voltage==400)
            {
                substationSourceObj.low_alert_limit=380;
                substationSourceObj.high_alert_limit=420;
            }
            else if(substationSourceObj.base_voltage==765)
            {
                substationSourceObj.low_alert_limit=745;
                substationSourceObj.high_alert_limit=795;
            }
            else
            {
                substationSourceObj.low_alert_limit=substationSourceObj.base_voltage-0.05*base_voltage;
                substationSourceObj.high_alert_limit=substationSourceObj.base_voltage+0.05*base_voltage;
            }

        }

    }


    var getScadaValue = function (sourceObj, callback) {
        $.ajax({
            url: "http://localhost:62448/api/values/real?pnt="+sourceObj.pntId,
            type: 'GET',
            success: function (result) {
                //toastr["info"]("Data received from server");
                console.log(result);
                result.pntId = sourceObj.pntId;
                
                /*
                substation(result.dval);
                generateSuggestions(result.dval,sourceObj.brIds,sourceObj.pntId);
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

    function doLimitChecks(){
        for (var i = sources_g.length - 1; i >= 0; i--) {
            substation(sources_g[i]);
            generateSuggestions(results_g[i],sources_g[i]);

        };
    }
    document.getElementById("divsuggestion").innerHTML = suggestions;
}

function start(){
    startScript();
    myVar = setInterval(startScript, 5000);
}

function stop(){
    clearInterval(myVar);
}
