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

   public add(other: Point): Point {
      return new Point(
         this.x + other.x,
         this.y + other.y
      );
   };

   public subtract(other: Point): Point {
      return new Point(
         this.x - other.x,
         this.y - other.y
      );
   }

   public dot(other: Point): number {
      return this.x * other.x + this.y * other.y;
   }

   public distanceFrom(other: Point): number {
      const distance = Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
      return distance;
   }

   public angleBetween(other: Point): number {
      const angle = Math.atan2(other.y - this.y, other.x - this.x);
      return angle;
   }

   public convertToVector(other?: Point): Vector {
      const targetPoint = other || new Point(0, 0);

      const distance = this.distanceFrom(targetPoint);
      const angle = targetPoint.angleBetween(this);
      return new Vector(distance, angle);
   }

   public copy(): Point {
      return new Point(this.x, this.y);
   }

   public package(): [number, number] {
      return [this.x, this.y];
   }

   public static unpackage(packagedPoint: [number, number]): Point {
      return new Point(packagedPoint[0], packagedPoint[1]);
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
      const x = Math.cos(this.direction) * this.magnitude;
      const y = Math.sin(this.direction) * this.magnitude;
      return new Point(x, y);
   }

   public add(other: Vector): Vector {
      return (this.convertToPoint().add(other.convertToPoint())).convertToVector();
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
   return ((angle % Math.PI) + Math.PI) % Math.PI;
}

export function rotatePoint(point: Point, pivotPoint: Point, rotation: number): Point {
   // math ew
   const x = Math.cos(rotation) * (point.x - pivotPoint.x) + Math.sin(rotation) * (point.y - pivotPoint.y) + pivotPoint.x;
   const y = -Math.sin(rotation) * (point.x - pivotPoint.x) + Math.cos(rotation) * (point.y - pivotPoint.y) + pivotPoint.y;
   return new Point(x, y);
}

export function roundNum(num: number, dp: number): number {
   const power = Math.pow(10, dp)
   const roundedNum = Math.round((num + 2e-52) * power) / power;
   return roundedNum;
}

export type HitboxVertexPositions = [tl: Point, tr: Point, bl: Point, br: Point];