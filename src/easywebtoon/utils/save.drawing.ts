// 그림 데이터를 JSON으로 변환하여 저장
export function saveDrawing(drawing: Point[][]) {
  const drawingJSON = JSON.stringify(drawing);
  localStorage.setItem("drawing", drawingJSON);
  return drawingJSON;
}
