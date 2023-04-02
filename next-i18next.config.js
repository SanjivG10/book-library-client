
module.exports = {
    debug: process.env.NODE_ENV === 'development',
    i18n: {
        locales: ['en', 'fr', 'de', 'es'],
        defaultLocale: 'en',
    },
    reloadOnPrerender: process.env.NODE_ENV === 'development',
}