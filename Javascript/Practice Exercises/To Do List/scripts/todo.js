const toDoListItems = [];

function addItem()
{
  const inputElement = document.querySelector('.js-to-do-item');
  const item = inputElement.value;
  toDoListItems.push(item);
  console.log(toDoListItems);
}

function addItem2()
{
    const inputElement = document.querySelector('.js-to-do-item');
    const item = inputElement.value;
    toDoListItems.push(item);
    let htmlString = '';

    for(let i = 0; i < toDoListItems.length; i++)
    {
        htmlString += `<p>${toDoListItems[i]}</p>`;
    }

    document.querySelector('.js-to-do-list').innerHTML = htmlString;
}