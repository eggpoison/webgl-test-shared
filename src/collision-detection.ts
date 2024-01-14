import { Point, distance, rotateXAroundOrigin, rotateXAroundPoint, rotateYAroundPoint } from "./utils";

// @Speed: Maybe make into const enum?
export const COLLISION_BITS = {
   other: 1 << 0,
   cactus: 1 << 1
};

let defaultCollisionMask = 0;
for (const bit of Object.values(COLLISION_BITS)) {
   defaultCollisionMask |= bit;
}
export const DEFAULT_COLLISION_MASK = defaultCollisionMask;

export type HitboxVertexPositions = [tl: Point, tr: Point, bl: Point, br: Point];

// @Speed: In the following 4 functions: instead of setting min/max to an initial immediately overridden value, just set min/max to the first dot product directly

const findMin = (vertices: ReadonlyArray<Point>, axis: Point): number => {
   let min = 999999;
   for (const vertex of vertices) {
      const dot = axis.calculateDotProduct(vertex);
      if (dot < min) min = dot;
   }

   return min;
}

const findMax = (vertices: ReadonlyArray<Point>, axis: Point): number => {
   let max = -999999;
   for (const vertex of vertices) {
      const dot = axis.calculateDotProduct(vertex);
      if (dot > max) max = dot;
   }

   return max;
}

const findMinWithOffset = (vertices: ReadonlyArray<Point>, offset: Point, axis: Point): number => {
   let min = 999999;
   for (let i = 0; i < 4; i++) {
      const vertex = vertices[i];
      const dotProduct = axis.x * (vertex.x + offset.x) + axis.y * (vertex.y + offset.y);
      if (dotProduct < min) {
         min = dotProduct;
      }
   }

   return min;
}

const findMaxWithOffset = (vertices: ReadonlyArray<Point>, offset: Point, axis: Point): number => {
   let max = -999999;
   for (let i = 0; i < 4; i++) {
      const vertex = vertices[i];
      const dotProduct = axis.x * (vertex.x + offset.x) + axis.y * (vertex.y + offset.y);
      if (dotProduct > max) {
         max = dotProduct;
      }
   }

   return max;
}

export function circlesDoIntersect(pos1: Point, radius1: number, pos2: Point, radius2: number): boolean {
   const distance = pos1.calculateDistanceBetween(pos2);
   return distance <= radius1 + radius2;
}

export function circlesDoIntersectWithOffset(circle1x: number, circle1y: number, radius1: number, circle2x: number, circle2y: number, radius2: number): boolean {
   const dist = distance(circle1x, circle1y, circle2x, circle2y);
   return dist <= radius1 + radius2;
}

/** Checks if a circle and rectangle are intersecting */
export function circleAndRectangleDoIntersect(circlePos: Point, circleRadius: number, rectPos: Point, rectWidth: number, rectHeight: number, rectRotation: number): boolean {
   // Rotate the circle around the rectangle to "align" it
   const alignedCirclePosX = rotateXAroundPoint(circlePos.x, circlePos.y, rectPos.x, rectPos.y, -rectRotation);
   const alignedCirclePosY = rotateYAroundPoint(circlePos.x, circlePos.y, rectPos.x, rectPos.y, -rectRotation);

   // 
   // Then do a regular rectangle check
   // 

   const distanceX = Math.abs(alignedCirclePosX - rectPos.x);
   const distanceY = Math.abs(alignedCirclePosY - rectPos.y);

   if (distanceX > (rectWidth/2 + circleRadius)) return false;
   if (distanceY > (rectHeight/2 + circleRadius)) return false;

   if (distanceX <= rectWidth/2) return true;
   if (distanceY <= rectHeight/2) return true;

   const cornerDistanceSquared = Math.pow(distanceX - rectWidth/2, 2) + Math.pow(distanceY - rectHeight/2, 2);
   return cornerDistanceSquared <= Math.pow(circleRadius, 2);
}

/** Checks if a circle and rectangle are intersecting */
export function circleAndRectangleDoIntersectWithOffset(circlePos: Point, circleOffset: Point, circleRadius: number, rectPos: Point, rectOffset: Point, rectWidth: number, rectHeight: number, rectRotation: number): boolean {
   const circlePosX = circlePos.x + circleOffset.x;
   const circlePosY = circlePos.y + circleOffset.y;
   const rectPosX = rectPos.x + rectOffset.x;
   const rectPosY = rectPos.y + rectOffset.y;
   
   // Rotate the circle around the rectangle to "align" it
   const alignedCirclePosX = rotateXAroundPoint(circlePosX, circlePosY, rectPosX, rectPosY, -rectRotation);
   const alignedCirclePosY = rotateYAroundPoint(circlePosX, circlePosY, rectPosX, rectPosY, -rectRotation);

   // 
   // Then do a regular rectangle check
   // 

   const distanceX = Math.abs(alignedCirclePosX - rectPosX);
   const distanceY = Math.abs(alignedCirclePosY - rectPosY);

   if (distanceX > (rectWidth/2 + circleRadius)) return false;
   if (distanceY > (rectHeight/2 + circleRadius)) return false;

   if (distanceX <= rectWidth/2) return true;
   if (distanceY <= rectHeight/2) return true;

   const cornerDistanceSquared = Math.pow(distanceX - rectWidth/2, 2) + Math.pow(distanceY - rectHeight/2, 2);
   return cornerDistanceSquared <= Math.pow(circleRadius, 2);
}

/** Computes the axis for the line created by two points */
export function computeSideAxis(point1: Point, point2: Point): Point {
   const direction = point1.calculateAngleBetween(point2);
   return Point.fromVectorForm(1, direction);
}

/** Allows for precomputation of points for optimization */
export function rectanglePointsDoIntersect(vertexPositions1: HitboxVertexPositions, vertexPositions2: HitboxVertexPositions, axes1: ReadonlyArray<Point>, axes2: ReadonlyArray<Point>): boolean {
   for (const axis of axes1) {
      const min1 = findMin(vertexPositions1, axis);
      const max1 = findMax(vertexPositions1, axis);
      const min2 = findMin(vertexPositions2, axis);
      const max2 = findMax(vertexPositions2, axis);

      const isIntersection = min2 < max1 && min1 < max2;
      if (!isIntersection) {
         return false;
      }
   }
   for (const axis of axes2) {
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

/** Allows for precomputation of points for optimization */
export function rectanglePointsDoIntersectWithOffset(vertexPositions1: HitboxVertexPositions, vertexPositions2: HitboxVertexPositions, offset1: Point, offset2: Point, axes1: ReadonlyArray<Point>, axes2: ReadonlyArray<Point>): boolean {
   for (let i = 0; i < 2; i++) {
      const axis = axes1[i];

      const min1 = findMinWithOffset(vertexPositions1, offset1, axis);
      const max1 = findMaxWithOffset(vertexPositions1, offset1, axis);
      const min2 = findMinWithOffset(vertexPositions2, offset2, axis);
      const max2 = findMaxWithOffset(vertexPositions2, offset2, axis);

      const isIntersection = min2 < max1 && min1 < max2;
      if (!isIntersection) {
         return false;
      }
   }

   for (let i = 0; i < 2; i++) {
      const axis = axes2[i];

      const min1 = findMinWithOffset(vertexPositions1, offset1, axis);
      const max1 = findMaxWithOffset(vertexPositions1, offset1, axis);
      const min2 = findMinWithOffset(vertexPositions2, offset2, axis);
      const max2 = findMaxWithOffset(vertexPositions2, offset2, axis);

      const isIntersection = min2 < max1 && min1 < max2;
      if (!isIntersection) {
         return false;
      }
   }

   return true;
}