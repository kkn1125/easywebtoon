export const ERROR_CODE = {
  /* app */
  a001: "앱 데이터가 로드 되었습니다!",
  /* data */
  d001: "데이터가 로드됐습니다!",
  d002: "현재 데이터를 저장했습니다!",
  /* toon */
  t000: "툴 모듈 초기화 완료!",
  t001: "새로운 툰을 생성했습니다!",
  t399: "현재 툰을 변경했습니다.",
  t400: "선택한 툰을 제거했습니다.",
  t401: "툰 이름을 변경했습니다.",
  t404: "툰을 삭제할 수 없습니다. 최소 1개 이상이어야 합니다.",
  /* animator */
  am001: "애니메이터 초기화 완료!",
  /* sequence */
  //
  /* export gif */
  g001: "GIT 내보내기 완료!",
  g002: "GIT 파일 반복 재생 설정되었습니다.",
  g003: "GIT 파일 반복 재생 해제되었습니다.",
} as const;
export type ERROR_CODE = (typeof ERROR_CODE)[keyof typeof ERROR_CODE];
