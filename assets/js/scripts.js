
        // Toggle floating player
        function toggleFloatingPlayer() {
            const floatingPlayer = document.getElementById('floatingPlayer');
            floatingPlayer.classList.toggle('active');
        }

        // Featured slider functionality
        const featuredDots = document.querySelectorAll('.featured-dot');
        featuredDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                featuredDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
            });
        });

        // Horizontal scroll for episode cards
        const episodeContainer = document.querySelector('.episode-cards-container');
        let isDown = false;
        let startX;
        let scrollLeft;

        episodeContainer.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - episodeContainer.offsetLeft;
            scrollLeft = episodeContainer.scrollLeft;
        });

        episodeContainer.addEventListener('mouseleave', () => {
            isDown = false;
        });

        episodeContainer.addEventListener('mouseup', () => {
            isDown = false;
        });

        episodeContainer.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - episodeContainer.offsetLeft;
            const walk = (x - startX) * 2;
            episodeContainer.scrollLeft = scrollLeft - walk;
        });

        // Progress bar interaction
        document.querySelectorAll('.progress-bar').forEach(bar => {
            bar.addEventListener('click', (e) => {
                const rect = bar.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const width = rect.width;
                const percentage = (x / width) * 100;
                bar.querySelector('.progress-fill').style.width = percentage + '%';
            });
        });