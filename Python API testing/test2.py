from google.cloud import language

import tweepy

api_key = 'kzpMI81MuaDXpVIYfbDGGN6rw'
api_key_secret = 'iZDWXYq6PZUa5sDOPNtv8g2tMiXActCJOzJJr99JptulkWBFFe'
access_token = '1568769599771971584-qBffkygf2rzveFGQ5eSLqnCgmwwJGd'
access_token_secret = 'SIRdNbivIoxhTbR285qBpJDkLWfbyKbl1MBLrMRtcdyry'
beare = "AAAAAAAAAAAAAAAAAAAAAOsChAEAAAAAD%2BbZGx33y7SDjqQm3eh3AlRl67U%3DYNi70BhCeJBoVy534xnTRq1jri1On2tJGJWYX3OnsPZbf0hPg3"
my_api_key = "kzpMI81MuaDXpVIYfbDGGN6rw"
my_api_secret = "iZDWXYq6PZUa5sDOPNtv8g2tMiXActCJOzJJr99JptulkWBFFe"

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

if len(list_of_followers) < 6:
    res_list = list_of_followers
else:
    option1, option2, option3, o4, o5 = random.sample(range(0, 20), 5)
    rand_list = [option1, option2, option3, o4, o5]
    res_list = [list_of_followers[i] for i in rand_list]

t_s = ""
tweet_list = []

for i in res_list:
    username = i
    try:
        tweets_list = api.user_timeline(username, count=1, tweet_mode='extended')
    except:
        t_s = t_s + "A User is not authorized!"
        print("A User is not authorized!")
    try:
        t_s = t_s + tweets_list[0].full_text
    except:
        t_s = t_s + "A User has never tweeted!"
        print("A User has never tweeted!")
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

text = "I am writig some setaces to test thw google api. I thik i'm goig to order some food soo ecause I am hugry. It is 1 pm o Saturday. I like trais"
analyze_text_sentiment(t_s)