import { Parent } from "../parent/parent.model";

export interface Kid {
  key?: string;
  name: string;
  lastName: string;
  parent: Parent;
  isChecked?: boolean;
}
