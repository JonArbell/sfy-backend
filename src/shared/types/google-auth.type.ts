export interface GoogleProfileName {
  familyName: string;
  givenName: string;
}

export interface GoogleProfileEmail {
  value: string;
  verified: boolean;
}

export interface GoogleProfilePhoto {
  value: string;
}

export interface GoogleProfileJson {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}

export interface OAuthUserPayload {
  provider: "google";
  providerId: string;
  email: string;
  fullName: string;
  avatar?: string;
}
