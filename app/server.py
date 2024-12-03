import joblib
from flask import Flask, render_template, json, jsonify, request
from flask_cors import CORS, cross_origin

model = joblib.load('../model.pkl')
cv = joblib.load('../cv.pkl')
app = Flask(__name__)
CORS(app)


@app.route('/', methods=['GET'])
def get_home():
    return render_template("index.html")

@app.route('/predict', methods=['POST'])
def get_prediction():
    data = request.get_json()

    review_text = data['reviewText']
    review_text_vectorized = cv.transform([review_text])

    rating = model.predict(review_text_vectorized)[0]

    probs = model.predict_proba(review_text_vectorized).tolist()
    probs_list = probs[0]

    probs_list = [float(round(num, 3)) for num in probs_list]

    return json.dumps({"rating": int(rating), "probs": probs_list})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
