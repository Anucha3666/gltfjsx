/** @format */
import { devtools } from "zustand/middleware";
import { ComponentsInterface } from "../Models/Interface/Store/Components";
import { create } from "zustand";
import intiData from "../InitailValue/intiData";
import { DataHistoryInterface } from "../Models/Interface/Components";

type IStore = ComponentsInterface;

const useStore = create<IStore>()(
  devtools((set) => ({
    data: intiData,
    setData: (data) => set({ data: data }),
    dataHistory: [] as DataHistoryInterface,
    setDataHistory: (data) => set({ dataHistory: data }),
  }))
);
export default useStore;
