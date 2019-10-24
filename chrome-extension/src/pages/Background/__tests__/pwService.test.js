import { pwService } from "../pwService";

describe('pwService', () => {
   it('should set the password', () => {
       const password = 'test123';
       pwService.password = password;
       expect(pwService.password).toEqual(password);
   })
});
