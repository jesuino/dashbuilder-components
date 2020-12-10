export interface Data {
  name: string;
  children: Array<Children>;
}

export interface Children {
  name: string;
  size?: number;
  children?: Array<Children>;
}
