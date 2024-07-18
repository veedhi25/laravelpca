
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");
const { i18n } = require("./next-i18next.config");

module.exports = withPWA({
  // async rewrites() {
  //   return [
  //     {
  //       source: '/getOperators',
  //       destination: 'https://ezulix.co.in/Plans/getOperator',
  //     },
  //   ]
  // },
  i18n,
  pwa: {
    disable: process.env.NODE_ENV === "development",
    dest: "public",
    runtimeCaching,
  },
  
   
  
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
  images: {
    domains: [
      "maps.googleapis.com",
      "ezulix.in",
      "stats.nba.com",
      "googleusercontent.com",
      "graph.facebook.com",
      "res.cloudinary.com",
      "s3.amazonaws.com",
      "18.141.64.26",
      "127.0.0.1",
      "110.36.209.210",
      "test.buylowcal.com",
      "testadmin.buylowcal.com",
      "testapi.buylowcal.com",
      "api.buylowcal.com",
      "via.placeholder.com",
      "pickbazarlaravel.s3.ap-southeast-1.amazonaws.com",
      "picsum.photos",
      "lh3.googleusercontent.com",
      "timeapi.io",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});
