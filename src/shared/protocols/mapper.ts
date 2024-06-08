/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IMapper<Data = any, MappedData = any> {
  map(data: Data): MappedData;
}
