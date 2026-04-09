
        function openModal(title, text, source, imgSrc) {
            document.getElementById('modal-title').innerHTML = title;
            document.getElementById('modal-text').innerHTML = text;
            document.getElementById('modal-source').href = source;
            document.getElementById('modal-image-src').src = imgSrc;
            document.getElementById('modal').classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('modal').classList.remove('active');
            document.body.style.overflow = '';
        }

        document.getElementById('modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
