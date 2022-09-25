import tweepy
api_key = 'kzpMI81MuaDXpVIYfbDGGN6rw'
api_key_secret = 'iZDWXYq6PZUa5sDOPNtv8g2tMiXActCJOzJJr99JptulkWBFFe'
access_token = '1568769599771971584-qBffkygf2rzveFGQ5eSLqnCgmwwJGd'
access_token_secret = 'SIRdNbivIoxhTbR285qBpJDkLWfbyKbl1MBLrMRtcdyry'
beare = "AAAAAAAAAAAAAAAAAAAAAOsChAEAAAAAD%2BbZGx33y7SDjqQm3eh3AlRl67U%3DYNi70BhCeJBoVy534xnTRq1jri1On2tJGJWYX3OnsPZbf0hPg3"
my_api_key = "kzpMI81MuaDXpVIYfbDGGN6rw"
my_api_secret = "iZDWXYq6PZUa5sDOPNtv8g2tMiXActCJOzJJr99JptulkWBFFe"
Client = tweepy.Client(bearer_token= beare)
response2 = Client.get_users(usernames = 'nananmjk')
if (response2.data == None):
  userID = "User not found"
else:
  obj = response2.data[0]
  userID = obj.id
print(userID)