const taskInput = document.getElementById("new-task-input");
const categorySelect = document.getElementById("category-select");
const deadlineInput = document.getElementById("deadline-input");
const prioritySelect = document.getElementById("priority-select");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

addTaskButton.addEventListener("click", addTask);

// Theme Toggle Functionality
const toggleButton = document.getElementById("theme-toggle");

toggleButton.addEventListener("click", function() {
  document.body.classList.toggle("high-contrast");
});

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

  // Clear input fields
  taskInput.value = "";
  categorySelect.value = "Category 1"; // Reset to default
  deadlineInput.value = "";
  prioritySelect.value = "Low"; // Reset to default
}
