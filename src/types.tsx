export type Id = number;

export type User = {
  id: Id;
  firstName: string;
  lastName: string;
  portraitUrl: string;
};

export type SessionUser = User & {
  starredRooms: Array<Id>;
};

export type RentableRoom = {
  id: Id;
  type: "rentable";
  owner: User;
  featured?: boolean;
  title: string;
  description: string;
  heroUrl: string;
};

export type PurchasableRoom = {
  id: Id;
  type: "purchasable";
  title: string;
  description: string;
  heroUrl: string;
  price: {
    amount: number;
    currency: string;
  };
};

export type AdvertisedRoom = {
  id: Id;
  type: "advertised";
  title: string;
  description: string;
  heroUrl: string;
};

export type Room = RentableRoom | PurchasableRoom | AdvertisedRoom;

export type DbData = {
  sessionUser: SessionUser;
  rooms: Array<Room>;
};

export type CollectionPage = {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
};

export type Collection<Node> = {
  page: CollectionPage;
  nodes: Array<Node>;
};
