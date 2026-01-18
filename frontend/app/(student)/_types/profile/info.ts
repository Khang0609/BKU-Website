export interface GridItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
  bold?: boolean;
  subtle?: boolean;
  large?: boolean;
}

export interface AccordionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  id: string;
}

export interface ProfileCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  id: string;
}
