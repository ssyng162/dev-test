# 개발 성향 진단 (GitHub Pages 배포용)

이 저장소는 React + Vite 기반으로 구성되어 있으며, `main` 브랜치에 push하면 GitHub Actions를 통해 GitHub Pages로 자동 배포됩니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 로컬 빌드 확인

```bash
npm run build
npm run preview
```

## GitHub Pages 설정 방법

1. 이 저장소를 GitHub에 push합니다.
2. GitHub 저장소의 **Settings → Pages**로 이동합니다.
3. **Build and deployment**의 Source를 **GitHub Actions**로 선택합니다.
4. `main` 브랜치에 push하면 `.github/workflows/deploy.yml`이 실행되어 자동 배포됩니다.
5. 배포 완료 후 `https://<깃허브아이디>.github.io/<저장소명>/` 형태로 접속합니다.

## 참고

- 프로젝트는 GitHub Actions 환경에서 자동으로 `base` 경로를 저장소명 기준으로 잡습니다.
- 사용자/조직 페이지 저장소(예: `username.github.io`)라면 `vite.config.js`의 `base` 설정을 `/`로 고정해도 됩니다.
