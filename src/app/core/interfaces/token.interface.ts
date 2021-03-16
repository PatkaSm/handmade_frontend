/**
 * Token Interface
 */
export interface IToken {
  /**
   * API Access Token
   */
  accessToken: string;

  /**
   * API Access Token
   */
  access?: string;

  /**
   * Refresh Token
   */
  refreshToken: string;

  /**
   * User data
   */
  user?: any;
}
