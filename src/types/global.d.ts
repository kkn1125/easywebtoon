declare type Point = {
  mode: "pen" | "erase";
  x: number;
  y: number;
  thickness: number;
};

declare type Line = Point[];

declare type Page = Line[];
