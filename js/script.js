async function mapImageList(){
    const memesObject = [
        {
            "name": "chapolin",
            "path": "pictures/chapolin.jpg" 
        },
        {
            "name": "chloe",
            "path": "pictures/chloe.jpg" 
        }
        ,
        {
            "name": "funny-cat1",
            "path": "pictures/funny-cat1.jpg" 
        }
    ]

    return memesObject;
}
async function createGallery(imageList)
{
    const memeSelector = document.querySelector("#memes-list")
    imageList.forEach(picture => {
        let newOption = document.createElement("option")
        newOption.text = picture.name.toUpperCase()
        newOption.value = picture.path
        memeSelector.appendChild(newOption)
    });
}
async function changeMemePicture(photo){
    let displayImage = document.querySelector("#display-image")
    displayImage.style.backgroundImage = `url('${photo}')`
}
function enablePhotoUpload(){
    const imageInput = document.querySelector("#image-input")
    imageInput.addEventListener("change", function(){
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            const uploadImage = reader.result
            changeMemePicture(uploadImage)
        })
        reader.readAsDataURL(this.files[0]);
    })

  
}
async function main(){
    const memesImageList = await mapImageList()
    await createGallery(memesImageList)
    await changeMemePicture(memesImageList[0].path)
   
    document.getElementById("btn-download").onclick = () =>{
        const screenshotPrint =  document.querySelector("#downlabled")
        html2canvas(screenshotPrint).then((canvas)=>{
            const base64Image = canvas.toDataURL("image/png")
            let anchor = document.createElement("a")
            anchor.setAttribute("href", base64Image)
            anchor.setAttribute("download", "my-meme.png")
            anchor.click()
            anchor.remove()
        })
    }
    
    enablePhotoUpload()
}

main()