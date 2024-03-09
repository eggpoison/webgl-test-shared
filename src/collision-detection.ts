import { Point, distance, rotateXAroundPoint, rotateYAroundPoint } from "./utils";

// @Speed: Maybe make into const enum?
export const COLLISION_BITS = {
   default: 1 << 0,
   cactus: 1 << 1,
   none: 1 << 2,
   iceSpikes: 1 << 3
};

export const DEFAULT_COLLISION_MASK = COLLISION_BITS.default | COLLISION_BITS.cactus | COLLISION_BITS.iceSpikes;

export type HitboxVertexPositions = [tl: Point, tr: Point, bl: Point, br: Point];

const findMinWithOffset = (vertices: ReadonlyArray<Point>, offsetX: number, offsetY: number, axisX: number, axisY: number): number => {
   const firstVertex = vertices[0];
   let min = axisX * (firstVertex.x + offsetX) + axisY * (firstVertex.y + offsetY);

   for (let i = 1; i < 4; i++) {
      const vertex = vertices[i];
      const dotProduct = axisX * (vertex.x + offsetX) + axisY * (vertex.y + offsetY);
      if (dotProduct < min) {
         min = dotProduct;
      }
   }

   return min;
}

const findMaxWithOffset = (vertices: ReadonlyArray<Point>, offsetX: number, offsetY: number, axisX: number, axisY: number): number => {
   const firstVertex = vertices[0];
   let max = axisX * (firstVertex.x + offsetX) + axisY * (firstVertex.y + offsetY);

   for (let i = 1; i < 4; i++) {
      const vertex = vertices[i];
      const dotProduct = axisX * (vertex.x + offsetX) + axisY * (vertex.y + offsetY);
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
export function rectanglePointsDoIntersect(vertexPositions1: HitboxVertexPositions, vertexPositions2: HitboxVertexPositions, offset1x: number, offset1y: number, offset2x: number, offset2y: number, axis1x: number, axis1y: number, axis2x: number, axis2y: number): boolean {
   // Axis 1
   const axis1min1 = findMinWithOffset(vertexPositions1, offset1x, offset1y, axis1x, axis1y);
   const axis1max1 = findMaxWithOffset(vertexPositions1, offset1x, offset1y, axis1x, axis1y);
   const axis1min2 = findMinWithOffset(vertexPositions2, offset2x, offset2y, axis1x, axis1y);
   const axis1max2 = findMaxWithOffset(vertexPositions2, offset2x, offset2y, axis1x, axis1y);
   if (axis1min2 >= axis1max1 || axis1min1 >= axis1max2) {
      return false;
   }

   // Axis 1 complement
   const axis1ComplementMin1 = findMinWithOffset(vertexPositions1, offset1x, offset1y, -axis1y, axis1x);
   const axis1ComplementMax1 = findMaxWithOffset(vertexPositions1, offset1x, offset1y, -axis1y, axis1x);
   const axis1ComplementMin2 = findMinWithOffset(vertexPositions2, offset2x, offset2y, -axis1y, axis1x);
   const axis1ComplementMax2 = findMaxWithOffset(vertexPositions2, offset2x, offset2y, -axis1y, axis1x);
   if (axis1ComplementMin2 >= axis1ComplementMax1 || axis1ComplementMin1 >= axis1ComplementMax2) {
      return false;
   }
   
   // Axis 2
   const axis2min1 = findMinWithOffset(vertexPositions1, offset1x, offset1y, axis2x, axis2y);
   const axis2max1 = findMaxWithOffset(vertexPositions1, offset1x, offset1y, axis2x, axis2y);
   const axis2min2 = findMinWithOffset(vertexPositions2, offset2x, offset2y, axis2x, axis2y);
   const axis2max2 = findMaxWithOffset(vertexPositions2, offset2x, offset2y, axis2x, axis2y);
   if (axis2min2 >= axis2max1 || axis2min1 >= axis2max2) {
      return false;
   }

   // Axis 2 complement
   const axis2ComplementMin1 = findMinWithOffset(vertexPositions1, offset1x, offset1y, -axis2y, axis2x);
   const axis2ComplementMax1 = findMaxWithOffset(vertexPositions1, offset1x, offset1y, -axis2y, axis2x);
   const axis2ComplementMin2 = findMinWithOffset(vertexPositions2, offset2x, offset2y, -axis2y, axis2x);
   const axis2ComplementMax2 = findMaxWithOffset(vertexPositions2, offset2x, offset2y, -axis2y, axis2x);
   if (axis2ComplementMin2 >= axis2ComplementMax1 || axis2ComplementMin1 >= axis2ComplementMax2) {
      return false;
   }

   return true;
}