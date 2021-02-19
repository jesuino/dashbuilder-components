export interface Data {
  name: string;
  children: Children[];
}

export interface Children {
  name: string;
  size?: number;
  children?: Children[];
}
