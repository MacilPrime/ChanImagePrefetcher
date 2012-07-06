// ==UserScript==
// @name         Chan Image Prefetcher
// @namespace    macil
// @description  Prefetches images.
// @author       Macil
// @include      http*://boards.4chan.org/*/*
// @updateURL    https://raw.github.com/Macil/ChanImagePrefetcher/master/ChanImagePrefetcher.user.js
// @homepage     http://macil.github.com/ChanImagePrefetcher/
// @version      1.0
// @icon         http://i.imgur.com/aUTYg.png
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function dcmain() {
    function prefetchPostImage(posttag) {
        var image = $(posttag).children(".file").find(".fileThumb");
        if(image.length==0)
            return;

        var imageurl = image.attr("href");
	$("<img/>")
	    .attr("src",imageurl)
	    .appendTo(document.head);
    }

    function prefetchImages(context) {
        $(".post", context).each(function() {
            prefetchPostImage(this);
        });
    }

    function setupListener() {
        $(document).on("DOMNodeInserted", ".thread", function(event) {
            var tag = $(event.target);
            if(tag.hasClass("postContainer")) {
                prefetchImages(tag);
            }
        });
    }

    setupListener();
    prefetchImages(document);
}

addJQuery(dcmain);
