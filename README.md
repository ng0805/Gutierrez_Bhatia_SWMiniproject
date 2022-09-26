# Gutierrez_Bhatia_SWMiniproject
Nicholas Gutierrez Suyash Bhatia EC463 SW MiniProject 
## APIs Used

### Twitter API
We used the Twitter API v1 3.10.0 to access all data needed from twitter.
Using a developer account, we got access to Twitter APIs. We exercised these 
APIs in order to check various things about a user as well as access information 
about the user.

Specifically, we used Twitter API to check if a user exists/validity of user. 
Following that we accessed the "following" of a user. From the users list of followers
we randomly selected 5 users and accessed their newest tweet.

##### Resources:
    Geeksforgeeks
    Tweepy Documentation
    Twitter API V1 Documentation
### Botometer API
We used the Botometer API to check if the specific username entered by the user
is a bot or not. If the score, ranging from 0 to 1 is on the lower side then
it is less likely that the user is a bot. If the score is on the higher side then there
is a high probability that the user is a bot.

Now, lets dive into the functioning of the botometer. The botometer requires information from the 
Twitter API in order to analyse bot like activity of a user. For the botometer 
to access information from twitter we need to provide twitter authentication keys 
as headers to the botometer.

##### Resources: 
        https://botometer.osome.iu.edu/
        https://rapidapi.com/OSoMe/api/botometer-pro
        https://github.com/IUNetSci/botometer-python
### Google Natural Language API
Exercising the Google natural API was very straight forward. Google instead has a very painstaking 
way of authenticating a user, especially when running locally. To authenticate the API calls we 
installed google CLI on our local machine. This helped in providing local authentication for the NLP to 
be exercised. 

Once the user was authenticated and some additional set up was complete,
it was pretty straightforward for us to exercise the NLP. We chose to use the magnitude and
score as our two metrics of analysis. The meaning of the two metrics used:
    
The Score of the sentiment ranges between -1.0 (negative) and 1.0 (positive) and corresponds 
    to the overall sentiment from the given information.

The Magnitude of the sentiment ranges from 0.0 to +infinity and indicates the overall 
    strength of sentiment from the given information. The more information that is provided the higher the magnitude.
##### Resources:
    https://codelabs.developers.google.com/codelabs/cloud-natural-language-python3#6

### List of Libraries needed to be installed
    !pip3 install --user --upgrade google-cloud-language
    !pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib
    !pip install tweepy --upgrade
    !pip install tweepy==3.10.0
    !pip install --upgrade google-cloud-language==2.4.3
    !pip install requests
    !pip install botometer


