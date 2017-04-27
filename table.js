
//Some cool console tricks
console.info('Some Info:',  'Cool look');
//console.error('Some Action:', 'Cool Action');


/*Search in table code start*/
$("#searchText").on("keyup", function() {    
    var searchText = $(this).val().toLowerCase().trim();
    $(".your-class").find("tbody tr").each(function (index) {
        $row = $(this);
        $row.show();
        var found = false;
        $row.find("td").each(function () {
            $td = $(this);
            var tdText = '';
            if ($td.find('input').length) {
                tdText = $td.find('input').val();
            }
            else{
                tdText = $td.text().toLowerCase().trim();
            }
            if(tdText && tdText.search(searchText) >=0){
                found = true;
                return;
            }
        });
        if (found === true) {
            $row.show();
        }
        else {
            $row.hide();
        }
  });
});

$("#searchText").on("focus", function() {
        $(this).animate({
                width: '600px'
        }, "slow");
});

$("#searchText").on("blur", function() {
         $(this).animate({
                width: '200px'
        });
});

/*Search in table code end*/



/*Realtime progress bar code start*/
$('.realtime-pbar').click(function(){
  $('#bulk-action-progbar').data("aria-valuenow",1);
  $('#bulk-action-progbar').css("width",'1%');
  var percentComplete = 0;
  $.ajax({
    method: 'post',
    url: 'yoururl',
    data:{'name':'shahzad',email:'email@gmail.com'},
    xhr: function(){
        var xhr = new window.XMLHttpRequest();
        //Upload progress
        xhr.upload.addEventListener("progress", function(evt){
          //console.log("in Upload progress");
          console.log("Upload Done");
        }, false);
        //Download progress
        xhr.addEventListener("progress", function(e){
          console.log("in Download progress");
          if (e.lengthComputable) {
            //percentComplete = (e.loaded / e.total) * 100;
            percentComplete = parseInt( (e.loaded / e.total * 100), 10);
            console.log(percentComplete);
            $('#bulk-action-progbar').data("aria-valuenow",percentComplete);
            $('#bulk-action-progbar').css("width",percentComplete+'%');

          }
          else{
             console.log("Length not computable.");
             console.log("If lengthComputable is false within the XMLHttpRequestProgressEvent, that means the server never sent a Content-Length header in the response.Solution for PHP: $startTime = time(); your code or sleep(10); $endTime = time() - $startTime; header('Content-Length: '.strlen($endTime)); now it will work")
          }
        }, false);
        return xhr;
    },
    success: function (res) {
        var obj = $.parseJSON(res);
        console.log(obj)
  }
});
});
/*Realtime progress bar code end*/



/*Select all checkboxes code start*/
var dataArr = [];
$('.btn-primary').click(function(){
   var checkedCheckboxes = $('.your-class tr:visible :checkbox:checked');
   console.log("Total Selected Checkboxes:",checkedCheckboxes.length);
    var i = 0;
    $.each(checkedCheckboxes, function(index, input){       
      var id = input.value;        
      dataArr[i] = {};
      dataArr[i]['id'] = id;
      console.log(dataArr[i]);
      i++;  
    });
});

$('.chk-toggle-all').click(function() {
  //$('.your-class').find('input[type=checkbox]').prop('checked',false);
  var checkedStatus = this.checked;
  $('.your-class tbody tr:visible').find('td:first :checkbox')
    .each(function() {
      $(this).prop('checked', checkedStatus);
    });
});
/*Select all checkboxes code end*/



$(function(){


//Remove a specific row from table with data attribute
//var $row = $('.transaction-list tbody tr[data-id="' + v.$id + '"]');
//$row.remove();


  /*Hide and show div code start*/
      $('.hide-element').click(function(){
      $('.panel-info').animate({
      },'1000').hide('slow');
      $(".show-element").show('slow');
    });

    $('.show-element').click(function(){
      $('.panel-info').animate({
      },'1000').show('slow');
      $(".show-element").hide('slow');
    })

  /*Hide and show div code end*/

/*Copy to clipboard code start*/

/*var clipboard = new Clipboard('.text1');
  clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    e.clearSelection();
  });

  clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
  });*/


/*var clipboard2 = new Clipboard('.text2');
  clipboard2.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);
    e.clearSelection();
  });

  clipboard2.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
  });*/


  /*Copy to clipboard code end*/

  /*Bootstrap Switch Buttons with jquery notify plugin start*/
  $("[name='my-checkbox']").bootstrapSwitch();
  $('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', 
      function(event, state) {
        var beforeUpdateState = state;          
          var item = $(this);
          var id = item.data('id');
          console.log(state);
          //item.bootstrapSwitch(toggleState, true)

          $.post('your-file.php',{id:id,status:state})
          .done(function(res){
            console.log('res',res);
            if(res=='notupdated'){
              item.bootstrapSwitch('toggleState', beforeUpdateState);
               $.notify("Request not completed!", {
                        className:'error',
                        globalPosition: 'right middle'
                  });
            }else{
              $.notify("Request completed successfully!", {
                        className:'success',
                        globalPosition: 'right middle'
                  });
            }
          });
  });
  /*Bootstrap Switch Buttons with jquery notify plugin start*/


});