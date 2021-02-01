window.addEventListener('load', () => {
	
	const addUserBtn = document.getElementById('add-user');
	
	addUserBtn.addEventListener('click', () => {
		fetch('/get_user_name')
			.then(response => { return response.json() })
			.then(json => {
				const ref = firebase.database().ref('users')
					.push({ name: json.name })
					.then(response => {
						addFirstPost(json.name, response.key);
					})
			});
	});

	function addFirstPost(name, userId) {

		fetch('/get_post')
			.then(response => { return response.json() })
			.then(json => {
				firebase.database().ref('posts')
					.push({
						date: Date.now(),
						text: json.text,
						user: userId,
						name: name
					});
			});
	}
});