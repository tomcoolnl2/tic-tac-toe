Object.defineProperty(global, 'import', {
	value: {
		meta: {
			env: {
				VITE_USERNAME: 'test-user',
				VITE_USERPWD: 'test-pwd',
			},
		},
	},
});
