const form = document.querySelector('.feedback-form');
const inputEmail = form.querySelector('input');
const inputText = form.querySelector('textarea');

const currentObj = {
    email:'',
    message:'',
} 
let localStorageData = '';
const localStorageKey = "feedback-form-state";
try {
    localStorageData = JSON.parse(localStorage.getItem(localStorageKey)) ?? {};
    
    if (localStorageData && typeof localStorageData === 'object') {
        currentObj.email = localStorageData.email ||'';
        currentObj.message = localStorageData.message || '';
        inputEmail.value = currentObj.email;
        inputText.value = currentObj.message;
}
} catch(error) {
console.error('Error parsing JSON:', error);
}

const upLoadNewDate = (event) => {
    const target = event.target;
    if (target === inputEmail) {
        currentObj.email = target.value;
    } else if(target === inputText) {
        currentObj.message = target.value;
    }
    localStorageData = JSON.stringify(currentObj);
    localStorage.setItem(localStorageKey,localStorageData)
};
form.addEventListener('input',upLoadNewDate)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (inputEmail.value.trim() === "" || inputText.value.trim() === '') {
        alert(`Будь ласка, заповніть всі поля форми перед відправленням.`);
        return;
    }
    console.log(JSON.parse(localStorage.getItem(localStorageKey)));
    localStorage.removeItem(localStorageKey);
    currentObj.email = '';
    currentObj.message = '';
    form.reset();
})