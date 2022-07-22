var Incomplete = [];
var Completed = [];
function addNew() {
    var value = document.getElementById("new-task").value;
    if(value!='')
    Incomplete.push(value);
    liGenerate("Incomplete", Incomplete, '');
    document.getElementById('new-task').value = "";

}



function action(checker) {
    if (checker.checked == true) {
        let li = checker.closest('li');
        let nodes = Array.from(li.closest('ul').children);
        let index = nodes.indexOf(li);
        let remove = Incomplete.splice(index, 1);
        Completed.push(remove);
        liGenerate("Incomplete", Incomplete, '');
        liGenerate("Completed", Completed, 'checked');
    }
    else if (checker.checked == false) {
        // go Inomplete
        let li = checker.closest('li');
        let nodes = Array.from(li.closest('ul').children);
        let index = nodes.indexOf(li);
        let remove = Completed.splice(index, 1);
        Incomplete.push(remove);
        liGenerate("Incomplete", Incomplete, '');
        liGenerate("Completed", Completed, 'checked');
    }
}


function liGenerate(ulid, arr, status) {
    var li = "";
    for (var i = 0; i < arr.length; i++) {
        li += ' <li><input type="checkbox" onclick="action(this)" ' + status + '><label>' + arr[i] + '</label><input type="text" id="name" class="name" value="' + arr[i] + '"><button class="edit" onclick="operation(this)">Edit</button><button onclick="operation(this)" class="delete">Delete</button></li>';
    }
    document.getElementById(ulid).innerHTML = li;
}


function operation(btn) {
    btnValue = btn.className;
    if (btnValue == 'edit') {
        var actBtn = document.getElementById('actioner');
        actBtn.innerText = 'Update';
        let li = btn.closest('li');
        let node = Array.from(li.closest('ul').children);
        let index = node.indexOf(li);
        if (li.closest('ul').id == 'Completed') {

            document.getElementById("new-task").value = Completed[index];
            var update = "Updater('Completed'," + index + ")";
            actBtn.setAttribute('onclick', update);
        }

        if (li.closest('ul').id == 'Incomplete') {

            document.getElementById("new-task").value = Incomplete[index];
            var update = "Updater('Incomplete'," + index + ")";
            actBtn.setAttribute('onclick', update);
        }
    }
    else if (btnValue == 'delete') {
        let li = btn.closest('li');
        let node = Array.from(li.closest('ul').children);
        let index = node.indexOf(li);
        if (li.closest('ul').id == 'Completed')
            Completed.splice(index, 1);

        if (li.closest('ul').id == 'Incomplete')
            Incomplete.splice(index, 1);
    }
    liGenerate("Incomplete", Incomplete, '');
    liGenerate("Completed", Completed, 'checked');
}



function Updater(arr, index) {
    var input = document.getElementById('new-task').value;
    if(input!='')
    {
        if (arr == "Incomplete")
        Incomplete[index] = input;

    if (arr == "Completed")
        Completed[index]=input;

    liGenerate("Incomplete", Incomplete, '');
    liGenerate("Completed", Completed, 'checked');

    var update = "addNew()";
    actBtn=document.getElementById('actioner');
    actBtn.setAttribute('onclick', update);
    var actBtn = document.getElementById('actioner');
    actBtn.innerText = 'Add';
    document.getElementById('new-task').value = "";
    }
    // console.log(Incomplete);
}