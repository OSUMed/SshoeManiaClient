// Code styled from lecture: Created AJAX function to accomplish delete
// functionality. Basically when we press the button we call this function. The
// button accepts the id parameter. This Ajax function will then send a delete
// request and if it is successful, it will reload the current page using the
// window location object and its' reload method with the true argument:

// Sources for Update supplement page idea: 340 Introduction to Databases Class
// Lectures: Week 8: Learn using JavaScript and NodeJS. College: Oregon State
// University:
// https://canvas.oregonstate.edu/courses/1810923/pages/week-8-learn-using-javascript-and-nodejs?module_item_id=20621587


function deleteproduct(id){
  $.ajax({
    url: '/api/products/' + id,
    type: 'DELETE',
    success: function(result){
      window.location.reload(true);
    }
  })
};
