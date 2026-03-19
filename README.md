# 개발 성향 진단 (GitHub Pages 배포용)

이 저장소는 React + Vite 기반이며, `main` 브랜치 push 시 GitHub Actions로 Pages에 자동 배포됩니다.

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

## GitHub Pages 설정 방법 (중요)

1. 저장소에 push
2. **Settings → Pages** 이동
3. **Build and deployment → Source**를 반드시 **GitHub Actions**로 선택
4. `main` 브랜치에 push
5. **Actions 탭에서 `Deploy to GitHub Pages` 워크플로우가 초록색(성공)**인지 확인
6. 배포 주소 접속: `https://<아이디>.github.io/<저장소명>/`

## 화면에 `dev-test`만 뜨는 경우 (트러블슈팅)

`dev-test` 제목만 보이는 화면은 대부분 **React 앱이 아니라 README가 Pages로 노출된 상태**입니다.

아래를 순서대로 확인하세요.

1. Pages Source가 `Deploy from a branch`가 아니라 **GitHub Actions**인지 확인
2. Actions에서 가장 최근 `Deploy to GitHub Pages` 실행이 **성공**인지 확인
3. 접속 URL이 `https://<아이디>.github.io/<저장소명>/` 형태인지 확인
4. 브라우저 강력 새로고침(Windows/Linux: `Ctrl+Shift+R`, macOS: `Cmd+Shift+R`)

## 참고

- 워크플로우는 Node 24 런타임 강제 설정을 포함합니다.
- Vite `base` 경로는 Actions 환경에서 자동 계산됩니다.
  - 일반 저장소: `/<저장소명>/`
  - 사용자/조직 페이지 저장소(`*.github.io`): `/`
