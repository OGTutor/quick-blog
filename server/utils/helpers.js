function generateUserData() {
	return {
		avatar: {
			name: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
				.toString(36)
				.substring(7)}.svg`,
		},
	};
}

module.exports = {
	generateUserData,
};
