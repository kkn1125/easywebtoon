// 저장된 그림 데이터를 불러와서 렌더링
export function loadDrawing(): Point[][] {
  const drawingJSON = localStorage.getItem("drawing");
  if (!drawingJSON) return [];
  return JSON.parse(drawingJSON);
}
