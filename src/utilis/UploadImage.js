const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dc1gjngnn', 
    api_key: '989278832946459', 
    api_secret: 'vbgyCXNkcrJsXquuWH7syVNaplI'
  });

  const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
  };

module.exports = (image) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(image, opts, (error, result) => {
            if(result && result.secure_url) {
                return resolve(result.secure_url)
            }
            console.log(error.message)
            return reject({message: error.message})
        })
    })
}