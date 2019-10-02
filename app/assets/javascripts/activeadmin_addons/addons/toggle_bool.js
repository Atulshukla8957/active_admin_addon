var initializer = function() {
  $('.toggle-bool-switch').click(function(e) {
    var boolSwitch = $(e.target);
    var model = boolSwitch.data('model');
    var objectId = boolSwitch.data('object_id');          
    var field = boolSwitch.data('field');
    var url = boolSwitch.data('url');
    var value = boolSwitch.data('value');
    var successMessage = boolSwitch.data('success_message');
    var data = { id: objectId };
    data[model] = {};
    data[model][field] = !value;
    if (model == "user"){
      var prevValue = $(this).hasClass('on');
      if (prevValue) {
      }else{
        var retVal = confirm("Are you sure you want to manual update?");
        if(retVal){
          var resVal = confirm("This changes can't be undone!");
          if (resVal) {
            $.ajax({
              url: url,
              data: data,
              dataType: 'json',
              headers : {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
              error: function() {
                var errorMsg = 'Error: Update Unsuccessful';
                alert(errorMsg);
              },
              success: function() {
                boolSwitch.data('value', !value);
                boolSwitch.addClass('on');
                if (!boolSwitch.hasClass('notify-success')) return;
                $(function() {
                  setTimeout(alert(successMessage), 500);
                });
              },
              type: 'PATCH',
            });
          }else{

          }
        }
        else{
        } 
      }
    }
    else{
      $.ajax({
        url: url,
        data: data,
        dataType: 'json',
        headers : {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        error: function() {
          var errorMsg = 'Error: Update Unsuccessful';
          alert(errorMsg);
        },
        success: function() {
          boolSwitch.data('value', !value);
          boolSwitch.toggleClass('on');
          if (!boolSwitch.hasClass('notify-success')) return;
          $(function() {
            setTimeout(alert(successMessage), 500);
          });
        },
        type: 'PATCH',
      });
    }  
  });
};


$(initializer);
$(document).on('turbolinks:load', initializer);
