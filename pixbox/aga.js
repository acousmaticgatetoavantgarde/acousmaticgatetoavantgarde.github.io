// --- ÎÑÍÎÂÍÛÅ ÏÅÐÅÌÅÍÍÛÅ È ÍÀÑÒÐÎÉÊÈ ---
        const filterButtons = document.querySelectorAll('.filter-btn');
        const artBlocks = document.querySelectorAll('.art-block');
        let activeFilters = {
            period: new Set(),
            type: new Set()
        };

        // --- ÔÓÍÊÖÈÈ ËÎÃÈÊÈ ---
        function handleButtonClick(event) {
            const clickedButton = event.target;
            const filterGroup = clickedButton.dataset.filterGroup;
            const filterValue = clickedButton.dataset.filterValue;

            clickedButton.classList.toggle('active');

            if (clickedButton.classList.contains('active')) {
                activeFilters[filterGroup].add(filterValue);
            } else {
                activeFilters[filterGroup].delete(filterValue);
            }

            applyFilters();
        }

        function applyFilters() {
            const isAnyFilterActive = Object.values(activeFilters).some(set => set.size > 0);

            artBlocks.forEach(block => {
                if (!isAnyFilterActive) {
                    block.style.display = 'flex';
                    return;
                }

                let matchesAllGroups = true;

                for (const group in activeFilters) {
                    const selectedValues = activeFilters[group];
                    if (selectedValues.size > 0) {
                        const blockValue = block.dataset[group];
                        if (!selectedValues.has(blockValue)) {
                            matchesAllGroups = false;
                            break;
                        }
                    }
                }

                block.style.display = matchesAllGroups ? 'flex' : 'none';
            });
        }

        // --- ÌÎÄÀËÜÍÛÅ ÎÊÍÀ ---
        var overlay = document.getElementById('overlay');
        var descriptions = document.querySelectorAll('.art-description');

        function hideAllDescriptions() {
            descriptions.forEach(function(desc) {
                desc.style.display = 'none';
            });
            overlay.style.display = 'none';
            document.querySelectorAll('.cvr').forEach(function(el) {
                el.classList.remove('active');
            });
        }

        function showDescriptionById(id) {
            hideAllDescriptions();
            var targetDesc = document.querySelector('.art-description[data-art_for="' + id + '"]');
            if (targetDesc) {
                targetDesc.style.display = 'block';
                overlay.style.display = 'block';
                var activeBlock = document.querySelector('.art-block[data-art-id="' + id + '"] .cvr');
                if (activeBlock) {
                    activeBlock.classList.add('active');
                }
            }
        }

        // --- ÈÍÈÖÈÀËÈÇÀÖÈß È ÎÁÐÀÁÎÒ×ÈÊÈ ÑÎÁÛÒÈÉ ---
        filterButtons.forEach(button => {
            button.addEventListener('click', handleButtonClick);
        });

        artBlocks.forEach(function(block) {
            block.addEventListener('click', function(e) {
                e.stopPropagation();
                var artId = this.getAttribute('data-art-id');
                showDescriptionById(artId);
            });
        });

        overlay.addEventListener('click', function() {
            hideAllDescriptions();
        });

        document.addEventListener('click', function(e) {
            var isClickInsideDescription = false;
            descriptions.forEach(function(desc) {
                if (desc.contains(e.target)) {
                    isClickInsideDescription = true;
                }
            });
            if (!isClickInsideDescription && e.target !== overlay) {
                hideAllDescriptions();
            }
        });

        hideAllDescriptions();
        applyFilters();
