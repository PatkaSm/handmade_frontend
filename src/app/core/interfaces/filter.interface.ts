interface optionData {
  key: any;
  value: string;
}

export interface IFilterInput {
  name: string;
  type: string;
  value: any;
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  data?: optionData[];
  groupData?: { id: string; name: string; children: optionData[] }[] | null;
}
