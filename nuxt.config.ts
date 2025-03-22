import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
        // 客户端服务端都可用
        // 代理地址1
        apiUrl: "https://api.bilibili.com/",
        apiUrl_1: "https://www.lgzzk.site/",
    },
    // nitro: {
    //     devProxy: {
    //         '/x': {
    //             target: 'https://api.bilibili.com/x', // 目标 API 地址
    //             changeOrigin: true,
    //             prependPath: true,
    //             headers: {
    //                 Referer: 'https://www.bilibili.com/'
    //             },
    //             // pathRewrite: { '^/api': '' }, // 可选，重写路径
    //         }
    //     }
    // },
    routeRules: {
        '/x/**': {
            redirect: 'https://api.bilibili.com/**',
        }
    },
    // runtimeConfig: {
    //     myProxyUrl: 'https://api.bilibili.com'
    // },
    vite:{
      plugins:[svgLoader()],
      server: {
        proxy: {
          '/x': {
            target: 'https://api.bilibili.com',
            changeOrigin: true,
            headers: {
              Referer: 'https://www.bilibili.com/'
            }
          }, '/search': {
            target: 'https://s.search.bilibili.com',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/search/, ''),
            headers: {
              Referer: 'https://www.bilibili.com/'
            }
          }, '/live': {
            target: 'https://api.live.bilibili.com',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/live/, ''),
            headers: {
              Referer: 'https://www.bilibili.com/'
            }
          },
          '/host': {
            target: 'https://www.bilibili.com/',
            changeOrigin: true,
            rewrite: path => path.replace(/^\/host/, '')
          }, '/range': {
            target: 'https://www.lgzzk.site/',
            changeOrigin: true,
          }
        }
      }
    },
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
})
