require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';

export default {
    dev: !isProduction,

    // When SPA
    loading: '@/components/shared/Loading.vue',

    // When SSR
    loadingIndicator: {
        name: 'folding-cube',
        color: '#336CCE',
    },

    head: {
        title: 'Phụ sản Hà Nội',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/XMLID_1_.ico' },
        ],
    },

    css: [
        '@/assets/main.scss',
        '@/assets/ant/main.less',
        '@fortawesome/fontawesome-free/css/all.css',
    ],

    plugins: [
        '@/plugins/api',
        { src: '@/plugins/axios', mode: 'client' },
        '@/plugins/ant-design',
        '@/plugins/filters',
        '@/plugins/global-components',
    ],

    robots: [
        {
            UserAgent: '*',
            Disallow: process.env.APP_ENV === 'production'
                ? [
                    '/*.json',
                    '/*.xml',
                ]
                : '/',
        },
    ],

    server: {
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || '3000',
    },

    render: {
        http2: {
            push: true,
        },
    },

    buildModules: [
        '@nuxt/postcss8',
        '@nuxtjs/google-fonts',
        '@nuxtjs/eslint-module',
        '@nuxtjs/fontawesome',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-analytics',
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
    ],

    googleFonts: {
        prefetch: true,
        preconnect: true,
        preload: true,
        download: false,
        families: {
            'Be+Vietnam+Pro': [300, 400, 600, 900],
        },
    },

    axios: {
        baseURL: process.env.API_HOST,
    },

    auth: {
        strategies: {
            local: {
                token: {
                    property: 'data.accessToken',
                    global: true,
                    required: true,
                    maxAge: 60 * 60 * 24 * 30, // 1 month
                    type: 'Bearer',
                },
                autoLogout: false,
                user: {
                    property: 'data.admin',
                    autoFetch: true,
                },
                endpoints: {
                    login: {
                        url: `${process.env.API_HOST}/a/sessions/login`,
                        method: 'POST',
                    },
                    logout: false,
                    user: {
                        url: `${process.env.API_HOST}/a/sessions/current`,
                        method: 'GET',
                    },
                },
                redirect: {
                    login: '/login',
                    logout: '/',
                    callback: '/login',
                    home: '/',
                },
            },
        },
    },

    router: {
        middleware: ['auth'],
    },

    build: {
        transpile: /@fullcalendar.*/,
        postcss: {
            plugins: {
                tailwindcss: 'tailwind.config.js',
                autoprefixer: {},
                ...(process.env.APP_ENV === 'production' ? { cssnano: {} } : {}),
            },
        },
        loaders: {
            less: {
                javascriptEnabled: true,
            },
        },
        babel: {
            plugins: [
                [
                    'import',
                    {
                        libraryName: 'ant-design-vue',
                        libraryDirectory: 'es',
                        style: true,
                    },
                    'ant-design-vue',
                ],
            ],
        },
    },

    publicRuntimeConfig: {
        googleAnalytics: {
            id: process.env.GOOGLE_ANALYTICS_ID,
        },
    },

    env: {
        API_HOST: process.env.API_HOST || 'localhost',
    },
};
