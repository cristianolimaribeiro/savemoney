var errorMessage = "";
var expense = [];

function validateSalary(){
    var validation = document.getElementById('salary').value;
    if(validation === ""){
        document.getElementById('error-salary').innerHTML = "Para prosseguir prosseguir preencha o valor do salário";
    }
    else{
        document.getElementById('error-salary').classList.toggle('hidden');
        showForm();
    }

}
function showForm(){
    //pega modal 
    var modal = document.getElementById('modal');
    modal.classList.toggle('hidden')

    //pega botao abri modal 

    var btn = document.getElementById('open-form');

    //pega span fecha modal 

    var span = document.getElementById("fecha-modal");

    span.onclick = function(){
    modal.classList.toggle('hidden');
    }
    // quando clicar fora do modal, fechar
    window.onclick = function(event) {
        if (event.target == modal) {
        modal.classList.toggle('hidden');
        }
    }
}
// Mascara da Data 

function dataMask(campo,valor){
    var data = '';
    data = data + valor;

    if(data.length == 2){
        data = data + '/';
        campo.value = data;
    }
    if(data.length == 5){
        data = data + '/';
        campo.value = data;
    }
}

function validateExpense(expense){
    var validate = true;
    if(expense.description === "" &&  isNaN(expense.val)  && expense.date === ""){
        validate = false;
        errorMessage = "Por favor preencha os campos";
    }
    if(expense.description !== "" &&  isNaN(expense.val)  && expense.date === ""){
        validate = false;
        errorMessage = "Por favor insira a data da despesa";
    }
    if(expense.description === "" &&  expense.val !== ""  && expense.date !== ""){
        validate = false;
        errorMessage = "O campo descrição não pode ser vazio";
    }
    if(expense.description !== "" &&  isNaN(expense.val) && expense.date !== ""){
        validate = false;
        errorMessage = "O campo valor não pode ser vazio";
    }
    return validate;
}

function showError(){
    document.getElementById('error').innerHTML = errorMessage;
}
function cleanForm(){
    document.getElementById('description').value = "";
    document.getElementById('val').value = "";
    document.getElementById('date-release').value = "";
}
function showLiquidTotal(){
    var total = 0;
    var salary = parseFloat(document.getElementById('salary').value);
    for(var i = 0; i < expense.length; i++){
        total += expense[i].val;
    }
    document.getElementById('display').innerHTML = Math.round(salary - total);
}
function renderExpenses(){
    var expenses = "";

    for(var i = 0; i < expense.length; i++){
        expenses += "<tr>";
        expenses += `<td>${expense[i].description}</td>`;
        expenses += `<td>${expense[i].val}</td>`;
        expenses += `<td>${expense[i].date}</td>`;
        expenses += "</tr>"
    }
    document.getElementById('releases').innerHTML = expenses;
}
function saveExpense(){
    var newExpense = {
        description: document.getElementById('description').value ,
        val: parseFloat(document.getElementById('val').value),
        date: document.getElementById('date-release').value
    }
    if(validateExpense(newExpense)){
        expense.push(newExpense);
        cleanForm();
        showLiquidTotal();
        renderExpenses();
        showForm();
    }
    else{
        showError();
    }
}