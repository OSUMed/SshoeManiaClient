// Code styled from lecture: Created AJAX function to accomplish update
// functionality. Basically the href makes a call to this function with the
// id parameter. It does a PUT method and then grabs the data by the id of the
// form. It uses the .serialize() method which makes the form into a query
// string and is sent to a server in a Ajax request: https://api.jquery.com/serialize/
// After we use the window.location object's method replace to return back to
// the page where we first clicked the update href:

// Sources for Update supplement page idea: 340 Introduction to Databases Class
// Lectures: Week 8: Learn using JavaScript and NodeJS. College: Oregon State
// University:
// https://canvas.oregonstate.edu/courses/1810923/pages/week-8-learn-using-javascript-and-nodejs?module_item_id=20621587


function updateProduct(id){
    console.log("deletepaymentMethod I am running"+id)
    $.ajax({
      url: '/api/products/' + id,
      type: 'PUT',
      data: $('#update_product').serialize(),
      success: function(result){
        window.location.replace("/products");
      }
    })
  };
