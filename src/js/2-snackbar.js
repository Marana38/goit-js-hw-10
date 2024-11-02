import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', (event) => {
    event.preventDefault();

    const delay = parseInt(event.target.elements.delay.value);
    const state = event.target.elements.state.value;

    new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    })
        .then(delay => iziToast.success({ title: 'Success', message: `✅ Fulfilled promise in ${delay}ms` }))
        .catch(delay => iziToast.error({ title: 'Error', message: `❌ Rejected promise in ${delay}ms` }));
});
