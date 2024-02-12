        //  Sample product data 
        const products = [
            { name: 'Candle 1', price: 10.99 },
            { name: 'Candle 2', price: 12.99 },
            { name: 'Candle 3', price: 14.99 },
            { name: 'Candle 4', price: 16.99 },
            // Add more products as needed
        ];
        // Retrieve the cart data from localStorage on page load
        const storedCart = localStorage.getItem('cart');
        const cart = storedCart ? JSON.parse(storedCart) : [];

        // Cart data
        let discountApplied = false;
        let couponCode = 'candle';
        // Function to update the cart and total
        function updateCart() {
            const cartItemsElement = document.getElementById('cart-items');
            const cartTotalElement = document.getElementById('cart-total');
            let cartList = '';

            let total = 0;
            cart.forEach(item => {
                cartList += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
                total += item.price;
            });

            cartItemsElement.innerHTML = cartList;
            cartTotalElement.textContent = total.toFixed(2);
        }
        // Function to add a product to the cart
        function addToCart(name, price) {
            // Retrieve existing cart data from localStorage
            const storedCart = localStorage.getItem('cart');
            const existingCart = storedCart ? JSON.parse(storedCart) : [];

            // Add the new item to the existing cart
            existingCart.push({ name, price });

            // Store the updated cart data in localStorage
            localStorage.setItem('cart', JSON.stringify(existingCart));

            // Update the global cart variable
            cart.push({ name, price });

            // Update the cart icon notification
            updateCartNotification();

            // Update the cart display
            updateCart();
        }

        // Function to update the cart icon notification count
        function updateCartNotification() {
            const cartNotification = document.getElementById('cart-notification');
            if (cartNotification) {
                cartNotification.textContent = cart.length;
            }
            // Store the updated count in localStorage
            localStorage.setItem('cartNotificationCount', cart.length);
        }
        // Initial update when the page loads
        updateCart();
        // Function to view the cart...
        function viewCart() {
            window.location.href = 'cart.html';
        }


        // Function to show the coupon pop-up
        function showCouponPopup() {
            const couponPopup = document.getElementById('coupon-popup');
            setTimeout(function () {
                couponPopup.style.display = 'block';
            }, 2000); // Adjust the delay time (in milliseconds) as needed
        }
        // Show the coupon pop-up when the page is loaded
        window.onload = function () {
            showCouponPopup();
        };
        // Function to apply the coupon
        function applyCoupon() {
            couponCode = prompt('Enter coupon code:');
            if (couponCode === 'SAVE10') {
                discountApplied = true;
                alert('Coupon applied! You get 10% off your order.');
                updateCart();
            } else {
                alert('Invalid coupon code. Try again.');
            }
        }

        // Function to cancel the coupon
        function cancelCoupon() {
            discountApplied = false;
            couponCode = '';
            const couponPopup = document.getElementById('coupon-popup');
            couponPopup.style.display = 'none';
            updateCart();
        }


        // Function to display the receipt
        function showReceipt(items, total, discount) {
            const receiptPopup = document.getElementById('receipt-popup');
            const receiptItemsElement = document.getElementById('receipt-items');
            const receiptTotalElement = document.getElementById('receipt-total');
            const discountAmountElement = document.getElementById('discount-amount');
            const couponAppliedElement = document.getElementById('coupon-applied');
            let receiptList = '';

            items.forEach(item => {
                receiptList += `<li>${item.name} - $${item.price.toFixed(2)}</li>`;
            });

            receiptItemsElement.innerHTML = receiptList;
            receiptTotalElement.textContent = total.toFixed(2);
            discountAmountElement.textContent = discount.toFixed(2);
            couponAppliedElement.textContent = discountApplied ? `Yes (${couponCode})` : 'No';

            receiptPopup.style.display = 'block';
        }

        // Function to complete the checkout process
        function checkout() {
            const total = parseFloat(document.getElementById('cart-total').textContent);
            const discount = discountApplied ? total * 0.1 : 0;
            const finalTotal = total - discount;

            showReceipt(cart, finalTotal, discount);

            // Additional logic for completing the purchase (e.g., sending order to server)
        }


        // Navigation arrows
        const leftArrow = document.getElementById('left-arrow');
        const rightArrow = document.getElementById('right-arrow');
        const productsContainer = document.querySelector('.products-wrapper');
        const productWidth = document.querySelector('.product').offsetWidth;
        const numVisibleProducts = 4;

        leftArrow.addEventListener('click', function () {
            scrollProducts(-numVisibleProducts);
        });

        rightArrow.addEventListener('click', function () {
            scrollProducts(numVisibleProducts);
        });

        function scrollProducts(step) {
            const currentTransform = parseInt(productsContainer.style.transform.replace('px', '')) || 0;
            const maxTransform = -(productWidth * (productsContainer.children.length - numVisibleProducts));
            const newTransform = Math.min(0, Math.max(maxTransform, currentTransform + productWidth * step));
            productsContainer.style.transform = `translateX(${newTransform}px)`;

            // Show/hide products based on the scroll direction
            const products = productsContainer.children;
            for (let i = 0; i < products.length; i++) {
                if (step > 0 && i < numVisibleProducts) {
                    products[i].classList.add('hidden');
                } else if (step < 0 && i >= numVisibleProducts) {
                    products[i].classList.add('hidden');
                } else {
                    products[i].classList.remove('hidden');
                }
            }
        }

        // Function to show product details in a custom lightbox
        function showProductDetails(name, description, price) {
    const lightboxContainer = document.createElement('div');
    lightboxContainer.className = 'custom-lightbox';

    const content = `
        <div class="lightbox-content">
            <img src="image_path/${name.toLowerCase().replace(' ', '_')}.jpg" alt="${name}">
            <h2>${name}</h2>
            <p>${description}</p>
            <p>Price: $${price.toFixed(2)}</p>
            <button onclick="closeLightbox()">Close</button>
        </div>
    `;

    lightboxContainer.innerHTML = content;
    document.body.appendChild(lightboxContainer);
}


        // Retrieve the cart notification count from localStorage
        const storedNotificationCount = localStorage.getItem('cartNotificationCount');
        if (storedNotificationCount) {
            const cartNotification = document.getElementById('cart-notification');
            if (cartNotification) {
                cartNotification.textContent = storedNotificationCount;
            }
        }
        // Function to close the lightbox
        function closeLightbox() {
            const lightboxContainer = document.querySelector('.custom-lightbox');
            if (lightboxContainer) {
                document.body.removeChild(lightboxContainer);
            }
        }

        // Call the function when the page is loaded
        document.addEventListener('DOMContentLoaded', function () {
            // Initialize the lightbox
            lightbox.option({
                'resizeDuration': 200,
                'wrapAround': true,
                'disableScrolling': true,
                'albumLabel': 'Product %1 of %2',
                'alwaysShowNavOnTouchDevices': true
            });
        });

        function handleSectionClick(event) {
            // Check if the clicked element is not the image
            if (event.target.tagName !== 'IMG') {
                // Do something else or prevent the default behavior
                event.preventDefault();
            }
        }


