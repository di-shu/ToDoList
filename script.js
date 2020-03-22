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
    taskCheckBoxes = document.querySelectorAll('.task-checkbox'),
    toDoListObj = {},
    toDoListSaved = {};

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
        toDoListObj.html = parseToDoListHtmltoString();
        toDoListObj.checkBox = getArrCheckbox(taskCheckBoxes);
}


function setCheckBox()
{

    const savedObj = localStorage.getItem('myToDo') ? JSON.parse(localStorage.getItem('myToDo')) : {};
    const tempObj = savedObj.checkBox ? JSON.parse(savedObj.checkBox) : {};
    const newArr = Object.values(tempObj)

    for(let i=0;i<newArr.length;i++)
    {
        if(newArr[i]=='true')
        {
            taskCheckBoxes[i].removeAttribute(`unchecked`);
            taskCheckBoxes[i].setAttribute(`checked`,'');
        }
        else if(newArr[i]=='false')
        {
            taskCheckBoxes[i].removeAttribute(`checked`);
            taskCheckBoxes[i].setAttribute(`unchecked`,'');
        }
    }
}


function saveToDoList()
{
    return JSON.parse(localStorage.getItem('myToDo')).html;
}

function setToLocaleStorage(obj)
{
    localStorage.setItem('myToDo',JSON.stringify(toDoListObj));
}

function parseToDoListHtmltoString()
{
    return toDoList.innerHTML.toString();
}

function getArrCheckbox(elem)
{
    let newObj = {};
    let name = 'check';
    for(let i=0;i<elem.length;i++)
    {
        newObj[name+i]=elem[i].checked?'true':'false';
    }
    return JSON.stringify(newObj);
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

    date.innerHTML = currentDate.toLocaleString('En',options);;
}
setDate();

function loadToDo(html)
{
    toDoList.innerHTML = '';
    toDoList.insertAdjacentHTML('beforeend',html);
    redefine();
}

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
    
}

buttonAdd.addEventListener('click',()=>{
   if(input.value)
   {
        addToDo(input.value);
        input.value = '';
        redefine();
        setToLocaleStorage(toDoListObj);
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
            toDoListObj.html=parseToDoListHtmltoString();
            taskCheckBoxes = document.querySelectorAll('.task-checkbox');
            getArrCheckbox(taskCheckBoxes);
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
                inputEditWrapper[i].style.display = 'none';
                toDoListObj.html = parseToDoListHtmltoString();
            }
            
        }

        toDoListObj.checkBox = getArrCheckbox(taskCheckBoxes);
        toDoListObj.html = parseToDoListHtmltoString();
    }
    setToLocaleStorage(toDoListObj);
});

loadToDo(saveToDoList());
setCheckBox();



