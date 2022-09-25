import tweepy
from tweepy import OAuthHandler
from flask import Flask, request

app = Flask(__name__)
@app.route('/data', methods = ['POST'])
def userCheck():
    consumer_key =  'kzpMI81MuaDXpVIYfbDGGN6rw'
    consumer_secret = 'iZDWXYq6PZUa5sDOPNtv8g2tMiXActCJOzJJr99JptulkWBFFe'
    access_key  = '1568769599771971584-qBffkygf2rzveFGQ5eSLqnCgmwwJGd'
    access_secret = 'SIRdNbivIoxhTbR285qBpJDkLWfbyKbl1MBLrMRtcdyry'

    auth = OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_key, access_secret)
    api = tweepy.API(auth)
    userDict = request.json
    value = list(userDict.values())[0]

    try:
      u = api.get_user(value)
      try:
          #tweets_list = api.user_timeline(username, count=1, tweet_mode='extended')
          userID = 1
      except Exception:
          print("A User is not authorized!")
          userID = 0
    except Exception:
      print("User Not Found")
      userID = -1
    return {
        'UserID': userID
    }
# Running app
if __name__ == '__main__':
    app.run(debug=True)
