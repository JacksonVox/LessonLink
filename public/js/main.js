const deleteBtn = document.querySelectorAll(".delete-button");
const documentBtn = document.querySelectorAll("button.not");
const documentComplete = document.querySelectorAll("button.completed");
const assignTeacherDropdowns = document.querySelectorAll(".assign-user");

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deleteDocument);
});

Array.from(assignTeacherDropdowns).forEach((dropdown) => {
  dropdown.addEventListener("change", async (event) => {
    const userId = event.target.value;
    const documentId = event.target.closest(".document").dataset.id;

    try {
      const response = await fetch(
        `/documents/assignDocument/${documentId}/${userId}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok ${response.ok}`);
      }

      const data = await response.json();
      console.log(data);
      location.reload();
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  });
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

