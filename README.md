# ReviewSentimentAnalyzer

This project employs machine learning to understand consumer sentiment behind product reviews. It uses a Multinomial Niave Bayes algorithm and is trained on an open-source dataset consisting of millions of Amazon product reviews sourced from Kaggle.com. Various Natural Language Processing (NLP) techniques were used on the data,
 including tokenization, stemming, and vectorization. The model uses the vectorized reviews for features and the number of stars (1-5) the reviews received as labels. 
 
 Since this project takes a Bag-of-Words approach to vectorization, which is essentially keeping track of which words are and are not in a particular review, the model is associating the presence of certain words with ratings. For example, it will associate reviews that contain positive words, such as "great" or "happy" with high ratings, and it will rank reviews containing negative words such as "bad" or "unhappy" with lower ratings. 

 I built a simple Flask application around the model which allows users to access the model. It gives a breakdown of the probability ranking per category to better understand the model's opinion.

 The goal of this project was to use machine learning to predict the sentiment behind text. It was nice to put my knowledge of machine learning into practice. I learned a lot about NLP, fine-tuning models, and gained deeper insight into machine learning libraries in Python.
