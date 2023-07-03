const fs = require('fs');
const path = require('path');
const userRender = require('./sections/userRenderer');
const postRender = require('./sections/postRenderer');
const userSection = document.getElementById('usersection');
const postSection = document.getElementById('postsection');
const storySection = document.getElementById('storysection');
const inputPart = document.getElementById('inputs');

userRender();
inputPart.focus();

userSection.addEventListener('click', userRender);
postSection.addEventListener('click', postRender);
storySection.addEventListener('click', storyRender);

