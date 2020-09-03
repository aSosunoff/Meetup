// vue inspect > out.js
module.exports = {
	devServer: {
		/* writeToDisk: true, */
		disableHostCheck: true,
		proxy: {
			'/api': {
				target: process.env.API_PROXI_TARGET,
				changeOrigin: true
			}
		}
	}
};
