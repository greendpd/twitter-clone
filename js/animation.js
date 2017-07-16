var aGlobal = "hereIam";
$(document).ready(function() {
  hideCountSubmit();
  var tweetComposeSize = $('#tweet-content>textarea.tweet-compose').height();
  var charCountColor = $('#char-count').css('color');
  var NAME = 'Max';
  var USERNAME = '@GreedyGoblin';



  $('.tweet-actions').hide();
  $('.stats').hide();
  $('.reply').hide();

  $('#profile-summary p')[0].innerHTML=NAME;

  //Listeners
  $('.tweet').on('mouseenter mouseleave', this, function(e) {
    $(this).find('.tweet-actions').fadeToggle();
  });

  $('.tweet').on('mouseleave', this, function(e) {
    $(this).find('.stats').slideUp();
    $(this).find('.reply').slideUp();
  });

  $('.tweet').on('click', this, function(e) {
    $(this).find('.stats').slideDown();
    $(this).find('.reply').slideDown();
  });

  $('#tweet-content>textarea.tweet-compose').click(function(event) {
    showCountSubmit();
    doubleInputSize();
  });


  $('textarea.tweet-compose').blur(function(event) {
    if ($(this).val() === "") {
      hideCountSubmit();
      resetInputSize($(this));
    }
  });

  $('div.tweet>.content').on('click', '.action-favorite', function(e) {
    //Tree traversal--moving from the clicked icon to the favorites indicator
    incrementFavorite(this);
  });

  $('textarea.tweet-compose').on('click', this, function(event) {
    doubleInputSize($(this));
  });



  $('#tweet-submit').on('click', this, function(e) {
    createTweet();
  });


  $('#tweet-content>textarea.tweet-compose').on('keyup keydown', this, updateCharLeft);




  // functions
  function incrementFavorite(clicked) {
    //Tree traversal--moving from the clicked icon to the favorites indicator
    var parents = $(clicked).parentsUntil('.content');
    var uncle = $(parents[parents.length - 1]).nextAll('.stats')[0];
    var counterTag = $(uncle).find('.num-favorites')[0];
    counterTag.innerHTML = ++counterTag.innerHTML;
  }


  function hideCountSubmit() {
    $('#char-count').hide();
    $('#tweet-submit').hide();
  }

  function showCountSubmit() {
    $('#char-count').show();
    $('#tweet-submit').show();
  }

  function updateCharLeft() {
    var charactersLeft = 140 - $('#tweet-content>.tweet-compose').val().length;

    if (charactersLeft < 0) {
      $('#tweet-submit')[0].disabled = true;
      charactersLeft = 0;
    } else if (charactersLeft <= 10) {
      $('#tweet-submit')[0].disabled = false;
      $('#char-count').css('color', 'red');
    } else {
      $('#tweet-submit')[0].disabled = false;
      $('#char-count').css('color', charCountColor);
    }
    $('#char-count').text(charactersLeft);
  }

  function doubleInputSize(obj) {
    obj = obj || $('#tweet-content>.tweet-compose'); //defaults to main tweet box
    obj.height(2 * tweetComposeSize);
  }

  function resetInputSize(obj) {
    obj = obj || $('#tweet-content>.tweet-compose');
    obj.height(tweetComposeSize);
  }

  function createTweet() {
    var theTweet = $("<div class='tweet'></div>");
    addContent(theTweet, $('#tweet-content>.tweet-compose').val());
    $('#stream').prepend(theTweet);
    addListeners(theTweet);
    $('#tweet-content>.tweet-compose').val("");
    updateCharLeft();
    resetInputSize();
    hideCountSubmit();
  }

  function addContent(aTweet, tweetText) {
    var content = $('<div class="content"></div>');
    var img = $('<img class="avatar" src="img/alagoon.jpg" />');
    var strong = $('<strong class="fullname">' + NAME + '</strong>');
    var username = $('<span class="username">' + USERNAME + '</span>');
    var tweetContent = $('<p class="tweet-text">' + tweetText + '</p>');
    var tweetActions = writeTweetActions();


    $(content).append(img);
    $(content).append(strong);
    $(content).append(username);
    $(content).append(tweetContent);
    $(content).append(tweetActions);
    $(content).append(writeNewStats());
    $(content).append(writeReply());

    $(aTweet).append(content);
  }

  function writeTweetActions() {
    var toRet = $('<div class="tweet-actions"></div>');
    var $ul = $('<ul></ul>');
    $($ul).append($('<li> Reply</li>').prepend('<span class="icon action-reply"> </span>'));

    $($ul).append($('<li> Retweet</li>').prepend($('<span class="icon action-retweet"></span>')));

    $($ul).append($('<li> Favorite</li>').prepend($('<span class="icon action-favorite"></span>')));

    $($ul).append($('<li> More</li>').prepend($('<span class="icon action-more"></span>')));

    toRet.append($ul);
    return toRet;
  }

  function writeNewStats() {
    var $toRet = $('<div class="stats"></div>');

    var $currDiv = $('<div class="retweets"></div>');
    $($currDiv).append($('<p class="num-retweets">0</p>'));
    $($currDiv).append($('<p>RETWEETS</p>'));
    $($toRet).append($($currDiv));

    $currDiv = $('<div class="favorites"></div>');
    $($currDiv).append($('<p class="num-favorites">0</p>'));
    $($currDiv).append($('<p>FAVORITES</p>'));
    $($toRet).append($($currDiv));

    $currDiv = $('<div class="users-interact"></div>');
    $($currDiv).append($('<div></div>'));
    $($toRet).append($($currDiv));

    $currDiv = $('<div class=time>Just Now</div>');
    $($toRet).append($currDiv);

    return $toRet;
  }

  function writeReply() {
    var $toRet = $('<div class="reply"></div>');
    $($toRet).append($('<img class="avatar" src="img/alagoon.jpg" />'));
    $($toRet).append($('<textarea class="tweet-compose" placeholder="Reply to ' + USERNAME + '"></textarea>'));

    return $toRet;
  }


  function addListeners(tweet){
    $(tweet).find('.tweet-actions').hide();
    $(tweet).find('.stats').hide();
    $(tweet).find('.reply').hide();

    $(tweet).on('mouseenter mouseleave', this, function(e) {
      $(this).find('.tweet-actions').fadeToggle();
    });

    $(tweet).on('mouseleave', this, function(e) {
      $(this).find('.stats').slideUp();
      $(this).find('.reply').slideUp();
    });

    $(tweet).on('click', this, function(e) {
      $(this).find('.stats').slideDown();
      $(this).find('.reply').slideDown();
    });

    $(tweet).find('.content').on('click', '.action-favorite', function(e) {
      //Tree traversal--moving from the clicked icon to the favorites indicator
      incrementFavorite(this);
    });

    $(tweet).find('textarea.tweet-compose').on('click', this, function(event) {
      doubleInputSize($(this));
    });

    $(tweet).find('textarea.tweet-compose').blur(function(event) {
      if ($(this).val() === "") {
        hideCountSubmit();
        resetInputSize($(this));
      }
    });

  }






});
