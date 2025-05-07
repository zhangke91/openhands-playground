document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const imagePreview = document.getElementById('imagePreview');
    const previewContainer = document.getElementById('previewContainer');
    const extractBtn = document.getElementById('extractBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultContainer = document.getElementById('resultContainer');
    const textResult = document.getElementById('textResult');
    const loading = document.getElementById('loading');
    const copyBtn = document.getElementById('copyBtn');
    
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropArea.classList.add('highlight');
    }
    
    function unhighlight() {
        dropArea.classList.remove('highlight');
    }
    
    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            handleFiles(files);
        }
    }
    
    // Handle selected files from file input
    fileInput.addEventListener('change', function() {
        if (this.files.length > 0) {
            handleFiles(this.files);
        }
    });
    
    function handleFiles(files) {
        const file = files[0];
        
        if (!file.type.match('image.*')) {
            alert('Please select an image file');
            return;
        }
        
        const reader = new FileReader();
        
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            previewContainer.style.display = 'block';
            dropArea.style.display = 'none';
        };
        
        reader.readAsDataURL(file);
    }
    
    // Extract text button click handler
    extractBtn.addEventListener('click', function() {
        const file = fileInput.files[0];
        
        if (!file) {
            alert('Please select an image first');
            return;
        }
        
        resultContainer.style.display = 'block';
        textResult.style.display = 'none';
        loading.style.display = 'flex';
        copyBtn.style.display = 'none';
        
        const formData = new FormData();
        formData.append('image', file);
        
        fetch('/extract-text', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            
            textResult.textContent = data.text || 'No text found in the image';
            textResult.style.display = 'block';
            loading.style.display = 'none';
            copyBtn.style.display = 'inline-block';
        })
        .catch(error => {
            textResult.textContent = 'Error: ' + error.message;
            textResult.style.display = 'block';
            loading.style.display = 'none';
            copyBtn.style.display = 'none';
        });
    });
    
    // Reset button click handler
    resetBtn.addEventListener('click', function() {
        fileInput.value = '';
        imagePreview.src = '#';
        previewContainer.style.display = 'none';
        resultContainer.style.display = 'none';
        dropArea.style.display = 'block';
    });
    
    // Copy button click handler
    copyBtn.addEventListener('click', function() {
        const text = textResult.textContent;
        
        if (!text) return;
        
        navigator.clipboard.writeText(text)
            .then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    });
});