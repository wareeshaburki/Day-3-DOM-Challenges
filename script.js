const addButton = document.querySelector(".add-button");
const inputTask = document.querySelector("#task-entry");
const addedTasksList = document.querySelector(".added-task-list");
const totalCount = document.querySelector(".total-count");
const incompleteCount = document.querySelector(".incomplete-count");
const completeCount = document.querySelector(".complete-count");
const filters = document.querySelectorAll(".filter a");
const mode = document.querySelector(".mode");
const body = document.querySelector("body");

let counters = {total : 0 , completed : 0 , incomplete : 0};

const updateCounts = () => {
  ({total : totalCount.textContent,
    completed : completeCount.textContent,
    incomplete : incompleteCount.textContent
  } = counters);
};

addButton.addEventListener("click", () => {
  const { value } = inputTask;
  const task = value.trim();
  if (task !== "") {
    const listTaskItem = document.createElement("li");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";

    const taskText = document.createElement("span");
    taskText.textContent = `${task}`;

    const taskAndCheckBox = document.createElement("span");
    taskAndCheckBox.appendChild(checkBox);
    taskAndCheckBox.appendChild(taskText);
    listTaskItem.appendChild(taskAndCheckBox);

    checkBox.addEventListener("change", () => {
      listTaskItem.classList.toggle("completed", checkBox.checked);
      checkBox.checked? (counters.completed++ ,
        counters.incomplete--) : (counters.completed-- ,
        counters.incomplete++);
        updateCounts();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Task";
    deleteButton.addEventListener("click", () => {
      addedTasksList.removeChild(listTaskItem);
      counters.total--;
      checkBox.checked? counters.completed-- : counters.incomplete--;
      updateCounts();
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edit Task";

    editButton.addEventListener("click", () => {
      if (editButton.textContent === "Edit Task") {
        const editTaskInput = document.createElement("input");
        editTaskInput.classList.add("edit-task");
        editTaskInput.value = taskText.textContent;
        taskText.textContent = "";
        taskText.appendChild(editTaskInput);
        editButton.textContent = "Enter";
      } else {
        const editTaskInput = taskText.querySelector("input");
        taskText.textContent = editTaskInput.value;
        editButton.textContent = "Edit Task";
      }
    });

    const buttonSpan = document.createElement("span");
    buttonSpan.appendChild(editButton);
    buttonSpan.appendChild(deleteButton);
    listTaskItem.appendChild(buttonSpan);

    addedTasksList.appendChild(listTaskItem);
    counters.total++;
    counters.incomplete++;
    inputTask.value = "";
    inputTask.focus();
    updateCounts();
  } else {
    alert("Can't add an empty Task");
  }
});

filters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    e.preventDefault();
    const filterType = filter.parentElement.classList[1];
    const allTasks = addedTasksList.querySelectorAll("li");
    allTasks.forEach((task) => {
      switch (filterType) {
        case "total":
          task.style.display = "flex";
          break;
        case "completed":
          task.style.display = task.classList.contains("completed")
            ? "flex"
            : "none";
          break;
        case "incomplete":
          task.style.display = !task.classList.contains("completed")
            ? "flex"
            : "none";
          break;
      }
    });
  });
});

const clearAllButton = document.createElement("button");
clearAllButton.textContent = "Clear All Completed Tasks";
clearAllButton.classList.add("clear-button");
document.querySelector(".main-container").appendChild(clearAllButton);

clearAllButton.addEventListener("click", () => {
  const allCompletedTasks = addedTasksList.querySelectorAll("li.completed");
  allCompletedTasks.forEach((task) => addedTasksList.removeChild(task));
  counters.total -= counters.completed;
  counters.completed = 0;
  updateCounts();
});

mode.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.contains("dark") ? mode.textContent = "Light Mode" : mode.textContent = "Dark Mode";
});
