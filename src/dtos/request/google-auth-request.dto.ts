import {
  GoogleProfileEmail,
  GoogleProfileJson,
  GoogleProfileName,
  GoogleProfilePhoto,
} from "../../shared/types/google-auth.type";

export interface GoogleOAuthProfileRequestDTO {
  id: string;
  displayName: string;
  name: GoogleProfileName;
  emails: GoogleProfileEmail[];
  photos: GoogleProfilePhoto[];
  provider: "google";
  _raw: string;
  _json: GoogleProfileJson;
}
