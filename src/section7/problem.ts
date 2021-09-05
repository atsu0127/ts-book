/**
 * Exceptionの場合
 */
// 未ログインの時のエラー
class NotLoggedInError extends Error {}

// UserIDが不正な場合のエラー
class InvalidUserIDError extends Error {}

// 友人が0の場合のエラー
class NoFriendsError extends Error {}

// 該当するユーザがいない場合のエラー
class NoMatchedUserError extends Error {}

type UserID = string
type User = {
  UserID: UserID,
  UserName: string,
  Friends: UserID[]
}

class APIWithExceptions {
  private loginUser: User | null = null
  
  private isValidUserID(userID: UserID): boolean {
    const pattern = /[a-z]{4}[0-9]{4}/
    return pattern.test(userID)
  }

  // 本当はDBから持ってきたりする
  pickUser(): User {
    return {
      UserID: 'aaaa9999',
      UserName: 'shiro',
      Friends: []
    }
  }

  // 本当はDBから持ってきたりする
  getUserList(): {
    Users: User[],
    SearchUser: (userID: UserID) => User | NoMatchedUserError
  } {
    return {
      Users: [],
      SearchUser(userID) {
        return {
          UserID: 'bbbb9999',
          UserName: 'goro',
          Friends: []
        }
      }
    }
  }

  login() {
    this.loginUser = this.pickUser()
  }

  logout() {
    this.loginUser = null
  }

  getLoggedInUserID(): UserID | NotLoggedInError | InvalidUserIDError {
    if (this.loginUser == null) {
      return new NotLoggedInError('ログインしていません')
    }
    if (!this.isValidUserID(this.loginUser.UserID)) {
      return new InvalidUserIDError('ユーザIDが不正です')
    }
    return this.loginUser.UserID
  }

  getFriendIDs(userID: UserID): UserID[] | InvalidUserIDError | NoFriendsError | NoMatchedUserError {
    if (!this.isValidUserID(userID)) {
      return new InvalidUserIDError('ユーザIDが不正です')
    }

    let searched = this.getUserList().SearchUser(userID)
    if (searched instanceof NoMatchedUserError) {
      return searched
    }
    if (searched.Friends.length === 0) {
      return new NoFriendsError('友達がいません')
    }
    return searched.Friends
  }

  getUserName(userID: UserID): string | InvalidUserIDError | NoMatchedUserError {
    if (!this.isValidUserID(userID)) {
      return new InvalidUserIDError('ユーザIDが不正です')
    }

    let searched = this.getUserList().SearchUser(userID)
    if (searched instanceof NoMatchedUserError) {
      return searched
    }
    return searched.UserName
  }
}

export {
  APIWithExceptions,
  NotLoggedInError,
  NoFriendsError,
  InvalidUserIDError,
  NoMatchedUserError,
  User,
  UserID
}
