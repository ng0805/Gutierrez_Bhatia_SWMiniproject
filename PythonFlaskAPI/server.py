# Import flask and datetime module for showing date and time
from flask import Flask, request
import datetime

x = datetime.datetime.now()

# Initializing flask app
app = Flask(__name__)


# Route for seeing a data
@app.route('/data', methods = ['POST'])
def get_time():
    name = request.json
    return {
        'Name':name,
        "Age":"22",
        "Date":x,
        "programming":"python"
        }


# Running app
if __name__ == '__main__':
    app.run(debug=True)
