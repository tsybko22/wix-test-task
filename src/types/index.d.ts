export interface Category {
  id: string;
  name: string;
  children?: Category[];
  isExpanded?: boolean;
}
