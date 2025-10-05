document.addEventListener("DOMContentLoaded", () => {
  // Select DOM Elements
  const taskInput = document.getElementById("task-input");
  const addButton = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");

  /**
   * Handles the logic for adding a new task to the list.
   */
  function addTask() {
    // Retrieve and trim the value from the input field
    const taskText = taskInput.value.trim();

    // Check if taskText is not empty
    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // --- Task Creation and Removal (DOM Manipulation) ---

    // 1. Create a new li element
    const listItem = document.createElement("li");
    // Set its textContent
    listItem.textContent = taskText;

    // 2. Create a new button element for removing the task
    const removeButton = document.createElement("button");
    // Set its textContent
    removeButton.textContent = "Remove";
    // Assign its class name using the 'className' property
    removeButton.className = "remove-btn";

    // 3. Assign an onclick event to remove the li element
    removeButton.onclick = function () {
      // Removes the li element (parent of the button) from the taskList
      taskList.removeChild(listItem);
    };

    // 4. Append the remove button to the li element
    listItem.appendChild(removeButton);

    // 5. Append the li to taskList
    taskList.appendChild(listItem);

    // 6. Clear the task input field
    taskInput.value = "";
  }

  // --- Attach Event Listeners ---

  // Add task on button click
  addButton.addEventListener("click", addTask);

  // Add task on 'Enter' keypress in the input field
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
});
