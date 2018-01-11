/*The js file responsible for loading 
*basic information and 
*posts made by the user
using facebook graph api and jquery ajax*/

/*After loading the document ready function will be invoked*/
$(document).ready(function() {

  //Initially, Result div is hidden and loader will be displayed*/
  
  $("#result").hide();
  $("#loader").show();

  /*Facebook access token*/
  var token = "EAACEdEose0cBADFYvrSxcr4wyWptcApI2Vrq2d9z8tu1f3F55UC8QmzilTyi49zoUuNfMBT7hImEbOe0PUT3mxeHTJzQHdT4ZCNxpIe9nZAJDHZCMLczEOenFhPZBZCTYz0ruWBjjHVSbib8eFIyJOsxjQbCErMZAvzasdpyt6dTcZAErR65jFPopjlqGPZCeUIZD";

  /*Function to get feeds/posts made by the user on facebook*/
  function getfeed(){
    //call to facebook graph api with ajax function
    $.ajax('https://graph.facebook.com/me/posts?access_token=' + token + "&fields=caption,created_time,message,story,full_picture,attachments.limit(100),likes,comments,shares",{
        //The success function
        success: function(response) {
          
          //the result div will be shown
          $("#result").show();
          var d, i;

          /*Here, three vaiables have three divs which are represented with different design;
          * The datetime div is responsible for showing the time of the respective post.
          * posts1 and posts2 will be used alternatively to show a post.
          */
          var datetime = "<div class='separator text-muted'><time id='time'></time></div>";
          var posts1 = "<article class='panel panel-primary' id='article' style='display:inline-block;max-width:500px;'><div class='panel-heading icon'><i class='glyphicon glyphicon-plus'></i></div><div class='panel-heading'><h2 class='panel-title' id='story'>Status Updated</h2></div><div class='panel-body' id='message'></div><div class='panel-body' id='pic_div'><img class='img-responsive img-rounded' src='#' id='picture' width=350 height=150></div><div class='panel-footer'><span class='glyphicon glyphicon-thumbs-up'></span><span id='likescount'></span><i class='fa fa-comment' aria-hidden='true'></i><span id='commentscount'></span><i class='fa fa-share' aria-hidden='true'></i><span id='sharescount'></span></div></article>";
          var posts2= "<article class='panel panel-success' style='display:inline-block;max-width:500px;'><div class='panel-heading icon'><i class='glyphicon glyphicon-plus'></i></div><div class='panel-heading'><h2 class='panel-title' id='story'></h2></div><div class='panel-body' id='message'></div><div class='panel-body' id='pic_div'><img class='img-responsive img-rounded' src='#' id='picture' width=350 height=150></div><div class='panel-footer'><span class='glyphicon glyphicon-thumbs-up'></span><span id='likescount'></span><i class='fa fa-comment' aria-hidden='true'></i><span id='commentscount'></span><i class='fa fa-share' aria-hidden='true'></i><span id='sharescount'></span></div></article>";

          //for loop ti use datetime, posts1, posts2 for all the posts coming through the graph api
          //In this, the div with id="tm" is appended with one of the divs i.e. datetime, posts1 or posts2
         for (i = 0; i < response.data.length; i++){
            $("#tm").append(datetime);

            //To use posts1 and posts2 alternatively
            if (i % 2 == 0) 
               $("#tm").append(posts1);
            else
               $("#tm").append(posts2);


            $("#time").attr('id', 'time' + i); //Change the attribute 'id' by appending iteration number
            //'created_time' format is changed by calling the function fbDateFix()
            d = fbDateFix(response.data[i].created_time);

            //'d' value which is returned by the function is assigened to div of id 'time(i)'
            $("#time" + i).text(d);

            //The availablity of each field in the 'response' is checked with 'hasOwnProperty()'
            //If the response has the field then an only then the response is assigned to the respective field
            $("#story").attr('id', 'story' + i);

            if (response.data[i].hasOwnProperty('story'))
              $("#story" + i).html("<strong>" + response.data[i].story + "</strong>");

            /*
            *Some responses may contain only 'message field', 'caption field' or both or unavailability of both
            * so the assignment of the same is decided here
            */
            $("#message").attr('id', 'message' + i);
            if (response.data[i].hasOwnProperty('message')) {
              $("#message" + i).text(response.data[i].message);

            if (response.data[i].hasOwnProperty('caption'))
              $("#message" + i).append("<br/>" + response.data[i].caption);
        
            } 
            else if (response.data[i].hasOwnProperty('caption'))
              $("#message" + i).append("<br/>" + response.data[i].caption);


            $("#picture").attr('id', 'picture' + i);
            $("#pic_div").attr('id', 'pic_div' + i);

            if (response.data[i].hasOwnProperty('full_picture'))
              $("#picture" + i).attr('src', response.data[i].full_picture);
          
            else if (response.data[i].hasOwnProperty('attachments.data' + [i] + '.media.image.src'))
                $("#picture" + i).attr('src', response.data[0].attachments.data[0].media.image.src);
            else
               $("#pic_div" + i).hide();

             /* "Likes, comments and shares" count is displayed by the following*/
            $("#likescount").attr('id', 'likescount' + i);
              if (response.data[i].hasOwnProperty('likes'))
                $("#likescount" + i).html("&nbsp;" + response.data[i].likes.data.length + "&nbsp;");
              else
                $("#likescount" + i).html("&nbsp;" + 0 + "&nbsp;");

              $("#commentscount").attr('id', 'commentscount' + i);
              if (response.data[i].hasOwnProperty('comments'))
                $("#commentscount" + i).html("&nbsp;" + response.data[i].comments.data.length + "&nbsp;");
              else
                $("#commentscount" + i).html("&nbsp;" + 0 + "&nbsp;");

              $("#sharescount").attr('id', 'sharescount' + i);
              if (response.data[i].hasOwnProperty('shares'))
                $("#sharescount" + i).html("&nbsp;" + response.data[i].shares.count + "&nbsp;");
              else
                $("#sharescount" + i).html("&nbsp;" + 0 + "&nbsp;");

        }
        /*At the last of all the posts "That is all" is displayed by using following code*/
         if (i == response.data.length)
            $("#tm").append("<article class='panel panel-info panel-outline'><div class='panel-heading icon' style='background-color:##4CAF50'><i class='glyphicon glyphicon-info-sign'></i></div><div class='panel-body'>That is all.</div></article>");
      },
      /*Before sending the query loader will be displayed and 
      * after completing the process of getting response 
      * the loader will be hidden
      */
      beforeSend : function(){
        $('.loader').show();

      },          
      complete : function(){
        $('.loader').hide();
      }
      });//End of ajax()
    } //End of getFeeds()

    /*The fbDateFix()*/
    var fbDateFix = function(date) {
      //here, the time will be converted into GMT(or UTC) +05:30 time format (i.e. Indian Standard Time)
    var local = new Date(date.replace(/-/g, '/').replace('T', ' ').replace('+0000', ''));
    local.setSeconds(local.getSeconds() + 19800); //This 19800 sec.= 05:30hrs

    //Before sending the final time to the calling function we'll prepend 0 to date, month number,hours and minutes
    var final = padZero(+local.getDate()) + "-" + padZero(+local.getMonth() + 1) + "-" + local.getFullYear() + " at " + padZero(+local.getHours()) + ":" + padZero(local.getMinutes());

    return final; //It will only send the date as  "DD-MM-YYYY at HH:MM" (time is in 24 hrs format)
  }

  var padZero = function(t) {
    if (t < 10)     //It will pad 0 to only those numbers which are less than 10
      return '0' + t;

    return t;       // It will return the number after padding with 0 to calling function
  }

  /*Function to get basic information about the user*/
  function getBasicInformation()
    {
      /*This information will be displayed in the "Profile.html" file.*/

      $("#result").hide();
      //call to facebook graph api with ajax function
      $.ajax("https://graph.facebook.com/me?access_token=" + token +"&fields=name,birthday,location,education,work,email,relationship_status,picture.type(large)",{

        //The success function
        success: function(response){
          $("#result").show();

          $("#head_name").append(response.name);//This field is in the file "Feeds.html" as "Posts by <name_of_the_user>" 

          $("#name").text(response.name); 

          /*
            * If a field is unavailble due to privacy concern of the user 
            *it will display the message by calling "showHidden()"
          */
          if (response.hasOwnProperty('birthday'))
            $("#DOB").text(response.birthday);    
          else
            showHidden("#DOB");

          if (response.hasOwnProperty('location'))
            $("#CurrentCity").text(response.location.name);
          else
            showHidden("#CurrentCity");

          if (response.hasOwnProperty('education'))
            $("#Education").text(response.education[0].school.name);
          else
            showHidden("#Education");

          if (response.hasOwnProperty('work'))
            $("#WorkPlace").text(response.work[0].employer.name);
          else
            showHidden("#WorkPlace");

          if (response.hasOwnProperty('email'))
            $("#EmailID").text(response.email);
          else
            showHidden("#EmailID");

          if (response.hasOwnProperty('relationship_status'))
            $("#Relationshipstatus").text(response.relationship_status);
          else
            showHidden("#Relationshipstatus");

          $("#ProfilePicture").attr({
            src: response.picture.data.url,
            alt: response.name
          });
      },
      //the error function
      error: function(request, errorType, errorMessage) {
        alert("Invaid Access Token");
      },
      /*
        *Before sending the query loader will be displayed and 
        * after completing the process of getting response 
        * the loader will be hidden
      */
      beforeSend : function(){
        $('.loader').show();

      },          
      complete : function(){
        $('.loader').hide();
        $("#result").show();
      }

    });//End of ajax()
  }//End of getBasicInformation()

  /*Some fields are made hidden by the user for the privacy concern are not available in the response
  *So this function will display the message as "Hidden or unavailable" in red color.*/
  function showHidden(id) {
    $(id).css("color", "#ff0000");
    $(id).text("Hidden or unavailable");
  }


/*The calling of the above functions*/ 
getBasicInformation();
getfeed();
});//End of document.ready() function