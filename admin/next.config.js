const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const { i18n } = require("./next-i18next.config");

module.exports = withPWA({
  i18n,
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/courses",
  //       permanent: false,
  //     },
  //   ];
  // },

  images: {
    domains: [
      "via.placeholder.com",
      "res.cloudinary.com",
      "s3.amazonaws.com",
      "18.141.64.26",
      "127.0.0.1",
      "buylowcal.com",
      "admin.buylowcal.com",
      "api.buylowcal.com",
      "localhost",
      "picsum.photos",
      "pickbazar-sail.test",
      "pickbazarlaravel.s3.ap-southeast-1.amazonaws.com",
      "lh3.googleusercontent.com",
      "pca-api.buylowcal.com"
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
