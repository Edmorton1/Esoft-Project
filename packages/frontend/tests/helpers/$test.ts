import axios from "axios";
import https from "https"

const agent = new https.Agent({
	rejectUnauthorized: false,
});

const $test = axios.create({
	baseURL: _URL_SERVER,
  httpsAgent: agent
});

export default $test;
