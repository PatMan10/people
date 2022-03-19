import { User } from './user.model';

export const admin = new User('admin', 'people@admin.com', '@dm1n#676');

export const user = new User('user', 'people@user.com', 'u$er#911');

export const users = [admin, user];
