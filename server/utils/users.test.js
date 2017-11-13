const expect = require('expect');

const { Users } = require('./users');

let usersFactory;

beforeEach(() => {
    usersFactory = new Users();
    usersFactory.users = [
        {
            id: 123,
            name: 'Azlain',
            room: 'Node Course',
        },
        {
            id: 512,
            name: 'Leonardo',
            room: 'Node Course',
        },
        {
            id: 441,
            name: 'Jennifer',
            room: 'React Course',
        },
        {
            id: 124,
            name: 'Harold',
            room: 'Angular Course',
        },
    ];
});

describe('Users', () => {
    it('should add new user', () => {
        const users = new Users();
        const user = {
            id: 123,
            name: 'Luis',
            room: 'Developers',
        };
        const resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        const userId = 124;
        const user = usersFactory.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(usersFactory.users.length).toBe(3);
    });

    it('should not remove a user', () => {
        const userId = 99;
        const user = usersFactory.removeUser(userId);

        expect(user).toBe(undefined);
        expect(usersFactory.users.length).toBe(4);
    });

    it('should find user', () => {
        const userId = 124;
        const user = usersFactory.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        const userId = 99;
        const user = usersFactory.getUser(userId);

        expect(user).toBe(undefined);
    });

    it('should return names for node course', () => {
        const userList = usersFactory.getUserList('Node Course');
        expect(userList).toEqual(['Azlain', 'Leonardo']);
    });

    it('should return names for react course', () => {
        const userList = usersFactory.getUserList('React Course');
        expect(userList).toEqual(['Jennifer']);
    });
});
