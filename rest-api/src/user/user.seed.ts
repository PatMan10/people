import { User } from './user.model';

const admin = (): User => new User('admin', 'people@admin.com', '@dm1n#676');

const user = (): User => new User('user', 'people@user.com', 'u$er#911');

export const getUsers = (): User[] => [admin(), user()];
