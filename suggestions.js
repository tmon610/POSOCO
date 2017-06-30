function displaySuggestions() {
    var suggestions = [];
    // sort suggestions array by category first and severity next - most important will be at the last
    suggestionsArray_g.sort(dynamicSortMultiple("categoryPriority", "severityPriority", "severityIndex"));
    suggestions.push("<h3  style='color:white'>Suggestions</h3>" + "  \n");
    for (var i = suggestionsArray_g.length - 1; i >= 0; i--) {
        // If there is change in category priority and severity Priority add <br>
        if (i == suggestionsArray_g.length - 1 || suggestionsArray_g[i]["categoryPriority"] != suggestionsArray_g[i + 1]["categoryPriority"]) {
            suggestions.push("<br>");
            suggestions.push("<div class='category_separator'>" + suggestionsArray_g[i]["categoryStr"] + "</div>");
        } else if (suggestionsArray_g[i]["severityPriority"] != suggestionsArray_g[i + 1]["severityPriority"]) {
            //suggestions.push("<br>");
        }
        var colorStr = suggestionsArray_g[i]["color"];
        if (!colorStr) {
            colorStr = "white";
        }
        var tempString = suggestionsArray_g[i]["message"] + " <span class='debug_span'>[pntId = " + suggestionsArray_g[i]["dataSourceObj"]["pntId"] + "]</span>";
        suggestions.push("<p style='color:" + colorStr + "'" + ((isMessageInStrikeList(suggestionsArray_g[i]) != null) ? " class='suggestion_strike' " : "") + " >" + tempString + "<button style='width:1px;height:10px' onclick='strikeFunction(this," + i + ")'></button></p>");
    }
    document.getElementById("div_suggestion").innerHTML = suggestions.join("\n");
}

function addSuggestion(newSuggestionObj) {
    // First check if the suggestion object has the properties categoryPriority, categoryStr, severityPriority,
    // message, dataSourceObj
    if (newSuggestionObj == undefined || newSuggestionObj["categoryPriority"] == undefined
        || newSuggestionObj["categoryStr"] == undefined || newSuggestionObj["severityPriority"] == undefined
        || newSuggestionObj["message"] == undefined || newSuggestionObj["dataSourceObj"] == undefined) {
        return null;
    }
    suggestionsArray_g.push(newSuggestionObj);
}

function strikeFunction(but, suggestionIterator) {
    var suggestionObj;
    suggestionObj = suggestionsArray_g[suggestionIterator];
    // toggle the class to toggle strike off css
    var strike_class = "suggestion_strike";
    var classList = but.parentElement.className.split(" ");
    if (classList.indexOf(strike_class) == -1) {
        classList.push(strike_class);
    } else {
        classList.splice(strike_class);
    }
    but.parentElement.className = classList.join(" ");

    //add to blacklist if absent
    if (isMessageInStrikeList(suggestionObj) == null) {
        addSuggestionToStrikeOffList(suggestionObj);
    } else {
        //remove from blacklist if present
        var remove_i = isMessageInStrikeList(suggestionObj);
        suggestionStrikeThroughArray_g.splice(remove_i);
    }
}

function isMessageInStrikeList(suggestionObj) {
    // first check if the suggestion object has the properties categoryPriority, dataSourceObj, dataSourceObj.pntId
    if (suggestionObj == undefined || suggestionObj["categoryPriority"] == undefined || suggestionObj["dataSourceObj"]["pntId"] == undefined) {
        return null;
    }
    for (var i = 0; i < suggestionStrikeThroughArray_g.length; i++) {
        if ((suggestionStrikeThroughArray_g[i]["categoryPriority"] == suggestionObj["categoryPriority"]) && (suggestionStrikeThroughArray_g[i]["dataSourceObj"].pntId == suggestionObj["dataSourceObj"]["pntId"])) {
            return i;
        }
    }
    return null;
}

function addSuggestionToStrikeOffList(suggestionObj) {
    // first check if the suggestion object has the properties categoryPriority, dataSourceObj, dataSourceObj.pntId
    if (suggestionObj == undefined || suggestionObj["categoryPriority"] == undefined || suggestionObj["dataSourceObj"]["pntId"] == undefined) {
        return null;
    }
    suggestionStrikeThroughArray_g.push(suggestionObj);
}

function addAndDisplaySuggestion(newSuggestionObj) {
    addSuggestion(newSuggestionObj);
    displaySuggestions();
}

function clearSuggestions() {
    suggestionsArray_g = [];
    document.getElementById("div_suggestion").innerHTML = "<h3  style='color:white'>Suggestions</h3>" + "\n";
}

function clearSuggestionsArray() {
    suggestionsArray_g = [];
}
