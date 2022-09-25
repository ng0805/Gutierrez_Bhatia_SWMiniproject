import tweepy
from tweepy import OAuthHandler
consumer_key =  'kzpMI81MuaDXpVIYfbDGGN6rw'
consumer_secret = 'iZDWXYq6PZUa5sDOPNtv8g2tMiXActCJOzJJr99JptulkWBFFe'
access_key  = '1568769599771971584-qBffkygf2rzveFGQ5eSLqnCgmwwJGd'
access_secret = 'SIRdNbivIoxhTbR285qBpJDkLWfbyKbl1MBLrMRtcdyry'


auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_key, access_secret)
api = tweepy.API(auth)
user = "nananmjk"


try:
  u = api.get_user(user)
  userID = 1
except Exception:
  userID = -1
