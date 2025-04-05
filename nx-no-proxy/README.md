# NX No Proxy

### 별도의 프록시 서버 없이 80/443 포트 Next.js 서버 구동하기

### 1. Next.js 설치
https://nextjs.org/docs/app/getting-started/installation#manual-installation

### 2. 80 포트 dev 서버
`package.json` 파일에서 `dev` 명령을 다음과 같이 변경
```
next dev -p 80
```
`dev` 명령을 실행하면 80 포트로 접근할 수 있습니다.

### 3. 443 포트 dev 서버
SSL 인증서 발급을 위해 mkcert를 설치합니다.
```
brew install mkcert
```
#### 로컬 CA와 인증서를 만듭니다.  
쉬운 파일 생성을 위해 만든 `certgen.sh` 파일을 참고하세요.  
쉘 스크립트 파일을 실행하면 다음 작업을 진행합니다.
- 쉘 스크립트를 실행하면 기존 certs 폴더를 지우고 새로 만듭니다.
- certs 폴더로 이동 후 로컬 CA와 다음 도메인에 유효한 인증서를 만듭니다.
  - localhost, 127.0.0.1, ::1(ipv6)

#### 서버에 인증서를 적용하기 위해 커스텀 서버를 만들어야 합니다.
`https-dev-server.js` 파일을 참고하세요.

#### `package.json` 파일에서 `dev:https` 명령을 추가합니다.
```
"dev:https": "./certgen.sh && node https-dev-server.js"
```
`dev:https` 명령을 실행해서 확인해 보세요.

### 4. 커스텀 서버에서 80, 443 같이 서비스하기
`dev-server.js` 파일을 참고하세요.
- 포트는 환경변수에서 가져옵니다.(node 명령 앞에 `PORT=포트번호`를 붙이기)
- 443 포트는 https, 나머지 포트는 http 서버를 만들어 구동합니다.

`package.json` 파일에서 `dev:http` 명령을 참고하세요.
```
PORT=80 node dev-server.js
```
HTTPS 서버는 `dev:https` 명령을 다음과 같이 수정하면 됩니다.
```
./certgen.sh && PORT=443 node dev-server.js
```
