var files = [];

var firebaseForm = {};

document.getElementById("files").addEventListener("change", function (e) {
  files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    console.log(files[i]);
  }
});

/*
firebaseForm.submit = () => {

}
*/
//firebaseForm.uploadToStorage=()=>{

const form= document.querySelector('form');
form.addEventListener('submit', function (e) {

  e.preventDefault();
//document.getElementById("send").addEventListener("submit", function () {
  // 1. Submit Information to firestore database
  //call a function to initiate submit
  //checks if files are selected
  if (files.length != 0) {
    //Loops through all the selected files
    for (let i = 0; i < files.length; i++) {
      //create a storage reference

      const name = document.getElementById('name').value;
      //console.log(name.value);

      var storage = firebase.storage().ref('Medical/' + name + '/' + files[i].name);

      //upload file
      var upload = storage.put(files[i]);

      //update progress bar
      upload.on(
        "state_changed",
        function progress(snapshot) {
          var percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.getElementById("progress").value = percentage;
        },

        function error() {
          alert("error uploading file");
        },

        function complete() {
          document.getElementById(
            "uploading"
          ).innerHTML += `${files[i].name} uploaded <br />`;
          //if(document.getElementById("uploading").innerText.includes('uploaded')){
          if (document.getElementById("progress").value === 100) {
            alert(name + "'s details uploaded successfully.")
            firebaseForm.clearForm();
            console.log('var downloadURL = ' + upload.snapshot.downloadURL);
          } else {
            alert('Uploading');
          }
        }
      );
    }
  } else {
    alert("No file chosen");
  }
  firebaseForm.uploadToFirestore();
});



firebaseForm.uploadToFirestore = () => {
  console.log('Uploadig to Firestore');
  const date = new Date();
  let day = date.getDate();
  let month = parseInt(date.getMonth()) + 1;
  let year = date.getFullYear();
  let formatedDate = day + '/' + month + '/' + year;

  let name = $('#name').val();
  let email = $('#Email').val();
  let Phone = $('#Phone').val();
  let optional = $('#Optional').val();
  let Address = $('#Address').val();
  let referral = $('#Referral').val();
  let checked = false;
  let selected = null;
  let orderDate = formatedDate;
  var ele = document.getElementsByName('payment');
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked)
      console.log(ele[i].value);
    checked = true;
    selected = ele[i].value;
  }
  console.log(checked, selected)
  console.log({
    name, email, Phone, optional, Address, referral, selected, orderDate
  })
  let obj = {
    name, email, Phone, optional, Address, referral, selected, orderDate
  };

  db.collection("Medical").doc(name).set(obj).then(() => { console.log("Uploaded to firestore") })
    .catch((e) => {
      console.log(e);
      alert('Something went wrong from your side.')
    });
}





/*
firebaseForm.fetchDetails = () => {

}
*/

/*


*/

//CREATE OBJECT TO UPLOAD 


//Clear form
firebaseForm.clearForm=()=>{
    form.reset();
    document.getElementById("uploading").innerHTML= '';
      
}
