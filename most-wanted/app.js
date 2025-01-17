/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
      //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
      searchResults = searchByTraits(people);
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case "info":
      //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
      // HINT: Look for a person-object stringifier utility function to help
      let personInfo = displayPerson(person[0]);
      break;
    case "family":
      //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
      // HINT: Look for a people-collection stringifier utility function to help
      let personFamily = findPersonFamily(person[0], people);
      //alert(personFamily);
      break;
    case "descendants":
      //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
      // HINT: Review recursion lecture + demo for bonus user story
      let personDescendants = findPersonDescendants(person[0], people);
      // alert(personDescendants);
      break;
    case "restart":
      // Restart app() from the very beginning
      app(people);
      break;
    case "quit":
      // Stop application execution
      return;
    default:
      // Prompt user again. Another instance of recursion
      return mainMenu(person, people);
  }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}

// End of searchByName()

function searchByTraits(people) {
  let searchTrait = promptFor(
    "What trait would you like to search?\nEx. eyecolor, gender, occupation, height, weight",
    chars
  ).toLowerCase();
  

  switch (searchTrait) {
    case "eyecolor":
        let eyecolor = promptFor('Enter eyecolor. ', chars).toLowerCase()
        let personWithEyeColor = people.filter(el => {
            if (el.eyeColor === eyecolor) {
              return true;
            } else {
                return false
            }
          });
          let searchPeopleWithEyeColor = promptFor('Would you like to search another trait? ', yesNo).toLowerCase()
          if(searchPeopleWithEyeColor === 'yes'){
            searchByTraits(personWithEyeColor)
          } else if(personWithEyeColor.length >= 2){
                let  peopleWithEyeColor = personWithEyeColor.map(el=>{
                    return `${el.firstName} ${el.lastName}\n`
                })
                alert(peopleWithEyeColor.toString().split(",").join(" "))
                return app(people);
            } else {
                return mainMenu(personWithEyeColor)
          }
    case "gender":
        let gender = promptFor('Enter gender. ', chars).toLowerCase()
        let personWithGender = people.filter(el => {
            if (el.gender === gender) {
              return true;
            } else {
                return false
            }
          });
          let searchPeopleWithGender = promptFor('Would you like to search another trait? ', yesNo).toLowerCase()
          if(searchPeopleWithGender === 'yes'){
              searchByTraits(personWithGender)
          } else if(personWithGender.length >= 2){
                let  peopleWithGender = personWithGender.map(el=>{
                    return `${el.firstName} ${el.lastName}\n`
                })
                alert(peopleWithGender.toString().split(",").join(" "))
                return app(people);
            } else {
                return mainMenu(personWithGender, people)
            }
    case "occupation":
        let occupation = promptFor('Enter occupation. ', chars).toLowerCase()
        let personWithJob = people.filter(el => {
            if (el.occupation === occupation) {
              return true;
            } else {
                return false
            }
          });
          let searchPeopleWithJob = promptFor('Would you like to search another trait? ', yesNo).toLowerCase()
          if(searchPeopleWithJob === 'yes'){
              searchByTraits(personWithJob)
          } else if(personWithJob.length >= 2){
                let peopleWithJobs = personWithJob.map(el=>{
                    return `${el.firstName} ${el.lastName}\n`
                })
                alert(peopleWithJobs.toString().split(",").join(" "))
                return app(people);
            } 
        return mainMenu(personWithJob, people)
    case "weight":
        let weight = promptFor('Enter weight', chars).toString()
        let personWithWeight = people.filter(el => {
            if (el.weight === parseInt(weight)) {
              return true;
            } else {
                return false
            }
          });
          let searchPeopleWithWeight = promptFor('Would you like to search another trait? ', yesNo).toLowerCase()
          if(searchPeopleWithWeight === 'yes'){
              searchByTraits(personWithWeight)
          } else if(personWithWeight.length >= 2){
                let  peopleWithWeight = personWithWeight.map(el=>{
                    return `${el.firstName} ${el.lastName}\n`
                })
                alert(peopleWithWeight.toString().split(",").join(" "))
                return app(people);
            } else {
                return mainMenu(personWithWeight, people)
            }
    case "height":
        let height = promptFor('Enter height. ', chars).toString()
        let personWithHeight = people.filter(el => {
            if (el.height === parseInt(height)) {
              return true;
            } else {
                return false
            }
          });
          let searchPeopleWithHeight = promptFor('Would you like to search another trait? ', yesNo).toLowerCase()
          if(searchPeopleWithHeight === 'yes'){
              searchByTraits(personWithHeight)
          } else if(personWithHeight.length >= 2){
                let  peopleWithHeight = personWithHeight.map(el=>{
                    return `${el.firstName} ${el.lastName}\n`
                })
                alert(peopleWithHeight.toString().split(",").join(" "))
                return app(people);
            } else {
                return mainMenu(personWithHeight)
            }
    default:
      // Prompt user again. Another instance of recursion
      return searchByTraits(people);
  }
}

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
      })
      .join("\n")
  );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
  let personInfo = `First Name: ${person.firstName}\n`;
  personInfo += `Last Name: ${person.lastName}\n`;
  personInfo += `Gender: ${person.gender}\n`;
  personInfo += `DOB: ${person.dob}\n`;
  personInfo += `Height: ${person.height}\n`;
  personInfo += `Weight: ${person.weight}\n`;
  personInfo += `EyeColor: ${person.eyeColor}\n`;
  personInfo += `Occupation: ${person.occupation}\n`;
  //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
  alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁
//
function findPersonFamily(person, people) {
  let familyInfo = `${person.firstName} ${person.lastName}'s family:\n\n`;
  familyInfo += `Spouse:\n${hasSpouse(person, people)}\n\n`;
  familyInfo += `Parents:\n${hasParents(person, people)}\n\n`;
  familyInfo += `Siblings:\n${hasSiblings(person, people)}`;

  alert(familyInfo);
}
function hasSpouse(person, people) {
  let findSpouse = people.filter(function (el) {
    if (el.id === person.currentSpouse) {
      return true;
    } else if (el.currentSpouse === null) {
      return false;
    }
  });
  if (findSpouse.length === 0) {
    return "No spouse";
  } else if (findSpouse[0].id === person.currentSpouse) {
    let spouse = `${findSpouse[0].firstName} ${findSpouse[0].lastName} `;
    return spouse;
  }
}

function hasParents(person, people) {
  let findParents = people.filter(function (el) {
    if (person.parents.includes(el.id)) {
      return true;
    }
  });
  if (findParents.length === 0) {
    return "No parents";
  } else if (findParents.length === 2) {
    let twoParents = `${findParents[0].firstName} ${findParents[0].lastName}\n${findParents[1].firstName} ${findParents[1].lastName}`;
    return twoParents;
  } else if (findParents.length === 1) {
    let parent = `${findParents[0].firstName} ${findParents[0].lastName}`;
    return parent;
  }
}

function hasSiblings(person, people) {
  let findSiblings = people.filter(el => {
    if (
      person.parents.length >= 1 &&
      person.parents[0] === el.parents[0] &&
      person.id !== el.id
    ) {
      return true;
    } else {
      return false;
    }
  });
  if (findSiblings.length === 0) {
    return "No siblings";
  }

  let siblingInfo = findSiblings.map(el => {
    return `${el.firstName} ${el.lastName}\n`;
  });
  return siblingInfo.toString().split(",").join(" ");
}

function findPersonDescendants(person, people) {
  let descInfo = `${person.firstName} ${person.lastName}'s descendants:\n\n`;
  descInfo += `${hasDescendants(person, people)}\n\n`;

  alert(descInfo);
}

function hasDescendants(person, people) {
  let findGrandChildren = people.filter(el => {
    if (el.parents.length >= 1 && el.parents.includes(person.id)) {
      return true;
    } else {
      return false;
    }
  });

  if (findGrandChildren.length === 0) {
    return "No descendants";
  }

  let children = [];
  let findParents = people.filter(el => {
    for (var i = 0; i < findGrandChildren.length; i++) {
      if (
        el.parents.length >= 1 &&
        el.parents.includes(findGrandChildren[i].id)
      ) {
        children.push(el);
        return true;
      }
    }
    return children;
  });

  let descendants = findGrandChildren.concat(children);
  let foundGrandChildren = descendants.map(el => {
    return `${el.firstName} ${el.lastName}\n`;
  });
  return foundGrandChildren.toString().split(",").join(" ");
}

