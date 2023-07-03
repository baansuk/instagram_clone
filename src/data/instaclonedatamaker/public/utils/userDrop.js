const fs = require('fs').promises;

async function userDrop(id) {
  try {
    const data = await fs.readFile('../user.json', 'utf-8');
    const users = JSON.parse(data);
    if(id) {
      const thisDropUser = users.find(user => user.id === id)
      const userdrops = users.map(user => user.id === thisDropUser.id ? `<option value="${user.id}" selected>${user.name}(${user.id})</option>` : `<option value="${user.id}">${user.name}(${user.id})</option>`);
      return userdrops.join('');
    } else {
      const userdrops = users.map(user => `<option value="${user.id}">${user.name}(${user.id})</option>`);
      return userdrops.join('');
    }
    
    
  } catch (err) {
    window.alert('Error:', err);
  }
}

module.exports = userDrop;