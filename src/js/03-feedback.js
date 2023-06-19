import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const FORMDATA_KEY = "feedback-form-state"; 

feedbackForm.addEventListener('submit', onFormSubmit);  
feedbackForm.addEventListener('input', throttle(onFormTextInput, 500));

let formData = JSON.parse(localStorage.getItem(FORMDATA_KEY)) || {};
const { email, message } = feedbackForm.elements;

onBlankReload();

function onFormTextInput(e) {
        
    formData[e.target.name] = e.target.value; 
    
    localStorage.setItem(FORMDATA_KEY, JSON.stringify(formData));
    };

function onFormSubmit(e) {
    e.preventDefault();
if (message.value === '' || email.value === '') {
       return alert('Заповніть буляска усі поля')
   }
    console.log(formData);
    feedbackForm.reset();
    localStorage.removeItem(FORMDATA_KEY);
}


function onBlankReload() {
    const savedSettings = localStorage.getItem(FORMDATA_KEY);
    const parsedSettings = JSON.parse(savedSettings);
    if (savedSettings) {
        email.value = parsedSettings.email || '';
        message.value = parsedSettings.message || '';
         }
    }
