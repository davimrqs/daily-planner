//Variáveis
//percebi que não estava praticando boas práticas no quesito nomenclatura das variáveis
let character_limit = 100;
let toggle_night_mode = false;
let oldInputValue;
let taskToRemove;

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

// Leitura de evento de quando você aperta a tecla Enter(13) estando no Input adicionar a tarefa à lista
task_input.addEventListener('keyup', function (event){
    if (event.keyCode === 13) { //número do enter
        addtask_button.click();
    }
});

const task_list = document.getElementById("container_task-list");

const no_tasks = document.getElementById("empty_tasks_img");

const finishTask = document.getElementById("finish-todo");
const teste = document.querySelector('.finish-todo');

// Para quando eu remover quando adicionar uma tarefa ele ainda vai estar armazenado nessa variável constante
const emptyMessage = document.querySelector('.empty_tasks');

// Funções
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
    modalTitle.innerText = 'Título';
    modalHeader.appendChild(modalTitle);
    //Botão Xis
    modalContent.appendChild(modalHeader);
    
    // Modal body
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    const bodyText = document.createElement('p');
    bodyText.innerText = 'Modal body text goes here.';
    modalBody.appendChild(bodyText);
    modalContent.appendChild(modalBody);
    
    // Modal footer
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('btn', 'btn-secondary');
    closeBtn.innerText = 'Cancel';
    modalFooter.appendChild(closeBtn);
    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('btn', 'btn-primary');
    confirmBtn.innerText = 'Save changes';
    modalFooter.appendChild(confirmBtn);
    modalContent.appendChild(modalFooter);

    document.body.appendChild(modal);

    // Inicializando o modal com o Bootstrap
    const myModal = new bootstrap.Modal(modal, {
        keyboard: false
    });

    // Exibindo o modal
    myModal.show();

}
function createTask(text) {
    // Cria o pai
    const new_element = document.createElement('li');
    new_element.classList.add('todo', 'border', 'mb-2', 'task');

    // Cria o elemento filho que contém o texto da tarefa
    const task_text = document.createElement('h3');
    task_text.textContent = text;

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
            this.parentElement.remove();
            if (task_list.querySelectorAll('.task').length == 0) {
                task_list.appendChild(emptyMessage);
            }
        }else{
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
    task_input.value = '';
    task_input.focus();
}

function updateTodo(text){
    const todos = document.querySelectorAll('.todo');

    todos.forEach(function (todo){
        if (todo.querySelector('h3').innerText == oldInputValue){
            todo.querySelector('h3').innerHTML = text;
        }

        toggleForm();
    });
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

addtask_button.addEventListener('click', function() {
    const task_text = task_input.value.trim();
    if (task_text){
        if (task_list.querySelectorAll('.task').length == 0) {
            task_list.removeChild(emptyMessage);
        }
        createTask(task_text);
    }else{
        addtask_button.classList.add('error');
        setTimeout(function() {
            addtask_button.classList.remove('error');
        }, 250);
    }
});

//Clica no botão de alterar tarefa
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('edit')){
        
        const target = e.target; //botão
        const parent = target.parentElement;
        
        let todoTitle;
        
        document.querySelector('.card').style.animation = "openEditTaskCard .5s linear";

        todoTitle = parent.querySelector('h3').textContent;
        edit_input.value = todoTitle;
        oldInputValue = todoTitle;

        toggleForm()
    }
});

// Clica no botão de realizar a mudança da tarefa
//edit_task = div pai
confirmEditBtn.addEventListener('click', function (e) {
    e.preventDefault();

    console.log('confirm edit button');
    const editTaskValue = edit_input.value;

    if (editTaskValue){
        updateTodo(editTaskValue);
    }
})

cancel_edit.addEventListener('click', function(e) {
     if (!edit_task.classList.contains('hide')){
         console.log('teste');
         document.querySelector('.card').style.animation = "closeEditTaskCard .5s linear";
     }
    toggleForm();
});