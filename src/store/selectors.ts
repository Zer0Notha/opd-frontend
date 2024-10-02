import { userApi } from './api/user';
import { RootState } from './store';

export const rootStateSelector = (state: RootState): RootState => state;

export const userResultSelector = userApi.endpoints.getInfo.select();
