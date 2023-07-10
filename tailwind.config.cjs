/** @type {import('tailwindcss').Config}*/
const config = {
	darkMode: 'class',
<<<<<<< HEAD
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		require('path').join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
=======
	content: ['./src/**/*.{html,js,svelte,ts}',
	require('path').join(require.resolve(
		'@skeletonlabs/skeleton'),
		'../**/*.{html,js,svelte,ts}'
	)
],
>>>>>>> Asif

	theme: {
		extend: {}
	},

<<<<<<< HEAD
	plugins: [
		...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
	]
=======
	plugins: [...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()]
>>>>>>> Asif
};

module.exports = config;
