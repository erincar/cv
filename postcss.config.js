const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

const plugins = [
    tailwindcss('tailwind.config.js'),
    autoprefixer,
    cssnano({
        preset: 'default'
    }),
];

if (!IS_DEVELOPMENT) {
    const purgecss = require('@fullhuman/postcss-purgecss');

    class TailwindExtractor {
        static extract(content) {
            return content.match(/[A-z0-9-:\/]+/g) || [];
        }
    }

    plugins.push(
        purgecss({
            content: ['src/*.html'],
            extractors: [
                {
                    extractor: TailwindExtractor,
                    extensions: ['html']
                }
            ],
        })
    );
}

module.exports = { plugins }
