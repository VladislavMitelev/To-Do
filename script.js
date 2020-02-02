"use strict";

document.addEventListener("DOMContentLoaded", onPageLoaded);

function onPageLoaded() {


    const ul = document.querySelector("ul.todosList");
    const input = document.querySelector("input[type='text']");
    const ol = document.querySelector("ol.todos");
    const enterBtn = document.querySelector("button.enter");

    const saveButton = document.querySelector("button.save");
    const clearButton = document.querySelector("button.clear");
    const clearCheckedButton = document.querySelector("button.clearChecked");

    function createDel (){
        let del = document.createElement("span");
        del.classList.add("del");
        del.append('×');
        return del
    }

    function creatTextSpan (){
        let textSpan = document.createElement("span");
        return textSpan
    }

    function deleteTodo(element) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove();
        });
    }

    function deleteList(element, key) {
        element.addEventListener("click", (event) => {
            element.parentElement.remove();
            localStorage.removeItem(key)
        });
    }

     function showTodo(event){
        ol.innerHTML = localStorage.getItem( event.target.innerHTML)
    } 

    function onClickTodo(event) {
        if (event.target.closest('li')) {
            event.target.closest('li').classList.toggle("checked");
        }
    }

    function createTodo() {
        const li = document.createElement("li");

        const textSpan = document.createElement("span");
            textSpan.classList.add("todo-text");

        const del = document.createElement("span");
            del.classList.add("del");
            del.append('×');

        const newTodo = input.value;
           textSpan.append(newTodo);
           
        ol.appendChild(li).append(del, textSpan)
        
        input.value = "";
        deleteTodo(del);
    }

    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let liName = document.createElement("li");
    let textSpan = creatTextSpan ();
            textSpan.append(key);
    let del = createDel ();
      
      ul.appendChild(liName).append(del, textSpan);
      liName.addEventListener("click", showTodo);
      deleteList(del, key);
     }
   
input.addEventListener("keypress", (keyPressed) => {
    const keyEnter = 13;
    if (keyPressed.which == keyEnter) {
        createTodo();
    }
});

enterBtn.addEventListener("click", createTodo);

ol.addEventListener("click", onClickTodo);

saveButton.addEventListener("click", saveNewTodo);
        
    clearButton.addEventListener("click", () => {
        ol.innerHTML = "";
    });
    clearCheckedButton.addEventListener("click", () => {
        let listReady = document.querySelectorAll("li.checked");
        for (let elem of listReady) {
        elem.remove();
        }
    });

    function saveNewTodo(){
         let nameTodo = prompt('Название списка дел:', '');
         if (nameTodo==null)return;
        let liName = document.createElement("li");
        let textSpan = creatTextSpan();
                textSpan.append(nameTodo);
        let del = createDel();
    
        ul.appendChild(liName).append(del, textSpan);
    liName.addEventListener("click", showTodo);
    localStorage.setItem(nameTodo, ol.innerHTML);
    deleteList(del, nameTodo);
    }

}