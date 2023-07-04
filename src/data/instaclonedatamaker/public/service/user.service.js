const fs = require('fs').promises;

async function getUsers() {
  try {
    const data = await fs.readFile('../user.json', 'utf-8');
    const users = JSON.parse(data);
    return users;
    
  } catch (err) {
    window.alert('Error:', err);
  }
}

async function getUser(id) {
  try {
    const data = await fs.readFile('../user.json', 'utf-8');
    const users = JSON.parse(data);
    const user = users.find(user => user.id === id)
    return user;
    
  } catch (err) {
    window.alert('Error:', err);
  }
}

async function deleteUser(id) {
  try {
    const data = await fs.readFile('../user.json', 'utf-8');
    const users = JSON.parse(data);
    
    const updatedUsers = users.filter(user => user.id !== id);
    await fs.writeFile('../user.json', JSON.stringify(updatedUsers, null, 2));
    
    return true;
    
  } catch (err) {
    window.alert('Error:', err);
    return false;
  }
}

async function patchUser(id, updatedData) {
  try {
    const data = await fs.readFile('../user.json', 'utf-8');
    const users = JSON.parse(data);
    
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return { ...user, ...updatedData };
      }
      return user;
    });
    
    await fs.writeFile('../user.json', JSON.stringify(updatedUsers, null, 2));
    
    return true;
    
  } catch (err) {
    window.alert('Error:', err);
    return false;
  }
}

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  patchUser
};