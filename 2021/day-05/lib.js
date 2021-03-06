export const HORIZONTAL = "horizontal";
export const VERTICAL = "vertical";
const DIAGONAL = "diagonal";

export function parseVentLinesFromInput(input) {
  const ventLines = input.split("\n").map((rawLine) => {
    return rawLine
      .split(" -> ")
      .map((coords) => coords.split(",").map((coord) => parseInt(coord)));
  });
  return ventLines;
}

export function drawVentPathsFromLines(ventLines) {
  const ventPaths = ventLines.map((line) => {
    const [start, end] = line;
    const [startX, startY] = start;
    const [endX, endY] = end;

    if (getLineDirection(line) === HORIZONTAL) {
      const startPosition = startX < endX ? startX : endX;
      const endPosition = startX > endX ? startX : endX;
      const path = [];
      for (
        let currentPosition = startPosition;
        currentPosition <= endPosition;
        currentPosition++
      ) {
        path.push([currentPosition, startY]);
      }
      return path;
    }

    if (getLineDirection(line) === VERTICAL) {
      const startPosition = startY < endY ? startY : endY;
      const endPosition = startY > endY ? startY : endY;
      const path = [];
      for (
        let currentPosition = startPosition;
        currentPosition <= endPosition;
        currentPosition++
      ) {
        path.push([startX, currentPosition]);
      }
      return path;
    }

    if (getLineDirection(line) === DIAGONAL) {
      const isXIncreasing = startX < endX;
      const isYIncreasing = startY < endY;
      const path = [];
      let currentXPosition = startX;
      let currentYPosition = startY;
      let i = 0;
      path.push([startX, startY]);
      while (currentXPosition !== endX) {
        isXIncreasing ? currentXPosition++ : currentXPosition--;
        isYIncreasing ? currentYPosition++ : currentYPosition--;
        path.push([currentXPosition, currentYPosition]);
      }
      return path;
    }

    throw new Error("Unknown direction");
  });
  return ventPaths;
}

export function getLineDirection(line) {
  const [start, end] = line;
  const [startX, startY] = start;
  const [endX, endY] = end;
  if (startX === endX) {
    return VERTICAL;
  } else if (startY === endY) {
    return HORIZONTAL;
  } else {
    return DIAGONAL;
  }
}

export function countDangerousPoint(ventPaths) {
  const positions = ventPaths.flat();
  const positionCount = positions.reduce((counts, position) => {
    const positionIndex = position.join(";");
    counts[positionIndex] = (counts[positionIndex] || 0) + 1;
    return counts;
  }, {});
  const dangerousPoints = Object.entries(positionCount).filter(
    ([_, count]) => count > 1
  );

  return dangerousPoints.length;
}
