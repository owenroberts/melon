# get a post
from random import choice
from lib.markov import MarkovGenerator
from langdetect import detect

gen = MarkovGenerator(n=2, max=100)

def get_post():
	part_one = open('text/part_one.txt').read()
	lines = part_one.splitlines()
	for line in lines:
		gen.feed(line)
	text = gen.generate()
	while len(text) < 1 or len(text) > 100 or detect(text) != 'en':
		text = gen.generate()
	return text

if __name__ == '__main__':
	print( get_post() )