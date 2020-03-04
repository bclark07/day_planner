var today = new Date();

//if localstorage.getItem("activity")statement, get items and populate the calendar
var stored_activities = JSON.parse(localStorage.getItem("activity")) || [
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  ""
];

function initialize_page() {
  //sets date at top of page
  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm a"));
  // for loop builds a calendar with time, input box, and save button
  for (i = 8; i < 18; i++) {
    //creates divs for each hour--> jquery .each method??
    var timeSlot = $("<div>").addClass("d-flex justify-content-between");
    var hour = $("<p>")
      .text(i + ":00")
      .addClass("hour" + i);

    var input = $("<input>")
      .addClass("time-block")
      .attr("id", "_" + i)
      .val(stored_activities[i - 8]);
    var save = $("<button>")
      .text("Save")
      .addClass("SaveBtn")
      .attr("id", "_" + i);
    timeSlot.append(hour);
    timeSlot.append(input);
    timeSlot.append(save);
    $(".container").append(timeSlot);
    //creates if statement to color input boxes according to which hours of the day have passed
    if (i < today.getHours()) {
      input.addClass("form-control past");
    } else if (today.getHours() === i) {
      input.addClass("form-control present");
    } else {
      input.addClass("form-control future");
    }
  }

  $(".SaveBtn").on("click", function() {
    var buttonClicked = $(this).siblings("input");
    var time_slot = $(this)
      .prop("id")
      .slice(1);
    var activity = buttonClicked.val();
    //inserts text into equivalent time slot within array to store
    stored_activities.splice(time_slot - 8, 1, activity);

    // save in localStorage
    localStorage.setItem("activity", JSON.stringify(stored_activities));
  });
}

initialize_page();
