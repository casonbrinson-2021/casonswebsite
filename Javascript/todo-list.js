//Assignment - To Do List
//Author - Gregory Cason Brinson
//the list of tasks and their element states
let tasks = [{
    id: 0,
    title: "Doing Laundary",
    dueDate: new Date(2020,1,28),
    completed: false,
    completeDate: null,
    createdDate: new Date(2020,1,23),
    deleted: false,
    note: "I need to get quarters first at Kroger."
}, {
    id: 1,
    title: "CS3744 Assignment 3",
    dueDate: new Date(2020,2,17),
    completed: false,
    completeDate: null,
    createdDate: new Date(2020,1,24),
    deleted: false,
    note: "I better start early cuz it looks pretty complicated.\r\nLooks like I have to read w3schools.com a lot."
}, {
    id: 2,
    title: "Getting AAA batteries",
    dueDate: null,
    completed: true,
    completeDate: new Date(2020,2,1),
    createdDate: new Date(2020,1,26),
    deleted: false,
    note: "for my remote control."
}, {
    id: 3,
    title: "Booking a flight ticket ACM CHI conference",
    dueDate: new Date(2020,3,15),
    completed: false,
    completeDate: null,
    createdDate: new Date(2020,2,26),
    deleted: false,
    note: "I would have to book a flight ticket to ACM CHI conference.\r\nKeep an eye on the cancellation policy. the conference may be cancelled due to the cornoa virus outbreak. :( Although flight tickets are getting cheaper."
}];

//my global varaibles
var showOverdueOnly = false;
var hideCompletedTasks = false;

//-------my functions-------//
//renders everything to the screen
let renderTasks = function() {
    //remove all the tasks from the screen
    for (var i = 0; i < tasks.length; i++) {
        $('#' + i).remove();
        $('#note-' + i).remove();
    }

    //get today's date
    var todayDate = new Date();

    //re-render the tasks in the list based on their attributes
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].deleted === false) {
            //--variables to use in the task row--//
            //truncate the title if needed
            var title = tasks[i].title;
            if (title.length > 30) {
                title = title.slice(0, 30);
                title = title + "...";
            }

            var rowClass = "";
            checkBoxStatus = false;
            if (tasks[i].completed) {
                rowClass = "success";
                checkBoxStatus = true;
            } else if (tasks[i].dueDate !== null) {
                if ((tasks[i].dueDate.getFullYear() < todayDate.getFullYear()) || (tasks[i].dueDate.getMonth() < todayDate.getMonth()) || (tasks[i].dueDate.getDate() < todayDate.getDate())) {
                    rowClass = "danger";
                }
            }

            //--add the task to the table--//
            //if showOverdueOnly is true then only show the overdue items
            //add the row
            $("tbody").append('<tr id="' + tasks[i].id + '" class="' + rowClass + '"></tr>');
            //add the checkbox
            if (checkBoxStatus) {
                $("#" + tasks[i].id).append('<td class="text-center"><input type="checkbox" class="form-check-input" value="' + tasks[i].id + '" checked=""></td>');
            } else {
                $("#" + tasks[i].id).append('<td class="text-center"><input type="checkbox" class="form-check-input" value="' + tasks[i].id + '"></td>');
            }
            //add the title
            if (tasks[i].completed) {
                $("#" + tasks[i].id).append('<td class="text-center"><del>' + title + '</del></td>');
            } else {
                $("#" + tasks[i].id).append('<td class="text-center">' + title + '</td>');
            }

            //add the note button
            $("#" + tasks[i].id).append('<td class="text-center"><span class="text-right"><button class="btn btn-xs btn-warning" data-toggle="collapse" data-target="#note-' + tasks[i].id + '"><span class="glyphicon glyphicon-triangle-bottom"> </span> Note</button></span></td>');
            //add the due date
            if (tasks[i].dueDate !== null) {
                $("#" + tasks[i].id).append('<td class="text-center">' + (tasks[i].dueDate.getMonth() + 1) + '/' + tasks[i].dueDate.getDate() + '/' + tasks[i].dueDate.getFullYear() + '</td>');
            } else {
                $("#" + tasks[i].id).append('<td class="text-center"></td>');
            }
            //add the completion date
            if (tasks[i].completeDate !== null) {
                $("#" + tasks[i].id).append('<td class="text-center">' + (tasks[i].completeDate.getMonth() + 1) + '/' + tasks[i].completeDate.getDate() + '/' + tasks[i].completeDate.getFullYear() + '</td>');
            } else {
                $("#" + tasks[i].id).append('<td class="text-center"></td>');
            }
            //add the trash and mail buttons
            $("#" + tasks[i].id).append('<td class="text-center"><button type="button" class="btn btn-danger btn-xs deletetask" alt="Delete the task" value="' + tasks[i].id + '"><span class="glyphicon glyphicon-trash"></span></button><a target="_blank" href="mailto:?body=' + tasks[i].note + '&amp;subject=' + tasks[i].title + '"><button type="button" class="btn btn-danger btn-xs emailtask" alt="Send an email" value="' + tasks[i].id + '"><span class="glyphicon glyphicon-envelope"></span></button></a></td>');

            //add the note thing
            $("tbody").append('<tr id="note-' + tasks[i].id + '" class="collapse"><td></td><td colspan="5"><div class="well"><h3>' + tasks[i].title + '</h3><div>' + tasks[i].note + '</div></div></td></tr>');

            //checks to see if we should hide this task or not 
            if (showOverdueOnly && (rowClass !== "danger")) {
                $('#' + tasks[i].id).hide();
            }
            if (hideCompletedTasks && tasks[i].completed) {
                $('#' + tasks[i].id).hide();
            }

        }
        //end of if that checks if the task has been deleted or not
    }
    //end of the for loop

    //disable/enable the delete completed tasks button
    var anyCompleted = false;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].completed && !tasks[i].deleted) {
            anyCompleted = true;
            break;
        }
    }
    if (anyCompleted) {
        $('#deleteCompletedTasks').replaceWith('<button type="button" class="btn btn-danger" id="deleteCompletedTasks"><span class="glyphicon glyphicon-trash"></span>&nbsp; Delete Completed Tasks</button>');
    } else {
        $('#deleteCompletedTasks').replaceWith('<button type="button" class="btn btn-danger" id="deleteCompletedTasks" disabled><span class="glyphicon glyphicon-trash"></span>&nbsp; Delete Completed Tasks</button>');
    }

    //re-render the overdue button to fix issues with clicking multiple times
    $('#overdue').replaceWith('<li id ="overdue"><a href="#"><span class="glyphicon glyphicon-fire"></span> Overdue</a></li>');

    //re-render the hide completed tasks button to fix issues with clicking multiple times
    $('#hidecompleted').replaceWith('<li id ="hidecompleted"><a href="#">Hide Completed Tasks</a></li>');

    //re-render the add task button to fix issues with clicking multiple times
    $('addtask').replaceWith('<button type="button" class="btn btn-success addtask"><span class="glyphicon glyphicon-plus"></span> Add Task</button>');

    //re-render the submit button to fix issues with the modal being weird
    $('button[type="submit"]').replaceWith('<button type="submit" class="btn btn-success btn-default pull-left"><span class="glyphicon glyphicon-off"></span> Submit</button>');

    //re-setsup all the event listeners again since we changed the page above
    setUpEventListeners();

}
//end of the function

//handles hwat happens when the user hits the delete button
let trashButtonFunc = function(value) {
    if (confirm("Are you sure?")) {
        tasks[value].deleted = true;
    }

    //re-render everything now that a change has been made
    renderTasks();

}

//handles what happens when the user checks the checkbox
let checkboxButtonFunc = function(value) {
    tasks[value].completed = !tasks[value].completed;

    if (tasks[value].completed) {
        tasks[value].completeDate = new Date();
    } else {
        tasks[value].completeDate = null;
    }

    //re-render everything now that a change has been made
    renderTasks();
}

let deleteButtonFunc = function() {
    var count = 0;
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].completed && (tasks[i].deleted === false)) {
            count++;
        }
    }

    var confirmMsg = "";
    if (count === 1) {
        confirmMsg = "Do you want to delete 1 task?";
    } else if (count > 1) {
        confirmMsg = "Do you want to delete " + count + " tasks?";
    }

    if (confirm(confirmMsg)) {
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].completed) {
                tasks[i].deleted = true;
            }
        }
    }

    //re-render everything now that a change has been made
    renderTasks();
}

let overdueButtonFunc = function() {
    showOverdueOnly = !showOverdueOnly;

    //re-render everything to account for the change
    renderTasks();
}

let hideButtonFunc = function() {
    hideCompletedTasks = !hideCompletedTasks;

    //re-render everything to account for the change
    renderTasks();
}

let addTaskFunc = function() {
    $('#myModal').modal('show');
}

let submitButton = function() {
    var dateGood = true;
    var titleGood = true;
    if ($('#task-title').val() === "") {
        alert("Task title is required.");
        titleGood = false;
    } else {
        titleGood = true;
    }
    var dueDate;
    var str = "";
    str = $('#due-date').val();
    if (str === "") {
        dueDate = null;
        dateGood = true;
    } else {
        var temp = new Date($('#due-date').val());
        if (isNaN(temp)) {
            alert("Check your date format.");
            dateGood = false;
        } else {
            dueDate = temp;
            dateGood = true;
        }
    }

    if (titleGood && dateGood) {
        //setting up the varaibles to create a new task with
        var id = tasks.length;
        var title = $('#task-title').val();
        var completed = false;
        var completeDate = null;
        var createdDate = new Date();
        var deleted = false;
        var note = $('#task-note').val();
        var newNote = note.replace("\n","<br>");
        var noteToUse = newNote.replace("\r", "<br>");


        tasks.push({
            id: id,
            title: title,
            dueDate: dueDate,
            completed: completed,
            completeDate: completeDate,
            createdDate: createdDate,
            deleted: deleted,
            note: noteToUse
        });

        $('#myModal').modal('hide');

        //reset the input field values so they don't retain the old stuff
        $('#task-title').val('')
        $('#due-date').val('');
        $('#task-note').val('');

    }
    renderTasks();
}

let setUpEventListeners = function() {
    //setup the trashbuttons event listeners
    $('.deletetask').on("click", function() {
        trashButtonFunc($(this).attr("value"));
    })

    //setup the checkbox's event listeners
    $('input[type="checkbox"]').on("click", function() {
        checkboxButtonFunc($(this).attr("value"));
    })

    //setup the delete completed tasks button event listeners
    $('#deleteCompletedTasks').on("click", function() {
        deleteButtonFunc();
    })

    //setup the overdue button event listeners
    $('#overdue').on("click", function() {
        overdueButtonFunc();
    })

    //setup the hide completed tasks button event listener
    $('#hidecompleted').on("click", function() {
        hideButtonFunc();
    })

    //setup the add task button event listener
    $('.addtask').on("click", function() {
        addTaskFunc();
    })

    //setup the submit button event listener 
    $('button[type="submit"]').on("click", function() {
        submitButton();
    });

}

//-------runs first as soon as the document is ready-------//
//wait until the document is ready and then render the tasks
$(document).ready(function() {
    renderTasks();
});
