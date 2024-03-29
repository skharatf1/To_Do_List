document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Display tasks
    function displayTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''}>
                <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
                <button class="delete" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    displayTasks();

    // Add new task
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && taskInput.value.trim() !== '') {
            tasks.push({ name: taskInput.value.trim(), completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
            taskInput.value = '';
        }
    });

    // Toggle task completion
    taskList.addEventListener('change', function (e) {
        if (e.target.type === 'checkbox') {
            const index = e.target.parentElement.querySelector('.delete').dataset.index;
            tasks[index].completed = e.target.checked;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
        }
    });

    // Delete task
    taskList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete')) {
            const index = e.target.dataset.index;
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
        }
    });
});
