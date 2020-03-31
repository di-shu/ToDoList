let 
    buttonSettings = document.querySelectorAll('.task-buttons'),
    buttonEdit = document.querySelectorAll('.edit'),
    hideSettings = document.querySelectorAll('.hide'),
    buttonDelete = document.querySelectorAll('.delete'),
    listItem = document.querySelectorAll('.main_list-item'),
    inputEdit = document.querySelectorAll('.edit-input'),
    tasks = document.querySelectorAll('.task'),
    inputEditWrapper = document.querySelectorAll('.edit-input-wrapper'),
    buttonConfirm = document.querySelectorAll('.confirm'),
    taskCheckBoxes = document.querySelectorAll('.task-checkbox');

const date = document.querySelector('.toDoList-header_date'),
      input = document.querySelector('.toDoList-footer_input'),
      buttonAdd = document.querySelector('#toDoList-footer_button'),
      toDoList = document.querySelector('.toDoList-main_list');


function redefine()
{
        buttonSettings = document.querySelectorAll('.task-buttons'),
        buttonEdit = document.querySelectorAll('.edit'),
        hideSettings = document.querySelectorAll('.hide'),
        buttonDelete = document.querySelectorAll('.delete'),
        listItem = document.querySelectorAll('.main_list-item'),
        inputEdit = document.querySelectorAll('.edit-input'),
        tasks = document.querySelectorAll('.task'),
        inputEditWrapper = document.querySelectorAll('.edit-input-wrapper'),
        buttonConfirm = document.querySelectorAll('.confirm'),
        taskCheckBoxes = document.querySelectorAll('.task-checkbox');
}

function setCheckBox(index,condition)
{
    const tempArr = JSON.parse(localStorage.getItem('toDoList'));

    for(let i=0;i<tempArr.length;i++)
    {
        if(i == index)
        {
            tempArr[i].done = condition;
            localStorage.setItem('toDoList',JSON.stringify(tempArr));
        }
    }
}

function addToLS()
{
    let tempArr = [];

    for(let i=0;i<tasks.length;i++)
    {
        let tempObj = {};
        tempObj.name = 'task' + i;
        tempObj.text = tasks[i].innerHTML;
        taskCheckBoxes[i].checked == true ? tempObj.done = true : tempObj.done = false;
        
        tempArr[i] = tempObj;
    }
    
    localStorage.setItem('toDoList',JSON.stringify(tempArr));
}

function deleteTask(index)
{
    const tempArr = JSON.parse(localStorage.getItem('toDoList'));

    for(let i=0;i<tempArr.length;i++)
    {
        if(i == index)
        {
            tempArr.splice(i,1);
            localStorage.setItem('toDoList',JSON.stringify(tempArr));
        }
    }
}

function editTask(index , newTask)
{
    const tempArr = JSON.parse(localStorage.getItem('toDoList'));

    for(let i=0;i<tempArr.length;i++)
    {
        if(i == index)
        {
            tempArr[i].text = newTask;
            localStorage.setItem('toDoList',JSON.stringify(tempArr));
        }
    }
}

function loadToDoList()
{
    let tempArr = JSON.parse(localStorage.getItem('toDoList'));

    for(let i=0;i<tempArr.length;i++)
    {
        addToDo(tempArr[i].text);
        tempArr[i].done == true ? taskCheckBoxes[i].checked = true : taskCheckBoxes[i].checked = false;
    }

}


function setEditValue()
{
    for(let i=0;i<tasks.length;i++)
    {
        inputEdit[i].value = tasks[i].innerHTML;
    }
}
setEditValue();

function setDate()
{
    let currentDate = new Date();

    let options = {
        month: 'long',
        day:'numeric',
        weekday: 'long'
    }

    date.innerHTML = currentDate.toLocaleString('En',options);
}
setDate();


function addToDo(text)
{
    const htmlElem = `<li class="main_list-item">
                    
                        <label class="checkbox-wrapper">
                            <input type="checkbox" class="task-checkbox">
                            <div class="fake-checkbox">
                                <div class="checkmark"></div>
                            </div>   
                        </label>
                        

                        <p class="task">${text}</p>
                        <div class="task-buttons">
                            <div class="edit task-button"></div>
                            <div class="delete task-button"></div>
                            <div class="hide"></div>
                        </div>
                        <div class="edit-input-wrapper">
                            <input type="text" class="edit-input">
                            <div class="confirm"></div>
                        </div>
                    </li>`;

    toDoList.insertAdjacentHTML('beforeend',htmlElem);
    redefine();
}

buttonAdd.addEventListener('click',()=>{
   if(input.value)
   {
        addToDo(input.value);
        input.value = '';
        redefine();
        addToLS();
   }
});

toDoList.addEventListener('click',function(e){
    for(let i=0;i<buttonSettings.length;i++)
    {
        if(e.target==buttonSettings[i])
        {
            buttonSettings[i].classList.add('task-buttons_check');

            hideSettings[i].style.display = 'block';

            buttonEdit[i].style.display = 'block';

            buttonDelete[i].style.display = 'block';
            buttonDelete[i].style.position = 'static';
        }
        else if(e.target==hideSettings[i])
        {
            buttonSettings[i].classList.remove('task-buttons_check');
            hideSettings[i].style.display = 'none';

            buttonEdit[i].style.display = 'none';

            buttonDelete[i].style.display = 'none';
            buttonDelete[i].style.position = 'absolute';
        }
        else if(e.target==buttonDelete[i])
        {
            listItem[i].remove();
            deleteTask(i);
            redefine();
        }
        else if(e.target==buttonEdit[i])
        {
            inputEditWrapper[i].style.display = 'flex';
            inputEdit[i].value = tasks[i].innerHTML;
        }
        else if(e.target==buttonConfirm[i])
        {
            if(inputEdit[i].value)
            {
                tasks[i].innerHTML = inputEdit[i].value;
                editTask(i,inputEdit[i].value);
                inputEditWrapper[i].style.display = 'none';
            }
        }
        else if (e.target==taskCheckBoxes[i])
        {
            setCheckBox(i,taskCheckBoxes[i].checked);
        }
        
    }

});


loadToDoList();
