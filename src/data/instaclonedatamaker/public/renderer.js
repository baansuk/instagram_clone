const fs = require('fs');
const path = require('path');
const userRender = require('./sections/userRenderer');
const userSection = document.getElementById('user');
const postSection = document.getElementById('post');
const storySection = document.getElementById('story');

window.alert('heya');
userRender();
window.alert('heya');

userSection.addEventListener('click', userRender);
postSection.addEventListener('click', postRender);
storySection.addEventListener('click', storyRender);

