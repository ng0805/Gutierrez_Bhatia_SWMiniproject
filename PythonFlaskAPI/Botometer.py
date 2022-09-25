import botometer
from flask import Flask, request

app = Flask(__name__)

@app.route('/data', methods = ['POST'])
def BotCheck():
    rapidapi_key = "55fce6948emshe5eda330a114078p188d04jsna260ea0dc2bc"
    twitter_app_auth = {
        'consumer_key': 'kzpMI81MuaDXpVIYfbDGGN6rw',
        'consumer_secret': 'iZDWXYq6PZUa5sDOPNtv8g2tMiXActCJOzJJr99JptulkWBFFe',
        'access_token': '1568769599771971584-qBffkygf2rzveFGQ5eSLqnCgmwwJGd',
        'access_token_secret': 'SIRdNbivIoxhTbR285qBpJDkLWfbyKbl1MBLrMRtcdyry',
      }
    userDict = request.json
    value = list(userDict.values())[0]
    bom = botometer.Botometer(wait_on_ratelimit=True,
                              rapidapi_key=rapidapi_key,
                              **twitter_app_auth)

    # Check a single account by screen name

    try:
      result = bom.check_account(value)
      botscore = result['raw_scores']['universal']['overall']
    except Exception:
      result = "botometer was not able to assess this user! Try a new user."
      botscore = 0
    print("Botscore:",botscore)
    return {
      'Botscore': botscore
    }

# Running app
if __name__ == '__main__':
    app.run(port=8000,debug=True)
