import { Point, rotateXAroundPoint, rotateYAroundPoint } from "./utils";

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

const findMin = (vertices: ReadonlyArray<Point>, axis: Point): number => {
   let min: number = 999999;
   for (const vertex of vertices) {
      const dot = axis.calculateDotProduct(vertex);
      if (dot < min) min = dot;
   }

   return min;
}

const findMax = (vertices: ReadonlyArray<Point>, axis: Point): number => {
   let max: number = -999999;
   for (const vertex of vertices) {
      const dot = axis.calculateDotProduct(vertex);
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