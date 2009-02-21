/* STYLE CLASS/ID VARIABLES */
var highlightClassName = "groupHighlight";
var assignedClassName = "groupAssigned";
var activeTAClassName = "activeTA";

/* STATE VARIABLES */
var selectedGroups = [];
var selectedTA = -1;

/* Called when the User selects a TA. Only one TA should be active at only give time. */
function focus_ta(ta_id) {
  
  // 2 cases:
  //      a. Select a new TA; selectedTA != newTA
  //      b. Deselect TA; selectedTA == newTA
  
  var newTA = $('ta_'+ta_id);
  
  // Case a
  if (selectedTA != ta_id) {
    
    // activeTA is a class because id contains the ta_id value
    // $$ returns an array
    var activeTA = $$('.activeTA');
    if (activeTA.length == 1) // If a TA has already been selected, i.e. there is an active TA
      activeTA[0].removeClassName(activeTAClassName);
    newTA.addClassName(activeTAClassName);
    selectedTA = ta_id;
    
  } else { // Case b
    
    newTA.removeClassName(activeTAClassName);
    selectedTA = -1;
    
  }
  
}

/* Called when a user clicks on a group. Give it a highlight colour to indicate selection. */
function focus_group(group_id) {
  
  var group = $('group_'+group_id);
  
  if (group.hasClassName(highlightClassName)) { // Deselecting 
    
    group.removeClassName(highlightClassName);
    removeSelected(group_id);
      
  } else { // Selecting
    
    group.addClassName(highlightClassName);
    selectedGroups.push(group_id);
    
  }
  
}

/* Helper method: removes the given group from the array of selected groups */
function removeSelected(group_id) {
  
  for (var i=0; i < selectedGroups.length; ++i)
    if (selectedGroups[i] == group_id)
      selectedGroups.splice(i, 1);
  
}

/* Toggle the groups that have been assigned the given TA */
function toggleTA(ta_id) {
  
}

function assign_ta_to_students(input) {
  
  /*
     XMLHttpRequest (XHR) is away of making requests to the server (behind the browser's back--so that it's not reloaded), retreiving the server's response and passing it to a JavaScript function to handle the response.
  */
  new Ajax.Request('/checkmark/ta_assignments/assign/', {
    
    // While the request is being processed, allow the page to be available to be interacted with
    asynchronous: true, 
    evalScripts: true,
    
    onSuccess: function(request) {
      
      data = request.responseText.evalJSON();
      
      if (data.status == 'OK') {
        
        var ta = $('ta_'+selectedTA);
        var countContainer = ta.childElements()[0];
        
        // Deselect the currentTA in preparation for next assignment
        ta.removeClassName(activeTAClassName);
        
        // Mark the groups as assigned
        for (var i = 0; i < selectedGroups.length; i++) {
          
          var group = $('group_'+selectedGroups[i]);
          group.removeClassName(highlightClassName);
          group.addClassName(assignedClassName);
          countContainer.update(parseInt(countContainer.innerHTML) + 1);
          
        }
        selectedGroups = [];
        selectedTA = -1;
        
        // TODO: Update TA count on server side
          
      } else if (data.status == 'error') {
        
        alert("Errors!");
        // TODO: show error to user
          
      }
        
    },
    
    onFailure: function(request) {
         alert('Server communications failure:  this value was not updated.');
    },
    
    parameters: {
      'ta_id': selectedTA, 
      'selected_groups': selectedGroups.toJSON(), 
      'authenticity_token':  encodeURIComponent(authenticity_token)
    }
      
  }); // Ajax request
  
}
