
//create a variable to hold the array of students being displayed by the page, regardless of the number... this will be used by the showPage() function later
const list = document.querySelectorAll('li.cf') //all the student list items have two classes, student-item and cf. The CSS is targetting their student-list class so I'll target cf with JS wizardry!
let matchedStudents = list; //initialise that all list items are visible

//call the functions to initialise the page
appendPageLinks(matchedStudents); //appends the links when the page first loads
showPage(matchedStudents, 1);

/*.
-- reloadMatchedStudents resets the matched students array with student who had the class matched appended to them by the searchbar
-- this function permits the pagination links to reset upon each search with the appropriate number of pagination links
-- meaning the user can paginate through their search results where there are more than 10 search results
*/

function reloadMatchedStudents() {
  matchedStudents = []; //reset the list of visible units to an empty array
  for(let i=0;i<list.length;i+=1) {
      if(list[i].classList.contains("matched")) {
        matchedStudents.push(list[i]); //populate for every visible student
      }
    }
}

  /*.
  -- the showPage function receives an array of students, and a pagination page number as parameters
  -- it sets the number of results to show per page (10)
  -- the function also hides all students from the initial array
  -- and then displays the subset of students within the array specified by the pagination button
  */

function showPage(listOfStudents, paginationPageSelected) {
  //if the first paginatinon button is selected the last index = 9, if the second pagination button is selected the last index = 19 etc
  const lastIndexToDisplay = (paginationPageSelected*10)-1;
  const firstIndexToDisplay = lastIndexToDisplay - 9;
  //make list items are hidden
  for(let i=0; i < list.length; i+=1) {
    document.querySelector('ul.student-list').children[i].style.display = 'none'//hides all
  }
  // of the matchedList, make sure that the onces within the selected index are revealed
  for(let i=0; i < listOfStudents.length; i+=1) {
    if(i >= firstIndexToDisplay && i <= lastIndexToDisplay) {
      // if the index of the matchedList is in the required range, reveal it!!!
        listOfStudents[i].style.display= '';
    }
  }
}

/***
   -- the appendPageLinks function receives an array of students as a parameter
   -- if pagination links already exist in the DOM, this calls to dropPageLinks() to remove them
   -- then the function reconstructs the appropriate number of pagination links based on the array passed to it
   -- it then adds an event handler on unordered list holding the pagination Links
   -- when the event bubbles up to the handler, if the event target was an anchor it executes a function:
   -- the function of the handler calls the showPage() function
   -- the function of the handler also resets the active class to the link that was selected as the event target
***/

function appendPageLinks(paramList) {
  if (document.querySelector('div.pagination') != undefined) {
    dropPageLinks(); // calls the dropPage Links function so new pagination links can be created from scratch
  }
//1. Determine the number of pages that are need for the list by dividing the list items by the max number of items on the page 10
  let reqNumberOfPages = Math.ceil(paramList.length / 10); // at least one page must exist
  if (reqNumberOfPages > 1) { //only create the pagination pages if more than one page is required
    //2. Create a div, give it the pagination class, and append it to the page div
    let paginateDiv = document.createElement('div');
    paginateDiv.className = 'pagination';
    document.querySelector('div.page').appendChild(paginateDiv);
    //3. Add a ul to the pagination div to store the pagination appendPageLinks
    let paginationList = document.createElement('ul');
    paginateDiv.appendChild(paginationList);
    //4. for every page, add li and a tags with the page number text
    for(let i=0;i < reqNumberOfPages; i+=1) { //this is within the if statement, so it won't run unless there are multiple pages to paginate through
      let listitem = document.createElement('li');
      let tag = document.createElement('a')
      tag.textContent = i+1; //otherwise the first pagenation item returns zero, which just looks weird.
      listitem.appendChild(tag);
      paginationList.appendChild(listitem);
    }
//adding the event handler here, because it will need to be reconstructed every time appendPageLinks are recreated
    let listenOnList = document.querySelector('div.pagination').firstElementChild //select the ul selector is the only child of the div
    for(let i=0;i< listenOnList.children.length; i+=1) { //for each list item in the array of ul children
      listenOnList.children[i].addEventListener('click',(e) => { //add the listener onto the li
      showPage(matchedStudents,listenOnList.children[i].firstElementChild.textContent) //get the text from the anchor embedded in the li, passing it to showPage
      for(let i=0;i< listenOnList.children.length; i+=1){   //6. Loop over pagination links to remove active class from all appendPageLinks
        listenOnList.children[i].firstElementChild.classList.remove('active');
      }
      e.target.className='active'; //7. Add the active class to the link that was just clicked. You can identify that clicked link using event.target
      })
    }
  }
}

/**
-- This function deconstructs the pagination list
-- appendPageLinks() calls this function so it can build new pagination links with a clean slate
**/
function dropPageLinks() {
  let paginationDiv = document.querySelector('div.pagination');
  let paginationUl = paginationDiv.firstElementChild; //its just on UL
  for(i=0; i<paginationUl.children.length; i=+1) { //for each list item in the pagination UL
    paginationUl.children[i].removeChild(paginationUl.children[i].firstElementChild) //removes the anchor from the specific list item
    paginationUl.removeChild(paginationUl.children[i]) //remove the list item from the ul
  }
  paginationDiv.removeChild(paginationUl); //remove the ul from the pagination div
  document.querySelector('div.page').removeChild(paginationDiv); //remove the pagination div from the page div
}



/**
HUNTING FOR EXTRA CREDITS!!
---
Create this to and append it to  div class="page-header cf", under the H2 element>
<div class="student-search">
  <input placeholder="Search for students...">
  <button>Search</button>
</div>

-- Note: I'd otherwise have put these declarative statements at the top of my JavaScript file for readability
-- However, I'm being assessed on the creation of the search bar and its functionality together, I thought the code should be also kept together
-- Possibly could have written all this code within a functional code block too.
**/

//create the elements
let searchDiv = document.createElement('div');
let searchInput = document.createElement('input')
let searchButton = document.createElement('button')
let noResultsMessage = document.createElement('span')
let theHeader = document.querySelector('div.cf').firstElementChild;
let theHeaderDefaultText = 'STUDENTS';
//set them up with their right properties
searchDiv.className = 'student-search';
searchInput.placeholder= 'Search for students...'
searchButton.textContent = 'Search'
noResultsMessage.textContent = 'Sorry, we couldn not find a name with that string.  The search finds all students with that pattern of letters you entered in the search window. To try again, refresh your browser or type a new string into the search.'
noResultsMessage.style.display = 'none'
  //append them in into the DOM
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchButton);
document.querySelector('div.cf').appendChild(searchDiv) //append the div and its children to the cf div.
document.querySelector('div.page').appendChild(noResultsMessage);

/**
--This is the event listener on the search div
-- Once the event object bubbles up to the div, it checks if the target of the event was a button.
-- If it was it stores whatever text was in the search input field, storing it as a regex expression
-- It then resets a booleon counter (matchesFound) to false
-- It hides every student list item (matched or otherwise) and removes its pre-existing matched status
-- It them performs a test.
-- If the Regex matches the name of a student, or a student name contains the value placed in the input (for single character test)
-- Then the function assigns the student a class of 'matched' and redisplays the students
-- The function sets its boolean counter to true (meaning that as long as there is 1 match the matchesFound = true
-- If matches were found then the function makes sure the display is configured to its default
-- However, if no matches were found, then the function changes the configuration
-- A span element with a message informing the user that no results are available displays, and the heading changes to 'Whoops!'
-- The function clears the users input textInput
-- Finally the function calls to reloadMatchedStudents(),
-- It then calls to appendPageLinks() passing it the students it matched
-- It then calls to showPage() passing it the students it matched and telling the page to show the first subset of 10
**/

searchDiv.addEventListener('click', (e) => { //adding the event handler to the overall search div
  if(e.target.tagName == 'BUTTON') {
    searchString = searchInput.value.toString();
    let regex = RegExp(searchString) //creates a regular expression object based on the search input
    let matchesFound = false; //default behaviour will be that there is no search results
    for(let i = 0; i < list.length; i+=1) { //default behaviour will be that there is no search results
      list[i].style.display = 'none' //makes the list item disappear everything disappear
      list[i].classList.remove('matched') //remove class of matched
      if( regex.test(list[i].firstElementChild.children[1].textContent) || list[i].firstElementChild.children[1].textContent.includes(searchString)) { //tests whether the regular expression matches the name of the individual, or if the individual name has a single letter in it
        list[i].classList.add('matched') //adds back class of matched if the search is met
        list[i].style.display = ''
        matchesFound = true; //sets matchest found to true
        }
      }
      if(matchesFound) {
        noResultsMessage.style.display = 'none' //hides the message
        theHeader.textContent = theHeaderDefaultText; //reinstates the original message for the header
      } else {
        noResultsMessage.style.display = '' //displays the 'no results' message
        theHeader.textContent = 'Whoops!'; //changes the header for a bit of fun
      }
    searchInput.value = ''; //clear the value from the textInput
    reloadMatchedStudents(); //recalculate the matched students array once the loop is finished
    appendPageLinks(matchedStudents); //reconstruct the page links based on the search results
    showPage(matchedStudents, 1);
  }
});
