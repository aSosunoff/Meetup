module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', '@vue/airbnb'],
	parserOptions: {
		parser: 'babel-eslint'
	},
	// ignorePatterns: ['d="([\\s\\S]*?)"'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		indent: [
			'error',
			'tab',
			{
				MemberExpression: 'off',
				SwitchCase: 1
			}
		],
		'no-param-reassign': [2, { props: false }],
		'arrow-parens': ['error', 'as-needed'],
		'no-tabs': 0,
		'no-plusplus': [2, { allowForLoopAfterthoughts: true }],
		'implicit-arrow-linebreak': 0,
		'operator-linebreak': 0,
		'object-curly-newline': ['error', { consistent: true }],
		'comma-dangle': ['error', 'never'],
		//
		'function-paren-newline': 0,
		'max-len': [
			'error',
			{ code: 100, ignoreTemplateLiterals: true, ignoreStrings: true, ignoreUrls: true }
		]
	}
};
