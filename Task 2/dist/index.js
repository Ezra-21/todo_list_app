"use strict";
const inputBox = document.getElementById("input-box");
const taskList = document.getElementById("task-list");
function addTask() {
    const taskText = inputBox.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
    const li = document.createElement("li");
    const spanText = document.createElement("span");
    spanText.className = "task-text";
    spanText.textContent = taskText;
    li.appendChild(spanText);
    const actionDiv = document.createElement("div");
    actionDiv.className = "action-buttons";
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "✏️";
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "❌";
    actionDiv.appendChild(editBtn);
    actionDiv.appendChild(deleteBtn);
    li.appendChild(actionDiv);
    taskList.appendChild(li);
    inputBox.value = "";
    saveData();
}
taskList.addEventListener("click", function (e) {
    var _a, _b;
    const target = e.target;
    if (target.classList.contains("task-text")) {
        (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.classList.toggle("checked");
        saveData();
    }
    if (target.classList.contains("delete-btn")) {
        (_b = target.closest("li")) === null || _b === void 0 ? void 0 : _b.remove();
        saveData();
    }
    if (target.classList.contains("edit-btn")) {
        const li = target.closest("li");
        const span = li.querySelector(".task-text");
        const newText = prompt("Edit your task:", span.textContent || "");
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
            saveData();
        }
    }
});
function saveData() {
    localStorage.setItem("data", taskList.innerHTML);
}
function showTasks() {
    taskList.innerHTML = localStorage.getItem("data") || "";
}
showTasks();
//# sourceMappingURL=index.js.map