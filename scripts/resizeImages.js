const config = require('../resize-images.config.js')

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const resizeIfNotExists = (file, width, height) => {
  const baseName = file.substring(0, file.lastIndexOf('.'));
  const smallFile = `${baseName}_${width}x${height}${path.extname(file)}`;
  // const sizeOri = fs.statSync(file).size;
  const resizeParam = `${width}x${height}`;

  console.log(`Resizing ${file} to ${smallFile}`);

  if (fs.existsSync(smallFile)) return;

  execSync(`convert ${file} -resize ${resizeParam} ${smallFile}`);
};

const walk = (dir) => {

  let results = [];

  const list = fs.readdirSync(dir);

  const next = () => {
    let file = list.shift();
    if (!file) return results;

    file = `${dir}/${file}`;

    const stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      const res = walk(file);
      results = results.concat(res);
      
      return next();
    }
    
    results.push(file);
    return next();
  };

  return next();
};

const allFiles = walk('./src');

allFiles.forEach((file) => {
  let imageConfig = config.images.find(image => image.src === file)
  if(imageConfig) {
    console.log("Processing image: ", file);

    let sizes = !Array.isArray(imageConfig.sizes) ? [imageConfig.sizes] : imageConfig.sizes;

    sizes.forEach(size => {
      resizeIfNotExists(file, size.width, size.height);
    });
  }
});