import expect from 'expect';
import { validateNewUser } from './users';
import { Meteor } from 'meteor/meteor';

if (Meteor.isServer) {
    describe('users', function () {

        it('should allow valid email addres', function () {
            const testUser = {
                emails: [
                    { address: 'djulovic_m@hotmil.com' }
                ]
            }
            const res = validateNewUser(testUser);
            expect(res).toBe(true);
        });


        it('should reject invalid email', function () {
            const testUser = {
                emails: [
                    { address: '2l5j4ldjl' }
                ]
            }
            expect(() => {
                validateNewUser(testUser)
            }).toThrow();
        });

    });




}




