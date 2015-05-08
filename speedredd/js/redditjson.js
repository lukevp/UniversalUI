 
/**
* Return time since link was posted
* http://stackoverflow.com/a/3177838/477958
**/
function htmlOutput(html) {
    html += '</ul>';

    $('#itemview').html($('#itemview').html() + html);
    //console.log(html);
}
function timeSince(date) {
var seconds = Math.floor(((new Date().getTime()/1000) - date))

var interval = Math.floor(seconds / 31536000);

if (interval >= 1) {
  if(interval == 1) return interval + " year ago";
  else
    return interval + " years ago";
}
interval = Math.floor(seconds / 2592000);
if (interval >= 1) {
  if(interval == 1) return interval + " month ago";
  else
    return interval + " months ago";
}
interval = Math.floor(seconds / 86400);
if (interval >= 1) {
  if(interval == 1) return interval + " day ago";
  else
    return interval + " days ago";
}
interval = Math.floor(seconds / 3600);
if (interval >= 1) {
  if(interval == 1) return interval + " hour ago";
  else
    return interval + " hours ago";
}
interval = Math.floor(seconds / 60);
if (interval >= 1) {
  if(interval == 1) return interval + " minute ago";
  else
    return interval + " minutes ago";
}
return Math.floor(seconds) + " seconds ago";
}

// todo: attach to string prototype??
function startswith(string1, string2)
{
    if (string1.substr(0,string2.length) === string2) { return true; }
    return false;
}
function lstrip(string1, string2)
{
    if (startswith(string1, string2))
    {
        return string1.substr(string2.length);
    }
    return string1;
}

// TODO: make this into a closure.
var currentItems = [];
var saved_items = {};
var viewed_items = {};
var subreddit = "";
var afterTag = ""; // used to query the next set of data from the subreddit.

/*associativeArray["one"] = "First";
associativeArray["two"] = "Second";
associativeArray["three"] = "Third";*/

function list_subreddit()
{
    $('#showmore').show();
    subreddit = $('#subreddit').val(); // TODO: verify is valid subreddit before continuing.
    
    fullurl = 'http://api.reddit.com/r/' + subreddit + '.json';
    if (afterTag != "")
    {
        fullurl += "?after=" + afterTag;
    }
    $.getJSON(fullurl, function(json){
    
        afterTag = json.data.after;
        var listing = json.data.children;
        var html = '<ul class="linklist">\n';

        for(var i=0, l=listing.length; i<l; i++) {
            var obj = listing[i].data;
            var author =    obj.author;
            var votes     = obj.score;
            var title     = obj.title;
            var subtime   = obj.created_utc;
            var thumb     = obj.thumbnail;
            var subrdt    = "/r/"+obj.subreddit;
            var redditurl = "http://www.reddit.com"+obj.permalink;
            var subrdturl = "http://www.reddit.com/r/"+obj.subreddit+"/";
            var exturl    = obj.url;

            var timeago = timeSince(subtime);

            if(obj.thumbnail === 'default' || obj.thumbnail === 'nsfw' || obj.thumbnail === '')
                thumb = 'img/default-thumb.png';

            // transform imgur links to direct images.
            // remove protocol.
            var processedurl = exturl;
            processedurl = lstrip(processedurl, "http://");
            processedurl = lstrip(processedurl, "https://");
            processedurl = lstrip(processedurl, "www.");
            processedurl = lstrip(processedurl, "i.");
            if (startswith(processedurl, "imgur.com"))
            {
                // TODO: handle /gallery/
                thumb = "https://i." + processedurl + ".jpg";
                exturl = thumb;
                //thumb = exturl;s
            }

            html += '<li class="clearfix">\n';
            html += '<div class="linkdetails"><h2>'+title+'</h2>\n';
            html += '<a href="'+exturl+'" class="blubtn" target="_blank"><img src="'+thumb+'" class="thumbimg"></a>\n';
            html += '<p class="subrdt">posted to <a href="'+subrdturl+'" target="_blank">'+subrdt+'</a> '+timeago+'</p>';
            html += '<p><a href="'+exturl+'" class="blubtn" target="_blank">visit link</a> - <a href="'+redditurl+'" class="blubtn" target="_blank">view on reddit</a></p>';
            html += '</div></li>\n';
        } // end for{} loop

        htmlOutput(html);

    }); // end getJSON()

    return false;
}