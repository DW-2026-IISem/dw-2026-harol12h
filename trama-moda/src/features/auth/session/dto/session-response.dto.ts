export interface SessionResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresAt: Date;
  tokenType: "Bearer";
}
