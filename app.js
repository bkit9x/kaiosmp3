document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const contents = e.target.result;
            document.getElementById('fileContent').textContent = contents;
        };

        reader.onerror = function(e) {
            console.error("Error reading file", e);
        };

        reader.readAsText(file);
    } else {
        console.log("No file selected");
    }
});


document.getElementById("scan").addEventListener('click', function() {
    // Request access to the file system
    let files = [];
    navigator.getDeviceStorage('sdcard').then(storage => {
        let cursor = storage.enumerate();

        cursor.onsuccess = function() {
            if (cursor.result) {
                let file = cursor.result;
                if (file.name.endsWith('.mp3')) {
                    console.log('Found MP3 file:', file.name);
                    files.push(file);
                    document.getElementById('fileContent').textContent = files.join('\n');

                }
                cursor.continue();
            } else {
                alert('No MP3 files found.');
            }
        };


        cursor.onerror = function() {
            console.error('Error scanning files:', cursor.error);
            alert('Error scanning files.');
        };
    }).catch(error => {
        console.error('Error accessing device storage:', error);
        alert('Error accessing device storage.');
    });

});
