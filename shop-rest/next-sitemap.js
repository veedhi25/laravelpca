module.exports = {
    siteUrl: 'https://buylowcal.com',
    generateRobotsTxt: true, // (optional)
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          // allow: '/',
          disallow: ['*/logout', '*/checkout*', '*/404', '*/profile','*/login','*/register','*/wishlists','*/reports', '*/otp-login', '*/invite', '*/ar',
          '*/he',
          '*/zh',
          '*/es',
          '*/de',
          '*/questions',
        ],
        },
      ],
    },
    exclude: [
      '*/404',
      '*/Change Password',
      '*/downloads',
      '*/logout',
      '*/user',
      '*/refunds',
      '*/profile',
      '*/checkout*',
      '*/orders*',
      '*/login*',
      '*/register*',
      '*/invite',
      '*/otp-login',
      '*/wishlists',
      '*/reports',
      '*/questions',
      '*/ar',
      '*/he',
      '*/zh',
      '*/es',
      '*/de',

    ],
  };
  