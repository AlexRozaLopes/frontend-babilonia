import { SpentType } from "./spentType";

export interface Spent {
  uuid: string;
  title: string;
  type: SpentType;
  value: number;
  data?: string; 
 }