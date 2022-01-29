class UserDto {
  id;
  roles;

  constructor(user) {
    this.id = user._id;
    this.roles = user.roles;
  }
}

export default UserDto;
