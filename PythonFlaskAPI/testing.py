from google.cloud import language
from flask import Flask, request

app = Flask(__name__)

@app.route('/data', methods = ['POST'])
def analyze_text_sentiment():
    text = "Guido van Rossum is great!"
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

    return{
        'Text': results['text'],
        'Score': results['score'],
        'Magnitude': results['magnitude']
    }

if __name__ == '__main__':
    app.run(port=8080,debug=True)
