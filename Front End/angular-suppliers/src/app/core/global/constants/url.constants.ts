import { environment } from 'src/environments/environment';

export class UrlConstants {
	public static readonly URL_LOGIN_TOKEN =
		environment.host + environment.context + '/User/Login';
	public static readonly URL_SUPPLIERS = 
		environment.host + environment.context + '/Supplier'
	public static readonly URL_SCRAPER_OFFSHORE = 
		environment.scraper + '/offshore';
	public static readonly URL_SCRAPER_WORLDBANK = 
		environment.scraper + '/world';
	public static readonly URL_SCRAPER_OFAC = 
		environment.scraper + '/sanctions';
}
