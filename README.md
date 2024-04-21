# EasyWebtoon

이지웹툰은 과거에 인기가 있던 이지툰이라는 로토스코핑 프로그램을 모방한다.

웹에서 그림을 그리고, 프레임마다 가이드라인을 따라 간단한 프레임 애니메이션을 구현할 수 있다.

단순한 조작과 어렵지 않은 구성으로 모두가 편리하게 사용하는 것을 목표로 한다.

## 개선사항

추후 데이터베이스에 애니메이션을 저장하고, 서로 공유하는 서비스를 추가할 예정이다.

## 업데이트

- 0.1.7
  - fix
    - 모바일 선긋기 점 찍히는 버그 수정
    - 헤더 좌우 패딩 추가
    - 툰 삭제 얼럿 메세지 누락 수정
    - ipad 선 좌표 벗어나는 버그 수정
  - add
    - 페이지 추가, 삭제, 복사, 복사 초기화, 붙여넣기 등 얼럿 메세지 추가
- 0.1.6
  - fix
    - 페인트 부하 처리 및 로컬스토리지 용량 초과로 기능 보류
    - 영어 얼럿 한글화
    - toon 변경 시 페이지 리렌더 안되는 버그 수정
    - easywebtoon 객체 provider로 전역 관리
    - 얼럿 최대 팝업 개수 지정 및 추가 팝업 제거 후 나머지 얼럿 처리
  - add
    - toon 삭제, 이름변경 기능 추가
    - 얼럿 타이머 컴포넌트 추가
- 0.1.5
  - fix
    - 각 모듈 객체 부모객체 이벤트 리스너 등록 및 테스트
  - add
    - 외부 명령과 상호작용하기 위해 리스너 모델 추가 및 연결 테스트
    - alert 컴포넌트 및 관리 컨텐스트 추가
    - easywebtoon 객체 이벤트 관리자 및 리스너 추가
- 0.1.4
  - add
    - 로고 추가
    - 헤더 바 추가
- 0.1.3
  - feat
    - 툴 모듈 리팩터링
    - 중복 타입 정의 제거
  - fix
    - 버튼 텍스트 한글화
    - 모바일 및 PC에서 보이는 버튼 위치 정렬 최적화
    - 빌드 시 커스텀 도메인 초기화 되는 버그 수정
    - 복사 아이콘 svg 수정(복사 초기화에 사용)
    - 점 찍기 안되는 버그 수정
    - 선택형 버튼 활성화 표시
    - 페이지 추가 앞, 뒤 버튼으로 두 가지 유형 추가
    - 모바일에서 반복 설정 시 버튼 UI 깨지는 현상 수정
  - add
    - 복사, 붙여넣기 숏컷 추가
    - 복사 초기화 버튼 추가
    - 앞,뒤 페이지 가이드라인 토글 추가
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
