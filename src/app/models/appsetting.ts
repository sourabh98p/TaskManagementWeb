export interface IAppConfig {
    appSettings: AppSettings;
}

export interface AppSettings {
    myKastleWebsiteUrl?: string;
    helpDeskPhoneNumber?:string;
    helpDeskEmail?:string;
    apiUrl?: string;
    loginURL?:string;
}