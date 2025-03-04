import axios from 'axios';
import { BASE_API_URL } from '../constants';
import DeclarationRecord from '../types';

const createHealthDeclaration = async (newRecord: DeclarationRecord) => {
  await axios.post(`${BASE_API_URL}/health-declaration`, newRecord);
};

const fetchHealthDeclaration = async () => {
  const { data } = await axios.get(`${BASE_API_URL}/health-declaration`);
  return data;
};

export { createHealthDeclaration, fetchHealthDeclaration };
