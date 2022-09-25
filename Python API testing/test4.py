user="@DCComics"
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

try:
  result = bom.check_account(user)
except Exception:
  result = "botometer was not able to assess this user! Try a new user."
print(result)