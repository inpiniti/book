# 📚 Book Repository - Source Code Analysis

## 프로젝트 개요

이 프로젝트는 Nuxt 3를 기반으로 한 웹 애플리케이션으로, 주로 책 및 음반 데이터의 시각화와 AI 모델 인터페이스를 제공합니다. 주요 기능은 OpenAI API와의 연동, 주간 책 랭킹 데이터 크롤링·저장, 다양한 프론트엔드 UI 컴포넌트(차트, 테이블, 공유 등)를 포함합니다.

---

## 핵심 아키텍처 및 주요 기능

### 1. Nuxt 3 기반의 프론트엔드
- **pages/chart/index.vue**: Playground UI를 제공하며, 다양한 프롬프트 입력, 모델/파라미터 선택, 결과 공유, 코드 뷰어 등 기능이 있습니다.
- **pages/chart/components/CodeViewer.vue**: OpenAI API를 활용하는 파이썬 코드 샘플을 보여주며, 환경 변수로 API 키 관리 권장.
- **pages/book/columns.ts**: 책 랭킹 테이블의 컬럼 및 정렬/셀 렌더링 로직.
- **layouts/menu.vue, layouts/side.vue**: 플레이리스트, 라이브러리 관리 등 음악 앱 유사 메뉴 구조.

### 2. OpenAI 모델 및 프롬프트 Playground
- 다양한 GPT/Codex 모델(`pages/chart/data/models.ts`)을 선택해 자연어 프롬프트를 입력하고, 완성·삽입·편집 등 작업 수행.
- 각 모델의 특징과 장점을 상세하게 기술하여 사용자에게 안내.

### 3. 데이터 크롤링 및 저장
- **server/api/book/[week].ts**: axios, cheerio, iconv를 활용하여 오리콘 주간 랭킹(최대 3페이지) 데이터를 크롤링.
- Supabase를 통한 DB 저장 및 관리.

### 4. TailwindCSS 디자인 시스템
- **tailwind.config.js, assets/css/tailwind.css**: 커스텀 색상 변수와 애니메이션 등 확장 설정.
- 반응형 UI, 다크 모드 및 접근성 고려.

### 5. 기타 기능
- **data/albums.ts**: 앨범/아티스트 샘플 데이터 제공.
- 다양한 버튼, 메뉴, 탭 등 컴포넌트화된 UI 요소.

---

## 실행 방법

설치 및 실행 가이드, 배포 관련 내용은 Nuxt 3 공식 [문서](https://nuxt.com/docs/getting-started/introduction) 참고.

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

---

## 기술 스택

- **Nuxt 3** (Vue 3 기반)
- **Typescript**
- **TailwindCSS**
- **Supabase** (DB)
- **OpenAI API**
- **axios, cheerio, iconv** (크롤링)

---

## 주요 코드 예시

```python
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")
response = openai.Completion.create(
    model="davinci",
    prompt="",
    temperature=0.9,
    max_tokens=5,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0,
)
```

---

## 보안 및 환경 변수 관리

- OpenAI, Supabase 등 서비스 키는 `.env` 환경 변수로 관리하고, 외부에 노출하지 않도록 주의하세요.

---

## 참고

- Nuxt 공식 문서: [Nuxt 3 Getting Started](https://nuxt.com/docs/getting-started/introduction)
- 배포: [Nuxt Deployment Guide](https://nuxt.com/docs/getting-started/deployment)

---

본 README는 소스코드 전체 구조 및 기능 분석을 기반으로 작성되었습니다.