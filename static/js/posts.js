window.addEventListener('load', () => {

	const posts = document.getElementById('posts');

	firebase.database().ref('posts')
		.on('child_added', postData => {

			const post = Cool.createEl('div', ['post'], posts);

			const user = Cool.createEl('div', ['user'], post);
			const userLink = Cool.createEl('a', ['user-link'], user, postData.val().name.replace(/-|_/g, ' '));
			userLink.href = `/user/${postData.val().user}`;
			
			const permalink = Cool.createEl('a', ['permalink'], user, Cool.formatDate(postData.val().date));
			permalink.href = `/post/${postData.key}`;

			

			Cool.createEl('p', ['text'], post, postData.val().text);
		});
});