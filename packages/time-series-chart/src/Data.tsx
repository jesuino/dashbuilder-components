export interface typeoptions {
  chart: {
    id: string;
  };
  xaxis: {
    categories: Array<string | number>;
  };
}

export interface typeseries {
  name: string;
  data: Array<number>;
}
