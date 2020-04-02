/*
 * @Author: ZhuQiMing
 * @CreateTime: 2020/4/1 16:26
 */
module.exports = {
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        host: '0.0.0.0',
        port: 8889,
        https: false,
        hot: true,
        overlay: {
            // warnings: false,
            // errors: false
        },
        proxy: {
            '/api': {
                target: 'http://api.zhuishushenqi.com',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/chapter': {
                target: 'http://chapterup.zhuishushenqi.com/chapter',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/chapter': ''
                }
            }
        }
    }
};
