const BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

const msg=document.querySelector(".msg");

for(let doption of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        doption.append(newOption);
        //To start with USR and INR
        if(doption.name=="from" && currCode=="USD"){
            newOption.selected="selected";
        } else if(doption.name=="to" && currCode=="INR"){
            newOption.selected="selected";
        }

        //To change flag icon as per value
        doption.addEventListener("change",(evt)=>{
            updateFlagIcon(evt.target);
        });
    }
}

const updateFlagIcon = (element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode]; //IN,EU
    let newSrcUrl=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let flag_img=element.parentElement.querySelector("img");
    flag_img.src=newSrcUrl;
};

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amt=document.querySelector(".amount input");
    let amtVal=amt.value;
    if(amtVal==="" || amtVal<0){
        amtVal=1;
        amtVal.value=1;
    }
    //console.log(fromCurr.value,toCurr.value);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL); 
    let data= await response.json();
    let rate=data[toCurr.value.toLowerCase()];

    let finalAmt=amtVal*rate;
    msg.innerHTML=`${amtVal}${fromCurr.value}=${finalAmt}${toCurr.value}`;
})