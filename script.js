document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // prevent default form submission

    // Collect form values
    let firstName = document.querySelector("input[required][type='text']").value;
    let middleName = document.querySelectorAll("input[type='text']")[1].value;
    let lastName = document.querySelectorAll("input[type='text']")[2].value;
    let fatherName = document.querySelectorAll("input[type='text']")[3].value;
    let motherName = document.querySelectorAll("input[type='text']")[4].value;
    let dob = document.querySelector("input[type='date']").value;
    let gender = document.querySelector("input[name='gender']:checked")?.value || "Not Selected";
    let education = document.querySelectorAll("input[type='text']")[5].value;
    let email = document.querySelector("input[type='email']").value;
    let phone = document.querySelector("input[type='tel']").value;

    // File inputs
    let photoFile = document.querySelector("input[name='Photo']").files[0];
    let signatureFile = document.querySelector("input[name='Signature']").files[0];

    // Basic validation
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        alert("Phone number must be 10 digits.");
        return;
    }

    let today = new Date();
    let birthDate = new Date(dob);
    if (birthDate >= today) {
        alert("Date of Birth must be in the past.");
        return;
    }

    // Display success message with details
    let messageBox = document.getElementById("message");
    messageBox.style.display = "block";
    messageBox.style.color = "green";

    let photoPreview = photoFile ? `<img src="${URL.createObjectURL(photoFile)}" alt="Photo" style="max-width:100px; margin:5px;">` : "";
    let signaturePreview = signatureFile ? `<img src="${URL.createObjectURL(signatureFile)}" alt="Signature" style="max-width:100px; margin:5px;">` : "";

    messageBox.innerHTML = `
        <h3>Registration Successful!</h3>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Middle Name:</strong> ${middleName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Father Name:</strong> ${fatherName}</p>
        <p><strong>Mother Name:</strong> ${motherName}</p>
        <p><strong>Date of Birth:</strong> ${dob}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Education:</strong> ${education}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Photo:</strong><br>${photoPreview}</p>
        <p><strong>Signature:</strong><br>${signaturePreview}</p>
    `;

    // Reset form after showing details
    this.reset();
});