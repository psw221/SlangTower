# 슬랭타워 (Slang Tower) — CLAUDE.md

## 프로젝트 개요
2000년대 유행어부터 Gen Z 신조어까지, 글자 조각을 조합해 정답을 맞히는 캐주얼 단어 퍼즐 웹 게임.

## 기술 스택
- React (Vite)
- Tailwind CSS
- LocalStorage (진행 상황 저장)
- JSON 파일 기반 문제 DB

## 핵심 규칙
- 모바일 우선(mobile-first) 디자인
- 컴포넌트는 /src/components/ 에 위치
- 문제 데이터는 /src/data/words.json 에 관리
- 광고 연동 코드는 /src/ads/ 에 분리

## 현재 MVP 범위
- PRD 문서: /docs/PRD_SlangWordGame.md 참고
- Out of Scope 항목은 절대 구현하지 말 것