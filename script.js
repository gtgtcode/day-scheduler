let currentDay = dayjs().format("MM/DD/YYYY");
let enduserDate = document.getElementById("enduser-date");
let currentSelection = "";

let testObject = {
  note0: {
    id: 0,
    date: "3/27/2023",
    time: "9am",
    noteContent: "",
  },
};

localStorage.setItem("noteStorage", JSON.stringify(testObject));

enduserDate.innerHTML = `Today is ${currentDay}.`;

for (
  i = 0;
  i < Object.keys(JSON.parse(localStorage.getItem("noteStorage"))).length;
  i++
) {
  console.log(JSON.parse(localStorage.getItem("noteStorage"))["note" + i]);
  let noteTime = JSON.parse(localStorage.getItem("noteStorage"))["note" + i]
    .time;
  let noteContent = JSON.parse(localStorage.getItem("noteStorage"))["note" + i]
    .noteContent;

  document.getElementById(noteTime + "-note-content").innerHTML = noteContent;
}

function openModal(time) {
  currentSelection = time;
  modalBackground = document.createElement("div");
  modalBackground.setAttribute(
    "class",
    "w-full h-full !left-0 !top-0 bg-black opacity-25 fixed"
  );
  modalBackground.setAttribute("id", "modal-background");
  modalBackground.setAttribute("onclick", "closeModal()");
  modal = document.createElement("div");
  modal.setAttribute(
    "class",
    "w-[20rem] h-[20rem] bg-zinc-600 rounded-[40px] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
  );
  modal.setAttribute("id", "modal");
  document.body.append(modalBackground);
  modal.innerHTML = `  <button onclick="closeModal()" class="absolute text-white right-8 top-4">X</button>
  <h1 class="absolute left-8 top-4 text-white font-bold">Edit</h1>
  <input type="text" id="modal-prompt" class="bg-zinc-400 absolute left-1/2 -translate-x-1/2 mt-14 pb-[12rem] rounded-lg p-4">`;
  document.body.append(modal);
  document.getElementById("modal-prompt").value = document.getElementById(
    time + "-note-content"
  ).innerHTML;
  console.log("test");
}

function closeModal() {
  storageFile = localStorage.getItem("noteStorage").slice(0, -1);
  storageFile.slice(0, -1);
  storageFile += `, "note${
    Object.keys(JSON.parse(localStorage.getItem("noteStorage"))).length
  }": {"id": ${
    Object.keys(JSON.parse(localStorage.getItem("noteStorage"))).length
  }, "date": "${currentDay}", "time": "${currentSelection}","noteContent": "${
    document.getElementById("modal-prompt").value
  }"}}`;
  console.log(storageFile);

  localStorage.setItem("noteStorage", storageFile);

  document.getElementById("modal-background").remove();
  document.getElementById("modal").remove();

  for (
    i = 0;
    i < Object.keys(JSON.parse(localStorage.getItem("noteStorage"))).length;
    i++
  ) {
    console.log(JSON.parse(localStorage.getItem("noteStorage"))["note" + i]);
    let noteTime = JSON.parse(localStorage.getItem("noteStorage"))["note" + i]
      .time;
    let noteContent = JSON.parse(localStorage.getItem("noteStorage"))[
      "note" + i
    ].noteContent;
    console.log(noteTime);
    console.log(noteContent);

    document.getElementById(noteTime + "-note-content").innerHTML = noteContent;
  }
}
