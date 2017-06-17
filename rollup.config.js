import babel from 'rollup-plugin-babel';
import conditional from "rollup-plugin-conditional";
import uglify from 'rollup-plugin-uglify';
import license from 'rollup-plugin-license';
import postcss from 'rollup-plugin-postcss';
import cssnano from 'cssnano';
import path from 'path';

const prod = process.env.build === 'production';

export default {
    entry: 'src/index.js',
    format: 'iife',
    plugins: [
        postcss({
            plugins: [cssnano()]
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        conditional(prod, [
            uglify()
        ]),
        license({
            banner: {
                file: path.join(__dirname, 'banner.text'),
                encoding: 'utf-8'
            }
        }),
    ],
    dest: prod ? 'dist/snap-china-map.min.js' : 'dist/snap-china-map.js'
};