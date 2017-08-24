/*global $ */
/*jslint browser: true*/

$(document).ready(function (){
    displayInputs();
    displayAll();


    $('.yes').change(output);
    $('.no').change(resetPage);
    $('#deleteBtn').on('click', resetPage);
});

function output(){
    var diagnosisCode = $(this).val();
    
    var lab = data.diagnosis.filter(function(obj) {
        return obj.code === diagnosisCode;
    });
    
    var name = lab[0].name;
    var code = lab[0].code;
    var quarter = lab[0].quarters;
    var labs = lab[0].labs.toString().replace(",",", ");

    console.log(name + "\n");
    console.log(code + "\n");
    console.log(quarter + "\n");
    console.log(labs + "\n");


    if(name === "Diabetes"){
        // button2 = type2 < || > @ hemoglobin A1c (HgbA1c) 7.0
        $(this).val("hi");
        console.log($(this).val());

        var $div = $(this).parent().parent().parent();
        $div.empty();
        for(var i = 0; i < dataCKD.diagnosis.length; i++){
            $div.append("<p>"+i+"</p>");
        }
    }else if(name==="Chronic Kidney Disease"){
        var $div = $(this).parent().parent().parent();
        $div.empty();
    }

    $("#copybox").val(copyBox(name,labs,quarter));
    outputChart(code,labs,quarter);
}

function resetPage(){
    $('[data-toggle="buttons"] :radio').prop('checked', false);
    $('[data-toggle="buttons"] label').removeClass('active');
    $('[data-toggle="buttons"] label:has(input:radio[name="no"])').addClass('active');
    $('#Q1').empty();
    $('#Q2').empty();
    $('#Q3').empty();
    $('#Q4').empty();
    $("#copybox").val("");
}

function copyBox(name, labs, quarter){
    if(quarter === 1){
        copy1 = copy1.concat("\n\nDX:: ",name,"\n",labs);
        copy2 = copy2.concat("\n\nDX:: ",name,"\n",labs);
        copy3 = copy3.concat("\n\nDX:: ",name,"\n",labs);
        copy4 = copy4.concat("\n\nDX:: ",name);
    }else if(quarter === 2){
        copy2 = copy2.concat("\n\nDX:: ",name,"\n",labs);
        copy4 = copy4.concat("\n\nDX:: ",name,"\n",labs);
    }else if(quarter === 4){
        copy4 = copy4.concat("\n\nDX:: ",name,"\n",labs);
    }
    var copyText = copy1.concat(copy2,copy3,copy4);
    return copyText;
}

function outputChart(code, labs, quarter){
    if(quarter === 1){  
        $("#Q1").append("<p id="+code+">"+labs+"</p>");
        $("#Q2").append("<p id="+code+">"+labs+"</p>");
        $("#Q3").append("<p id="+code+">"+labs+"</p>");
        $("#Q4").append("<p id="+code+">"+labs+"</p>");
    }else if(quarter === 2){
        $("#Q2").append("<p id="+code+">"+labs+"</p>");
        $("#Q4").append("<p id="+code+">"+labs+"</p>");
    }else if(quarter === 4){
        $("#Q4").append("<p id="+code+">"+labs+"</p>");
    }else{
        $("#status").append("<p>Something unexpected happened.</p>")
    }
}

function displayInputs(){
    var $div;
    for(var i = 0; i < data.diagnosis.length; i++){
        $("#inputDisplay").append( 
            "<div class='row'>" +
                "<div class='col-sm-4 col-md-4'>" +
                    "<h4>"+data.diagnosis[i].name+"</h4>" +
                    "<h6>"+data.diagnosis[i].code+"</h6>" +
                "</div>" +
                "<div class='col-sm-4 col-md-4'>" +
                    "<div class='btn-group' class='no' data-toggle='buttons'>" +
                        "<label class='btn btn-success btn-lg active'>" +
                            "<input type='radio' class='no' name='no' autocomplete='off' value='" +
                            data.diagnosis[i].code +
                            "' checked='checked'>No" +
                        "</label>" +
                        "<label class='btn btn-success btn-lg' class='yes'>" +
                            "<input type='radio' class='yes' name='yes' autocomplete='off' value='" + data.diagnosis[i].code + 
                            "' checked='checked'>Yes" +
                        "</label>" +
                    "</div>" +
                "</div>" +
            "</div>");
    }
}

function displayAll(){
    var $div;
    for(var i = 0; i < data.diagnosis.length; i++) {
        $div = $(
        "<div class='row'>" +
            "<div class='col-sm-2'>" +
                "<p>"+data.diagnosis[i].name+"</p>" +
            "</div>" +
            "<div class='col-sm-2'>" +
                "<p>"+data.diagnosis[i].code+"</p>" +
            "</div>" +
            "<div class='col-sm-2'>" +
                "<p>"+toRoman(data.diagnosis[i].quarters)+"</p>" +
            "</div>" +
            "<div class='col-sm-4'>" +
                "<p>"+data.diagnosis[i].labs+"</p>" +
            "</div>" +
        "</div>");
        $("#sheetDisplay").append($div);
    }
}

function toRoman(num){
    var roman =  {"M" :1000, "CM":900, "D":500, "CD":400, "C":100, "XC":90, "L":50, "XL":40, "X":10, "IX":9, "V":5, "IV":4, "I":1}, str = "";
    for (var i of Object.keys(roman)) {
        var q = Math.floor(num / roman[i]);
        num -= q * roman[i];
        str += i.repeat(q);
    }
    return str;
}

var copy1 = "\n111111111111111111111111111111\n\nQUARTER 1";
var copy2 = "\n\n\n2222222222222222222222222222222\n\nQUARTER 2"; 
var copy3 = "\n\n\n3333333333333333333333333333333\n\nQUARTER 3";
var copy4 = "\n\n\n44444444444444444444444444444444\n\nQUARTER 4";

//diagnosis
var data = {
    diagnosis: [ {
        name: "Amiodarone",
        code: "Z51.81"/*, Z79.899"*/,
        quarters: 4,
        labs:
            [ "ALT", "TSH", "CXR", "PFT", "Slit lamp" ]
    },  {
        name: "Congestive Heart Failure",
        code: "I50.32",
        quarters: 4,
        labs: [ "BNP" ]
    },{
        name: "Chronic Kidney Disease",
        code: "0",
        quarters: 1,
        labs: [ "?" ]
    },  {
        name: "Diabetes",
        code: "11",
        quarters: 1,
        labs: [ "HgbA1c" ]
    },  {
        name: "Diuretic Therapy",
        code: "Z51.81",
        quarters: 4,
        labs: [ "Mg", "Potassium" ]
    },  {
        name: "Hematuria",
        code: "0",
        quarters: 4,
        labs: [ "Urinalysis" ]
    },  {
        name: "Hyperlipidemia",
        code: "E78.2",
        quarters: 2,
        labs: [ "Lipid Profile", "ALT" ]
    },  {
        name: "Hypertension",
        code: "0",
        quarters: 4,
        labs: [ "ECG", "UA", "Malb" ]
    },  {
        name: "Hypothyroidism",
        code: "E03.9",
        quarters: 4,
        labs: [ "TSH" ]
    },  {
        name: "Reclast",
        code: "Z51.83",
        quarters: 4,
        labs: [ "Renel Fx Panel", "Mg" ]
    },  {
        name: "Vitamin D Deficiency",
        code: "0",
        quarters: 4,
        labs: [ "Vitamin D" ]
    }]
};

//diagnosis
var data2 = {
    diagnosis: [ {
        name: "Congestive Heart Failure",
        code: "I50.32",
        quarters: 4,
        labs: [ "BNP" ]
    },  {
        name: "Chronic Kidney Disease",
        code: "0",
        quarters: 1,
        labs: [ "?" ]
    },  {
        name: "Diabetes Type 1",
        code: "0",
        quarters: 1,
        labs: [ "HgbA1c" ]
    },  {
        name: "Diabetes Type 2",
        code: "E11.21",
        quarters: 1,
        labs: [ "HgbA1c" ]
    },  {
        name: "Diabetes Type 2",
        code: "E11.9",
        quarters: 2,
        labs: [ "HgbA1c" ]
    }]
};

//diagnosis
var dataCKD = {
    diagnosis: [ {
        name: "Chronic Kidney Disease1",
        code: "0",
        quarters: 1,
        labs: [ "?" ]
    },  {
        name: "Chronic Kidney Disease2",
        code: "0",
        quarters: 1,
        labs: [ "HgbA1c" ]
    },  {
        name: "Chronic Kidney Disease3",
        code: "E11.21",
        quarters: 1,
        labs: [ "HgbA1c" ]
    },  {
        name: "Chronic Kidney Disease4",
        code: "E11.9",
        quarters: 2,
        labs: [ "HgbA1c" ]
    }]
};
