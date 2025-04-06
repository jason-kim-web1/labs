module.exports = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*', // 프록시 경로
          destination: 'https://www.kurly.com/:path*', // 실제 주소
        }
      ]
    };
    // return [
    //   {
    //     source: '/:path*', // 프록시 경로
    //     destination: 'https://www.kurly.com/:path*', // 실제 주소
    //   },
    // ];
  }
};
