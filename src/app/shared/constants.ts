import { Profile } from './models/profile';
export class Constants {
  // public static readonly URL_SERVER = 'http://54.202.33.59:5000/';
  public static readonly URL_SERVER = 'http://127.0.0.1:5000/';
  public static readonly LOGIN_TOKEN = 'LOGIN_TOKEN';
  public static readonly ADMIN_PROFILE: Profile = {
    id: 1,
    name: 'ADMIN'
  };
  public static readonly OPERARIO_PROFILE: Profile = {
    id: 1,
    name: 'OPERARIO'
  };
  public static readonly PROFILES: Array<Profile> = [
    Constants.ADMIN_PROFILE,
    Constants.OPERARIO_PROFILE
  ];
}
