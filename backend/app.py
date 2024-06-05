from flask import Flask, request, jsonify, send_from_directory
from flask_restful import Api, Resource
import spacy

app = Flask(__name__, static_url_path='', static_folder='../frontend')
api = Api(app)

nlp = spacy.load('en_core_web_sm')


class ChatBot(Resource):
    def post(self):
        data = request.get_json()
        query = data.get('query')
        doc = nlp(query)
        response = self.generate_response(doc)
        return jsonify({'response': response})

    def generate_response(self, doc):
        # Simple response generation logic for demonstration
        if any(token.lemma_ == 'complaint' for token in doc):
            return "We're sorry to hear that you're having issues. Please provide more details."
        elif any(token.lemma_ == 'inquiry' for token in doc):
            return "Sure, what would you like to know?"
        else:
            return "Thank you for reaching out. How can we assist you today?"


api.add_resource(ChatBot, '/chatbot')


@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(debug=True)
