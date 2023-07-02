import db from "../db/database.js";

const getUsers = async() =>{
    const [usersList] =  await db.query("SELECT * FROM users")
    // .catch((err) => console.log(err))  //error handling is now done globally in index.js
    return usersList;
}

const getUserbyId = async(id) =>{
    const [[userList]] = await db.query('SELECT * FROM users WHERE id = ?',[id])
    return userList; 
}

const deleteUser = async(id) =>{
    const [{affectedRows}] = await db.query('DELETE * FROM users WHERE id = ?',[id])
    return affectedRows; 
}

const CreateOrEditUser = async (obj, id=0) =>{
    const [[[{affectedRows}]]] = await db.query('CALL usp_users_add_or_edit(?,?,?,?,?,?)',
    [id, obj.name, obj.Age, obj.Phone, obj.Address, obj.Email])
    // return data[0][0].affectedRows; 
    return affectedRows; 
}



export {getUsers, getUserbyId, deleteUser, CreateOrEditUser};