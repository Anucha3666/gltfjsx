/** @format */

import { DataHistoryInterface, DataInterface } from "../Components";

export interface ComponentsInterface {
  data: DataInterface;
  setDataBar: (data: DataInterface) => void;
  dataHistory: DataHistoryInterface[];
  setDataHistory: (data: DataHistoryInterface) => void;
}
