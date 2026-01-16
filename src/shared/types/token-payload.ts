
export interface TokenPayload {
    id : string;
    type: 'access' | 'refresh';
    username : string
}