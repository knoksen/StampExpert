document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const dropZone = document.getElementById('dropZone');
    const uploadArea = document.getElementById('uploadArea');
    const previewArea = document.getElementById('previewArea');
    const stampUpload = document.getElementById('stampUpload');
    const previewImage = document.getElementById('previewImage');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const resultsContainer = document.getElementById('resultsContainer');
    const collectionContainer = document.getElementById('collectionContainer');
    const emptyCollection = document.getElementById('emptyCollection');
    const stampCollection = document.getElementById('stampCollection');
    const saveBtn = document.getElementById('saveBtn');
    const newAnalysisBtn = document.getElementById('newAnalysisBtn');
    const filterCountry = document.getElementById('filterCountry');
    const filterRarity = document.getElementById('filterRarity');
    
    // Sample database of stamps (in a real app, this would be from an API)
    const stampDatabase = {
        "usa-1": {
            id: "usa-1",
            country: "USA",
            year: "1918",
            denomination: "24¢",
            catalogNumber: "Scott #518",
            rarity: "rare",
            condition: "Very Fine",
            value: "$1,200 - $1,800",
            description: "The famous 'Inverted Jenny' stamp, featuring an upside-down image of a Curtiss JN-4 airplane. Only 100 of these error stamps are known to exist.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/US_Inverted_Jenny_24c_1918_issue.jpg/320px-US_Inverted_Jenny_24c_1918_issue.jpg"
        },
        "uk-1": {
            id: "uk-1",
            country: "UK",
            year: "1840",
            denomination: "1d",
            catalogNumber: "SG #1",
            rarity: "uncommon",
            condition: "Fine",
            value: "$500 - $800",
            description: "The Penny Black, the world's first adhesive postage stamp used in a public postal system.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Penny_black.jpg/320px-Penny_black.jpg"
        },
        "france-1": {
            id: "france-1",
            country: "France",
            year: "1849",
            denomination: "1F",
            catalogNumber: "Yvert #3",
            rarity: "rare",
            condition: "Good",
            value: "$800 - $1,200",
            description: "Ceres stamp from the first French postage stamp series. Features the Roman goddess of agriculture.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/France_1849_Ceres_1F.jpg/320px-France_1849_Ceres_1F.jpg"
        },
        "germany-1": {
            id: "germany-1",
            country: "Germany",
            year: "1872",
            denomination: "1Kr",
            catalogNumber: "Michel #1",
            rarity: "common",
            condition: "Very Fine",
            value: "$50 - $80",
            description: "Imperial German Eagle stamp from the German Empire period. First official German postage stamp.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/German_Empire_1872_1_Kreuzer.jpg/320px-German_Empire_1872_1_Kreuzer.jpg"
        },
        "japan-1": {
            id: "japan-1",
            country: "Japan",
            year: "1871",
            denomination: "48M",
            catalogNumber: "Scott #4",
            rarity: "ultra-rare",
            condition: "Mint",
            value: "$2,000 - $3,500",
            description: "Dragon stamp from the first Japanese postage stamp series. Features a traditional Japanese dragon design.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Japan_1871_Dragon_48mon.jpg/320px-Japan_1871_Dragon_48mon.jpg"
        },
        "usa-2": {
            id: "usa-2",
            country: "USA",
            year: "1869",
            denomination: "90¢",
            catalogNumber: "Scott #122",
            rarity: "legendary",
            condition: "Very Fine",
            value: "$5,000 - $8,000",
            description: "The famous 'Inverted Center' stamp with Abraham Lincoln. One of the most valuable US stamps.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/US_1869_90c_Lincoln_inverted.jpg/320px-US_1869_90c_Lincoln_inverted.jpg"
        },
        "uk-2": {
            id: "uk-2",
            country: "UK",
            year: "1841",
            denomination: "2d",
            catalogNumber: "SG #14",
            rarity: "uncommon",
            condition: "Fine",
            value: "$200 - $350",
            description: "The Penny Red, successor to the Penny Black. Features improved cancellation system.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Penny_Red.jpg/320px-Penny_Red.jpg"
        },
        "canada-1": {
            id: "canada-1",
            country: "Canada",
            year: "1851",
            denomination: "12d",
            catalogNumber: "Scott #3",
            rarity: "rare",
            condition: "Very Good",
            value: "$1,500 - $2,200",
            description: "The Black Empress stamp featuring Queen Victoria. One of Canada's most iconic stamps.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Canada_1851_12d_Black_Empress.jpg/320px-Canada_1851_12d_Black_Empress.jpg"
        },
        "brazil-1": {
            id: "brazil-1",
            country: "Brazil",
            year: "1843",
            denomination: "30R",
            catalogNumber: "Scott #1",
            rarity: "legendary",
            condition: "Fine",
            value: "$10,000 - $15,000",
            description: "The Bull's Eye stamp, Brazil's first postage stamp. Extremely rare and valuable.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Brazil_1843_Bull_Eye_30_Reis.jpg/320px-Brazil_1843_Bull_Eye_30_Reis.jpg"
        },
        "australia-1": {
            id: "australia-1",
            country: "Australia",
            year: "1913",
            denomination: "1d",
            catalogNumber: "Scott #1",
            rarity: "common",
            condition: "Very Fine",
            value: "$30 - $50",
            description: "The Kangaroo and Map stamp, Australia's first postage stamp featuring national symbols.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Australia_1913_1d_Kangaroo.jpg/320px-Australia_1913_1d_Kangaroo.jpg"
        }
    };
    
    // User's collection
    let userCollection = [];
    
    // Drag and drop functionality
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropZone.classList.add('border-blue-500', 'bg-blue-50');
    }
    
    function unhighlight() {
        dropZone.classList.remove('border-blue-500', 'bg-blue-50');
    }
    
    dropZone.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }
    
    // File input change
    stampUpload.addEventListener('change', function() {
        if (this.files.length) {
            handleFiles(this.files);
        }
    });
    
    function handleFiles(files) {
        const file = files[0];
        if (file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                uploadArea.classList.add('hidden');
                previewArea.classList.remove('hidden');
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload an image file.');
        }
    }
    
    // Cancel button
    cancelBtn.addEventListener('click', function() {
        previewImage.src = '';
        uploadArea.classList.remove('hidden');
        previewArea.classList.add('hidden');
        stampUpload.value = '';
    });
    
    // Analyze button
    analyzeBtn.addEventListener('click', async function() {
        if (!stampUpload.files.length) {
            showErrorMessage('Please upload a stamp image first.');
            return;
        }

        const file = stampUpload.files[0];
        
        // Enhanced file validation
        if (!isValidImageFile(file)) {
            showErrorMessage('Please upload a valid image file (JPG, PNG, WebP, or GIF).');
            return;
        }
        
        if (file.size > 10 * 1024 * 1024) { // 10MB limit
            showErrorMessage('File size must be less than 10MB.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        previewArea.classList.add('hidden');
        loadingIndicator.classList.remove('hidden');

        try {
            // Perform client-side image analysis first
            const imageAnalysis = await analyzeImageClientSide(file);
            
            const response = await fetch('/api/analyze', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            console.log('Analysis result', data);
            showAdvancedStampResult(imageAnalysis);
        } catch (err) {
            console.error('Failed to analyze stamp', err);
            showErrorMessage('Failed to analyze stamp. Please try again.');
        } finally {
            loadingIndicator.classList.add('hidden');
        }
    });
    
    // Helper functions for enhanced image processing
    function isValidImageFile(file) {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        return validTypes.includes(file.type);
    }
    
    function showErrorMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center z-50';
        alert.innerHTML = `
            <i class="fas fa-exclamation-triangle mr-2"></i>
            <span>${message}</span>
            <button class="ml-2 text-white hover:text-gray-200" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        document.body.appendChild(alert);
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
    
    function showSuccessMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center z-50';
        alert.innerHTML = `
            <i class="fas fa-check-circle mr-2"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(alert);
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 3000);
    }
    
    async function analyzeImageClientSide(file) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                
                // Simple analysis
                let totalBrightness = 0;
                let colorChannels = {r: 0, g: 0, b: 0};
                let pixelCount = 0;
                
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    
                    totalBrightness += (r + g + b) / 3;
                    colorChannels.r += r;
                    colorChannels.g += g;
                    colorChannels.b += b;
                    pixelCount++;
                }
                
                const avgBrightness = totalBrightness / pixelCount;
                const avgR = colorChannels.r / pixelCount;
                const avgG = colorChannels.g / pixelCount;
                const avgB = colorChannels.b / pixelCount;
                
                resolve({
                    dimensions: {width: img.width, height: img.height},
                    brightness: avgBrightness,
                    dominantColor: {r: avgR, g: avgG, b: avgB},
                    quality: avgBrightness > 100 ? 'good' : 'poor',
                    aspectRatio: img.width / img.height
                });
            };
            img.src = URL.createObjectURL(file);
        });
    }
    
    // Enhanced stamp result display
    function showAdvancedStampResult(imageAnalysis) {
        const stampKeys = Object.keys(stampDatabase);
        const randomKey = stampKeys[Math.floor(Math.random() * stampKeys.length)];
        const stamp = stampDatabase[randomKey];
        
        // Add confidence based on image quality
        const confidence = imageAnalysis.quality === 'good' ? 
            Math.floor(Math.random() * 20) + 80 : 
            Math.floor(Math.random() * 30) + 50;
        
        document.getElementById('country').textContent = stamp.country;
        document.getElementById('year').textContent = stamp.year;
        document.getElementById('denomination').textContent = stamp.denomination;
        document.getElementById('catalogNumber').textContent = stamp.catalogNumber;
        
        const rarityElement = document.getElementById('rarity');
        rarityElement.textContent = stamp.rarity.charAt(0).toUpperCase() + stamp.rarity.slice(1);
        rarityElement.className = 'px-2 py-1 rounded-full text-xs font-medium ' + getRarityClass(stamp.rarity);
        
        document.getElementById('condition').textContent = stamp.condition;
        document.getElementById('value').textContent = stamp.value;
        document.getElementById('description').textContent = stamp.description;
        
        // Add confidence and technical info
        const confidenceElement = document.getElementById('confidence');
        if (confidenceElement) {
            confidenceElement.textContent = `${confidence}%`;
            confidenceElement.className = `font-bold ${confidence > 75 ? 'text-green-600' : confidence > 50 ? 'text-yellow-600' : 'text-red-600'}`;
        }
        
        const dimensionsElement = document.getElementById('dimensions');
        if (dimensionsElement) {
            dimensionsElement.textContent = `${imageAnalysis.dimensions.width} × ${imageAnalysis.dimensions.height}px`;
        }
        
        const qualityElement = document.getElementById('imageQuality');
        if (qualityElement) {
            qualityElement.textContent = imageAnalysis.quality.charAt(0).toUpperCase() + imageAnalysis.quality.slice(1);
            qualityElement.className = `px-2 py-1 rounded text-xs ${imageAnalysis.quality === 'good' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`;
        }
        
        resultsContainer.classList.remove('hidden');
    }
    
    // Show a random stamp result (fallback)
    function showRandomStampResult() {
        showAdvancedStampResult({
            dimensions: {width: 800, height: 600},
            brightness: 120,
            dominantColor: {r: 100, g: 100, b: 100},
            quality: 'good',
            aspectRatio: 1.33
        });
    }
    
    function getRarityClass(rarity) {
        const classes = {
            'common': 'bg-green-100 text-green-800',
            'uncommon': 'bg-blue-100 text-blue-800',
            'rare': 'bg-purple-100 text-purple-800',
            'ultra-rare': 'bg-pink-100 text-pink-800',
            'legendary': 'bg-yellow-100 text-yellow-800'
        };
        return classes[rarity] || 'bg-gray-100 text-gray-800';
    }
    
    // Save to collection
    saveBtn.addEventListener('click', function() {
        const stampKeys = Object.keys(stampDatabase);
        const randomKey = stampKeys[Math.floor(Math.random() * stampKeys.length)];
        const stamp = JSON.parse(JSON.stringify(stampDatabase[randomKey])); // Deep copy
        
        // Add unique ID and timestamp
        stamp.userId = 'user-' + Date.now();
        stamp.addedDate = new Date().toISOString();
        
        // Add the uploaded image to the stamp record
        if (stampUpload.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function(e) {
                stamp.userImage = e.target.result;
                userCollection.push(stamp);
                saveCollectionToStorage();
                updateCollectionDisplay();
                showSuccessMessage('Stamp added to your collection!');
            };
            reader.readAsDataURL(stampUpload.files[0]);
        } else {
            userCollection.push(stamp);
            saveCollectionToStorage();
            updateCollectionDisplay();
            showSuccessMessage('Stamp added to your collection!');
        }
        
        resultsContainer.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        previewArea.classList.add('hidden');
        stampUpload.value = '';
    });
    
    // Collection management functions
    function saveCollectionToStorage() {
        try {
            localStorage.setItem('stampCollection', JSON.stringify(userCollection));
        } catch (error) {
            console.error('Failed to save collection:', error);
        }
    }
    
    function loadCollectionFromStorage() {
        try {
            const saved = localStorage.getItem('stampCollection');
            if (saved) {
                userCollection = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Failed to load collection:', error);
            userCollection = [];
        }
    }
    
    function exportCollection() {
        if (userCollection.length === 0) {
            showErrorMessage('No stamps in collection to export.');
            return;
        }
        
        const exportData = {
            exportDate: new Date().toISOString(),
            version: '1.0',
            stamps: userCollection
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `StampExpert_Collection_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        showSuccessMessage('Collection exported successfully!');
    }
    
    function importCollection(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const importData = JSON.parse(e.target.result);
                
                if (importData.stamps && Array.isArray(importData.stamps)) {
                    const importCount = importData.stamps.length;
                    
                    // Merge with existing collection, avoiding duplicates
                    const existingIds = new Set(userCollection.map(s => s.userId));
                    const newStamps = importData.stamps.filter(s => !existingIds.has(s.userId));
                    
                    userCollection.push(...newStamps);
                    saveCollectionToStorage();
                    updateCollectionDisplay();
                    
                    showSuccessMessage(`Successfully imported ${newStamps.length} stamps (${importCount - newStamps.length} duplicates skipped).`);
                } else {
                    showErrorMessage('Invalid collection file format.');
                }
            } catch (error) {
                console.error('Import error:', error);
                showErrorMessage('Failed to import collection. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
    
    // New analysis button
    newAnalysisBtn.addEventListener('click', function() {
        resultsContainer.classList.add('hidden');
        uploadArea.classList.remove('hidden');
        previewArea.classList.add('hidden');
        stampUpload.value = '';
    });
    
    // Update collection display
    function updateCollectionDisplay() {
        updateCollectionStats();
        
        if (userCollection.length === 0) {
            emptyCollection.classList.remove('hidden');
            stampCollection.classList.add('hidden');
            document.getElementById('collectionStats').classList.add('hidden');
            return;
        }
        
        emptyCollection.classList.add('hidden');
        stampCollection.classList.remove('hidden');
        document.getElementById('collectionStats').classList.remove('hidden');
        
        // Filter collection
        const countryFilter = filterCountry.value.toLowerCase();
        const rarityFilter = filterRarity.value.toLowerCase();
        
        const filteredCollection = userCollection.filter(stamp => {
            return (countryFilter === '' || stamp.country.toLowerCase().includes(countryFilter)) &&
                   (rarityFilter === '' || stamp.rarity === rarityFilter);
        });
        
        // Clear current display
        stampCollection.innerHTML = '';
        
        // Add filtered stamps
        filteredCollection.forEach(stamp => {
            const stampCard = document.createElement('div');
            stampCard.className = `stamp-card bg-white rounded-lg shadow overflow-hidden ${getRarityBorderClass(stamp.rarity)}`;
            
            const stampImage = stamp.userImage || stamp.image;
            
            stampCard.innerHTML = `
                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <div>
                            <h3 class="font-semibold text-lg">${stamp.country} ${stamp.denomination}</h3>
                            <p class="text-sm text-gray-500">${stamp.year} • ${stamp.catalogNumber}</p>
                        </div>
                        <span class="${getRarityClass(stamp.rarity)} px-2 py-1 rounded-full text-xs font-medium">
                            ${stamp.rarity.charAt(0).toUpperCase() + stamp.rarity.slice(1)}
                        </span>
                    </div>
                    <img src="${stampImage}" alt="${stamp.country} stamp" class="w-full h-32 object-contain mb-3" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDIwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMDAgNTBMMTIwIDMwTDEwMCA1MEw4MCAzMEwxMDAgNTBaIiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K'">
                    <div class="flex justify-between items-center text-sm">
                        <span class="font-medium">${stamp.value}</span>
                        <span class="text-gray-500">${stamp.condition}</span>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-2 flex justify-between items-center border-t">
                    <span class="text-xs text-gray-500">Added: ${new Date(stamp.addedDate).toLocaleDateString()}</span>
                    <button class="text-red-500 hover:text-red-700 text-sm transition-colors" onclick="removeStamp('${stamp.userId}')" title="Remove from collection">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            stampCollection.appendChild(stampCard);
        });
    }
    
    function updateCollectionStats() {
        const totalStamps = userCollection.length;
        const uniqueCountries = new Set(userCollection.map(stamp => stamp.country)).size;
        const rareStamps = userCollection.filter(stamp => 
            stamp.rarity === 'rare' || stamp.rarity === 'ultra-rare' || stamp.rarity === 'legendary'
        ).length;
        
        // Calculate estimated total value
        let totalValue = 0;
        userCollection.forEach(stamp => {
            const valueString = stamp.value.replace(/[^\d,-]/g, '');
            const values = valueString.split('-').map(v => parseInt(v.replace(/,/g, '')));
            if (values.length >= 2) {
                totalValue += (values[0] + values[1]) / 2;
            } else if (values.length === 1) {
                totalValue += values[0];
            }
        });
        
        document.getElementById('totalStamps').textContent = totalStamps;
        document.getElementById('totalCountries').textContent = uniqueCountries;
        document.getElementById('rareStamps').textContent = rareStamps;
        document.getElementById('totalValue').textContent = totalValue > 0 ? 
            `$${totalValue.toLocaleString()}` : '$0';
    }
    
    function getRarityBorderClass(rarity) {
        return `rarity-${rarity.split(' ').join('-')}`;
    }
    
    // Filter change handlers
    filterCountry.addEventListener('change', updateCollectionDisplay);
    filterRarity.addEventListener('change', updateCollectionDisplay);
    
    // Global function to remove stamp
    window.removeStamp = function(userId) {
        userCollection = userCollection.filter(stamp => stamp.userId !== userId);
        saveCollectionToStorage();
        updateCollectionDisplay();
        showSuccessMessage('Stamp removed from collection.');
    };
    
    // Global export function
    window.exportCollection = exportCollection;
    
    // Global import function
    window.importCollection = importCollection;
    
    // Initialize
    loadCollectionFromStorage();
    updateCollectionDisplay();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+O for open file
        if (e.ctrlKey && e.key === 'o') {
            e.preventDefault();
            stampUpload.click();
        }
        // Ctrl+E for export
        if (e.ctrlKey && e.key === 'e') {
            e.preventDefault();
            exportCollection();
        }
        // Escape to cancel
        if (e.key === 'Escape') {
            if (!previewArea.classList.contains('hidden')) {
                cancelBtn.click();
            }
            if (!resultsContainer.classList.contains('hidden')) {
                newAnalysisBtn.click();
            }
        }
    });
});
