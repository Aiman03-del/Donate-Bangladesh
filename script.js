// blur Navbar
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("backdrop-opacity-30");
  } else {
    navbar.classList.remove("backdrop-opacity-30");
  }
});
// show Donation
function showDonationSection() {
  const donationSection = document.getElementById("donationSection");
  const historySection = document.getElementById("historySection");
  const donationBtn = document.getElementById("donationBtn");
  const historyBtn = document.getElementById("historyBtn");

  donationSection.classList.remove("hidden");
  historySection.classList.add("hidden");

  donationBtn.classList.add("bg-green-500", "text-white");
  historyBtn.classList.remove("bg-green-500", "text-white");
  historyBtn.classList.add("bg-gray-200", "text-black");
}

document
  .getElementById("donationBtn")
  .addEventListener("click", showDonationSection);
document
  .getElementById("historyBtn")
  .addEventListener("click", showHistorySection);

showDonationSection();

// store Donation
function storeDonation(cause, inputAmount, cardId) {
  const donationInput = parseInt(inputAmount);
  const navAmountElement = document.getElementById("myAccount");

  if (!navAmountElement) {
    showModal("Error", "Balance element not found.", "invalid.png");
    return;
  }

  const navAmount =
    parseInt(navAmountElement.textContent.replace(" BDT", "")) || 0;

  if (isNaN(donationInput) || donationInput <= 0) {
    showModal(
      "Invalid Input",
      "Please enter a valid donation amount.",
      "invalid.png"
    );
    return;
  }

  if (donationInput > navAmount) {
    showModal(
      "Insufficient Balance",
      "You do not have enough balance in your account.",
      "invalid.png"
    );
    return;
  }

  const currentAmountElement = document.getElementById(cardId);
  const currentAmount =
    parseInt(currentAmountElement.textContent.replace(" BDT", "")) || 0;

  currentAmountElement.textContent = `${currentAmount + donationInput} BDT`;

  const newBalance = navAmount - donationInput;
  navAmountElement.textContent = `${newBalance} BDT`;

  const donationInputField = document.getElementById(
    `donation${cardId.replace("amount", "")}`
  );
  if (donationInputField) {
    donationInputField.value = "";
  }

  const donations = JSON.parse(localStorage.getItem("donations")) || [];
  donations.push({ cause, amount: donationInput });
  localStorage.setItem("donations", JSON.stringify(donations));

  showModal("Congrats!", "You have donated successfully!", "valid.png");
}

// donation history
function loadDonationHistory() {
  const donationList = document.getElementById("donationList");
  donationList.innerHTML = "";

  const donations = JSON.parse(localStorage.getItem("donations")) || [];
  if (donations.length === 0) {
    donationList.innerHTML = "<p>No donation history found.</p>";
    return;
  }

  donations.forEach((donation) => {
    const donationItem = document.createElement("div");
    donationItem.className = "bg-white p-4 mb-2 rounded-lg shadow";

    const dateTimeString = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka",
      hour12: false,
    });

    donationItem.innerHTML = `
            <h2 class="text-lg font-bold">
              ${donation.amount} Taka is Donated for ${donation.cause} 
            </h2>
            <p class="text-sm text-gray-600">
              Date: ${dateTimeString} GMT +0600 (Bangladesh Standard Time)
            </p>
        `;

    donationList.appendChild(donationItem);
  });
}

// show history
function showHistorySection() {
  const donationSection = document.getElementById("donationSection");
  const historySection = document.getElementById("historySection");
  const donationBtn = document.getElementById("donationBtn");
  const historyBtn = document.getElementById("historyBtn");

  donationSection.classList.add("hidden");
  historySection.classList.remove("hidden");

  historyBtn.classList.add("bg-green-500", "text-white");
  donationBtn.classList.remove("bg-green-500", "text-white");
  donationBtn.classList.add("bg-gray-200", "text-black");

  loadDonationHistory();
}
// show modal
function showModal(title, message, imageSrc = "valid.png") {
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  const modalImage = document.querySelector("#donationModal img");
  const donationModal = document.getElementById("donationModal");

  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modalImage.src = `assets/${imageSrc}`;
  donationModal.classList.remove("hidden");
}

function closeModal() {
  const donationModal = document.getElementById("donationModal");
  donationModal.classList.add("hidden");
}
