
//create a variable to hold the array of students being displayed by the page, regardless of the number... this will be used by the showPage() function later
const list = document.querySelectorAll('li.cf') //all the student list items have two classes, student-item and cf. The CSS is targetting their student-list class so I'll target cf with JS wizardry!

  /*. Loop over items in the list parameter
  -- If the index of a list item is >= the index of the first item that should be shown on the page
  -- && the list item index is <= the index of the last item that should be shown on the page, show it
  */
function showPage(listOfStudents, paginationPageSelected) {
  //define the indexes that will return results
  const lastIndexToDisplay = (paginationPageSelected*10)-1; //so if the first paginatinon button is selected the last index = 9, if the second pagination button is selected the last index = 19 etc
  const firstIndexToDisplay = lastIndexToDisplay - 9;

  // apply the appropriate hide or reveal stylings for each
  for(var i=0;i < listOfStudents.length; i+=1) {
    document.querySelector('ul.student-list').children[i].style.display="none"; // default to hiding the child
    if(i >= firstIndexToDisplay && i <= lastIndexToDisplay) {
        document.querySelector('ul.student-list').children[i].style.display=""; // reveal.. taa daa!!!
    }
  }
}

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {
//1. Determine the number of pages that are need for the list by dividing the list items by the max number of items on the page 10
  let numberOfPages = list.length / 10;
  //2. Create a div, give it the pagination class, and append it to the page div
  let paginateDiv = document.createElement('div');
  paginateDiv.className = 'pagination';
  document.querySelector('div.page').appendChild(paginateDiv);
  //3. Add a ul to the pagination div to store the pagination appendPageLinks
  let paginationList = document.createElement('ul');
  paginateDiv.appendChild(paginationList);
  //4. for every page, add li and a tags with the page number text
  for(let i=0;i < numberOfPages; i+=1) {
    let listitem = document.createElement('li');
    let tag = document.createElement('a')
    tag.textContent = i+1; //otherwise the first pagenation item returns zero, which just looks weird.
    listitem.appendChild(tag);
    paginationList.appendChild(listitem);
  }
}

//call the function..
appendPageLinks(list);

//5. Add an event listener to each a tag. When they are clicked, call the showPage function to display the appropriate pages
let listenOnList = document.querySelector('div.pagination').firstElementChild //select the ul selector is the only child of the div
for(let i=0;i< listenOnList.children.length; i+=1) { //for each list item in the array of ul children
  listenOnList.children[i].addEventListener('click',(e) => { //add the listener onto the li
  noResultsMessage.style.display = 'none' //i've added this to remove the noResults Message, just in case its already there
  showPage(list,parseInt(listenOnList.children[i].firstElementChild.textContent)) //get the text from the anchor embedded in the li, passing it to showPage
  for(let i=0;i< listenOnList.children.length; i+=1){   //6. Loop over pagination links to remove active class from all appendPageLinks
    listenOnList.children[i].firstElementChild.className="";
  }
  e.target.className='active'; //7. Add the active class to the link that was just clicked. You can identify that clicked link using event.target
  })
}

/**
HUNTING FOR EXTRA CREDITS!!
---
Create this to and append it to  div class="page-header cf", under the H2 element>
<div class="student-search">
  <input placeholder="Search for students...">
  <button>Search</button>
</div>
**/

//create the elements
let searchDiv = document.createElement('div');
let searchInput = document.createElement('input')
let searchButton = document.createElement('button')
let noResultsMessage = document.createElement('span')
//set them up with their right properties
searchDiv.className = 'student-search';
searchInput.placeholder= 'Search for students...'
searchButton.textContent = 'Search'
noResultsMessage.textContent = 'Sorry, that name is not found name. Try again'
noResultsMessage.style.display = 'none'
//append them in into the DOM
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
document.querySelector('div.cf').appendChild(searchDiv) //append the div and its children to the cf div.
searchDiv.appendChild(noResultsMessage);

//Now the elements are in, time for functionality! Add an eventhandler to search and display for individuals. If no match is found, a message should display on the pages
searchDiv.addEventListener('click', (e) => { //adding the event handler to the overall search div
  if(e.target.tagName == 'BUTTON') {
    let regex = RegExp(`${searchInput.value}`) //creates a regular expression object based on the search input
    let matchesFound
    for(let i = 0; i < list.length; i+=1) {
      list[i].style.display='none' //makes everything disappear
      noResultsMessage.style.display = ''
      if(regex.test(list[i].firstElementChild.children[2].textContent)) { //tests whether the regular expression matches the name of the individual
        list[i].style.display="" //makes it reappear if its a match
        matchesFound = true;
      }
      if(matchesFound) {
        noResultsMessage.style.display = 'none'
      }
    }
    searchInput.value = ''; //clear the value from the textInput
    }
});
