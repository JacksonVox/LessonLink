const documentGrid = document.querySelector('.document-grid')

// Create Document Modal
const createDocModal = document.getElementById("createDocModal");
const createDocCloseBtn = document.getElementsByClassName("close")[0];
const createDocBtn = document.getElementById("createDocBtn");

createDocCloseBtn.onclick = function() {
  createDocModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == createDocModal) {
    createDocModal.style.display = "none";
  }
}

createDocBtn.onclick = function() {
  openCreateDocModal();
}

function openCreateDocModal() {
  createDocModal.style.display = "flex";
}

// View Document Modal
const viewDocModal = document.getElementById("viewDocModal");
const viewDocCloseBtn = document.getElementsByClassName("close")[1];
const deleteDocBtn = document.getElementById("delete-document")
const openDocBtn = document.getElementById("open-document")

viewDocCloseBtn.onclick = function() {
  viewDocModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == viewDocModal) {
    viewDocModal.style.display = "none";
  }
}

function openViewDocModal(title, description, fileUrl, previewUrl, docId, docCloudId) {
  document.getElementById("docTitle").innerText = title;
  document.getElementById("docDescription").innerText = description;
  document.getElementById("docFile").src = previewUrl;
  deleteDocBtn.setAttribute("doc-id", docId);
  deleteDocBtn.setAttribute("doc-cloud-id", docCloudId);
  openDocBtn.href = fileUrl;
  viewDocModal.style.display = "flex";
}

async function deleteDocument() {
  const docId = deleteDocBtn.getAttribute("doc-id");
  const docCloudId = deleteDocBtn.getAttribute("doc-cloud-id")

  const confirmed = confirm("Are you sure you want to delete this document? This cannot be undone.")
  if (!confirmed) {
    return;
  }
  
  try {
    const response = await fetch("/documents/deleteDocument", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ docId, docCloudId }),
    });
    if (response.ok) {
      location.reload();
    } else {
      console.error("Failed to delete document");
    }
  } catch (error) {
    console.error(error);
  }
};


//Event Listeners
documentGrid.addEventListener("click", (event) => {
  const listItem = event.target.closest('.list-item')
  if (listItem) {
    const title = listItem.getAttribute("data-title");
    const description = listItem.getAttribute("data-description");
    const fileUrl = listItem.getAttribute("data-file-url");
    const previewUrl = `https://res.cloudinary.com/dxxfdmsh3/image/upload/t_pdf-to-jpg/${listItem.getAttribute("cloudinary-id")}`;
    const docCloudId = listItem.getAttribute("cloudinary-id");
    const docId = listItem.getAttribute("data-id")
    openViewDocModal(title, description, fileUrl, previewUrl, docId, docCloudId);
  }
});

deleteDocBtn.addEventListener("click", deleteDocument);