function setUpVoltageSortTable() {
    var data = [{
        id: "NA",
        name: "NA",
        base_voltage: "NA",
        voltage: "NA",
        pu: "NA",
        num_br_in: "NA",
        num_br_out: "NA",
        pntId: "NA"
    }];
    $('#example').DataTable({
        responsive: true,
        "data": data,
        "order": [[4, "desc"]],
        "pageLength": 35,
        "lengthMenu": [[10, 15, 20, 25, 30, 35, 40, 50, 60, 80, 100, -1], [10, 15, 20, 25, 30, 35, 40, 50, 60, 80, 100, "All"]],
        "columns": [
            {"data": "id"},
            {"data": "name"},
            {"data": "base_voltage"},
            {"data": "voltage"},
            {"data": "pu"},
            {"data": "num_br_in"},
            {"data": "num_br_out"},
            {"data": "pntId"}
        ]
    });
}

function refreshVoltageTableData() {
    var table = $('#example').dataTable();
    var dataArray = [];
    // scan the substation_objects_g  object, getLocalScadaValueObjById function, etc and get the real time voltages data and update the dataArray array like the below format
    // [{id: 1, name: "Sub_1", base_voltage: 765, voltage: 772, pu: 772/765, num_br_in: 1, num_br_out: 0, pntId: "asdasda"}, ...]
    for (var i = 0; i < substation_objects_g.length; i++) {
        var substationSourceObj = substation_objects_g[i];
        var substationAPIResultObj = getLocalScadaValueObjById(substationSourceObj.pntId);
        if (!substationAPIResultObj) {
            continue;
        }
        var substationBRsStatusObj = createBRStatusObj(substationSourceObj['brIds']);
        var numBrsOut = substationBRsStatusObj.off.length;
        var numBrsIn = substationBRsStatusObj.on.length;
        dataArray.push({
            id: (i + 1),
            name: substationSourceObj.name,
            base_voltage: substationSourceObj.base_voltage,
            voltage: Math.round(substationAPIResultObj.dval * 100) / 100,
            pu: Math.round((substationAPIResultObj.dval / substationSourceObj.base_voltage) * 1000) / 1000,
            num_br_in: numBrsIn,
            num_br_out: numBrsOut,
            pntId: substationSourceObj.pntId
        });
    }
    table.fnClearTable();
    table.fnAddData(dataArray);
}