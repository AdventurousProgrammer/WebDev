const toDoList = [];
// {name: 'Finish Coding', date: '07/11/2024'}
function removeItem(i)
{
    toDoList.splice(i, 1);
}
function renderToDoList()
{
    let htmlString = '';
    for(let i = 0; i < toDoList.length; i++)
    {
         const html = `<div class="js-item-name">${toDoList[i].name}</div>
                        <div class="js-item-date">${toDoList[i].date} </div>
                        <div>
                            <button class="delete-button" onclick="toDoList.splice(${i}, 1);">Delete</button>
                        </div>
                        `;
         htmlString += html;
    }
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