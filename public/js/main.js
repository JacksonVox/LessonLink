const deleteBtn = document.querySelectorAll(".delete-button");
const documentBtn = document.querySelectorAll("button.not");
const documentComplete = document.querySelectorAll("button.completed");

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deleteDocument);
});


async function deleteDocument() {
  const documentId = this.parentNode.dataset.id;
  try {
    const response = await fetch("documents/deleteDocument", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        documentIdFromJSFile: documentId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

