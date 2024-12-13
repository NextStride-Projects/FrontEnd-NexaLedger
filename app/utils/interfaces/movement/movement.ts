export interface IMovement {
  id: string;
  resourceId: string;
  userId: string;
  type: string;
  description: string;
  timestamp: Date;
}

export interface IMovementWithUsername extends IMovement {
  username: string;
}
