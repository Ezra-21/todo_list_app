const inputBox = document.getElementById("input-box") as HTMLInputElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;

function addTask(): void {
  const taskText = inputBox.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const li: HTMLLIElement = document.createElement("li");

  const spanText: HTMLSpanElement = document.createElement("span");
  spanText.className = "task-text";
  spanText.textContent = taskText;
  li.appendChild(spanText);

  const actionDiv: HTMLDivElement = document.createElement("div");
  actionDiv.className = "action-buttons";

  const editBtn: HTMLButtonElement = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "✏️";

  const deleteBtn: HTMLButtonElement = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "❌";

  actionDiv.appendChild(editBtn);
  actionDiv.appendChild(deleteBtn);
  li.appendChild(actionDiv);

  taskList.appendChild(li);
  inputBox.value = "";
  saveData();
}

taskList.addEventListener("click", function (e: MouseEvent): void {
  const target = e.target as HTMLElement;

  // Toggle complete
  if (target.classList.contains("task-text")) {
    target.parentElement?.classList.toggle("checked");
    saveData();
  }

  // Delete task
  if (target.classList.contains("delete-btn")) {
    target.closest("li")?.remove();
    saveData();
  }

  // Edit task
  if (target.classList.contains("edit-btn")) {
    const li = target.closest("li") as HTMLLIElement;
    const span = li.querySelector(".task-text") as HTMLSpanElement;
    const newText = prompt("Edit your task:", span.textContent || "");
    if (newText !== null && newText.trim() !== "") {
      span.textContent = newText.trim();
      saveData();
    }
  }
});

function saveData(): void {
  localStorage.setItem("data", taskList.innerHTML);
}

function showTasks(): void {
  taskList.innerHTML = localStorage.getItem("data") || "";
}

showTasks();
