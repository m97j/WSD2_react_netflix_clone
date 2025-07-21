
## 🎬 Netflix Clone Project (넷플릭스 클론 사이트)

[![React](https://img.shields.io/badge/Frontend-React-blue?style=flat-square)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-darkgreen?style=flat-square)](https://nodejs.org)
[![Authentication](https://img.shields.io/badge/Auth-Firebase-yellow?style=flat-square)](https://firebase.google.com/)
[![Deploy](https://img.shields.io/badge/Deploy-GitHub%20Pages-purple?style=flat-square&logo=github)](https://m97j.github.io/WSD2_react_netflix_clone)

> 대학 WSD 과제 기반으로 진행된 프론트엔드 실습 프로젝트이며, **React 기반 넷플릭스 클론 웹앱**입니다. 이를 통해 UI 구현 역량과 API 응용 능력을 기를 수 있었습니다.  
> TMDB API 및 Firebase를 활용해 실시간 콘텐츠 조회, 즐겨찾기, 사용자 인증 등의 기능을 구현했습니다.

## 🌐 데모 사이트 접속

🎥 [👉 Netflix Clone 웹사이트 바로가기](https://m97j.github.io/WSD2_react_netflix_clone)

---

 ✅ 프로젝트 요약

* **목적:** 개인 프로젝트 기반의 **넷플릭스 클론 사이트** 개발
* **기술 스택:** React, Node.js, TMDB API, Firebase

---

## 🚀 주요 기능 요약

- 🎬 TMDB API를 통한 실시간 영화 콘텐츠 로딩
- 🔐 Firebase Authentication 기반 로그인/회원가입/로그아웃
- ❤️ 즐겨찾기(Like) 기능 – 로그인 시 관심 영화 저장
- 🔄 반응형 UI – 넷플릭스 스타일 구성 및 디바이스 대응
- ☁️ GitHub Pages를 통한 프론트엔드 정적 배포

---

## 🧩 기술 스택

| 분류       | 사용 기술                                        |
|------------|--------------------------------------------------|
| Frontend   | React (Hooks, Router), Styled-components, Axios |
| API 연동   | TMDB (The Movie Database) API                   |
| 인증 시스템| Firebase Authentication                          |
| 배포       | GitHub Pages (gh-pages), React build             |

📌 전체 화면은 React Router 기반으로 구성되며, 사용자 상태에 따라 동적으로 렌더링됩니다.

---

## 🗂️ 폴더 구조 개요

```
WSD2_react_netflix_clone/
├── public/                      # 정적 파일 및 기본 HTML 구조
├── src/
│   ├── app/                     # 핵심 기능 구성 디렉토리
│   │   ├── components/            # 페이지별 재사용 컴포넌트 집합
│   │   │   ├── home/               # 홈 화면 구성 요소
│   │   │   ├── main/               # 메인 콘텐츠 영역
│   │   │   ├── popular/            # 인기 콘텐츠 영역
│   │   │   ├── wishlist/           # 찜한 콘텐츠 표시 영역
│   │   ├── guards/               # 인증 및 접근 제어 로직
│   │   ├── layout/
│   │   │   └── header/            # 상단 헤더 및 공통 레이아웃 요소
│   │   ├── util/                 # 유틸리티 함수 및 서비스 모듈
│   │   │   ├── movie/              # TMDB 관련 API 유틸리티
│   │   │   └── auth/               # 사용자 인증 관련 로직 (TS 기반)
│   │   ├── views/                # 주요 페이지 및 콘텐츠 화면 구성
│   │   │   ├── home_main/          # 홈 메인 배너 및 콘텐츠 UI
│   │   │   ├── home_wishlists/     # 찜 목록 페이지 UI
│   │   │   ├── search/             # 검색 페이지 UI
│   │   │   ├── scroll/             # 스크롤 기능 컴포넌트
│   │   │   ├── views/              # 추가 콘텐츠 화면들
│   ├── models/                 # 전역 데이터 타입 정의 (type.ts)
│   │   └── type.ts
│   ├── App.tsx                 # 전체 앱 라우팅 설정
│   └── index.tsx              # 엔트리 포인트
├── package.json               # 의존성 및 빌드 설정
└── README.md                  # 프로젝트 설명 문서
```

---

## 📝 프로젝트 회고 및 배운 점

- 컴포넌트화된 UI 설계 및 `React Router`를 활용한 페이지 구조화 경험
- Firebase를 통한 사용자 인증 구현 및 클라우드 기반 데이터 저장
- TMDB API를 활용한 비동기 통신 및 실시간 콘텐츠 제공
- GitHub Actions 및 Pages 활용한 자동 배포 경험

---

## 📬 문의

> 기능 제안, 협업 요청, 개선 아이디어는 [Issues](https://github.com/m97j/WSD2_react_netflix_clone/issues)로 남겨주세요!  

---

