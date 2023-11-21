import { SETTINGS } from "./settings";

/**
 * Returns a random integer inclusively.
 * @param min The minimum value of the random number.
 * @param max The maximum value of the random number.
 * @returns A random integer between the min and max values.
 */
 export function randInt(min: number, max: number): number {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randFloat (min: number, max: number): number {
   return Math.random() * (max - min) + min;
}

export class Point {
   public x: number;
   public y: number;

   constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
   }

   public add(other: Point): void {
      this.x += other.x;
      this.y += other.y;
   };

   public subtract(other: Point): void {
      this.x -= other.x;
      this.y -= other.y;
   }

   public calculateDotProduct(other: Point): number {
      return this.x * other.x + this.y * other.y;
   }

   public calculateDistanceBetween(other: Point): number {
      return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
   }

   public calculateAngleBetween(other: Point): number {
      let angle = Math.atan2(other.y - this.y, other.x - this.x);
      return Math.PI/2 - angle;
   }

   public convertToVector(other?: Point): Vector {
      const targetPoint = other || new Point(0, 0);

      const distance = this.calculateDistanceBetween(targetPoint);
      const angle = targetPoint.calculateAngleBetween(this);
      return new Vector(distance, angle);
   }

   public copy(): Point {
      return new Point(this.x, this.y);
   }

   public length(): number {
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
   }

   public lengthSquared(): number {
      return Math.pow(this.x, 2) + Math.pow(this.y, 2);
   }
   
   public package(): [number, number] {
      return [this.x, this.y];
   }

   public static unpackage(packagedPoint: [number, number]): Point {
      return new Point(packagedPoint[0], packagedPoint[1]);
   }
   public static fromVectorForm(magnitude: number, direction: number): Point {
      const x = magnitude * Math.sin(direction);
      const y = magnitude * Math.cos(direction);
      return new Point(x, y);
   }
}

export class Vector {
   public magnitude: number;
   public direction: number;

   constructor(magnitude: number, direction: number) {
      this.magnitude = magnitude;
      this.direction = direction;
   }

   public convertToPoint(): Point {
      // Note: direction is measured clockwise from the positive y axis, so we flip the purposes of sin and cos here
      // (E.g. at theta = 0, we want x = 0, so we use sin)
      const x = Math.sin(this.direction) * this.magnitude;
      const y = Math.cos(this.direction) * this.magnitude;
      return new Point(x, y);
   }

   public add(other: Vector): void {
      const cartesianForm = this.convertToPoint();
      cartesianForm.add(other.convertToPoint());
      
      const polarForm = cartesianForm.convertToVector();
      this.magnitude = polarForm.magnitude;
      this.direction = polarForm.direction;
   }

   public subtract(other: Vector): void {
      const cartesianForm = this.convertToPoint();
      cartesianForm.subtract(other.convertToPoint());
      const polarForm = cartesianForm.convertToVector();
      this.magnitude = polarForm.magnitude;
      this.direction = polarForm.direction;
   }

   public copy(): Vector {
      return new Vector(this.magnitude, this.direction);
   }

   public static randomUnitVector(): Vector {
      const theta = randFloat(0, 2 * Math.PI);
      return new Vector(1, theta);
   }

   public package(): [number, number] {
      return [this.magnitude, this.direction];
   }

   public normalise(): void {
      this.magnitude = 1;
   }

   public static unpackage(packagedVector: [number, number]): Vector {
      return new Vector(packagedVector[0], packagedVector[1]);
   }
}

export function lerp(start: number, end: number, amount: number): number {
   return start * (1 - amount) + end * amount;
}

export type Mutable<T> = {
   -readonly [P in keyof T]: T[P];
};

export function randItem<T>(arr: Array<T> | ReadonlyArray<T>): T {
   if (arr.length === 0) throw new Error("Array has no items in it!");

   return arr[Math.floor(Math.random() * arr.length)];
}

export function flipAngle(angle: number): number {
   return (angle + Math.PI) % Math.PI;
}

export function rotateXAroundPoint(x: number, y: number, pivotX: number, pivotY: number, rotation: number): number {
   return Math.cos(rotation) * (x - pivotX) + Math.sin(rotation) * (y - pivotY) + pivotX;
}

export function rotateYAroundPoint(x: number, y: number, pivotX: number, pivotY: number, rotation: number): number {
   return -Math.sin(rotation) * (x - pivotX) + Math.cos(rotation) * (y - pivotY) + pivotY;
}

export function rotateXAroundOrigin(x: number, y: number, rotation: number): number {
   return Math.cos(rotation) * x + Math.sin(rotation) * y;
}

export function rotateYAroundOrigin(x: number, y: number, rotation: number): number {
   return -Math.sin(rotation) * x + Math.cos(rotation) * y;
}

export function rotatePoint(point: Point, pivotPoint: Point, rotation: number): Point {
   const x = Math.cos(rotation) * (point.x - pivotPoint.x) + Math.sin(rotation) * (point.y - pivotPoint.y) + pivotPoint.x;
   const y = -Math.sin(rotation) * (point.x - pivotPoint.x) + Math.cos(rotation) * (point.y - pivotPoint.y) + pivotPoint.y;
   return new Point(x, y);
}

export function roundNum(num: number, dp: number): number {
   const power = Math.pow(10, dp)
   const roundedNum = Math.round((num + 2e-52) * power) / power;
   return roundedNum;
}

/**
 * Calculates the curved weight of a given weight value from 0-1
 * Note: the power param must be above 0
 * */
export function curveWeight(baseWeight: number, power: number, flatWeight?: number): number {
   let curvedWeight = -Math.pow(-baseWeight + 1, power) + 1;

   if (typeof flatWeight !== "undefined") {
      curvedWeight += flatWeight * (1 - baseWeight)
   }
   
   return curvedWeight;
}

export function veryBadHash(seed: string): number {
   let hash = 0;
   for (let i = 0, len = seed.length; i < len; i++) {
      let chr = seed.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
   }
   return hash;
}

export function clampToBoardDimensions(tileCoord: number): number {
   if (tileCoord < 0) {
      return 0;
   }
   if (tileCoord >= SETTINGS.BOARD_DIMENSIONS) {
      return SETTINGS.BOARD_DIMENSIONS - 1;
   }
   return tileCoord;
}

export function clamp(num: number, min: number, max: number): number {
   if (num < min) {
      return min;
   }
   if (num > max) {
      return max;
   }
   return num;
}

export function randSign(): number {
   return Math.random() < 0.5 ? 1 : 0;
}

export function distance(x1: number, y1: number, x2: number, y2: number): number {
   return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

export function angle(x: number, y: number): number {
   return Math.PI/2 - Math.atan2(y, x);
}

export function customTickIntervalHasPassed(ticks: number, intervalSeconds: number): boolean {
   const ticksPerInterval = intervalSeconds * SETTINGS.TPS;
   
   const previousCheck = (ticks - 1) / ticksPerInterval;
   const check = ticks / ticksPerInterval;
   return Math.floor(previousCheck) !== Math.floor(check);
}

function sqr(x: number) { return x * x }
function dist2(v: Point, w: Point) {return sqr(v.x - w.x) + sqr(v.y - w.y) }
function distToSegmentSquared(p: Point, v: Point, w: Point) {
  var l2 = dist2(v, w);
  if (l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist2(p, new Point(v.x + t * (w.x - v.x),
                    v.y + t * (w.y - v.y) ));
}
export function distToSegment(p: Point, v: Point, w: Point) { return Math.sqrt(distToSegmentSquared(p, v, w)); }

export function pointIsInRectangle(pointX: number, pointY: number, rectPos: Point, rectOffset: Point, rectWidth: number, rectHeight: number, rectRotation: number): boolean {
   const rectPosX = rectPos.x + rectOffset.x;
   const rectPosY = rectPos.y + rectOffset.y;
   
   // Rotate point around rect to make the situation axis-aligned
   const alignedPointX = rotateXAroundPoint(pointX, pointY, rectPosX, rectPosY, -rectRotation);
   const alignedPointY = rotateYAroundPoint(pointX, pointY, rectPosX, rectPosY, -rectRotation);

   const x1 = rectPosX - rectWidth / 2;
   const x2 = rectPosX + rectWidth / 2;
   const y1 = rectPosY - rectHeight / 2;
   const y2 = rectPosY + rectHeight / 2;
   
   return alignedPointX >= x1 && alignedPointX <= x2 && alignedPointY >= y1 && alignedPointY <= y2;
}