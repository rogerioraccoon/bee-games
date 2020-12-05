import { src, dest, watch, series } from 'gulp';
import sass from 'gulp-sass';
import prefix from 'gulp-autoprefixer';
import browserSync from 'browser-sync';

export const styles = () => {
	return src('scss/**/*.scss')
	  .pipe(sass().on('error', sass.logError))
	  .pipe(prefix())
	  .pipe(dest('css'));
}

export const serve = (done) => {
	server.init({
        server: {
            baseDir: "./"
        }
    });
	done();
}

const server = browserSync.create();
export const reload = (done) => {
	server.reload();
	done();
}

export const watchFiles = () => {
	watch('scss/*.scss', series(styles, reload));
    watch('**/*.html', reload);
    watch('js/**/*.js', reload);
}

export const dev = series(serve, watchFiles);

export default dev;
