export interface Options {
  chart: {
    id: string;
  };
  xaxis: {
    categories: Array<string | number>;
  };
}

export interface SingleSeries {
  name: string;
  data: Array<number>;
}
