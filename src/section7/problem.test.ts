import assert from 'assert'
import { APIWithExceptions, NoFriendsError, NoMatchedUserError, NotLoggedInError, InvalidUserIDError, User, UserID } from './problem'

/**
 * テストデータ
 */
 let SampleUser1: User = {
  UserID: 'aaaa0000',
  UserName: 'taro',
  Friends: [
    'aaaa0001',
    'aaaa0002'
  ]
}
let SampleUser2: User = {
  UserID: 'aaaa0001',
  UserName: 'jiro',
  Friends: []
}
let SampleUser3: User = {
  UserID: 'aaaa0002',
  UserName: 'saburo',
  Friends: []
}
let InvalidUser: User = {
  UserID: 'aaa0002',
  UserName: 'invalid',
  Friends: []
}
let UserList: {
  Users: User[],
  SearchUser: (userID: UserID) => User | NoMatchedUserError
} = {
  Users: [
    SampleUser1,
    SampleUser2,
    SampleUser3
  ],
  SearchUser(userID) {
    let result = this.Users.filter(u => u.UserID === userID)
    if (result.length === 0) {
      return new NoMatchedUserError('該当するユーザがいません')
    }
    return result[0]
  }
}

/**
 * テスト
 */
let api = new APIWithExceptions()
describe('APIWithException', () => {
  describe('正常系', () => {
    beforeEach(() => {
      jest.spyOn(api, 'pickUser').mockImplementation(() => SampleUser1)
      jest.spyOn(api, 'getUserList').mockImplementation(() => UserList)
    })

    test('getLoggedInUserID', () => {
      api.login()
      assert.strictEqual(api.getLoggedInUserID(), 'aaaa0000')
    })

    test('getFriendIDs', () => {
      assert.strictEqual(api.getFriendIDs(SampleUser1.UserID), SampleUser1.Friends)
    })

    test('getUserName', () => {
      assert.strictEqual(api.getUserName(SampleUser1.UserID), SampleUser1.UserName)
    })
  })

  describe('異常系', () => {
    const notLoggedInError = new NotLoggedInError('ログインしていません')
    const invalidUserIDError = new InvalidUserIDError('ユーザIDが不正です')
    const noFriendsError = new NoFriendsError('友達がいません')

    describe('ログインしていない場合', () => {
      beforeEach(() => {
        api.logout()
      })

      test('getLoggedInUserID', () => {
        assert.deepStrictEqual(api.getLoggedInUserID(), notLoggedInError)
      })
    })

    describe('不正なUserIDの場合', () => {
      beforeEach(() => {
        jest.spyOn(api, 'pickUser').mockImplementation(() => InvalidUser)
        jest.spyOn(api, 'getUserList').mockImplementation(() => UserList)
      })

      test('getLoggedInUserID', () => {
        api.login()
        assert.deepStrictEqual(api.getLoggedInUserID(), invalidUserIDError)
      })

      test('getFriendIDs', () => {
        assert.deepStrictEqual(api.getFriendIDs(InvalidUser.UserID), invalidUserIDError)
      })

      test('getUserName', () => {
        assert.deepStrictEqual(api.getUserName(InvalidUser.UserID), invalidUserIDError)
      })
    })

    describe('友達がいない場合', () => {
      test('getFriendIDs', () => {
        assert.deepStrictEqual(api.getFriendIDs(SampleUser2.UserID), noFriendsError)
      })
    })
  })
})
