const DefaultData =['apple', 'banana', 'orange','mango', 'jackfruit', 'potato', 'pineapple', 'avocado', 'guava', 'lemon'].reduce((res, item) => ({...res, ...{[item]: Array(20).fill(0).map(_ => Math.floor(20 * Math.random()))}}), {});
export default DefaultData;