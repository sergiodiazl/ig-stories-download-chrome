
console.log('extension start')

let observerOptions= {
    childList: true,
    attributes:true,
    subtree:true
  }
let rootNode= document.getElementById('react-root')
let storyWrapper=document.getElementsByTagName('section')[0]
let storyContent=storyWrapper.getElementsByTagName('section')[0]
//check if root loads and add observer
function checkRoot(){
    rootNode= document.getElementById('react-root')
   
    if(storyContent===undefined){
        window.requestAnimationFrame(checkRoot)
    }else{

        console.log("root load")
         let rootObserver =new MutationObserver(mCallback,observerOptions)
         rootObserver.observe(rootNode,observerOptions)
    }

}
checkRoot()
//check if the story loaded
function checkStory(){
    storyWrapper=document.getElementsByTagName('section')[0]
    storyContent=storyWrapper.getElementsByTagName('section')[0]
    
    if(storyContent===undefined){
        window.requestAnimationFrame(checkStory)
    }else{
        let storyMedia=storyContent.lastChild
        let storyObserver =new MutationObserver(mCallbackStory,observerOptions)
        storyObserver.observe(storyMedia,observerOptions)
    }
}


function addButton(){
    let storyHeader=document.getElementsByTagName('header')[0]

console.log(storyHeader)
let uploaderInfoElement=storyHeader.firstChild.firstChild
let downloadButton=document.createElement('button')

downloadButton.innerText=' Save';
downloadButton.setAttribute('id',"downloadButton")
//downloadButton.setAttribute('target','_blank')
//downloadButton.setAttribute('download',true)

downloadButton.addEventListener('click',()=>downloadMedia())

uploaderInfoElement.appendChild(downloadButton)

}
function getMediaSrc(){
   
    let storyMedia=storyContent.lastElementChild

    let videoElement=storyMedia.getElementsByTagName('video')[0]
    if (videoElement!==undefined){
        return getVideoSrc(videoElement)
      
    }else{
        let imgElement=storyMedia.getElementsByTagName('img')[0]
        return  getImgSrc(imgElement)
    }
}
function getImgSrc(imgElement){
    return imgElement.src
}
function getVideoSrc(videoElement){
    return videoElement.currentSrc
}
function downloadMedia(){
    let mediaSrcUrl=getMediaSrc()
    let fileRequest=new XMLHttpRequest()
    fileRequest.responseType='blob'
    fileRequest.onload = function() {
    let a = document.createElement('a')
    a.href = window.URL.createObjectURL(fileRequest.response) // xhr.response is a blob
    console.log(fileRequest.response)
    a.download = nameFile(fileRequest.response.type)// Set the file name.
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    delete a
    };
    fileRequest.open('GET', mediaSrcUrl)
    fileRequest.send()
    

}
function nameFile(type){
    if(type.includes('image')){
        return 'storyPhoto.jpg'
    }else{
        return 'storyVideo'
    }
}

function mCallback() {
    //console.log(window.location)
    let currentLocation=window.location.href
    if (currentLocation!==undefined && currentLocation.includes('https://www.instagram.com/stories')){
        checkStory()
    }
  }
  function mCallbackStory(mutations,observer) {
    console.log("story",mutations.length)
    
    if (storyContent!==undefined){
        let downloadButtonElement=document.getElementById("downloadButton")
        console.log(downloadButtonElement)
        if(downloadButtonElement===null){
            addButton()
        }
        
    }
    observer.disconnect()
   }
 
  
 // let storyObserver =new MutationObserver(mCallback,observerOptions)
  //storyObserver.observe(storyContent,observerOptions)
