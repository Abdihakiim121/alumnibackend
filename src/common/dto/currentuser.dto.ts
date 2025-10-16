;

export class CurrentUser {
    username: string;
  
    userId: string;

    email:string;
    profile: Profile
  }

  export class Profile {
    profileId: string;
    firstName: string;
    middleName?: string;
    lastName: string;
}