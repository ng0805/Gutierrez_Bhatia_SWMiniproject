# -*- coding: utf-8 -*-
"""miniproj.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1J0NEQ0fjH2hVMB-8nq6haVtVrNL11R-c
"""

import requests
response = requests.get("https://randomfox.ca/floof")

fox = response.json()
print(fox['image'])

!pip install tweepy --upgrade
!pip install configparser
!pip install pandas
!pip install --upgrade tweepy

# For sending GET requests from the API
import requests
# For saving access tokens and for file management when creating and adding to the dataset
import os
# For dealing with json responses we receive from the API
import json
# For displaying the data after
import pandas as pd
# For saving the response data in CSV format
import csv
# For parsing the dates received from twitter in readable formats
import datetime
import dateutil.parser
import unicodedata
#To add wait time between requests
import time

import tweepy 
api_key = 'kzpMI81MuaDXpVIYfbDGGN6rw'
api_key_secret = 'iZDWXYq6PZUa5sDOPNtv8g2tMiXActCJOzJJr99JptulkWBFFe'
access_token = '1568769599771971584-qBffkygf2rzveFGQ5eSLqnCgmwwJGd'
access_token_secret = 'SIRdNbivIoxhTbR285qBpJDkLWfbyKbl1MBLrMRtcdyry'
beare = "AAAAAAAAAAAAAAAAAAAAAOsChAEAAAAAD%2BbZGx33y7SDjqQm3eh3AlRl67U%3DYNi70BhCeJBoVy534xnTRq1jri1On2tJGJWYX3OnsPZbf0hPg3"
my_api_key = "kzpMI81MuaDXpVIYfbDGGN6rw"
my_api_secret = "iZDWXYq6PZUa5sDOPNtv8g2tMiXActCJOzJJr99JptulkWBFFe"
#Client = tweepy.Client(bearer_token= beare)

response2 = Client.get_users(usernames = 'nananmjk')
if (response2.data == None):
  userID = "User not found"
else:
  obj = response2.data[0]
  userID = obj.id
print(userID)

# import tweepy

# your Twitter API key and API secret
my_api_key = "kzpMI81MuaDXpVIYfbDGGN6rw"
my_api_secret = "iZDWXYq6PZUa5sDOPNtv8g2tMiXActCJOzJJr99JptulkWBFFe"
# authenticate
#auth = tw.OAuthHandler(my_api_key, my_api_secret)
#api = tw.API(auth, wait_on_rate_limit=True)
#user = api.get_user(screen_name='dak')
# calling the api 
#api = tw.API(auth)
  
# the screen_name of the targeted user
#screen_name = "geeksforgeeks"
  
# printing the latest 20 followers of the user
#for follower in api.get_follower_ids(screen_name):
    #print(follower.screen_name)
#user = api.get_user(screen_name='dak')
Client = tweepy.Client(bearer_token= beare)
q ='covid -is:retweet'
response = Client.search_recent_tweets(query=q, max_results=100, tweet_fields=['lang', 'created_at'], expansions='author_id')   
users = {u['id']: u for u in response.includes['users']} 
for tweet in response.data:
  if users[tweet.author_id]:
    user = users[tweet.author_id]
    print(tweet.id)
    print(user.username)

# import the module
import tweepy
  
# assign the values accordingly
consumer_key = api_key 
consumer_secret = api_key_secret 
access_token = access_token
access_token_secret = access_token_secret

# authorization of consumer key and consumer secret
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)

# set access to user's access key and access secret
auth.set_access_token(access_token, access_token_secret)

# calling the api
api = tweepy.API(auth)

# the screen_name of the targeted user
screen_name = "007_shreyas"

list_of_followers = []
# printing the latest 20 friends of the user
for friend in api.friends(screen_name):
	list_of_followers.append(friend.screen_name)

import random
if len(list_of_followers)<6:
  res_list = list_of_followers
else:
  option1, option2, option3, o4,o5 = random.sample(range(0, 20), 5)
  rand_list = [option1, option2, option3, o4, o5]
  res_list = [list_of_followers[i] for i in rand_list]

t_s = ""
tweet_list= []

for i in res_list:
  username = i
  try:
    tweets_list= api.user_timeline(username, count=1, tweet_mode='extended')
  except:
    t_s = t_s + "A User is not authorized!"
    print("A User is not authorized!")  
  try:
    t_s = t_s + tweets_list[0].full_text
  except:
    t_s = t_s + "A User has never tweeted!"
    print("A User has never tweeted!")

print(t_s)
#import  tweepy
#auth = tweepy.OAuthHandler(api_key, api_key_secret)
#auth.set_access_token(access_token, access_token_secret)
#api = tweepy.API(auth)
# public_tweets = api.home_timeline()
#print(api)

auth = tweepy.OAuthHandler(my_api_key, my_api_secret)
api = tweepy.API(auth, wait_on_rate_limit=True)
user = api.user_timeline(screen_name='dak')
# first app gives us an input username= DONE
# I check using botcheck if that user is a bot or not and then save the result = 
# get userID from username
# I then take the username and find its followers and following = 
# Using the top 10 most popular followers I will give a sentiment analysis on their most recent tweets = 
print(user)

response2 = Client.get_users(usernames = 'nananmjk')
if (response2.data == None):
  userID = "User not found"
else:
  obj = response2.data[0]
  userID = obj.id
print(userID)

while True:
  try:
    obj = response2.data[0]
    break
  except ValueError:
    print("Oops!  That was no valid number.  Try again...")

userID = obj.id
print(obj.id)

response3 = Client.user_timeline(id = userID, max_results=100,  tweet_fields=['attachments','author_id','context_annotations','conversation_id'] )
t = response3[0]
print(t[1])

payload = {
	"mentions": [
		{
			"contributors": None,
			"coordinates": None,
			"created_at": "Fri Aug 07 11:26:56 +0000 2020",
			"entities": {
				"hashtags": [],
				"symbols": [],
				"urls": [],
				"user_mentions": [
					{
						"id": 91777112,
						"id_str": "91777112",
						"indices": [3, 11],
						"name": "suyash bhatia",
						"screen_name": "SB"
					}
				]
			},
			"favorite_count": 0,
			"favorited": False,
			"geo": None,
			"id": 1291697,
			"id_str": "1291697",
			"in_reply_to_screen_name": None,
			"in_reply_to_status_id": None,
			"in_reply_to_status_id_str": None,
			"in_reply_to_user_id": None,
			"in_reply_to_user_id_str": None,
			"is_quote_status": False,
			"lang": "en",
			"metadata": {
				"iso_language_code": "en",
				"result_type": "recent"
			},
			"place": None,
			"retweet_count": 14,
			"retweeted": False,
			"retweeted_status": {
				"contributors": None,
				"coordinates": None,
				"created_at": "Mon Jul 20 16:03:30 +0000 2020",
				"entities": {
					"hashtags": [],
					"symbols": [],
					"urls": [],
					"user_mentions": []
				},
				"favorite_count": 35,
				"favorited": False,
				"geo": None,
				"id": 128524,
				"id_str": "128524",
				"in_reply_to_screen_name": None,
				"in_reply_to_status_id": None,
				"in_reply_to_status_id_str": None,
				"in_reply_to_user_id": None,
				"in_reply_to_user_id_str": None,
				"is_quote_status": False,
				"lang": "en",
				"metadata": {
					"iso_language_code": "en",
					"result_type": "recent"
				},
				"place": None,
				"possibly_sensitive": False,
				"retweet_count": 14,
				"retweeted": False,
				"source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
				"text": "orignial tweet",
				"truncated": True,
				"user": {
					"contributors_enabled": False,
					"created_at": "Mon May 27 17:57:42 +0000 2019",
					"default_profile": True,
					"default_profile_image": False,
					"description": "description",
					"entities": {},
					"favourites_count": 754,
					"follow_request_sent": False,
					"followers_count": 130,
					"following": False,
					"friends_count": 295,
					"geo_enabled": False,
					"has_extended_profile": True,
					"id": 91777112,
					"id_str": "91777112",
					"is_translation_enabled": False,
					"is_translator": False,
					"lang": None,
					"listed_count": 3,
					"location": "location",
					"name": "test user 1",
					"notifications": False,
					"profile_background_color": "F5F8FA",
					"profile_background_image_url": None,
					"profile_background_image_url_https": None,
					"profile_background_tile": False,
					"profile_banner_url": None,
					"profile_image_url": None,
					"profile_image_url_https": None,
					"profile_link_color": "1DA1F2",
					"profile_sidebar_border_color": "C0DEED",
					"profile_sidebar_fill_color": "DDEEF6",
					"profile_text_color": "333333",
					"profile_use_background_image": True,
					"protected": False,
					"screen_name": "screen_name",
					"statuses_count": 283,
					"time_zone": None,
					"translator_type": "none",
					"url": None,
					"utc_offset": None,
					"verified": False
				}
			},
			"source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
			"text": "RT @test_screen_name: test tweet",
			"truncated": False,
			"user": {
				"contributors_enabled": False,
				"created_at": "Fri Jan 28 02:42:39 +0000 2011",
				"default_profile": True,
				"default_profile_image": False,
				"description": "",
				"entities": {"description": {"urls": []}},
				"favourites_count": 5756,
				"follow_request_sent": False,
				"followers_count": 31,
				"following": False,
				"friends_count": 260,
				"geo_enabled": True,
				"has_extended_profile": False,
				"id": 24391,
				"id_str": "24391",
				"is_translation_enabled": False,
				"is_translator": False,
				"lang": None,
				"listed_count": 0,
				"location": "location",
				"name": "test user 2",
				"notifications": False,
				"profile_background_color": "C0DEED",
				"profile_background_image_url": None,
				"profile_background_image_url_https": None,
				"profile_background_tile": False,
				"profile_image_url": None,
				"profile_image_url_https": None,
				"profile_link_color": "1DA1F2",
				"profile_sidebar_border_color": "C0DEED",
				"profile_sidebar_fill_color": "DDEEF6",
				"profile_text_color": "333333",
				"profile_use_background_image": True,
				"protected": False,
				"screen_name": "test_screen_name_2",
				"statuses_count": 351,
				"time_zone": None,
				"translator_type": "none",
				"url": None,
				"utc_offset": None,
				"verified": False
			}
		}
	],
	"timeline": [
		{
			"contributors": None,
			"coordinates": None,
			"created_at": "Fri Aug 07 14:26:36 +0000 2020",
			"entities": {
				"hashtags": [],
				"symbols": [],
				"urls": [],
				"user_mentions": [
					{
						"id": 2584,
						"id_str": "2584",
						"indices": [0, 12],
						"name": "mentined user",
						"screen_name": "mentioned_user"
					}
				]
			},
			"favorite_count": 0,
			"favorited": False,
			"geo": None,
			"id": 12917,
			"id_str": "12917",
			"in_reply_to_screen_name": "mentioned_user",
			"in_reply_to_status_id": 1291741,
			"in_reply_to_status_id_str": "1291741",
			"in_reply_to_user_id": 2584,
			"in_reply_to_user_id_str": "2584",
			"is_quote_status": False,
			"lang": "und",
			"place": None,
			"retweet_count": 0,
			"retweeted": False,
			"source": "<a href=\"https://mobile.twitter.com\" rel=\"nofollow\">Twitter Web App</a>",
			"text": "@mentioned_user Yes",
			"truncated": False,
			"user": {
				"contributors_enabled": False,
				"created_at": "Mon May 27 17:57:42 +0000 2019",
				"default_profile": True,
				"default_profile_image": False,
				"description": "description",
				"entities": {
					"description": {"urls": []},
					"url": {"urls": []}
				},
				"favourites_count": 754,
				"follow_request_sent": False,
				"followers_count": 130,
				"following": False,
				"friends_count": 295,
				"geo_enabled": False,
				"has_extended_profile": True,
				"id": 91777112,
				"id_str": "91777112",
				"is_translation_enabled": False,
				"is_translator": False,
				"lang": None,
				"listed_count": 3,
				"location": "location",
				"name": "test user 1",
				"notifications": False,
				"profile_background_color": "F5F8FA",
				"profile_background_image_url": None,
				"profile_background_image_url_https": None,
				"profile_background_tile": False,
				"profile_banner_url": None,
				"profile_image_url": None,
				"profile_image_url_https": None,
				"profile_link_color": "1DA1F2",
				"profile_sidebar_border_color": "C0DEED",
				"profile_sidebar_fill_color": "DDEEF6",
				"profile_text_color": "333333",
				"profile_use_background_image": True,
				"protected": False,
				"screen_name": "screen_name_2",
				"statuses_count": 283,
				"time_zone": None,
				"translator_type": "none",
				"url": None,
				"utc_offset": None,
				"verified": False
			}
		}
	],
	"user": {
		"id_str": "91777112", # this can be direclty linked after we get user id
		"screen_name": "suyash bhatia" # this can be direclty linked after we get user id
	}
}

import requests

url = "https://botometer-pro.p.rapidapi.com/4/check_account"
headers = {
	"content-type": "application/json",
	"X-RapidAPI-Key": "55fce6948emshe5eda330a114078p188d04jsna260ea0dc2bc",
	"X-RapidAPI-Host": "botometer-pro.p.rapidapi.com"
}

response = requests.request("POST", url, json=payload, headers=headers)

print(response.text)

!pip install --upgrade google-cloud-language==2.4.3

from google.cloud import language_v1
def language_analysis(text):
  client = language.Client()
  document = client .document_from_text(text)
  sent_analysis = document.analyze_sentiment()
  print(dir(sent_analysis))
  sentiment = sent_analysis.sentiment
  ent_analysis = document.analyze_entities()
  entities = ent_analysis.entities
  return sentiment, entities

example_text = "Suyash Bhatia is the best in the world"
sent, ent = language_analysis(example_text)
print(sent.score, sent.magnitude)

from google.cloud import language
client = language.LanguageServiceClient()
text = "Suyash Bhatia is the best in the world"
!pip3 install --user --upgrade google-cloud-language==2.4.3

from google.cloud import language


def analyze_text_sentiment(text):
    client = language.LanguageServiceClient()
    document = language.Document(content=text, type_=language.Document.Type.PLAIN_TEXT)

    response = client.analyze_sentiment(document=document)

    sentiment = response.document_sentiment
    results = dict(
        text=text,
        score=f"{sentiment.score:.1%}",
        magnitude=f"{sentiment.magnitude:.1%}",
    )
    for k, v in results.items():
        print(f"{k:10}: {v}")
text = "Guido van Rossum is great!"
analyze_text_sentiment(text)

from google.cloud import language_v1

def sample_analyze_sentiment(text_content):
    """
    Analyzing Sentiment in a String

    Args:
      text_content The text content to analyze
    """

    client = language_v1.LanguageServiceClient()

    # text_content = 'I am so happy and joyful.'

    # Available types: PLAIN_TEXT, HTML
    type_ = language_v1.Document.Type.PLAIN_TEXT

    # Optional. If not specified, the language is automatically detected.
    # For list of supported languages:
    # https://cloud.google.com/natural-language/docs/languages
    language = "en"
    document = {"content": text_content, "type_": type_, "language": language}

    # Available values: NONE, UTF8, UTF16, UTF32
    encoding_type = language_v1.EncodingType.UTF8

    response = client.analyze_sentiment(request = {'document': document, 'encoding_type': encoding_type})
    # Get overall sentiment of the input document
    print(u"Document sentiment score: {}".format(response.document_sentiment.score))
    print(
        u"Document sentiment magnitude: {}".format(
            response.document_sentiment.magnitude
        )
    )
    # Get sentiment for all sentences in the document
    for sentence in response.sentences:
        print(u"Sentence text: {}".format(sentence.text.content))
        print(u"Sentence sentiment score: {}".format(sentence.sentiment.score))
        print(u"Sentence sentiment magnitude: {}".format(sentence.sentiment.magnitude))

    # Get the language of the text, which will be the same as
    # the language specified in the request or, if not specified,
    # the automatically-detected language.
    print(u"Language of the text: {}".format(response.language))



!pip install botometer
import botometer
!pip install tweepy==3.10.0
!pip install requests



import botometer

rapidapi_key = "55fce6948emshe5eda330a114078p188d04jsna260ea0dc2bc"
twitter_app_auth = {
    'consumer_key': 'kzpMI81MuaDXpVIYfbDGGN6rw',
    'consumer_secret': 'iZDWXYq6PZUa5sDOPNtv8g2tMiXActCJOzJJr99JptulkWBFFe',
    'access_token': '1568769599771971584-qBffkygf2rzveFGQ5eSLqnCgmwwJGd',
    'access_token_secret': 'SIRdNbivIoxhTbR285qBpJDkLWfbyKbl1MBLrMRtcdyry',
  }
bom = botometer.Botometer(wait_on_ratelimit=True,
                          rapidapi_key=rapidapi_key,
                          **twitter_app_auth)

# Check a single account by screen name
result = bom.check_account("@007_shreyas")

print(result)