import { Comment } from './Comment';

export class Robot {
  /* tslint:disable */
  _id: string;
  /* tslint:enable */
  name: string;
  subtitle: string;
  image: string;
  category: string;
  description: string;
  title1: string;
  imageCard1: string;
  descriptionCard1: string;
  title2: string;
  imageCard2: string;
  descriptionCard2;
  title3: string;
  imageCard3: string;
  descriptionCard3: string;
  whereToBuy: string;
  webBuy: string;
  descriptionCompare: string;
  tableProps: {
    _id: string;
    model: string;
    weight: string;
    dimensions: string;
    capacityTrash: string;
    capacityWater: string;
    noise: string;
    autonomy: string;
    chargeTime: string;
    nominalPower: string;
    suctionPower: string;
    programmable: string;
    avoidsFall: string;
    anticollisionSystem: string;
    remoteControl: string;
    appMobile: string;
  };
  comments: [Comment];
  likes: number;
}
