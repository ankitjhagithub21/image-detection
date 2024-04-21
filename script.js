const imageFile = document.getElementById('file')
const rightImage = document.getElementById('rightImage')
const magicButton = document.getElementById('magicButton')
const loader = document.getElementById('loader')
const model = document.getElementById('model')
const closeBtn = document.getElementById('closeBtn')
const resultImage = document.getElementById('resultImage')
let apiUrl = `https://python-api.techsimplus.com/api/amazon-service/`
let imageBase64 = null

imageFile.addEventListener('change', async() => {
    const oneImage = imageFile.files[0]
    const imageUrl = URL.createObjectURL(oneImage)
    rightImage.src = imageUrl


    //image to base64
    const reader = new FileReader()
    reader.readAsDataURL(oneImage)

    reader.onload = () => {
        imageBase64 = reader.result.split(',')[1]
        
    }


})



magicButton.addEventListener('click', async() => {
    loader.style.display = "flex"
    const service = document.querySelector('input[name="service"]:checked')?.value
    if (service == undefined) {
        alert("Please select correct service")
        return;
    }
    if(imageBase64==null){
        alert("Please select image")
        return
    }
    const newValues = {
        service_type : service,
        image:imageBase64
    }

    const res = await fetch(apiUrl,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(newValues)
    })
    const resData = await res.json()
    
    rightImage.src = resData.data.image
    loader.style.display ="none"
    resultImage.src = resData.data.image
    model.style.display="flex"
})


closeBtn.addEventListener('click',()=>{
    model.style.display="none"
})