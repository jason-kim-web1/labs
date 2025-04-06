# NX Proxy

### Next.js로 만드는 프록시 서버

### 1. Next.js 설치 및 80/443 dev 서버 구축
`nx-no-proxy` 프로젝트를 참고하세요.

### 2. next.config.js 파일을 만들고 프록시 설정
```
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
  }
};
```

### 3. 개발 서버 실행 후 확인
- `https://localhost`로 접근하면 API 요청에서 CORS 에러가 발생합니다.
- 도메인을 맞춰주세요. `https://local.kurly.com`으로 접근하면 잘 뜨는 것을 확인할 수 있습니다.
- 사용할 도메인은 `/etc/hosts`와 `certgen.sh`에 미리 들어가 있어야 합니다.