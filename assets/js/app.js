//Variáveis
//percebi que não estava praticando boas práticas no quesito nomenclatura das variáveis
let toggle_night_mode = false;
let oldInputValue;
let taskToRemove;
let confirmTaskToRemove;
let tasks = [];

const limitCharacters = 50;

// Seleção de elementos
const darkmode = localStorage.getItem('darkmode');

const todo_form = document.getElementById("todo-form");

const edit_task = document.getElementById("edit-task");
const confirmEditBtn = document.getElementById("confirmEditBtn");
const edit_input = document.getElementById("edit-input");
const cancel_edit = document.getElementById("cancel-edit");

const night_mode_btn = document.getElementById("mode_toggle");

const task_input = document.getElementById("container_input");
const addtask_button = document.getElementById("container_button");

const taskList = document.getElementById("container_task-list");
const lenghtWarning = document.querySelector('.alert');

const task_list = document.getElementById("container_task-list");

const no_tasks = document.getElementById("empty_tasks_img");

const finishTask = document.getElementById("finish-todo");
const teste = document.querySelector('.finish-todo');

loadTasks();

// Funções (1/2) Responsável parcialmente pelo LocalStore
function aaa() {
    console.log(tasks);
}
function addEmptyImage() {
    const pai = document.createElement('div');
    pai.classList.add('empty_tasks');
    const img = document.createElement('img');
    img.setAttribute('src', 'assets/images/empty_tasks.png');
    const h5 = document.createElement('h5');
    h5.textContent = 'Ainda não há tarefas adicionadas.';
    pai.appendChild(img);
    pai.appendChild(h5);
    task_list.appendChild(pai);
}
function removeEmptyMessage(){
    task_list.removeChild(task_list.querySelector('.empty_tasks'));
}

function saveTasks() {
    const tasksToSave = JSON.stringify(tasks);
    localStorage.setItem('tarefas', tasksToSave);
}
function loadTasks() {
    const tasksToLoad = JSON.parse(localStorage.getItem('tarefas')) || [];
    tasks = tasksToLoad;
    if (tasks.length > 0){    
        tasksToLoad.forEach(function(item){
            createTask(item);
        });
    }else{
        addEmptyImage();
    }

}

//Funções (2/2)
function toggleForm() {
    edit_task.classList.toggle('hide');
    todo_form.classList.toggle('hide');
    taskList.classList.toggle('hide');
}

function confirmDelete() {
    // Criação do modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.setAttribute("tabindex", "-1");

    // Modal dialog
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modal.appendChild(modalDialog);

    // Modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalDialog.appendChild(modalContent);

    // Modal header
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.innerText = 'Você tem certeza desta ação?';
    modalHeader.appendChild(modalTitle);
    //Botão Xis
    modalContent.appendChild(modalHeader);
    
    // Modal body
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    const bodyText = document.createElement('p');
    bodyText.innerText = 'A exclusão da tarefa é irreversível. Deseja continuar?';
    modalBody.appendChild(bodyText);
    modalContent.appendChild(modalBody);
    
    // Modal footer
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('btn', 'btn-secondary');
    closeBtn.innerText = 'Cancelar';

    modalFooter.appendChild(closeBtn);
    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('btn', 'btn-primary');
    confirmBtn.innerText = 'Salvar mudanças';
    modalFooter.appendChild(confirmBtn);
    modalContent.appendChild(modalFooter);

    confirmBtn.addEventListener('click', function (){
        task_list.querySelectorAll('.task').forEach(function (task){
            if (task == confirmTaskToRemove){
                tasks.forEach(function(item, indice){
                    console.log(item, task.querySelector('h3').textContent);
                    if (item === task.querySelector('h3').textContent){
                        // Índice de onde a remoção(ou inserção) vai começar
                        // e quantos elementos você quer remover a partir desse índice
                        tasks.splice(indice, 1);
                    }
                });
                task_list.removeChild(task);
                myModal.hide();
                if (task_list.querySelectorAll('.task').length == 0) {
                    addEmptyImage();
                }
                saveTasks();
            }
        });
    });

    document.body.appendChild(modal);

    // Inicializando o modal com o Bootstrap
    const myModal = new bootstrap.Modal(modal, {
        keyboard: false
    });

    // Exibindo o modal
    myModal.show();

    closeBtn.addEventListener('click', function(){
        myModal.hide();
    });
}
function createTask(text) {
    // Cria o pai
    const new_element = document.createElement('li');
    new_element.classList.add('todo', 'border', 'mb-2', 'task');

    // Cria o elemento filho que contém o texto da tarefa
    const task_text = document.createElement('h3');
    task_text.textContent = text.trim() ;

    // Cria o botão de finalizar
    const finish = document.createElement('button');
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-check', 'done');
    finish.appendChild(icon);

    // Cria o botão de excluir
    const remove = document.createElement('button');
    const icon2 = document.createElement('i');
    icon2.classList.add('fa-solid', 'fa-trash', 'remove');
    remove.appendChild(icon2);

    // Cria o botão de edição
    const edit = document.createElement('button');
    edit.classList.add('edit');
    const icon3 = document.createElement('i');
    icon3.classList.add('fa-solid', 'fa-gear');
    edit.appendChild(icon3);

    finish.addEventListener('click', function() {
        // (this.parentElement) Retorna o elemento pai, no caso <li>
        // if (this.parentElement.classList.contains('finished')) {
        //     this.parentElement.classList.remove('finished');
        // }else{
        //     this.parentElement.classList.add('finished');
        // }
        //Toggle substituiu o código acima
        this.parentElement.classList.toggle('finished');
    });

    // Voltar aqui
    remove.addEventListener('click', function (){
        if (this.parentElement.classList.contains('finished')){
            pai = this.parentElement;
            tasks.forEach(function(item, indice){
                // ESTOU AQUI
                if (item === pai.querySelector('h3').textContent){
                    // Índice de onde a remoção(ou inserção) vai começar
                    // e quantos elementos você quer remover a partir desse índice
                    tasks.splice(indice, 1);
                    saveTasks();
                    console.log('oi');
                }
            });
            this.parentElement.remove();
            if (task_list.querySelectorAll('.task').length == 0) {
                addEmptyImage();
            }
        }else{
            confirmTaskToRemove = this.parentElement;
            confirmDelete();
        }
    });

    // <button id="finish-todo">
    //                 <i class="fa-solid fa-check"></i>
    //             </button>

    // Adicionar um filho, já definido, para o new element que foi o LI
    new_element.appendChild(task_text);
    new_element.appendChild(finish);
    new_element.appendChild(edit);
    new_element.appendChild(remove);

    document.getElementById("container_task-list").appendChild(new_element);
}

function updateTodo(text){
    const todos = document.querySelectorAll('.todo');
    //Trocar o 'forEach' pelo método 'some' aí resolveria o problema do toggleForm ativar no final da função 'updateTodo'
    todos.forEach(function (todo){
        if (todo.querySelector('h3').innerText == oldInputValue){
            if (todo.querySelector('h3').textContent.length <= limitCharacters){
                todo.querySelector('h3').innerHTML = text;
            }
        }else{
            document.querySelector(".alert").animate([{transform: "scale(0)", opacity: 0},{transform: "scale(1)", opacity: 1}],{duration: 500,iterations: 1,easing: "ease"});
            lenghtWarning.classList.toggle('hide');
            setTimeout(function(){
                document.querySelector(".alert").animate([{transform: "scale(1)", opacity: 1},{transform: "scale(0)", opacity: 0}],{duration: 500,iterations: 1,easing: "ease"});
            }, 1750);
            setTimeout(function(){
                lenghtWarning.classList.toggle('hide');
            }, 2000);
        }
        //O erro estava ocorrendo porque o toggleForm ativava na quantidade de elementos que o forEach percorria
    });
    toggleForm();
}
function enableNightMode() {
    // O toggle_night_mode está true, logo virando false -> ficando no modo noturno
    //Adiciono o night-mode ao body, logo todos seus elementos herdam essa classe
    document.body.classList.add('night-mode');
    const pai = document.querySelector('.toggle');
    pai.classList.add('active');
    pai.querySelector('.ball').innerHTML = '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem('darkmode', 'enabled');
}
function disableNightMode() {
    document.body.classList.remove('night-mode');
    const pai = document.querySelector('.toggle');
    pai.classList.remove('active');
    pai.querySelector('.ball').innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem('darkmode', null);
}

if (darkmode === "enabled") {
    enableNightMode();
}else{
    disableNightMode();
}

night_mode_btn.addEventListener('click', function () {
    if (localStorage.getItem('darkmode') === "enabled") {
        disableNightMode();
    }else{
        enableNightMode();
    }
});

addtask_button.addEventListener('click', function(e) {
    const task_text = task_input.value.trim();
    if (task_text.length <= limitCharacters){
        if (task_text){
            if (task_list.querySelectorAll('.task').length == 0) {
                removeEmptyMessage();
            }
            createTask(task_text);
            task_input.value = '';
            task_input.focus();
            tasks.push(task_text.trim());
            saveTasks();
        }else{
            addtask_button.classList.add('error');
            setTimeout(function() {
                addtask_button.classList.remove('error');
            }, 250);
        }
    }else{
        task_input.value = "";
        document.querySelector(".alert").animate([{transform: "scale(0)", opacity: 0},{transform: "scale(1)", opacity: 1}],{duration: 500,iterations: 1,easing: "ease"});
        lenghtWarning.classList.toggle('hide');
        setTimeout(function(){
            document.querySelector(".alert").animate([{transform: "scale(1)", opacity: 1},{transform: "scale(0)", opacity: 0}],{duration: 500,iterations: 1,easing: "ease"});
        }, 1750);
        setTimeout(function(){
            lenghtWarning.classList.toggle('hide');
        }, 2000);
    }
});


//Clica no botão de alterar tarefa
edit_input.addEventListener('keyup', function (e){
    if (e.keyCode == 13) {
        e.preventDefault();
        document.getElementById('confirmEditBtn').click();   
    }
});
task_input.addEventListener('keyup', function (event){
    if (event.keyCode === 13) { //número do enter
        addtask_button.click();
    }
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit')){
        
        const target = e.target; //botão
        const parent = target.parentElement;
        
        let todoTitle;
        
        document.getElementById("edit-task").animate([{transform: "rotateY(90deg)", offset: 0},{transform: "rotateY(45deg)", offset: 0.5},{transform: "rotateY(0deg)", offset: 1}],{duration: 500,iterations: 1,easing: "ease"});

        todoTitle = parent.querySelector('h3').textContent;
        edit_input.value = todoTitle;
        oldInputValue = todoTitle;

        toggleForm()
        edit_input.focus();
    }
});

// Clica no botão de realizar a mudança da tarefa
//edit_task = div pai
confirmEditBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const editTaskValue = edit_input.value;

    if (editTaskValue){
        updateTodo(editTaskValue);
    }
})

cancel_edit.addEventListener('click', function(e) {
     if (!edit_task.classList.contains('hide')){
        document.getElementById("edit-task").animate([{transform: "rotateY(0deg)", offset: 0},{transform: "rotateY(45deg)", offset: 0.5},{transform: "rotateY(90deg)", offset: 1}],{duration: 500,iterations: 1,easing: "ease"});
     }
     setTimeout(function () {
        toggleForm();
     }, 350);
});