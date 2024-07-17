const toDoList = [];
// {name: 'Finish Coding', date: '07/11/2024'}
function removeItem(i)
{
    toDoList.splice(i, 1);
}
function renderToDoList()
{
    let htmlString = '';
    toDoList.forEach(function(toDoObject, index) {
        const {name, date} = toDoObject
        const html = `<div class="js-item-name">${name}</div>
                        <div class="js-item-date">${date} </div>
                        <div>
                            <button class="delete-button" onclick="toDoList.splice(${index}, 1);
                                                                   renderToDoList();">Delete</button>
                        </div>
                        `;
         htmlString += html;
    });
    /*
    for(let i = 0; i < toDoList.length; i++)
    {
        const {name, date} = toDoObject
         const html = `<div class="js-item-name">${name}</div>
                        <div class="js-item-date">${date} </div>
                        <div>
                            <button class="delete-button" onclick="toDoList.splice(${i}, 1);">Delete</button>
                        </div>
                        `;
         htmlString += html;
    }
         */
    document.querySelector('.js-to-do-list')
        .innerHTML = htmlString;
}

function addToDo()
{
    const nameInputElement = document.querySelector('.js-name-input');
    const toDoItemName = nameInputElement.value;

    const dateInputElement = document.querySelector('.js-date-input');
    const toDoItemDate = dateInputElement.value;

    const toDoItem = {
        name: toDoItemName,
        date: toDoItemDate
      };
    toDoList.push(toDoItem);
    renderToDoList();
}