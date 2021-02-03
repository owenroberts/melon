from flask import Flask, render_template, jsonify
from flask_assets import Environment, Bundle

app = Flask(__name__)

assets = Environment(app)
assets.url = app.static_url_path

scss = Bundle('css/main.scss', filters='scss', depends=('**/*.scss'), output='css/style.css')
assets.register('scss', scss)

bug = True

@app.route('/')
def index():
	return render_template("index.html")

@app.route('/get_post')
def get_post():
	from post import get_post
	return jsonify({ "text": get_post() })

@app.route('/get_user_name')
def get_user_name():
	from random import choice

	words = {}
	words['n'] = open('text/nouns.txt').read().splitlines()
	words['a'] = open('text/adjectives.txt').read().splitlines()
	bad_words = open('text/badwords.txt').read().splitlines()

	def get_random_word(pos):
		word = choice( words[pos] )
		if word in bad_words:
			print( word ) # wanna check when this happens ...
			word = choice( words[pos] )
		return word

	# adjective + noun
	return jsonify({ "name": get_random_word( 'a' ) + '-' + get_random_word( 'n' ) });


@app.route('/post/<id>')
def post(id):
	return render_template("post.html", postId=id)

@app.route('/likes/<id>')
def likes(id):
	return render_template("likes.html", postId=id)

@app.route('/user/<id>')
def user(id):
	return render_template("user.html", userId=id)

if __name__ == '__main__':
	app.run(debug=bug)


# libs
# https://github.com/dariusk/wordfilter
# made my own word lists using wordnet
