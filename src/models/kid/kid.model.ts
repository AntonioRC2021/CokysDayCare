import { Parent } from "../parent/parent.model";
import {Observable} from "rxjs/Rx";

export interface Kid {
  key?: string;
  name: string;
  lastName: string;
  parentId?: string;
  imageKey?: string;
  isChecked?: boolean;
}
