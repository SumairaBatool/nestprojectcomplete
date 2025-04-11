import { config } from 'dotenv';
import {DataSource,DataSourceOptions} from 'typeorm';

config()
export const dataSourseOptions: DataSourceOptions = {
	type: 'postgres', 
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT), 
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: ['dist/**/*.entity{.ts,.js}'],
    migrations:['dist/db/migrations/*{.ts,.js}'],
    logging:false,
	synchronize: true, // Set to false in production //modify create delete  our database
};
const dataSource=new DataSource(dataSourseOptions);
export default dataSource;