import { IEntityType } from "./entities";
import { Point, distance, rotateXAroundPoint, rotateYAroundPoint } from "./utils";

// @Speed: Maybe make into const enum?
export const COLLISION_BITS = {
   default: 1 << 0,
   cactus: 1 << 1,
   none: 1 << 2
};

export const DEFAULT_COLLISION_MASK = COLLISION_BITS.default | COLLISION_BITS.cactus;

export type HitboxVertexPositions = [tl: Point, tr: Point, bl: Point, br: Point];

export function entityHasHardCollision(entityType: IEntityType): boolean {
   return entityType === IEntityType.woodenWall || entityType === IEntityType.woodenEmbrasure || entityType === IEntityType.woodenDoor;
}

// @Speed: In the following 2 functions: instead of setting min/max to an initial immediately overridden value, just set min/max to the first dot product directly

const findMinWithOffset = (vertices: ReadonlyArray<Point>, offsetX: number, offsetY: number, axis: Point): number => {
   let min = 999999;
   for (let i = 0; i < 4; i++) {
      const vertex = vertices[i];
      const dotProduct = axis.x * (vertex.x + offsetX) + axis.y * (vertex.y + offsetY);
      if (dotProduct < min) {
         min = dotProduct;
      }
   }

   return min;
}

const findMaxWithOffset = (vertices: ReadonlyArray<Point>, offsetX: number, offsetY: number, axis: Point): number => {
   let max = -999999;
   for (let i = 0; i < 4; i++) {
      const vertex = vertices[i];
      const dotProduct = axis.x * (vertex.x + offsetX) + axis.y * (vertex.y + offsetY);
      if (dotProduct > max) {
         max = dotProduct;
      }
   }

   return max;
}

export function circlesDoIntersect(circle1x: number, circle1y: number, radius1: number, circle2x: number, circle2y: number, radius2: number): boolean {
   const dist = distance(circle1x, circle1y, circle2x, circle2y);
   return dist <= radius1 + radius2;
}

/** Checks if a circle and rectangle are intersecting */
export function circleAndRectangleDoIntersect(circlePosX: number, circlePosY: number, circleRadius: number, rectPosX: number, rectPosY: number, rectWidth: number, rectHeight: number, rectRotation: number): boolean {
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
export function rectanglePointsDoIntersect(vertexPositions1: HitboxVertexPositions, vertexPositions2: HitboxVertexPositions, offset1x: number, offset1y: number, offset2x: number, offset2y: number, axes1: ReadonlyArray<Point>, axes2: ReadonlyArray<Point>): boolean {
   for (let i = 0; i < 2; i++) {
      const axis = axes1[i];

      const min1 = findMinWithOffset(vertexPositions1, offset1x, offset1y, axis);
      const max1 = findMaxWithOffset(vertexPositions1, offset1x, offset1y, axis);
      const min2 = findMinWithOffset(vertexPositions2, offset2x, offset2y, axis);
      const max2 = findMaxWithOffset(vertexPositions2, offset2x, offset2y, axis);

      const isIntersection = min2 < max1 && min1 < max2;
      if (!isIntersection) {
         return false;
      }
   }

   for (let i = 0; i < 2; i++) {
      const axis = axes2[i];

      const min1 = findMinWithOffset(vertexPositions1, offset1x, offset1y, axis);
      const max1 = findMaxWithOffset(vertexPositions1, offset1x, offset1y, axis);
      const min2 = findMinWithOffset(vertexPositions2, offset2x, offset2y, axis);
      const max2 = findMaxWithOffset(vertexPositions2, offset2x, offset2y, axis);

      const isIntersection = min2 < max1 && min1 < max2;
      if (!isIntersection) {
         return false;
      }
   }

   return true;
}