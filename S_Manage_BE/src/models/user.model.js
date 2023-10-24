
const knex = require('../database/connectDB');

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
  salt = 'salt';
  email = 'email';
  username = 'username';
  password = 'password';
  avatar = 'avatar';
  passwordResetToken = 'password_reset_token';
  passwordResetExpiration = 'password_reset_expiration';
  createdAt = 'created_at';
  createdBy = 'created_by';
  status = 'status';


  createUser = async (dataFile) => {
    const data = dataFile.body;
    const dataImg = dataFile.file;

    return knex(this.tableName)
      .where(this.email, data.email)
      .orWhere(this.username, data.username)
      .then((result) => {
      if (result.length > 0) {
        return Promise.reject({ message: 'Email or username already exists' });
      } else {
        const { salt, hashedPassword } = hashPassword(data.password);
        let fileImg = dataImg.path;
        return knex(this.tableName).insert({
          name: data.name,
          age : data.age,
          gender : data.gender,
          salt : salt,
          email : data.email,
          username : data.username,
          password : hashedPassword,
          avatar : fileImg,
          // createdBy : data.createdBy,
          status : data.status,
        });
      }
    }
    );

  }

  selectAllUsers = () => {
    return knex(this.tableName).select('*');
  }

  selectOneUser = (id) => {
    return knex(this.tableName).select('*').where(this.idUser, id);
  }

  selectOneMail= (mail) => {
    return knex(this.tableName).select('*').where(this.email, mail);
  }

  updateUser = async (id, dataFile) => {
    const data = dataFile.body;
    const dataImg = dataFile.file;
  
    const { salt, hashedPassword } = hashPassword(data.password);
    const fileImg = dataImg.path;
  
    try {
      // Kiểm tra xem email hoặc username đã tồn tại
      const existingUser = await knex(this.tableName)
        .where(this.email, data.email)
        .orWhere(this.username, data.username)
        .select();

  
      // if (existingUser.length > 0 && existingUser.idUser != id) {
      //   throw new Error('Email or username already exists');
      // }
  
      // Tiến hành cập nhật dữ liệu
      const updatedUser = await knex(this.tableName)
        .where(this.idUser, id)
        .update({
          name: data.name,
          age: data.age,
          gender: data.gender,
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
        });
  
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
      .where( this.username, 'like', `%${key}%`)
      .orWhere(this.email, 'like', `%${key}%`);
  }
}

module.exports = new userModels();