/**
 * Token Interface
 */
export interface IToken {
  /**
   * API Access Token
   */
  token: string;

  /**
   * API Access Token
   */
  access?: string;

  /**
   * Refresh Token
   */
  refreshToken?: string;

  /**
   * User data
   */
  user?: any;
}
