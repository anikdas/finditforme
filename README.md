# Find Itfor Me
search posts on facebook pages.

#Demo

* [http://anikdas.com/finditforme/](http://anikdas.com/finditforme/)
* [anikdas.github.io/finditforme](anikdas.github.io/finditforme)

#Motivation

I was just learing AngularJS and in my learning process I thought why not build something that might be usefull. So I started building this WebApp. Facebook does not have any proper way to dig through the posts in pages. It often happen to us that we like a post on facebook and later on it becomes really hard to find that perticular post. So this is just an approach to make your effort in finding a _needle in a haystack_ easier.

#How does it work?

My WebApp uses facebook graph API v2.3. It asks you to login with Facebook just to generate a generic access token so that it can consume the API. Nothing more that your public profile details are asked and none of your details are stored in the server.

This app searches through the page timeline using _page username_ and the search _query_. You can search both forward and backwork. Search can be stopped by clicking the _stop_ button.

#How do I find username of a Facebook page?

BuzzFeed Video's Facebook page url looks something like this `https://www.facebook.com/BuzzFeedVideo?fref=ts`. So the username for the page would be `BuzzFeedVideo`. So username for any other page can be resolved from the url itself.

#Use cases

Now for example you want to find all the 9GAG.TV posts on 9GAG. Generally all 9GAG.TV posts have the word `tv` in the post. So if you write `9gag` (username of 9GAG page) in the _username_ box and `tv` in the _query_ box, the app will search through sets of 25 posts and will show the result. 

#Download

You can download the release 
* [zip](https://github.com/anikdas/finditforme/archive/v1.1.zip)
* [tar.gz](https://github.com/anikdas/finditforme/archive/v1.1.tar.gz)

Just create and App from [Facebook Developer](https://developers.facebook.com/apps/) and Replace the AppId in `controller.js` file.
