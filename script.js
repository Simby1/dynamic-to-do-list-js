document.addEventListener("DOMContentLoaded", () => {
  // 1. Select DOM Elements
  const taskInput = document.getElementById("task-input");
  const addButton = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  // --- Local Storage Functions ---

  /**
   * Retrieves the array of tasks from Local Storage.
   * Defaults to an empty array if no tasks are found.
   * @returns {string[]} An array of task strings.
   */
  function getTasksFromStorage() {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  }

  /**
   * Saves the current array of tasks back to Local Storage.
   * @param {string[]} tasks - The array of task strings to save.
   */
  function saveTasksToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // --- Core Task Management Functions ---

  /**
   * Creates a new list item (task) in the DOM and sets up its removal button.
   * @param {string} taskText - The text content of the new task.
   * @param {boolean} [save=true] - Flag to decide whether to save the task to Local Storage.
   */
  function createTaskElement(taskText, save = true) {
    // Task Creation
    const listItem = document.createElement("li");
    listItem.textContent = taskText; // Set task content

    // Create Remove Button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "remove-btn";

    // Task Removal Logic
    removeButton.onclick = function () {
      // Remove from DOM
      taskList.removeChild(listItem);

      // Remove from Local Storage and update
      removeTaskFromStorage(taskText);
    };

    // Append button and list item
    listItem.appendChild(removeButton);
    taskList.appendChild(listItem);

    // Save to Local Storage if it's a brand new task (not being loaded)
    if (save) {
      const tasks = getTasksFromStorage();
      tasks.push(taskText);
      saveTasksToStorage(tasks);
    }
  }

  /**
   * Removes a task from the Local Storage array.
   * @param {string} taskText - The text content of the task to remove.
   */
  function removeTaskFromStorage(taskText) {
    let tasks = getTasksFromStorage();
    // Filter out the task that matches the text content
    tasks = tasks.filter((task) => task !== taskText);
    saveTasksToStorage(tasks);
  }

  /**
   * 2. The main function to handle adding a task from user input.
   */
  function addTask() {
    const taskText = taskInput.value.trim();

    // Check if taskText is not empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create the task element and save it to storage
    createTaskElement(taskText);

    // Clear the input field
    taskInput.value = "";
  }

  /**
   * 3. Loads tasks from Local Storage and displays them on the page.
   */
  function loadTasks() {
    const storedTasks = getTasksFromStorage();
    // For each stored task, call createTaskElement with save=false
    storedTasks.forEach((taskText) => createTaskElement(taskText, false));
  }

  // --- Attach Event Listeners ---

  // 4a. Add Task on button click
  addButton.addEventListener("click", addTask);

  // 4b. Add Task on 'Enter' keypress in the input field
  taskInput.addEventListener("keypress", function (event) {
    // Check if the pressed key is 'Enter' (key code 13 is deprecated, event.key is preferred)
    if (event.key === "Enter") {
      addTask();
    }
  });

  // 5. Load existing tasks when the page first loads
  loadTasks();
});
