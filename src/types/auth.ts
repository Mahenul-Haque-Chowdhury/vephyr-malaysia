export type AuthIntent = "checkout" | "account" | "generic";

export type UserKind = "guest" | "account";

export interface UserAddress {
  id: string;
  label: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  region?: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
}

export interface UserSettings {
  language?: string;
  currency?: string;
  marketingEmails?: boolean;
  orderUpdates?: boolean;
  productDrops?: boolean;
  dataSharing?: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  kind: UserKind;
  createdAt: string;
  lastSeenAt: string;

  addresses?: UserAddress[];
  settings?: UserSettings;

  passwordSalt?: string;
  passwordHash?: string;
}
