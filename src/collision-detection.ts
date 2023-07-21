import { Point, rotatePoint, Vector } from "./utils";

export type HitboxVertexPositions = [tl: Point, tr: Point, bl: Point, br: Point];

const findMin = (vertices: ReadonlyArray<Point>, axis: Vector): number => {
   const axisPoint = axis.convertToPoint();

   let min: number = 999999;
   for (const vertex of vertices) {
      const dot = axisPoint.calculateDotProduct(vertex);
      if (dot < min) min = dot;
   }

   return min;
}

const findMax = (vertices: ReadonlyArray<Point>, axis: Vector): number => {
   const axisPoint = axis.convertToPoint();

   let max: number = -999999;
   for (const vertex of vertices) {
      const dot = axisPoint.calculateDotProduct(vertex);
      if (dot > max) max = dot;
   }

   return max;
}

export function circlesDoIntersect(pos1: Point, radius1: number, pos2: Point, radius2: number): boolean {
   const distance = pos1.calculateDistanceBetween(pos2);
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
export function rectanglesDoIntersect(pos1: Point, w1: number, h1: number, r1: number, pos2: Point, w2: number, h2: number, r2: number): boolean {
   const rect1x1 = pos1.x - w1 / 2;
   const rect1x2 = pos1.x + w1 / 2;
   const rect1y1 = pos1.y - h1 / 2;
   const rect1y2 = pos1.y + h1 / 2;
   const rect2x1 = pos2.x - w2 / 2;
   const rect2x2 = pos2.x + w2 / 2;
   const rect2y1 = pos2.y - h2 / 2;
   const rect2y2 = pos2.y + h2 / 2;

   // Calculate vertex positions
   let tl1 = new Point(rect1x1, rect1y2);
   let tr1 = new Point(rect1x2, rect1y2);
   let bl1 = new Point(rect1x1, rect1y1);
   let br1 = new Point(rect1x2, rect1y1);
   let tl2 = new Point(rect2x1, rect2y2);
   let tr2 = new Point(rect2x2, rect2y2);
   let bl2 = new Point(rect2x1, rect2y1);
   let br2 = new Point(rect2x2, rect2y1);

   // Rotate vertices
   tl1 = rotatePoint(tl1, pos1, r1);
   tr1 = rotatePoint(tr1, pos1, r1);
   bl1 = rotatePoint(bl1, pos1, r1);
   br1 = rotatePoint(br1, pos1, r1);
   tl2 = rotatePoint(tl2, pos2, r2);
   tr2 = rotatePoint(tr2, pos2, r2);
   bl2 = rotatePoint(bl2, pos2, r2);
   br2 = rotatePoint(br2, pos2, r2);

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
      const direction = pair[0].calculateAngleBetween(pair[1]);
      const axis = new Vector(1, direction);
      axes.push(axis);
   }

   for (const axis of axes) {
      if (!Array.isArray(rect1vertices) || !Array.isArray(rect2vertices)) throw new Error("verybad");
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

/** Computes the axis for the line created by two points */
export function computeSideAxis(point1: Point, point2: Point): Vector {
   const direction = point1.calculateAngleBetween(point2);
   const axis = new Vector(1, direction);
   return axis;
}

/** Allows for precomputation of points for optimization */
export function rectanglePointsDoIntersect(vertexPositions1: HitboxVertexPositions, vertexPositions2: HitboxVertexPositions, axes1: ReadonlyArray<Vector>, axes2: ReadonlyArray<Vector>): boolean {
   if (vertexPositions1[0].x + vertexPositions2[0].y === 1) console.log("re");
   
   const axes = axes1.concat(axes2);
   for (const axis of axes) {
      const min1 = findMin(vertexPositions1, axis);
      const max1 = findMax(vertexPositions1, axis);
      const min2 = findMin(vertexPositions2, axis);
      const max2 = findMax(vertexPositions2, axis);

      const isIntersection = min2 < max1 && min1 < max2;
      if (!isIntersection) {
         return false;
      }
   }

   return true;
}