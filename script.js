document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Collect form values
    const textInputs = document.querySelectorAll("input[type='text']");
    const firstName = textInputs[0].value.trim();
    const middleName = textInputs[1].value.trim();
    const lastName = textInputs[2].value.trim();
    const fatherName = textInputs[3].value.trim();
    const motherName = textInputs[4].value.trim();
    const dob = document.querySelector("input[type='date']").value;
    const gender = document.querySelector("input[name='gender']:checked")?.value || "Not Selected";
    const education = textInputs[5].value.trim();
    const email = document.querySelector("input[type='email']").value.trim();
    const phone = document.querySelector("input[type='tel']").value.trim();

    // File inputs
    const photoFile = document.querySelector("input[name='Photo']").files[0];
    const signatureFile = document.querySelector("input[name='Signature']").files[0];

    // Basic validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be 10 digits.");
        return;
    }

    const today = new Date();
    const birthDate = new Date(`${dob}T00:00:00`);
    if (Number.isNaN(birthDate.getTime()) || birthDate >= today) {
        alert("Date of Birth must be in the past.");
        return;
    }

    // Display success message with details
    const messageBox = document.getElementById("message");
    messageBox.style.display = "block";
    messageBox.style.color = "green";

    const photoPreview = photoFile ? `<img src="${URL.createObjectURL(photoFile)}" alt="Photo" style="max-width:100px; margin:5px;">` : "";
    const signaturePreview = signatureFile ? `<img src="${URL.createObjectURL(signatureFile)}" alt="Signature" style="max-width:100px; margin:5px;">` : "";
    const escapeHtml = (value) => value.replace(/[&<>'"]/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        "\"": "&quot;"
    }[character]));

    messageBox.innerHTML = `
        <h3>Registration Successful!</h3>
        <p><strong>First Name:</strong> ${escapeHtml(firstName)}</p>
        <p><strong>Middle Name:</strong> ${escapeHtml(middleName)}</p>
        <p><strong>Last Name:</strong> ${escapeHtml(lastName)}</p>
        <p><strong>Father Name:</strong> ${escapeHtml(fatherName)}</p>
        <p><strong>Mother Name:</strong> ${escapeHtml(motherName)}</p>
        <p><strong>Date of Birth:</strong> ${escapeHtml(dob)}</p>
        <p><strong>Gender:</strong> ${escapeHtml(gender)}</p>
        <p><strong>Education:</strong> ${escapeHtml(education)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Photo:</strong><br>${photoPreview}</p>
        <p><strong>Signature:</strong><br>${signaturePreview}</p>
    `;

    // Reset form after showing details
    this.reset();
});