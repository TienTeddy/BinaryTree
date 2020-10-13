var temporaty = new Array();
var count = 0; var string = "";
var arrayred = new Array(); numberred = 0;
var array = new Array();
var actions = new Array();

var myVar = setInterval(function() {
    myTimer();
}, 1000);
    
function myTimer() {
    var d = new Date();
    document.getElementById("clock").innerHTML = d.toLocaleTimeString();
}

// Only input number
function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
        // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9]|\./;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

var ii=9; var arrayNumber=2;
function add_Array() {
    var divArray = document.createElement("div");
    divArray.id = "arr-" + arrayNumber;
    //show divArray
    var divArr = document.getElementById("col-sm-11");
    divArr.appendChild(divArray);

    var div = document.getElementById("arr-" + arrayNumber);

    //tạo phần tử input
    for (var i = 0; i < 9; i++) {
        //create input
        var input = document.createElement("input");
        input.className = "input-sm form-control inp";
        input.onkeypress = "validate(event)";
        input.id = "array-" + ii;
        input.style.marginRight = "0.73%";
        ii += 1;
        div.appendChild(input);
    }

    arrayNumber += 1;
    $("#number-array").html("NUMBER[...]:&nbsp;" + ii);

};

function showInput() {
    
    var values;
    var next = 0; var next1 = 0; 
    $('.inp').each(function () {
        values = this.value;
        if (values !== "") {
            array[count] = values;
            count += 1;
        }
    });

    // del number out array
    for (var i = 0; i < count;i++){
        for (var j = 0; j < numberred; j++) {
            if (array[i] == arrayred[j]) {
                var index = array.indexOf(arrayred[j]);
                if (index > -1) {
                    array.splice(index, 1);
                }
            }
        }
    }

    var str = "";
    $.each(array, function (index, value) {
        //document.getElementById("results-array").innerHTML = value;
        str += value + ",";
        actions[index] = Number(value);
    });
    
    document.getElementById("results-array").innerHTML = str;

    //checking inputed or not input
    temporaty[0] = array[0];
    $("#number-array").html("NUMBER[...]:&nbsp;" + count);
    countT = count; string = str;

    array = array.slice(0, count);
    count = 0;

    return string;
}

$(document).ready(function () {
    //call spinner off
    $('#spinner-action').hide();
    
    $("#run_").click(function () {
        if (temporaty[0] == null) {
            alert("Please enter nodes!");
            return false;
        }

        $(".inp").prop("readonly", true);
        $('#spinner-action').show();

        jQuery.ajax({
            type: "POST",
            url: 'Home/AVLTree',
            data: { data: actions },
            dataType: "json",
            beforeSend: function () {
                $('#spinner-action').show(); //Hide your spinner after your call
            },
            success: function (data) {
                $("#results-array").html(data);
                $("#results-array").hide();
            },
            complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
                setTimeout(() => {
                    $('#spinner-action').hide();
                    $("#results-array").show();
                }, 2000);
            },
        });

        return true;
    });
    $("#edit_").click(function () {
        $(".inp").prop("readonly", false);
    });
    $("#delete_").click(function () {
        //var strd = showInput();
        //console.log(string);
        $("#values-array").html("Tree Array: &nbsp; [ &nbsp;" + string + "&nbsp; ]");
    });


    //delete Node
    $("#submit_delete").click(function () {
        var str1 = string;
        var val = $("#value-delete").val();
        var boolean=false;

        if (temporaty[0] != null) {
            for (var i = 0; i < ii;i++){
                if (str1[i] === val) {
                    boolean = true;
                    str1 = str1.slice(0, i) + str1.slice(i+2, ii);
                }
            }
        }
        else {
            alert("Nodes empty!");
            return false;
        }

        //check boolean
        if (boolean == true) {
            alert("Delete node->value = "+ val +", success!");
            $("#values-array").html("Tree Array: &nbsp; [ &nbsp;" + str1 + "&nbsp; ]");
            $("#results-array").html(str1);
            string = str1;

            for (var i = 0; i < ii; i++) {
                var value = $("#array-"+i).val();
                if (val === value) {
                    $("#array-" + i).prop("readonly", true);
                    $("#array-" + i).css("background-color", "#CC3333");
                    $("#array-" + i).css("color", "white");

                    arrayred[numberred] = value.toString();
                    numberred += 1;
                }
            }

            return true;
        }
        else {
            alert("Find node not exits!");
            return false;
        }
        
    });
});