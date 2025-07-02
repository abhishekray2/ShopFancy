// Function to show a toast notification
export function showToast(type, message) {
  // Get or create toast container
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    document.body.appendChild(toastContainer);
  }

  // Create a new toast element
  const toast = document.createElement("div");
  toast.classList.add("toast");
  
  // Add type-specific class and icon
  if (type === "add" || type === "success") {
    toast.classList.add("success");
    toast.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>${typeof message === 'string' ? message : 'Item added to cart successfully!'}</span>
    `;
  } else if (type === "error") {
    toast.classList.add("error");
    toast.innerHTML = `
      <i class="fas fa-exclamation-circle"></i>
      <span>${message}</span>
    `;
  } else if (type === "remove") {
    toast.classList.add("success");
    toast.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>Item removed from cart successfully!</span>
    `;
  }

  // Add the toast to the container
  toastContainer.appendChild(toast);

  // Set initial animation
  toast.style.animation = 'slideInRight 0.3s ease-out forwards';

  // Add fade out animation before removing
  setTimeout(() => {
    toast.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2000);
}
