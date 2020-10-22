var temporaty = new Array();
var count = 0; var string = "";
var arrayred = new Array(); numberred = 0; dem = 0;
var array = new Array();
var actions = new Array();
var TucA = new Array();
var co = false;

var myVar = setInterval(function () {
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
    var regex = /[0-9]|\-/;
    if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

var ii = 8; var arrayNumber = 2;
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
        return false;
    }
    $('.inp').each(function () {
        values = this.value;
        if (values !== "") {
            array[count] = values;
            count += 1;
        }
    });

    // del number out array
    for (var i = 0; i < count; i++) {
        for (var j = 0; j < numberred; j++) {
            if (arrayred != null) {
                if (array[i] == arrayred[j]) {
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

    //document.getElementById("results-array").innerHTML = str;

    //checking inputed or not input
    temporaty[0] = array[0];
    $("#number-array").html("NUMBER[...]:&nbsp;" + (count - dem));
    countT = count; string = str;

    array = array.slice(0, count + 1);
    count = 0;

    return true;
}

// Canvas
//TREE 1
/*************   variables   *************/
var addt = document.getElementById('addt');
var searcht = document.getElementById('searcht');
var inputt = document.getElementById('inputt');
var root1 = null;
var time1 = 1000;
var rootTopPosition1 = 80;

/*addt.onclick = function () {
    Addt();
}
searcht.onclick = function () {
    callSearcht();
}
Deleteet.onclick = function () {
    callDeletet();
}*/

function runTree1(aa) {
    kkk = 0;
    (function runt(iii) {

        setTimeout(function () {
            Addt(aa[kkk]);
            kkk += 1;
            if (--iii) runt(iii);     //  decrement i and call myLoop again if i > 0
        }, 1000)
    })(aa.length);
}

function callSearcht(n) {
    if (n == "") {
        alert("You must enter a value.");
        return;
    }
    Searcht(parseInt(n), root1);
    setTimeout(function () {
        mainColort(root1);
    }, 5 * time1);
}
function callDeletet(n) {
    if (n == "") {
        alert("You must enter a value.");
        return;
    }
    root1 = Deletet(parseInt(n), root1);
    setTimeout(function () {
        mainColort(root1);
        Reallocatet(root1, window.innerWidth / 2, rootTopPosition1);
        var temp = mostLeftt(root1);
        if (parseInt(temp.node1.left) < 0) {
            setPositiont(root1, -1 * parseInt(temp.node1.left));
        }
    }, time1);
}
var min = 99999; var max = -99999;
function Addt(n) {
    if (n == "") {
        alert("You must enter a value.");
        return;
    }
    // mainColor(root1);
    if (!root1) {
        root1 = new Node1(parseInt(n), window.innerWidth / 2, rootTopPosition1 - 30); 
        //find min
        if (n < min) {
            min = n;
            $("#Tree1-min").html("Min:&nbsp;" + min);
        }
        //find max
        if (n > max) {
            max = n;
            $("#Tree1-max").html("Max:&nbsp;" + max);
        }
        return;
    }
    else {
        root1 = insertt(parseInt(n), root1, root1.node1.left, root1.node1.top);
    }
    setTimeout(function () {
        Reallocatet(root1, window.innerWidth / 2, rootTopPosition1 - 30);
        var temp = mostLeftt(root1);
        if (parseInt(temp.node1.left) < 0) {
            setPositiont(root1, -1 * parseInt(temp.node1.left)-100);
        }
        mainColort(root1);
    }, time1);
}

var heightTree1 = 0;
function insertt(val, node1, x, y) {
    //find min
    if (val < min) {
        min = val;
        $("#Tree1-min").html("Min:&nbsp;" + min);
    }
    //find max
    if (val > max) {
        max = val;
        $("#Tree1-max").html("Max:&nbsp;" + max);
    }

    if (!node1) {
        return new Node1(val, x, y);
    }
    if (val < node1.n.innerHTML) {
        node1.node1.backgroundColor = "yellow";
        node1.left = insertt(val, node1.left, parseInt(node1.node1.left) - 55, parseInt(node1.node1.top) + 55);
        // node.node.backgroundColor = "red";
    }
    else if (val >= node1.n.innerHTML) {
        node1.node1.backgroundColor = "yellow";
        node1.right = insertt(val, node1.right, parseInt(node1.node1.left) + 55, parseInt(node1.node1.top) + 55);
        // node.node.backgroundColor = "red";
    }
    else {
        // node.node.backgroundColor = "red";
        return node1;
    }
    node1.h = 1 + Math.max(Heightt(node1.left), Heightt(node1.right));
    heightTree1 = node1.h;
    $("#Tree1-height").html("Height:&nbsp;" + Number(heightTree1 + 1));
    var balance = GetBalancet(node1);
    return node1;
}
function Heightt(node1) {
    if (!node1) {
        return -1;
    }
    return node1.h;
}

function GetBalancet(node1) {
    if (!node1) {
        return 0;
    }
    return Heightt(node1.left) - Heightt(node1.right);
}

function rotateToRightt(node1) {
    var n = node1.left;
    var nr = n.right;
    n.right = node1;
    node1.left = nr;
    node1.h = 1 + Math.max(Heightt(node1.left), Heightt(node1.right));
    n.h = 1 + Math.max(Heightt(n.left), Heightt(n.right));
    return n;
}

function rotateToLeftt(node1) {
    var newP = node1.right;
    var temp = newP.left;
    newP.left = node1;
    node1.right = temp;
    node1.h = 1 + Math.max(Heightt(node1.left), Heightt(node1.right));
    newP.h = 1 + Math.max(Heightt(newP.left), Heightt(newP.right));
    return newP;
}

function Reallocatet(node1, x, y) {
    if (!node1)
        return;
    var temp = (Math.pow(2, node1.h-1)) * 35;

    if (node1.linel) {
        document.getElementById("Tree-AVL-1").removeChild(node1.linel);
        node1.linel = null;
    }
    if (node1.liner) {
        document.getElementById("Tree-AVL-1").removeChild(node1.liner);
        node1.liner = null;
    }

    if (node1.left) {
        node1.linel = getLinet(x, y, x - temp, y + 100, 1);
    }
    if (node1.right) {
        node1.liner = getLinet(x, y, x + temp, y + 100, -1);
    }

    node1.node1.left = x + 'px';
    node1.node1.top = y + 'px';
    // node.node.backgroundColor = "red";
    Reallocatet(node1.left, x - temp, y + 100);
    Reallocatet(node1.right, x + temp, y + 100);
}

function mostLeftt(node1) {
    var cur = node1;
    while (cur.left) {
        cur = cur.left;
    }
    return cur;
}

function setPositiont(node1, shifting) {
    if (!node1) {
        return;
    }
    setPositiont(node1.left, shifting );
    setPositiont(node1.right, shifting);
    node1.node1.left = parseInt(node1.node1.left) + shifting + 'px';
    if (node1.linel) {
        node1.linel.style.left = parseInt(node1.linel.style.left) + shifting + 'px';
    }
    if (node1.liner) {
        node1.liner.style.left = parseInt(node1.liner.style.left) + shifting + 'px';
    }
}

function Searcht(val, node1) {
    if (!node1) {
        alert("Not found!");
        return;
    }
    else if (node1.n.innerHTML == val) {
        node1.node1.backgroundColor = "yellow";
        return;
    }
    else if (node1.n.innerHTML < val) {
        node1.node1.backgroundColor = "blue";
        Searcht(val, node1.right);
        // node.node.backgroundColor = "red";
    }
    else if (node1.n.innerHTML > val) {
        node1.node1.backgroundColor = "blue";
        Searcht(val, node1.left);
        // node.node.backgroundColor = "red";
    }
}

function Deletet(val, node1) {
    if (!node1) {
        return node1;
    }
    node1.node1.backgroundColor = "yellow";
    if (val < node1.n.innerHTML) {
        node1.left = Deletet(val, node1.left);
    }
    else if (val > node1.n.innerHTML) {
        node1.right = Deletet(val, node1.right);
    }
    else if (val == node1.n.innerHTML) {
        if (!node1.left) {
            var temp = node1;
            node1 = node1.right;
            document.getElementById("Tree-AVL-1").removeChild(temp.n);
            if (node1) {
                document.getElementById("Tree-AVL-1").removeChild(temp.liner);
            }
            console.log(delete temp);
            temp = null;
            return node1;
        }
        else if (!node1.right) {
            var temp = node1;
            node1 = node1.left;
            document.getElementById("Tree-AVL-1").removeChild(temp.n);
            document.getElementById("Tree-AVL-1").removeChild(temp.linel);
            temp = null;
            console.log(delete temp);
            return node1;
        }
        else {
            var temp = mostLeftt(node1.right);
            node1.n.innerHTML = temp.n.innerHTML;
            node1.right = Deletet(parseInt(temp.n.innerHTML), node1.right);
        }
    }
    node1.h = 1 + Math.max(Heightt(node1.left), Heightt(node1.right));

    var balance = GetBalancet(node1);

    return node1;
}

function Node1(val, x, y) {
    this.left = null;
    this.right = null;
    this.h = 0;
    this.n = document.createElement('div');
    this.n.innerHTML = val;
    this.n.className = "node";
    this.node1 = this.n.style;
    this.node1.top = y + 'px';
    this.node1.left = x + 'px';
    this.linel = null;
    this.liner = null;
    document.getElementById("Tree-AVL-1").appendChild(this.n);
    return this;
}

function sleept(ms) {
    var curT = new Date().getTime();
    var duration = curT + ms;
    while (curT < duration) {
        curT = new Date().getTime();
    }
}

function getLengtht(x1, y1, x2, y2) {
    var x = Math.pow(y1 - y2, 2);
    var y = Math.pow(x1 - x2, 2);
    return Math.sqrt(x + y);
}

function getAnglet(x1, x2, dist) {
    var a = Math.abs(x1 - x2);
    return Math.asin(a / dist);
}

function getLinet(x1, y1, x2, y2, fact) {
    var line = document.createElement('div');
    line.className = "line";
    line.style.top = y1 + 25 + 'px';
    line.style.left = x1 + 25 + 'px';
    var length = getLengtht(x1, y1, x2, y2);
    line.style.height = length + 'px'; //cut line
    line.style.transform = "rotate(" + fact * getAnglet(x1, x2, length) + "rad)";
    document.getElementById("Tree-AVL-1").appendChild(line);
    return line;
}

function mainColort(node1) {
    if (!node1)
        return;
    node1.node1.backgroundColor = "#0000FF";
    mainColort(node1.left);
    mainColort(node1.right);
}


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

function run(aa) {
    

    kkk = 0;
    (function run1(iii) {

        setTimeout(function () {
            Add(aa[kkk]);
            kkk += 1;
            if (--iii) run1(iii);     //  decrement i and call myLoop again if i > 0
        }, 1000)
    })(aa.length);
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
    Search(parseInt(inp), root);
    setTimeout(function () {
        mainColor(root);
    }, 5 * time);
}
function callDelete(inp) {
    if (inp == "") {
        alert("You must enter a value.");
        return;
    }
    root = Delete(parseInt(inp), root);
    setTimeout(function () {
        mainColor(root);
        Reallocate(root, window.innerWidth / 4, rootTopPosition);
        var temp = mostLeft(root);
        if (parseInt(temp.node.left) < 0) {
            setPosition(root, -1 * parseInt(temp.node.left));
        }
    }, time);
}

var min2 = 99999; var max2 = -99999;
function Add(inp) {
    if (inp == "") {
        alert("You must enter a value.");
        return;
    }
    // mainColor(root);
    if (!root) {
        root = new Node(parseInt(inp), window.innerWidth / 4, rootTopPosition - 30); //rootTopPosition = top
        //find min
        if (inp < min2) {
            min2 = inp;
            $("#Tree2-min").html("Min:&nbsp;" + min2);
        }
        //find max
        if (inp > max2) {
            max2 = inp;
            $("#Tree2-max").html("Max:&nbsp;" + max2);
        }
        return;
    }
    else {
        root = insert(parseInt(inp), root, root.node.left, root.node.top);
    }
    setTimeout(function () {
        Reallocate(root, window.innerWidth / 4, rootTopPosition - 30);
        var temp = mostLeft(root);
        if (parseInt(temp.node.left) < 0) {
            setPosition(root, -1 * parseInt(temp.node.left) - 100);
        }
        mainColor(root);
    }, time);
}

var nameNotBalance = new Array(); var countNameNotBalance = 0;
var numberBalance = new Array(); var countNumberBalance = 0;
var heightTree2 = 0;
function insert(val, node, x, y) {
    //find min
    if (val < min2) {
        min2 = val;
        $("#Tree2-min").html("Min:&nbsp;" + min2);
    }
    //find max
    if (val > max2) {
        max2 = val;
        $("#Tree2-max").html("Max:&nbsp;" + max2);
    }
    if (!node) {
        return new Node(val, x, y);
    }
    if (val < node.n.innerHTML) {
        node.node.backgroundColor = "yellow";
        node.left = insert(val, node.left, parseInt(node.node.left) - 55, parseInt(node.node.top) + 55);
        // node.node.backgroundColor = "red";
    }
    else if (val >= node.n.innerHTML) {
        node.node.backgroundColor = "yellow";
        node.right = insert(val, node.right, parseInt(node.node.left) + 55, parseInt(node.node.top) + 55);
        // node.node.backgroundColor = "red";
    }
    else {
        // node.node.backgroundColor = "red";
        return node;
    }
    node.h = 1 + Math.max(Height(node.left),Height(node.right));
    heightTree2 = node.h;
    $("#Tree2-height").html("Height:&nbsp;" + Number(heightTree2));
    var balance = GetBalance(node); 

    // left left rotation
    if (balance > 1 && val < node.left.n.innerHTML) {
        nameNotBalance[countNameNotBalance] = "Right";
        numberBalance[countNumberBalance] = node.n.innerHTML;
        node = rotateToRight(node);
        return node;
    }

    // right right rotation
    else if (balance < -1 && val > node.right.n.innerHTML) {
        nameNotBalance[countNameNotBalance] = "Left";
        numberBalance[countNumberBalance] = node.n.innerHTML;
        node = rotateToLeft(node);
        return node;
    }

    if (balance > 1 && val > node.left.n.innerHTML) {
        nameNotBalance[countNameNotBalance] = "Left";
        numberBalance[countNumberBalance] = node.n.innerHTML;
        node.left = rotateToLeft(node.left);
        node = rotateToRight(node);
        return node;
    }

    // Right Left Case
    if (balance < -1 && val < node.right.n.innerHTML) {
        nameNotBalance[countNameNotBalance] = "Right";
        numberBalance[countNumberBalance] = node.n.innerHTML;
        node.right = rotateToRight(node.right);
        node = rotateToLeft(node);
        return node;
    }
    countNameNotBalance += 1;
    countNumberBalance += 1;
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
    var temp = (Math.pow(2, node.h - 1)) * 35;

    if (node.linel) {
        document.getElementById("Tree-AVL").removeChild(node.linel);
        node.linel = null;
    }
    if (node.liner) {
        document.getElementById("Tree-AVL").removeChild(node.liner);
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
        alert("Not found!");
        return;
    }
    else if (node.n.innerHTML == val) {
        node.node.backgroundColor = "yellow";
        return;
    }
    else if (node.n.innerHTML < val) {
        node.node.backgroundColor = "blue";
        Search(val, node.right);
        // node.node.backgroundColor = "red";
    }
    else if (node.n.innerHTML > val) {
        node.node.backgroundColor = "blue";
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
            document.getElementById("Tree-AVL").removeChild(temp.n);
            if (node) {
                document.getElementById("Tree-AVL").removeChild(temp.liner);
            }
            console.log(delete temp);
            temp = null;
            return node;
        }
        else if (!node.right) {
            var temp = node;
            node = node.left;
            document.getElementById("Tree-AVL").removeChild(temp.n);
            document.getElementById("Tree-AVL").removeChild(temp.linel);
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
    document.getElementById("Tree-AVL").appendChild(this.n);
    //document.body.appendChild(this.n);
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
    document.getElementById("Tree-AVL").appendChild(line);
    return line;
}

function mainColor(node) {
    if (!node)
        return;
    node.node.backgroundColor = "red";
    mainColor(node.left);
    mainColor(node.right);
}

/*Ajax*/
var resultTree1 = new Array();
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
                //$("#results-array").html(data);
                $.each(data, function (index, value) {
                    resultTree1[index] = data[index];
                })
                $("#results-array").hide();
            },
            complete: function () { // Set our complete callback, adding the .hidden class and hiding the spinner.
                setTimeout(() => {
                    $('#spinner-action').hide();
                    $("#results-array").show();
                    
                    runTree1(actions);
                    setTimeout(() => {
                        //runTree1(resultTree1);
                        run(actions);
                    }, actions.length * 1100);

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
        window.location.reload(true);
    });
    $("#submit_search").click(function () {
        var v = $("#values_search").val();
        if (!v) {
            return false;
        }
        callSearcht(v);
        setTimeout(() => {
            callSearch(v);
        }, 4 * time + 1100);
        return true;
    });
    //delete Node
    $("#submit_delete").click(function () {
        co = true; 
        var str1 = string;
        var val = $("#value-delete").val();
        var boolean = false;
        var phu="";
        if (temporaty[0] != null) {
            for (var i = 0; i < ii * 2 - numberred*2; i++) {
                if (str1[i]+str1[i+1] === val) {
                    boolean = true; 
                }
                if (str1[i] === val) {
                    boolean = true;
                    str1 = str1.slice(0, i) + str1.slice(i + 2, ii * 2);
                }
            }
        }
        else {
            alert("Nodes empty!");
            return false;
        }

        //check boolean
        if (boolean === true) {
            alert("Delete node->value = " + val + ", success!");
            $("#values-array").html("Tree Array: &nbsp; [ &nbsp;" + str1 + "&nbsp; ]");
           // $("#results-array").html(str1);
            string = str1;

            for (var i = 0; i < ii; i++) {
                var value = $("#array-" + i).val();
                if (val === value) {
                    $("#array-" + i).prop("readonly", true);
                    $("#array-" + i).css("background-color", "#CC3333");
                    $("#array-" + i).css("color", "white");

                    arrayred[numberred] = Number(value);
                    callDeletet(Number(value)); 
                    callDelete(Number(value));
                    numberred += 1;


                }
                
            }

            $("#number-array").html("NUMBER[...]:&nbsp;" + (countT - dem));
            $("#number-red").html("NUMBER-RED[...]:&nbsp;" + (numberred));

            var minn = 99999; var maxx = -99999;
            $.each(actions, function (index, value) {
                for (var i = 0; i < arrayred.length;i++) {
                    if (actions[index] !== arrayred[i]) {
                        if (minn > actions[index]) {
                            minn = actions[index];
                        }
                        if (maxx < actions[index]) {
                            maxx = actions[index];
                        }
                    }
                }
            })

            $("#Tree2-min").html("Min:&nbsp;" + minn); $("#Tree1-min").html("Min:&nbsp;" + minn);
            $("#Tree2-max").html("Max:&nbsp;" + maxx); $("#Tree1-max").html("Max:&nbsp;" + maxx);
            return true;
        }
        
    });
});