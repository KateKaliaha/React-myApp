export interface IFormCard {
  name: string;
  birthday: string;
  photo: string;
  review: string;
  mark: string;
  data: boolean;
  gender: string;
}

export interface IFormCardProps {
  card: IFormCard;
}
