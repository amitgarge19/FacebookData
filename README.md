#facebookdata

	This website will show you your facebook's basic information, posts made by you on facebook.
	I have used facebook graph api to get facebook's information and accessed using jquery-ajax.

##Contents
	1) Profile.html - The 'home page'
	2) Feeds.html
	3) css files
		i)Profile.css
		ii)Feeds.css
	4)images
		i)icon file
	5)js
		i)FacebookData.js

###Note: 
	Please update 'var token' value in 'FacebookData.js' file to your facebook access token.

##Profile.html
	This file contains basic information as uploaded by user on facebook.
	It contains: Name, Profile picture, Birthday, Current City, Work Place, Education, Email ID, Relationship status.

	You can go to Feeds page to check the posts made by the user on the facebook through navigation bar(and click on 'Feeds')

##Feeds.html
	This file contains posts made by you in chronological order (as facebook graph api will provide only ~25 posts so the count of the same on this page will differ.)
	
	It contains: Message/caption, story, date-time of the post, likes-comments-shares' count, image(if any).
	
##css files
	This folder contains necessary css files used by html pages.
	Profile.html --css file -- Profile.css
	Feeds.html --css file -- Feeds.css

##images
	This folder contains icon file used by both html pages only.

##js files
	This folder contains the only js file 'FacebookData.js' which is used by both the html files.
