const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dn2gccqlw', 
    api_key: '471516915461778', 
    api_secret: 'mrfaFnCS3uJMmb2WC_bNl-EiEIY'
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