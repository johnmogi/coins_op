fetch(myRequest).then((response) => {
// if (!response.ok) {
// throw new Error(`HTTP error! Status: ${response.status}`);
// }
coinArr.push(response);
// return response.blob();
});
// .then((response) => {
// myImage.src = URL.createObjectURL(response);
// });
