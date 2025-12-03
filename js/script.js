const form = document.querySelector('form')
const inputEl = document.querySelector('form input')
const fileInput = document.getElementById('file-input')
const progressBar = document.getElementById('progressbar')
const progress = document.getElementById('progress')

form.addEventListener('submit', (e) => e.preventDefault());

function uploadFile() {
    const file = fileInput.files[0];
    if (!file) {
        alert('Please upoad a file!');
        return;
    }

    const formData = new FormData()
    formData.append('profile', file)

    axios.post('http://192.168.43.240:5000/upload/profile', formData, {
        Headers: {
            "Content-Type": "multipart/form-data"
        },
        onUploadProgress: function (eventProgress) {
            const uploadProgress = Math.round(eventProgress.loaded * 100) / eventProgress.total;
            const truncedUploadProgress = Math.trunc(uploadProgress);

            progressBar.style.width = uploadProgress + "%";
            progress.textContent = truncedUploadProgress + "%"
        }
    }).then((res) => {
        alert("File Uploaded Successfully!")
        console.log(res)
    })
}