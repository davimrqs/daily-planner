//Variáveis
let character_limit = 100;

// Seleção de elementos
const task_input = document.getElementById("container_input");
const task_list = document.getElementById("container_task-list");

const no_tasks = document.getElementById("empty_tasks_img");

const addtask_button = document.getElementById("container_button");
const finishTask = document.getElementById("finish-todo");
const teste = document.querySelector('.finish-todo');

// Funções
function createTask(text) {
    // Cria o pai
    const new_element = document.createElement('li');
    new_element.classList.add('todo', 'border', 'mb-2', 'task');

    // Cria o elemento filho que contém o texto da tarefa
    const task_text = document.createElement('h3');
    task_text.textContent = text;

    // Cria o botão de finalizar
    const task_button = document.createElement('button');
    task_button.classList.add('finish-todo');
    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-check');
    task_button.appendChild(icon);

    task_button.addEventListener('click', function() {
        // console.log(this.parentElement); //Retornou o elemento pai, no caso <ul> -> <li>
        if (this.parentElement.classList.contains('finished')) {
            this.parentElement.classList.remove('finished');
        }else{
            this.parentElement.classList.add('finished');
        }
    });

    // <button id="finish-todo">
    //                 <i class="fa-solid fa-check"></i>
    //             </button>

    new_element.appendChild(task_text);
    new_element.appendChild(task_button);

    document.getElementById("container_task-list").appendChild(new_element);
    task_input.value = '';
}

// Eventos
addtask_button.addEventListener('click', function() {
    const task_text = task_input.value.trim();
    if (task_text){
        if (task_list.querySelectorAll('.task').length == 0) {
            task_list.removeChild(document.querySelector('.empty_tasks'));
        }
        createTask(task_text);
    }else{
        addtask_button.classList.add('error');
        setTimeout(function() {
            addtask_button.classList.remove('error');
        }, 250);
    }
});
