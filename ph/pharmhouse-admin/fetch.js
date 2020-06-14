
const list = document.querySelector('ol');
const form = document.querySelector('form');

db.collection('Medical').get().then(snapshot => {
    snapshot.docs.forEach((doc) => {
        addDetails(doc.data());
    });
}).catch(err => {
    console.log(err);
});

//<div>Name: ${location.name || location.FORMATTED} </div>
const addDetails = (details) => {
    var name = details.name;
    var refName = name.split(" ");
    let html = `
            <hr/>
            <li class=${refName[0]+refName[1]}>
                <div>Name: <b>${details.name}</b> </div>
                <div>Phone:<b> ${details.Phone}</b></div> 
                <div>Email: <b>${details.email}</b></div>
                <div>Addresss: <b>${details.Address}</b></div>  
                <div>OrderedDate: <b>${details.orderDate}</b></div>  
                <div>Referral Number: <b>${details.referral}</b></div>  
                <div>Mode Of Payment: <b>${details.selected}</b></div>          
            </li>
            `;
    addImages(details.name);
    list.innerHTML += html;
}

function addImages(name) {
    var storageRef = firebase.storage().ref(name);
    storageRef.listAll().then(function (result) {
        result.items.forEach(function (imageRef) {
            // And finally display them
            displayImage(imageRef);
        });
    }).catch(function (error) {
        //alert('Image cannot be loaded :'+ error);
    });

    var refName = name.split(" ");
    function displayImage(imageRef) {
        imageRef.getDownloadURL().then(function (url) {
            console.log(url)
            console.log(name)
            let divByname = document.querySelector('.' + refName[0]+refName[1])
            var aTag = document.createElement('a');

            aTag.innerHTML = `<img src=${url} alt"">`;
            aTag.target='_blank'; 
            aTag.href = url;
            aTag.title = 'Image'
            console.log(aTag)
            divByname.appendChild(aTag);

        }).catch(function (error) {
            //  alert('Image cannot be loaded :'+ error);
        });
    }

}
