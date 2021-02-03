window.Cool = {};

Cool.createEl = function(tagName, classList, parent, text) {
	const e = document.createElement(tagName);
	e.classList.add(...classList);
	if (text) e.textContent = text;
	if (parent) parent.appendChild(e);
	return e;
};

Cool.formatDate = function(date) {
	const d = new Date(date);
	return d.toLocaleString('default', { month: 'short' }) + ' ' + d.getDate() + ' ' + (d.getHours() % 12) + ':' + ('00' + d.getMinutes()).slice(-2) + (d.getHours() > 12 ? ' PM' : ' AM');
};

Cool.createPost = function(postData) {
	const posts = document.getElementById('posts');

	const post = Cool.createEl('div', ['post']);
	post.id = postData.key;
	posts.insertBefore(post, posts.firstElementChild); // reverse chronological order

	const user = Cool.createEl('div', ['user'], post);
	const userLink = Cool.createEl('a', ['user-link'], user, postData.val().name.replace(/-|_/g, ' '));
	userLink.href = `/user/${postData.val().user}`;
	
	const permalink = Cool.createEl('a', ['permalink'], user, Cool.formatDate(postData.val().date));
	permalink.href = `/post/${postData.key}`;

	Cool.createEl('p', ['text'], post, postData.val().text);

	const likes = Cool.createEl('a', ['likes'], post);
	likes.title = 'View user likes';
	Cool.createEl('span', ['icon'], likes, '❦');
	const likeNum = Cool.createEl('span', ['num'], likes, postData.val().likes ? Object.keys(postData.val().likes).length : '0');
	likeNum.id = `like-num-${postData.key}`;
	likes.href = `/likes/${postData.key}`;

	const replies = Cool.createEl('a', ['replies'], post);
	replies.title = 'View user replies';
	Cool.createEl('span', ['icon'], replies, '↩');
	const replyNum = Cool.createEl('span', ['num'], replies, postData.val().replies ? Object.keys(postData.val().replies).length : '0');
	replyNum.id = `reply-num-${postData.key}`;
	console.log(replyNum);
	replies.href = `/replies/${postData.key}`;
	
};

Cool.chance = function(n) {
	return Math.random() * 100 < n;
};