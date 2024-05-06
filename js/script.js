
const taskInput = document.getElementById("new-task-input");
const categorySelect = document.getElementById("category-select");
const deadlineInput = document.getElementById("deadline-input");
const prioritySelect = document.getElementById("priority-select");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");
const todayTaskList = document.getElementById("today-task-list");


// Theme Toggle Functionality
const toggleButton = document.getElementById("theme-toggle");
toggleButton.addEventListener("click", function() {
  document.body.classList.toggle("high-contrast");
});

// Function to format date to YYYY-MM-DD
function formatDate(dateString) {
  const date = new Date(dateString);
  const utcDate = new Date(date.toUTCString().slice(0, -4)); // Remove timezone offset
  const year = utcDate.getFullYear();
  const month = String(utcDate.getMonth() + 1).padStart(2, '0');
  const day = String(utcDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

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

// Function to display tasks from local storage
// Function to display tasks from local storage
function displayTasks() {
  taskList.innerHTML = ""; // Clear existing tasks

  tasks.forEach(task => {
    // Create a new Date object for the task's deadline and subtract a day
    const displayDate = new Date(task.deadline);
    displayDate.setDate(displayDate.getDate() - 1);

    // Format the display date to YYYY-MM-DD
    const displayDeadline = formatDate(displayDate);

    // Create task item element (similar to addTask() but without input fields)
    const taskItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed || false; // Set checked state if task is completed
    checkbox.addEventListener("change", function() {
      task.completed = this.checked;
      saveTasks();
      displayTasks(); // Refresh the task list
    });
    const label = document.createElement("label");
    label.textContent = task.description;

    // Create spans for category, deadline, and priority
    const categorySpan = document.createElement("span");
    categorySpan.textContent = ` [${task.category}] `;
    const deadlineSpan = document.createElement("span");
    deadlineSpan.textContent = ` (Deadline: ${displayDeadline}) `;
    const prioritySpan = document.createElement("span");
    prioritySpan.textContent = ` Priority: ${task.priority}`;

    // Append elements to task item
    taskItem.appendChild(checkbox);
    taskItem.appendChild(label);
    taskItem.appendChild(categorySpan);
    taskItem.appendChild(deadlineSpan);
    taskItem.appendChild(prioritySpan);

    // Set style for completed tasks
    if (task.completed) {
      taskItem.style.textDecoration = "line-through";
    }

    taskList.appendChild(taskItem);
  });
}


// Load tasks on page load
loadTasks();
displayTasks();

// Function to add a new task
function addTask() {
  const taskDescription = taskInput.value;
  const category = categorySelect.value;
  const priority = prioritySelect.value;
  // Create a new Date object for the input date, subtract a day, then format it
  const inputDate = new Date(deadlineInput.value);
  inputDate.setDate(inputDate.getDate() + 1); // Subtract one day
  const deadline = formatDate(inputDate);

  // Create task item element
  const taskItem = document.createElement("li");

  // Create checkbox and label
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
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

  displayTasks();
  // Event listener after the checkbox is in the DOM
  checkbox.addEventListener("change", function () {
      if (this.checked) {
          taskItem.style.textDecoration = "line-through";
      } else {
          taskItem.style.textDecoration = "none";
      }
  });

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
  categorySelect.value = "Work"; // Reset to default or your preferred default category
  deadlineInput.value = "";
  prioritySelect.value = "Low"; // Reset to default
}

addTaskButton.addEventListener("click", addTask);

// Function to filter and display tasks due today on "Today" page
function displayTodaysTasks() {
  const today = formatDate(new Date()); // Get today's date in YYYY-MM-DD format
  const todayTaskList = document.getElementById("today-task-list");
  todayTaskList.innerHTML = ""; // Clear existing tasks

  tasks.forEach(task => {
    if (task.deadline === today) {
      // Create task item element (similar to displayTasks() but without checkbox)
      const taskItem = document.createElement("li");
      const label = document.createElement("label");
      label.textContent = task.description;

      // Create spans for category and priority
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

function displayTomorrowsTasks() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1); // Add one day to get tomorrow's date
  const tomorrowDate = formatDate(tomorrow); // Format as YYYY-MM-DD
  const tomorrowTaskList = document.getElementById("today-task-list"); // Assuming same list ID
  tomorrowTaskList.innerHTML = ""; // Clear existing tasks

  tasks.forEach(task => {
    if (task.deadline === tomorrowDate) {
      // Create task item element (similar to displayTasks() but without checkbox)
      const taskItem = document.createElement("li");
      const label = document.createElement("label");
      label.textContent = task.description;

      // Create spans for category and priority
      const categorySpan = document.createElement("span");
      categorySpan.textContent = ` [${task.category}] `;
      const prioritySpan = document.createElement("span");
      prioritySpan.textContent = ` Priority: ${task.priority}`;

      // Append elements to task item
      taskItem.appendChild(label);
      taskItem.appendChild(categorySpan);
      taskItem.appendChild(prioritySpan);

      tomorrowTaskList.appendChild(taskItem);
    }
  });
}

function displayDayAftersTasks() {
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2); // Add two days
  const dayAfterTomorrowDate = formatDate(dayAfterTomorrow);
  const dayAfterTaskList = document.getElementById("today-task-list"); // Assuming same list ID
  dayAfterTaskList.innerHTML = ""; // Clear existing tasks

  tasks.forEach(task => {
    if (task.deadline === dayAfterTomorrowDate) {
      // Create task item element (similar to displayTasks() but without checkbox)
      const taskItem = document.createElement("li");
      const label = document.createElement("label");
      label.textContent = task.description;

      // Create spans for category and priority
      const categorySpan = document.createElement("span");
      categorySpan.textContent = ` [${task.category}] `;
      const prioritySpan = document.createElement("span");
      prioritySpan.textContent = ` Priority: ${task.priority}`;

      // Append elements to task item
      taskItem.appendChild(label);
      taskItem.appendChild(categorySpan);
      taskItem.appendChild(prioritySpan);

      dayAfterTaskList.appendChild(taskItem);
    }
  });
}

// Function to update date and day of week
function updateDateDisplays() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 1);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
  document.getElementById('todays-date').textContent = today.toLocaleDateString('en-US', options);
  document.getElementById('tomorrow-date').textContent = tomorrow.toLocaleDateString('en-US', options);
  document.getElementById('day-after-date').textContent = dayAfterTomorrow.toLocaleDateString('en-US', options);
}

// Call function on page load and whenever needed
updateDateDisplays();

// Check if on "Today" page and call displayTodaysTasks() if so
if (window.location.pathname.endsWith("today.html")) {
  displayTodaysTasks();
  console.log("dabababababababababa");
}
