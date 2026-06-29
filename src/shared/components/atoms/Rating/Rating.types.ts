export interface RatingProps {
  value: number;
  max?: number;
  size?: number;
  showValue?: boolean;
  onChange?: (value: number) => void;
}
