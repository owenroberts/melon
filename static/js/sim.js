window.addEventListener('load', () => {

	const simBtn = document.getElementById('sim');
	simBtn.addEventListener('click', simulate);

	// simulate a round of user interactions
	// maybe these should be staggered ... 
	function simulate() {

		// get all the users and posts
		const promises = [
			firebase.database().ref('users').once('value'),
			firebase.database().ref('posts').once('value')
		];

		Promise.all(promises).then(response => {        
			const users = response[0].val();
			const posts = response[1].val();
			
			for (const userId in users) {
				const user = users[userId];
				for (const postId in posts) {
					const post = posts[postId];

					// user likes post
					if (Cool.chance(25)) {
						// console.log('like', userId, postId);
						const like = {};
						like[userId] = true;
						firebase.database().ref('posts').child(postId)
							.child('likes')
							.update(like);

					}

					// user follows post user
					const alreadyFollows = user.follows === undefined ? false :
						Object.keys(user.follows).includes(post.user);
						
					if (Cool.chance(10) && !alreadyFollows) {
						// console.log('follow', userId, postId);
						const follow = {};
						follow[post.user] = true;
						firebase.database().ref('users').child(userId)
							.child('follows')
							.update(follow);

					}

					// reply
					if (Cool.chance(5)) {
						// console.log('reply', userId, postId);
						// get a text and make a post
						fetch('/get_post')
							.then(response => { return response.json() })
							.then(json => {
								firebase.database().ref('posts')
									.push({
										date: Date.now(),
										text: json.text,
										user: userId,
										name: user.name,
										replyTo: postId
									})
									.then(response => {
										// add post id to original post replies
										firebase.database().ref('posts').child(postId)
											.child('replies')
											.update({ postId: response.key});
									});
								});
					}

				}
			}
		});

	}
});