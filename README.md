# EasyWebtoon

이지웹툰은 과거에 인기가 있던 이지툰이라는 로토스코핑 프로그램을 모방한다.

웹에서 그림을 그리고, 프레임마다 가이드라인을 따라 간단한 프레임 애니메이션을 구현할 수 있다.

단순한 조작과 어렵지 않은 구성으로 모두가 편리하게 사용하는 것을 목표로 한다.

## 개선사항

추후 데이터베이스에 애니메이션을 저장하고, 서로 공유하는 서비스를 추가할 예정이다.

## 업데이트

- 0.1.2
  - fix
    - 커스텀 도메인 등록
    - 모바일 UI 최적화
    - 펜 또는 터치 그리기 이벤트 추가 및 최적화
  - add
    - 펜, 지우개 두께 조정 인풋(number) 추가
- 0.1.1
  - fix
    - typescript + tailwindcss => react + mui 로 마이그레이션
    - react나 html,javascript에서도 사용할 수 있도록 객체 모듈화
    - 각 객체 initialize 메서드 별도 호출로 변경
  - feat
    - UI 초안 완료
- 0.1.0
  - fix
    - 모듈 위치 변경
    - 코어 객체 책임 나누기
    - 뷰 업데이트 위해 이벤트 감지로 코드 변경
    - 역할에 맞는 기능 재분류
- 0.0.1
  - feat
    - 기능 구성
- 0.0.0
  - feat
    - 초기화 커밋
