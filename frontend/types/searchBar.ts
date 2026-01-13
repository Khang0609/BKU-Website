export interface InputProps {
  title?: string;
  placeholder: string;
  value?: string;
  onChange?: (value: string) => void;
  searchIcon?: boolean;
}
