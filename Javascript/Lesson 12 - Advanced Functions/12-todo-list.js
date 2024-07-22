const addButtonElement = document.querySelector('.js-add-to-do-button');
addButtonElement.addEventListener('click', () => {
    addToDo();
});


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

        // this is just a string, element needs to be on document
        const html = `<div class="js-item-name">${name}</div>
                        <div class="js-item-date">${date} </div>  
                        <div>
                            <button class="delete-button js-delete-to-do-button" onclick="toDoList.splice(${index}, 1);
                                                                   renderToDoList();">Delete</button>
                        </div>
                        `;
         htmlString += html;
    });
    
    document.querySelector('.js-to-do-list')
        .innerHTML = htmlString;

    // element needs to be on page in order to be selected
   document.querySelectorAll('.js-delete-to-do-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
            toDoList.splice(index, 1);
        });
   });
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