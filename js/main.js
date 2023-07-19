let siteNameInput = document.getElementById("siteName");
let siteUrlInput = document.getElementById("siteUrl");

let allSites = [];
if (localStorage.getItem("allSites") != null) {
  allSites = JSON.parse(localStorage.getItem("allSites"));
  display();
}

function add() {
  if (found()) {
    if (validation()) {
      let site = {
        name: siteNameInput.value,
        url: siteUrlInput.value,
      };
      allSites.push(site);
      localStorage.setItem("allSites", JSON.stringify(allSites));
      clear();
      display();
    } else {
      document.getElementById("alert").style = "display:block;";
    }
  } else {
    window.alert("the site name is repeats");
  }
}
function found() {
  let x = 0;

  for (let i = 0; i < allSites.length; i++) {
    if (siteNameInput.value != allSites[i].name) {
      x++;
    }
  }
  if (x == allSites.length) {
    return true;
  } else {
    return false;
  }
}

function clear() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}
function display() {
  let cartona = "";
  let j;
  for (let i = 0; i < allSites.length; i++) {
    j = i + 1;
    cartona += `               <tr>
    <td>${j}</td>
    <td>${allSites[i].name}</td>
    <td> <button onclick="visit(${i})" class="btn  btn-info"><i class="fa-regular fa-eye"></i> visit</button></td>
    <td> <button onclick="del(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> delete</button></td>
</tr>`;
  }
  document.getElementById("tbody").innerHTML = cartona;
}

function visit(indx) {
  window.location.href = allSites[indx].url;
}

function del(indx) {
  allSites.splice(indx,1);
  localStorage.setItem("allSites", JSON.stringify(allSites));
  display();
}

function validation() {
  let validationName = /^[a-z]{3,}$/;
  let validationURL = /^(ftp|http|https):\/\/[^ "]+$/;

  return (
    validationName.test(siteNameInput.value) &&
    validationURL.test(siteUrlInput.value)
  );
}
