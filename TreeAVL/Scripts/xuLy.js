var temporaty = new Array();
var count = 0; var string = "";
var arrayred = new Array(); numberred = 0; dem = 0;
var array = new Array();
var actions = new Array();
var TucA = new Array();
var co = false;

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

var ii=8; var arrayNumber=2;
function add_Array() {
    var divArray = document.createElement("div");
    divArray.id = "arr-" + arrayNumber;
    //show divArray
    var divArr = document.getElementById("col-sm-11");
    divArr.appendChild(divArray);

    var div = document.getElementById("arr-" + arrayNumber);

    //tạo phần tử input
    for (var i = 0; i < 8; i++) {
        //create input
        var input = document.createElement("input");
        input.className = "input-sm form-control inp";
        input.onkeypress = "validate(event)";
        input.id = "array-" + ii;
        input.style.marginRight = "0.83%";
        ii += 1;
        div.appendChild(input);
    }

    arrayNumber += 1;
    $("#number-array").html("NUMBER[...]:&nbsp;" + ii);

};

function showInput() {
    
    var values;
    var next = 0; var next1 = 0;
    if (array == null) {
        alert("Please enter nodes!");
        return false; }
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
            if (arrayred != null) {
                if (array[i] == arrayred[j]) {
                    /*var index = array.indexOf(arrayred[j]);
                    if (index > -1) {
                        array.splice(index, 1);
                    }*/
                    /*if (i == 0) { array = array.slice(1, count); dem += 1;}
                    else if (i == count - 1) {
                        array = array.slice(0, count - 1);
                    }
                    else {
                        array = array.slice(0, i)+","+ array.slice(i+1, count);
                    }*/
                    if (i == 0) { array.shift(); }
                    else if (i == count - 1) {
                        array.pop();
                    }
                    else {
                        //array = array.slice(0, i) + "," + array.slice(i + 1, count);
                        var removed = array.splice(i, 1);
                    }
                }
            }
        }
    }

    //for (var i = 0; i < array.length; i++) { alert(array[i]); }
    var str = "";
    /*$.each(array, function (index, value) {
        //document.getElementById("results-array").innerHTML = value;
        str += value + ",";
        actions[index] = Number(value);
    });*/

    // tức thiệc chứ
    var numberActions = -1;
    for (var l = 0; l < count; l++) {
        if (array[l] != null) {
            str += array[l] + ",";
        }
        if (array[l] !== ",") {
            numberActions += 1;
            actions[numberActions] = Number(array[l]);
        }
    }

    if (co == true) {
        actions.length = actions.length - 1;
    }

    document.getElementById("results-array").innerHTML = str;

    //checking inputed or not input
    temporaty[0] = array[0];
    $("#number-array").html("NUMBER[...]:&nbsp;" + (count-dem) );
    countT = count; string = str;

    array = array.slice(0, count+1);
    count = 0;

    return true;
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
                    //run(data, data.length);
                }, 1000);
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
    $("#reset_").click(function () {
        $(".inp").prop("readonly", false);

        actions.length = actions.length + 1;
        for (var i = 0; i < ii; i++) {
            //var value = $("#array-" + i).val();
            this.value = null;
            $("#array-" + i).prop("readonly", false);
            $("#array-" + i).css("background-color", "white");
            $("#array-" + i).css("color", "black");
        }
        arrayred = new Array(); //array = null;
        numberred = 0;
    });

    //delete Node
    $("#submit_delete").click(function () {
        co = true;
        var str1 = string;
        var val = $("#value-delete").val();
        var boolean=false;
        dem += 1;
        if (temporaty[0] != null) {
            for (var i = 0; i < ii-dem; i++) {
                if (str1[i] === val) {
                    boolean = true;
                    str1 = str1.slice(0, i) + str1.slice(i+2, ii+1);
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

                    arrayred[numberred] = Number(value);
                    numberred += 1;
                }
            }
            
            $("#number-array").html("NUMBER[...]:&nbsp;" + (countT - dem));
            $("#number-red").html("NUMBER-RED[...]:&nbsp;" + (numberred));
            return true;
        }
        else {
            alert("Find node not exits!");
            return false;
        }
        
    });
});

// Canvas
//TREE 1
/*
var Node = function (x, y, r, ctx, data) {
    // left child of a node
    this.leftNode = null;
    // right child of a node
    this.rightNode = null;

    // draw function. Responsible for drawing the node
    this.draw = function () {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
        ctx.strokeText(data, x, y);
    };

    // Simple getters
    this.getData = function () { return data; };
    this.getX = function () { return x; };
    this.getY = function () { return y; };
    this.getRadius = function () { return r; };

    // Returns coordinate for the left child
    // Go back 3 times radius in x axis and 
    // go down 3 times radius in y axis
    this.leftCoordinate = function () {
        return { cx: (x - (3 * r)), cy: (y + (3 * r)) }
    };
    // Same concept as above but for right child        
    this.rightCoordinate = function () {
        return { cx: (x + (3 * r)), cy: (y + (3 * r)) }
    };
};

// Draws a line from one circle(node) to another circle (node) 
var Line = function () {
    // Takes 
    // x,y      - starting x,y coordinate
    // toX, toY - ending x,y coordinate
    this.draw = function (x, y, toX, toY, r, ctx) {
        var moveToX = x;
        var moveToY = y + r;
        var lineToX = toX;
        var lineToY = toY - r;
        ctx.beginPath();
        ctx.moveTo(moveToX, moveToY);
        ctx.lineTo(lineToX, lineToY);
        ctx.stroke();
    };
};

// Represents the btree logic
var BTree = function () {
    var c = document.getElementById('my-canvas');
    var ctx = c.getContext('2d');
    var line = new Line();
    this.root = null;

    var self = this;

    // Getter for root
    this.getRoot = function () { return this.root; };

    // Adds element to the tree
    this.add = function (data) {
        // If root exists, then recursively find the place to add the new node
        if (this.root) {
            this.recursiveAddNode(this.root, null, null, data);
        } else {
            // If not, the add the element as a root 
            this.root = this.addAndDisplayNode(200, 20, 15, ctx, data);
            return;
        }
    };

    // Recurively traverse the tree and find the place to add the node
    this.recursiveAddNode = function (node, prevNode, coordinateCallback, data) {
        if (!node) {
            // This is either node.leftCoordinate or node.rightCoordinate
            var xy = coordinateCallback();
            var newNode = this.addAndDisplayNode(xy.cx, xy.cy, 15, ctx, data);
            line.draw(prevNode.getX(), prevNode.getY(), xy.cx, xy.cy, prevNode.getRadius(), ctx)
            return newNode;
        }
        else {
            if (data <= node.getData()) {
                node.left = this.recursiveAddNode(node.left, node, node.leftCoordinate, data);
            }
            else {
                node.right = this.recursiveAddNode(node.right, node, node.rightCoordinate, data);
            }
            return node;
        }
    };

    // Adds the node to the tree and calls the draw function
    this.addAndDisplayNode = function (x, y, r, ctx, data) {
        var node = new Node(x, y, r, ctx, data);
        node.draw();
        return node;
    };
};

var addToTree = function () {
    input = document.getElementById('tree-input');
    value = parseInt(input.value);
    if (value)
        btree.add(value);
    else
        alert("Wrong input");
};

var btree = new BTree();*/

//TREE 2
/*************   variables   *************/
var add = document.getElementById('add');
var search = document.getElementById('search');
var input = document.getElementById('input');
var root = null;
var time = 1000;
var rootTopPosition = 80;


document.onkeypress = function (e) {
    // console.log(e.keyCode, e.charCode);
    if (e.keyCode == 13 || e.charCode == 105 || e.charCode == 73) {
        Add();
        input.value = "";
    }
    else if (e.charCode == 115 || e.charCode == 83) {
        callSearch();

        input.value = "";
    }
    else if (e.charCode == 100 || e.charCode == 68) {
        callDelete();
        input.value = "";
    }
}

function run() {
    var a = [1, 2, 3, 4, 5];

    kk = 0;
    (function run1(i) {
        setTimeout(function () {
            Add(a[kk]);
            kk += 1;
            if (--i) run1(i);      //  decrement i and call myLoop again if i > 0
        }, 2500)
    })(11); 
}

    
/*add.onclick = function () {
    
}
search.onclick = function () {
    callSearch();
}
Deletee.onclick = function () {
    callDelete();
}*/

function callSearch(inp) {
    if (inp == "") {
        alert("You must enter a value.");
        return;
    }
    Search(parseInt(inp), root);
    setTimeout(function () {
        mainColor(root);
    }, 3 * time);
}
function callDelete(inp) {
    if (inp == "") {
        alert("You must enter a value.");
        return;
    }
    root = Delete(parseInt(inp), root);
    setTimeout(function () {
        mainColor(root);
        Reallocate(root, window.innerWidth / 2, rootTopPosition);
        var temp = mostLeft(root);
        if (parseInt(temp.node.left) < 0) {
            setPosition(root, -1 * parseInt(temp.node.left));
        }
    }, time);
}
function Add(inp) {
    if (inp == "") {
        alert("You must enter a value.");
        return;
    }
    // mainColor(root);
    if (!root) {
        root = new Node(parseInt(inp), window.innerWidth / 2, rootTopPosition);
        return;
    }
    else {
        root = insert(parseInt(inp), root, root.node.left, root.node.top);
    }
    setTimeout(function () {
        Reallocate(root, window.innerWidth / 2, rootTopPosition);
        var temp = mostLeft(root);
        if (parseInt(temp.node.left) < 0) {
            setPosition(root, -1 * parseInt(temp.node.left));
        }
        mainColor(root);
    }, time);
}


function insert(val, node, x, y) {
    if (!node) {
        return new Node(val, x, y);
    }
    if (val < node.n.innerHTML) {
        node.node.backgroundColor = "yellow";
        node.left = insert(val, node.left, parseInt(node.node.left) - 50, parseInt(node.node.top) + 50);
        // node.node.backgroundColor = "red";
    }
    else if (val > node.n.innerHTML) {
        node.node.backgroundColor = "yellow";
        node.right = insert(val, node.right, parseInt(node.node.left) + 50, parseInt(node.node.top) + 50);
        // node.node.backgroundColor = "red";
    }
    else {
        // node.node.backgroundColor = "red";
        return node;
    }
    node.h = 1 + Math.max(Height(node.left), Height(node.right));

    var balance = GetBalance(node);

    // left left rotation
    if (balance > 1 && val < node.left.n.innerHTML) {
        node = rotateToRight(node);
        return node;
    }

    // right right rotation
    else if (balance < -1 && val > node.right.n.innerHTML) {
        node = rotateToLeft(node);
        return node;
    }

    if (balance > 1 && val > node.left.n.innerHTML) {
        node.left = rotateToLeft(node.left);
        node = rotateToRight(node);
        return node;
    }

    // Right Left Case
    if (balance < -1 && val < node.right.n.innerHTML) {
        node.right = rotateToRight(node.right);
        node = rotateToLeft(node);
        return node;
    }
    return node;
}

function Height(node) {
    if (!node) {
        return -1;
    }
    return node.h;
}

function GetBalance(node) {
    if (!node) {
        return 0;
    }
    return Height(node.left) - Height(node.right);
}

function rotateToRight(node) {
    var n = node.left;
    var nr = n.right;
    n.right = node;
    node.left = nr;
    node.h = 1 + Math.max(Height(node.left), Height(node.right));
    n.h = 1 + Math.max(Height(n.left), Height(n.right));
    return n;
}

function rotateToLeft(node) {
    var newP = node.right;
    var temp = newP.left;
    newP.left = node;
    node.right = temp;
    node.h = 1 + Math.max(Height(node.left), Height(node.right));
    newP.h = 1 + Math.max(Height(newP.left), Height(newP.right));
    return newP;
}

function Reallocate(node, x, y) {
    if (!node)
        return;
    var temp = (Math.pow(2, node.h - 1)) * 50;

    if (node.linel) {
        document.body.removeChild(node.linel);
        node.linel = null;
    }
    if (node.liner) {
        document.body.removeChild(node.liner);
        node.liner = null;
    }

    if (node.left) {
        node.linel = getLine(x, y, x - temp, y + 100, 1);
    }
    if (node.right) {
        node.liner = getLine(x, y, x + temp, y + 100, -1);
    }

    node.node.left = x + 'px';
    node.node.top = y + 'px';
    // node.node.backgroundColor = "red";
    Reallocate(node.left, x - temp, y + 100);
    Reallocate(node.right, x + temp, y + 100);
}

function mostLeft(node) {
    var cur = node;
    while (cur.left) {
        cur = cur.left;
    }
    return cur;
}

function setPosition(node, shifting) {
    if (!node) {
        return;
    }
    setPosition(node.left, shifting);
    setPosition(node.right, shifting);
    node.node.left = parseInt(node.node.left) + shifting + 'px';
    if (node.linel) {
        node.linel.style.left = parseInt(node.linel.style.left) + shifting + 'px';
    }
    if (node.liner) {
        node.liner.style.left = parseInt(node.liner.style.left) + shifting + 'px';
    }
}

function Search(val, node) {
    if (!node) {
        alert("Not found :V");
        return;
    }
    else if (node.n.innerHTML == val) {
        node.node.backgroundColor = "blue";
        alert("Found :D");
        return;
    }
    else if (node.n.innerHTML < val) {
        node.node.backgroundColor = "yellow";
        Search(val, node.right);
        // node.node.backgroundColor = "red";
    }
    else if (node.n.innerHTML > val) {
        node.node.backgroundColor = "yellow";
        Search(val, node.left);
        // node.node.backgroundColor = "red";
    }
}

function Delete(val, node) {
    if (!node) {
        return node;
    }
    node.node.backgroundColor = "yellow";
    if (val < node.n.innerHTML) {
        node.left = Delete(val, node.left);
    }
    else if (val > node.n.innerHTML) {
        node.right = Delete(val, node.right);
    }
    else if (val == node.n.innerHTML) {
        if (!node.left) {
            var temp = node;
            node = node.right;
            document.body.removeChild(temp.n);
            if (node) {
                document.body.removeChild(temp.liner);
            }
            console.log(delete temp);
            temp = null;
            return node;
        }
        else if (!node.right) {
            var temp = node;
            node = node.left;
            document.body.removeChild(temp.n);
            document.body.removeChild(temp.linel);
            temp = null;
            console.log(delete temp);
            return node;
        }
        else {
            var temp = mostLeft(node.right);
            node.n.innerHTML = temp.n.innerHTML;
            node.right = Delete(parseInt(temp.n.innerHTML), node.right);
        }
    }
    node.h = 1 + Math.max(Height(node.left), Height(node.right));

    var balance = GetBalance(node);



    // Left Left Case
    if (balance > 1 && GetBalance(node.left) >= 0) {
        node = rotateToRight(node);
        return node;
    }


    // Right Right Case
    if (balance < -1 && GetBalance(node.right) <= 0) {
        node = rotateToLeft(node);
        return node;
    }

    // Left Right Case
    if (balance > 1 && GetBalance(node.left) < 0) {
        node.left = rotateToLeft(node.left);
        node = rotateToRight(node);
        return node;
    }

    // Right Left Case
    if (balance < -1 && GetBalance(node.right) > 0) {
        node.right = rotateToRight(node.right);
        node = rotateToLeft(node);
        return node;
    }
    return node;
}

function Node(val, x, y) {
    this.left = null;
    this.right = null;
    this.h = 0;
    this.n = document.createElement('div');
    this.n.innerHTML = val;
    this.n.className = "node";
    this.node = this.n.style;
    this.node.top = y + 'px';
    this.node.left = x + 'px';
    this.linel = null;
    this.liner = null;
    //document.getElementById("results-array").appendChild(this.n);
    document.body.appendChild(this.n);
    return this;
}

function sleep(ms) {
    var curT = new Date().getTime();
    var duration = curT + ms;
    while (curT < duration) {
        curT = new Date().getTime();
    }
}

function getLength(x1, y1, x2, y2) {
    var x = Math.pow(y1 - y2, 2);
    var y = Math.pow(x1 - x2, 2);
    return Math.sqrt(x + y);
}

function getAngle(x1, x2, dist) {
    var a = Math.abs(x1 - x2);
    return Math.asin(a / dist);
}

function getLine(x1, y1, x2, y2, fact) {
    var line = document.createElement('div');
    line.className = "line";
    line.style.top = y1 + 25 + 'px';
    line.style.left = x1 + 25 + 'px';
    var length = getLength(x1, y1, x2, y2);
    line.style.height = length + 'px';
    line.style.transform = "rotate(" + fact * getAngle(x1, x2, length) + "rad)";
    document.body.appendChild(line);
    return line;
}

function mainColor(node) {
    if (!node)
        return;
    node.node.backgroundColor = "red";
    mainColor(node.left);
    mainColor(node.right);
}