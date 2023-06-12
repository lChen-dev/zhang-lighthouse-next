const imagemin = require('imagemin');
const path = ['public/static/assets/images/', 'public/static/assets/Icons/'];
const imageminMozjpeg = require('imagemin-mozjpeg');
(async () => {
  for (let loc of path) {
    console.log(loc);
    await imagemin(
      [`${loc}*.jpg`, `${loc}*.JPG`, `${loc}*.jpeg`, `${loc}*.JPEG`],
      {
        destination: loc,
        plugins: [
          imageminMozjpeg({
            quality: 70,
          }),
        ],
      },
    );
  }
  console.log('JPG Images optimized');
})();
