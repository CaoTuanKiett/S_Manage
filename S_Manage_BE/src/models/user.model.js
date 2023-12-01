
const knex = require('../database/connectDB');

const avtDefault = require('../middleware/avtDefault');

const {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
} = require('../middleware/hash');

class userModels {

  tableName = 'user';
  idUser = 'id_user';
  name = 'name';
  age = 'age';
  gender = 'gender';
  phone = 'phone';
  address = 'address';
  email = 'email';
  username = 'username';
  password = 'password';
  salt = 'salt';
  avatar = 'avatar';
  passwordResetToken = 'password_reset_token';
  passwordResetExpiration = 'password_reset_expiration';
  createdAt = 'created_at';
  createdBy = 'created_by';
  status = 'status';


  createUser = async (dataFile) => {
    const data = dataFile.body;
    const dataImg = dataFile.file;
    console.log(dataImg);

    return knex(this.tableName)
      .where(this.email, data.email)
      .orWhere(this.username, data.username)
      .then((result) => {
        if (result.length > 0) {
          return Promise.reject({ message: 'Email or username already exists' });
        } else {
          // Password default 12345
          const { salt, hashedPassword } = hashPassword(data.password || '12345');

          let fileImg = null;

          if (dataImg) {
            fileImg = dataImg.path;
          }


          const idUser = knex(this.tableName).insert({
            name: data.name,
            age: data.age,
            gender: data.gender,
            phone: data.phone,
            address: data.address,
            salt: salt,
            email: data.email,
            username: data.username || data.email,
            password: hashedPassword,
            avatar: fileImg,
            // createdBy : data.createdBy,
            status: data.status || "active",
          }).then((idUser) => {
            knex('user_roles').insert({
              user_id: idUser,
              role_id: data.role ? data.role : 3
            }).catch((e) => {
              console.log(e);
            })

            return idUser;
          })

            ;





        }
      }
      );
  }

  selectAllUsers = () => {
    return knex(this.tableName).select('*');
  }

  idUser = 'id_user';
  name = 'name';
  age = 'age';
  gender = 'gender';
  phone = 'phone';
  address = 'address';
  email = 'email';
  username = 'username';
  password = 'password';
  salt = 'salt';
  avatar = 'avatar';
  passwordResetToken = 'password_reset_token';
  passwordResetExpiration = 'password_reset_expiration';
  createdAt = 'created_at';
  createdBy = 'created_by';
  status = 'status';

  selectOneUser = (id) => {
    return knex(this.tableName).select(
      'user.id_user',
      'user.name',
      'user.age',
      'user.gender',
      'user.phone',
      'user.address',
      'user.email',
      'user.username',
      'user.avatar',
      // 'user.password',
      'user.created_at',
      'user.created_by',
      'user.status',
      'roles.name_role',
      'roles.id_role'
    )
      .leftJoin('user_roles', 'user.id_user', 'user_roles.user_id')
      .leftJoin('roles', 'user_roles.role_id', 'roles.id_role')
      .where(this.idUser, id);
  }

  selectOneMail = (mail) => {
    return knex(this.tableName).select('*').where(this.email, mail);
  }

  updateUser = async (id, dataFile) => {
    const data = dataFile.body;
    const dataImg = dataFile.file;

    let fileImg = null;

    if (dataImg) {
      fileImg = dataImg.path;
    } else {
      fileImg = data.avatar;
    }

    const { salt, hashedPassword } = hashPassword(data.password);

    try {
      // Kiểm tra xem email hoặc username đã tồn tại
      const existingUser = await knex(this.tableName)
        .where(this.email, data.email)
        .orWhere(this.username, data.username)
        .select();

      if (existingUser.length > 0 && existingUser[0].id_user !== parseInt(id)) {
        throw new Error('Email or username already exists');
      }

      // Tiến hành cập nhật dữ liệu
      const updatedUser = await knex(this.tableName)
        .where(this.idUser, id)
        .update({
          name: data.name,
          age: data.age,
          gender: data.gender,
          phone: data.phone,
          address: data.address,
          password: hashedPassword,
          salt: salt,
          email: data.email,
          username: data.username,
          avatar: fileImg,
          passwordResetToken: data.passwordResetToken,
          passwordResetExpiration: data.passwordResetExpiration,
          createdBy: data.createdBy,
          // createdAt: data.createdAt,
          status: data.status,
        })
        ;

      console.log("dataa", data);

      try {
        await knex("user_roles")
          .where("user_id", id)
          .update({
            "role_id": data.idRole || 1,
          });

        console.log("oke");
      } catch (error) {
        console.log("fail", error);
      }

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }




  deleteUser = (id) => {
    return knex(this.tableName).where(this.idUser, id).del();
  }

  searchUser = (key) => {
    return knex(this.tableName)
      .select('*')
      .where(this.name, 'like', `%${key}%`)
      .orWhere(this.age, 'like', `%${key}%`)
      .orWhere(this.gender, 'like', `%${key}%`)
      .orWhere(this.phone, 'like', `%${key}%`)
      .orWhere(this.address, 'like', `%${key}%`)
      .orWhere(this.mail, 'like', `%${key}%`);
  }
}

module.exports = new userModels();