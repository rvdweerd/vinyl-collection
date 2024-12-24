let isMainModalOpen = false; // Track if the main modal is open

// Open modal function for album details
function openModal(albumId) {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    modal.style.display = 'block';
    isMainModalOpen = true; // Set the flag to true

    // Get the data for the selected album
    const albumData = document.getElementById(albumId);
    const title = albumData.getAttribute('data-title');
    const artist = albumData.getAttribute('data-artist');
    const year = albumData.getAttribute('data-year');
    const genre = albumData.getAttribute('data-genre');
    const label = albumData.getAttribute('data-label');
    const thumbnails = JSON.parse(albumData.getAttribute('data-thumbnails'));
    const highres = JSON.parse(albumData.getAttribute('data-highres'));
    const info = albumData.getAttribute('data-info');

    // Generate the content for the modal
    let content = `
        <h2>${title}</h2>
        <p><strong>Artist:</strong> ${artist}</p>
        <p><strong>Year:</strong> ${year}</p>
        <p><strong>Genre:</strong> ${genre}</p>
        <p><strong>Record Label:</strong> ${label}</p>
        <div class="thumbnails">`;

    // Add the thumbnails
    thumbnails.forEach((thumbnail, index) => {
        content += `<img src="${thumbnail}" alt="${title} Thumbnail ${index + 1}" class="thumbnail" onclick="openHighResImage('${highres[index]}')">`;
    });

    content += `</div>
        <p>${info}</p>`;

    modalBody.innerHTML = content;
}

// Open high-resolution image modal
function openHighResImage(imageSrc) {
    const highResModal = document.getElementById('highResModal');
    const highResImage = document.getElementById('highResImage');
    highResImage.src = imageSrc;
    highResModal.style.display = 'block';
}

// Close modal function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';

    // If closing the high-resolution modal, keep the main modal open if it was open before
    if (modalId === 'highResModal' && isMainModalOpen) {
        document.getElementById('modal').style.display = 'block';
    } else if (modalId === 'modal') {
        isMainModalOpen = false; // Reset the flag when closing the main modal
    }
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    const highResModal = document.getElementById('highResModal');
    if (event.target == highResModal) {
        highResModal.style.display = 'none';
        if (isMainModalOpen) {
            modal.style.display = 'block';
        }
    } else if (event.target == modal) {
        modal.style.display = 'none';
        isMainModalOpen = false;
    }
}

// Close modal when pressing the Escape key
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('modal');
    const highResModal = document.getElementById('highResModal');
    if (event.key === 'Escape') {
        if (highResModal.style.display === 'block') {
            highResModal.style.display = 'none';
            if (isMainModalOpen) {
                modal.style.display = 'block';
            }
        } else {
            modal.style.display = 'none';
            isMainModalOpen = false;
        }
    }
});

// Filter albums based on search input
function filterAlbums() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const records = document.getElementsByClassName('record');

    Array.from(records).forEach(record => {
        const title = record.querySelector('h3').innerText.toLowerCase();
        const artist = record.querySelector('p:nth-child(2)').innerText.toLowerCase();
	const year = record.querySelector('p:nth-child(3)').innerText.toLowerCase();
        const genre = record.querySelector('p:nth-child(4)').innerText.toLowerCase();
	const label = record.querySelector('p:nth-child(5)').innerText.toLowerCase();

        if (title.includes(filter) || artist.includes(filter) || year.includes(filter) || genre.includes(filter) || label.includes(filter)) {
            record.style.display = '';
        } else {
            record.style.display = 'none';
        }
    });
}