const taskInput = document.getElementById("new-task-input");
const categorySelect = document.getElementById("category-select");
const deadlineInput = document.getElementById("deadline-input");
const prioritySelect = document.getElementById("priority-select");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

// Theme Toggle Functionality
const toggleButton = document.getElementById("theme-toggle");
toggleButton.addEventListener("click", function() {
  document.body.classList.toggle("high-contrast");
});

// Task Storage (using an array)
let tasks = [];

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
}

// Load tasks on page load
loadTasks();

// Function to add a new task
function addTask() {
  const taskDescription = taskInput.value;
  const category = categorySelect.value;
  const deadline = deadlineInput.value;
  const priority = prioritySelect.value;

  // Create task item element
  const taskItem = document.createElement("li");

  // Create checkbox and label
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      taskItem.style.textDecoration = "line-through";
    } else {
      taskItem.style.textDecoration = "none";
    }
  });
  const label = document.createElement("label");
  label.textContent = taskDescription;

  // Create spans for category, deadline, and priority
  const categorySpan = document.createElement("span");
  categorySpan.textContent = ` [${category}] `;
  const deadlineSpan = document.createElement("span");
  deadlineSpan.textContent = ` (Deadline: ${deadline}) `;
  const prioritySpan = document.createElement("span");
  prioritySpan.textContent = ` Priority: ${priority}`;

  // Append elements to task item
  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(categorySpan);
  taskItem.appendChild(deadlineSpan);
  taskItem.appendChild(prioritySpan);

  // Append task item to task list
  taskList.appendChild(taskItem);

  // Store task data in an object
  const task = {
    description: taskDescription,
    category: category,
    deadline: deadline,
    priority: priority,
  };

  // Add task to the tasks array
  tasks.push(task);

  // Save tasks to local storage
  saveTasks();

  // Clear input fields
  taskInput.value = "";
  categorySelect.value = "Category 1"; // Reset to default
  deadlineInput.value = "";
  prioritySelect.value = "Low"; // Reset to default
}

addTaskButton.addEventListener("click", addTask);

// Function to filter and display tasks due today on "Today" page
function displayTodaysTasks() {
  const today = new Date().toISOString().slice(0, 10);
  const todayTaskList = document.getElementById("today-task-list");

  todayTaskList.innerHTML = ""; // Clear existing tasks

  tasks.forEach(task => {
    if (task.deadline === today) {
      // Create task item element (similar to addTask() but without input fields)
      const taskItem = document.createElement("li");
      const label = document.createElement("label");
      label.textContent = task.description;
      const categorySpan = document.createElement("span");
      categorySpan.textContent = ` [${task.category}] `;
      const prioritySpan = document.createElement("span");
      prioritySpan.textContent = ` Priority: ${task.priority}`;

      // Append elements to task item
      taskItem.appendChild(label);
      taskItem.appendChild(categorySpan);
      taskItem.appendChild(prioritySpan);

      todayTaskList.appendChild(taskItem);
    }
  });
}

// Check if on "Today" page and call displayTodaysTasks() if so
if (window.location.pathname.endsWith("today.html")) {
  displayTodaysTasks();
}