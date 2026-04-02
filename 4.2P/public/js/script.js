const clickMe = () => {
    // This is optional if we just use the modal trigger
    console.log("Button clicked!");
}

const submitForm = () => {
    let formData = {};
    formData.first_name = $('#first_name').val();
    formData.last_name = $('#last_name').val();
    formData.password = $('#password').val();
    formData.email = $('#email').val();
    console.log("Form Data Submitted: ", formData);
    
    // Alert the user that data is submitted
    alert("Thanks for registering, " + formData.first_name + "! Check console for submitted data.");
    
    // Close the modal
    var instance = M.Modal.getInstance($('#modal1'));
    instance.close();
}

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s12 m4 center-align">' +
            '<div class="card hoverable"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.image + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">Author: ' + item.link + '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text">' + item.description + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend);
    });
}

const fetchBooks = () => {
    $.get('/api/books', (response) => {
        if(response.statusCode === 200) {
            addCards(response.data);
        }
    });
}

$(document).ready(function(){
    // Initialize Materialize components
    $('.materialboxed').materialbox();
    $('.modal').modal();

    $('#formSubmit').click(() => {
        submitForm();
    });

    $('#clickMeButton').click(() => {
        clickMe();
    });

    // Fetch and display cards
    fetchBooks();
});
