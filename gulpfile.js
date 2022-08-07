import gulp from "gulp";
import {path} from "./gulp/config/path.js";
import {plugins} from "./gulp/config/plugins.js";

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins,
}

import {copy} from "./gulp/task/copy.js";
import {reset} from "./gulp/task/reset.js";
import {html} from "./gulp/task/html.js";
import {server} from "./gulp/task/server.js";
import {scss} from "./gulp/task/scss.js";
import {js} from "./gulp/task/js.js";
import {images} from "./gulp/task/images.js";
import {otfToTtf, ttfToWoff, fontsStyle} from "./gulp/task/fonts.js";

function watcher(){
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);
const mainTasks =gulp.series(fonts, gulp.parallel(copy, html, scss, js, images));
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

gulp.task('default', dev);