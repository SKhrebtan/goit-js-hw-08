import throttle from 'lodash.throttle';
import { save, load, remove } from './storage'


const feedbackForm = document.querySelector('.feedback-form');
const FORMDATA_KEY = "feedback-form-state"; 

let formData = load(FORMDATA_KEY) || {};

feedbackForm.addEventListener('input', throttle(onFormTextInput, 500));
feedbackForm.addEventListener('submit', onFormSubmit);

const { email, message } = feedbackForm.elements;

onBlankReload();

function onFormTextInput(e) {
        
    formData[e.target.name] = e.target.value; 
    
    save(FORMDATA_KEY, formData);
    };

function onFormSubmit(e) {
    e.preventDefault();
if (message.value === '' || email.value === '') {
       return alert('Заповніть буляска усі поля')
   }
    console.log(formData);
    feedbackForm.reset();
    remove(FORMDATA_KEY);
    formData = {};
}


function onBlankReload() {
    const savedSettings = localStorage.getItem(FORMDATA_KEY);
    const parsedSettings = JSON.parse(savedSettings);
    if (savedSettings) {
        email.value = parsedSettings.email || '';
        message.value = parsedSettings.message || '';
         }
    }
