import { Point, rotatePoint, Vector } from "./utils";

const findMin = (vertices: ReadonlyArray<Point>, axis: Vector): number => {
   const axisPoint = axis.convertToPoint();

   let min: number = 999999;
   for (const vertex of vertices) {
      const dot = axisPoint.dot(vertex);
      if (dot < min) min = dot;
   }

   return min;
}

const findMax = (vertices: ReadonlyArray<Point>, axis: Vector): number => {
   const axisPoint = axis.convertToPoint();

   let max: number = -999999;
   for (const vertex of vertices) {
      const dot = axisPoint.dot(vertex);
      if (dot > max) max = dot;
   }

   return max;
}

export function circlesDoIntersect(pos1: Point, radius1: number, pos2: Point, radius2: number): boolean {
   const distance = pos1.distanceFrom(pos2);
   return distance <= radius1 + radius2;
}

/** Checks if a circle and rectangle are intersecting */
export function circleAndRectangleDoIntersect(circlePos: Point, circleRadius: number, rectPos: Point, rectWidth: number, rectHeight: number, rectRotation: number): boolean {
   const x1 = rectPos.x - rectWidth / 2;
   const x2 = rectPos.x + rectWidth / 2;
   const y1 = rectPos.y - rectHeight / 2;
   const y2 = rectPos.y + rectHeight / 2;
   let tl = new Point(x1, y2);
   let tr = new Point(x2, y2);
   let bl = new Point(x1, y1);
   let br = new Point(x2, y1);

   // Rotate the rectangle's points to be axis aligned
   tl = rotatePoint(tl, rectPos, -rectRotation);
   tr = rotatePoint(tr, rectPos, -rectRotation);
   bl = rotatePoint(bl, rectPos, -rectRotation);
   br = rotatePoint(br, rectPos, -rectRotation);

   // Rotate the circle around the rectangle to "align" it
   const alignedCirclePos = rotatePoint(circlePos, rectPos, -rectRotation);

   // 
   // Then do a regular rectangle check
   // 

   const distanceX = Math.abs(alignedCirclePos.x - rectPos.x);
   const distanceY = Math.abs(alignedCirclePos.y - rectPos.y);

   if (distanceX > (rectWidth/2 + circleRadius)) return false;
   if (distanceY > (rectHeight/2 + circleRadius)) return false;

   if (distanceX <= rectWidth/2) return true;
   if (distanceY <= rectHeight/2) return true;

   const cornerDistanceSquared = Math.pow(distanceX - rectWidth/2, 2) + Math.pow(distanceY - rectHeight/2, 2);
   return cornerDistanceSquared <= Math.pow(circleRadius, 2);
}

/** Uses the separating axis theorem to check for intersection between rectangles */
export function rectanglesDoIntersect(pos1: Point, w1: number, h1: number, pos2: Point, w2: number, h2: number): boolean {
   const rect1x1 = pos1.x - w1 / 2;
   const rect1x2 = pos1.x + w1 / 2;
   const rect1y1 = pos1.y - h1 / 2;
   const rect1y2 = pos1.y + h1 / 2;
   const rect2x1 = pos2.x - w2 / 2;
   const rect2x2 = pos2.x + w2 / 2;
   const rect2y1 = pos2.y - h2 / 2;
   const rect2y2 = pos2.y + h2 / 2;

   // Calculate corner positions
   const tl1 = new Point(rect1x1, rect1y2);
   const tr1 = new Point(rect1x2, rect1y2);
   const bl1 = new Point(rect1x1, rect1y1);
   const br1 = new Point(rect1x2, rect1y1);
   const tl2 = new Point(rect2x1, rect2y2);
   const tr2 = new Point(rect2x2, rect2y2);
   const bl2 = new Point(rect2x1, rect2y1);
   const br2 = new Point(rect2x2, rect2y1);

   const rect1vertices: ReadonlyArray<Point> = [tl1, tr1, bl1, br1];
   const rect2vertices: ReadonlyArray<Point> = [tl2, tr2, bl2, br2];

   // Find axes to check intervals with
   const cornerPairs: ReadonlyArray<[Point, Point]> = [
      [tl1, tr1],
      [tr1, br1],
      [tl2, tr2],
      [tl2, bl2]
   ];
   const axes = new Array<Vector>();
   for (const pair of cornerPairs) {
      const direction = pair[0].angleBetween(pair[1]);
      const axis = new Vector(1, direction);
      axes.push(axis);
   }

   for (const axis of axes) {
      const min1 = findMin(rect1vertices, axis);
      const max1 = findMax(rect1vertices, axis);
      const min2 = findMin(rect2vertices, axis);
      const max2 = findMax(rect2vertices, axis);

      const isIntersection = min2 < max1 && min1 < max2;
      if (!isIntersection) {
         return false;
      }
   }

   return true;
}