export interface ISendMessageDTO {
  content: string;
  sendTo: string;
}

export interface ISendGroupMessageDTO {
  content: string;
  groupId: string;
}

export interface IJoinRoomDTO {
  roomId: string;
}

export interface ICreateGroupDTO {
  group: string;
  participants: string[];
  group_image?: string;
}
